import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, timeout } from 'rxjs/operators';
import { PublicCharacter, SiteConfig, PublicMailboxLetter, MailboxResponseData } from '../models/character.model';
import { CHARACTERS_DATA, DEFAULT_SITE_CONFIG } from '../../data/characters.data';
import { testConnection, subscribeToLetters, saveLetterToFirestore } from './firebase';

export interface UnlockResponse {
  success: boolean;
  plot?: string;
  googleStudioUrl?: string;
  unlockExplanation?: string;
  message?: string;
}

export interface MailboxResponse {
  success: boolean;
  message: string;
  letterId?: string;
  letter?: PublicMailboxLetter;
  totalSenders?: number;
}

function normalizeTextLocal(text: string): string {
  return (text || '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[.,!?:;"'“”‘’()\-_\s]+/g, ' ')
    .trim();
}

function collapseTextLocal(text: string): string {
  return normalizeTextLocal(text).replace(/[^a-z0-9]/g, '');
}

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private http = inject(HttpClient);

  public readonly characters = signal<PublicCharacter[]>([]);
  public readonly unlockedIds = signal<Set<string>>(new Set<string>());
  public readonly unlockedDetails = signal<Map<string, { plot: string; googleStudioUrl: string; unlockExplanation?: string }>>(new Map());
  public readonly selectedTags = signal<string[]>([]);
  public readonly searchQuery = signal<string>('');
  public readonly activeCharacter = signal<PublicCharacter | null>(null);
  public readonly isDetailOpen = signal<boolean>(false);
  public readonly isLoading = signal<boolean>(false);
  public readonly siteConfig = signal<SiteConfig>(DEFAULT_SITE_CONFIG);

  // Public mailbox letters & total senders count
  public readonly publicLetters = signal<PublicMailboxLetter[]>([]);
  public readonly totalSenders = signal<number>(0);
  public readonly isLoadingLetters = signal<boolean>(false);

  // Available unique tags from character dataset
  public readonly availableTags = computed(() => {
    const set = new Set<string>();
    this.characters().forEach((c) => c.tags.forEach((t) => set.add(t)));
    return Array.from(set);
  });

  // Filtered characters computed signal
  public readonly filteredCharacters = computed(() => {
    const list = this.characters();
    const query = this.searchQuery().trim().toLowerCase();
    const activeTags = this.selectedTags();

    return list.filter((char) => {
      // Tag filter
      if (activeTags.length > 0) {
        const matchesAllTags = activeTags.every((t) => char.tags.includes(t));
        if (!matchesAllTags) return false;
      }

      // Search query filter (name, summary, tags, flowerTheme)
      if (query) {
        const nameMatch = char.name.toLowerCase().includes(query);
        const summaryMatch = char.summary.toLowerCase().includes(query);
        const tagMatch = char.tags.some((t) => t.toLowerCase().includes(query));
        const flowerMatch = char.flowerTheme.toLowerCase().includes(query);
        if (!nameMatch && !summaryMatch && !tagMatch && !flowerMatch) {
          return false;
        }
      }

      return true;
    });
  });

  constructor() {
    this.loadCachedUnlockedState();
    this.loadInitialCharacters();
    this.loadSiteConfig();
    this.loadLetters();
    this.initFirestoreSync();
  }

  private initFirestoreSync(): void {
    if (typeof window === 'undefined') return;
    testConnection().then((isConnected) => {
      if (!isConnected) {
        return;
      }
      try {
        subscribeToLetters(
          (firestoreLetters) => {
            if (firestoreLetters && firestoreLetters.length > 0) {
              this.publicLetters.set(firestoreLetters);
              this.totalSenders.set(firestoreLetters.length);
            }
          },
          (err) => {
            console.warn('Firestore subscription fallback:', err);
          }
        );
      } catch (err) {
        console.warn('Unable to subscribe to Firestore:', err);
      }
    });
  }

  public loadLetters(): void {
    this.isLoadingLetters.set(true);
    this.http.get<MailboxResponseData>('/api/mailbox').pipe(
      catchError(() => of({ letters: [], totalSenders: 0 }))
    ).subscribe((data) => {
      // If Firestore hasn't already loaded letters, use the server letters
      if (this.publicLetters().length === 0 && data.letters && data.letters.length > 0) {
        this.publicLetters.set(data.letters);
        this.totalSenders.set(data.totalSenders || data.letters.length);
      }
      this.isLoadingLetters.set(false);
    });
  }

  private loadCachedUnlockedState(): void {
    if (typeof window === 'undefined') return;
    try {
      // Allow URL parameters like ?relock=1 or ?solve=1 or ?khoa=1 so shared links can be opened in locked state for others to solve
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.has('relock') || urlParams.has('solve') || urlParams.has('khoa') || urlParams.has('reset')) {
        this.relockAllCharacters();
        return;
      }

      const savedUnlocked = localStorage.getItem('love_have_unlocked_ids');
      if (savedUnlocked) {
        const ids: string[] = JSON.parse(savedUnlocked);
        this.unlockedIds.set(new Set(ids));
      }

      const savedDetails = localStorage.getItem('love_have_unlocked_details');
      if (savedDetails) {
        const parsed = JSON.parse(savedDetails);
        const map = new Map<string, { plot: string; googleStudioUrl: string; unlockExplanation?: string }>();
        Object.entries(parsed).forEach(([k, v]) => {
          map.set(k, v as { plot: string; googleStudioUrl: string; unlockExplanation?: string });
        });
        this.unlockedDetails.set(map);
      }
    } catch {
      // Storage error ignored
    }
  }

  public relockCharacter(characterId: string): void {
    const currentSet = new Set(this.unlockedIds());
    currentSet.delete(characterId);
    this.unlockedIds.set(currentSet);

    const currentMap = new Map(this.unlockedDetails());
    currentMap.delete(characterId);
    this.unlockedDetails.set(currentMap);

    this.saveCachedUnlockedState();
  }

  public relockAllCharacters(): void {
    this.unlockedIds.set(new Set());
    this.unlockedDetails.set(new Map());
    this.saveCachedUnlockedState();
  }

  private saveCachedUnlockedState(): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(
        'love_have_unlocked_ids',
        JSON.stringify(Array.from(this.unlockedIds()))
      );

      const obj: Record<string, { plot: string; googleStudioUrl: string; unlockExplanation?: string }> = {};
      this.unlockedDetails().forEach((v, k) => {
        obj[k] = v;
      });
      localStorage.setItem('love_have_unlocked_details', JSON.stringify(obj));
    } catch {
      // Storage error ignored
    }
  }

  public loadInitialCharacters(): void {
    this.isLoading.set(true);
    this.http.get<PublicCharacter[]>('/api/characters').pipe(
      catchError(() => {
        // Fallback to static data if API is not yet loaded in SSR/CSR transition
        const fallback: PublicCharacter[] = CHARACTERS_DATA.map((c) => ({
          id: c.id,
          name: c.name,
          tags: c.tags,
          summary: c.summary,
          locked: c.locked,
          lockQuestion: c.lockQuestion,
          lockHint: c.lockHint,
          unlockExplanation: c.unlockExplanation,
          displayOrder: c.displayOrder,
          flowerTheme: c.flowerTheme,
          flowerColor: c.flowerColor,
          flowerSymbol: c.flowerSymbol,
          accentQuote: c.accentQuote,
          plot: c.locked ? undefined : c.plot,
          googleStudioUrl: c.locked ? undefined : c.googleStudioUrl,
        }));
        return of(fallback);
      })
    ).subscribe((data) => {
      this.characters.set(data);
      this.isLoading.set(false);
    });
  }

  public loadSiteConfig(): void {
    this.http.get<SiteConfig>('/api/config').pipe(
      catchError(() => of(DEFAULT_SITE_CONFIG))
    ).subscribe((cfg) => {
      this.siteConfig.set(cfg);
    });
  }

  public isCharacterUnlocked(charId: string): boolean {
    const char = this.characters().find((c) => c.id === charId);
    if (char && !char.locked) return true;
    return this.unlockedIds().has(charId);
  }

  public getCharacterUnlockedData(charId: string): { plot?: string; googleStudioUrl?: string; unlockExplanation?: string } | undefined {
    const char = this.characters().find((c) => c.id === charId);
    if (char && !char.locked && char.plot) {
      return {
        plot: char.plot,
        googleStudioUrl: char.googleStudioUrl,
        unlockExplanation: char.unlockExplanation,
      };
    }
    return this.unlockedDetails().get(charId);
  }

  public verifyUnlock(characterId: string, answer: string): Observable<UnlockResponse> {
    return this.http.post<UnlockResponse>('/api/characters/verify-unlock', {
      characterId,
      answer,
    }).pipe(
      timeout(2500),
      tap((res) => {
        if (res.success && res.plot) {
          const currentSet = new Set(this.unlockedIds());
          currentSet.add(characterId);
          this.unlockedIds.set(currentSet);

          const currentMap = new Map(this.unlockedDetails());
          currentMap.set(characterId, {
            plot: res.plot,
            googleStudioUrl: res.googleStudioUrl || '',
            unlockExplanation: res.unlockExplanation,
          });
          this.unlockedDetails.set(currentMap);

          this.saveCachedUnlockedState();
        }
      }),
      catchError(() => {
        // Fallback: If server is temporarily restarting or unreachable, verify against local CHARACTERS_DATA
        const localChar = CHARACTERS_DATA.find((c) => c.id === characterId);
        if (localChar) {
          const normalizedInput = normalizeTextLocal(answer);
          const rawInput = answer.trim().toLowerCase();
          const collapsedInput = collapseTextLocal(answer);

          const isCorrect = (localChar.acceptedAnswers || []).some((accepted) => {
            const rawAcc = accepted.trim().toLowerCase();
            const normAcc = normalizeTextLocal(accepted);
            const collapsedAcc = collapseTextLocal(accepted);

            return (
              rawInput === rawAcc ||
              normalizedInput === normAcc ||
              collapsedInput === collapsedAcc ||
              rawInput.includes(rawAcc) ||
              normalizedInput.includes(normAcc) ||
              (collapsedAcc.length >= 3 && collapsedInput.includes(collapsedAcc))
            );
          });

          if (isCorrect) {
            const res: UnlockResponse = {
              success: true,
              plot: localChar.plot,
              googleStudioUrl: localChar.googleStudioUrl,
              unlockExplanation: localChar.unlockExplanation,
            };

            const currentSet = new Set(this.unlockedIds());
            currentSet.add(characterId);
            this.unlockedIds.set(currentSet);

            const currentMap = new Map(this.unlockedDetails());
            currentMap.set(characterId, {
              plot: res.plot!,
              googleStudioUrl: res.googleStudioUrl || '',
              unlockExplanation: res.unlockExplanation,
            });
            this.unlockedDetails.set(currentMap);

            this.saveCachedUnlockedState();
            return of(res);
          } else {
            return of({
              success: false,
              message: 'Hình như chiếc chìa khóa này chưa đúng rồi, thử lại nhé!',
            });
          }
        }

        return of({
          success: false,
          message: 'Hình như chiếc chìa khóa này chưa đúng rồi, thử lại nhé!',
        });
      })
    );
  }

  public sendMail(nickname: string, title: string, content: string): Observable<MailboxResponse> {
    const letterId = `letter-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const finalNickname = nickname.trim() || 'Người lữ khách vô danh';
    const finalTitle = title.trim() || (content.length > 25 ? content.slice(0, 25) + '...' : 'Thư gửi khu vườn');
    const createdAt = new Date().toISOString();

    const publicLetter: PublicMailboxLetter = {
      id: letterId,
      nickname: finalNickname,
      title: finalTitle,
      content: content.trim(),
      createdAt,
    };

    // Save directly to Firestore for real-time live propagation
    if (typeof window !== 'undefined') {
      saveLetterToFirestore(publicLetter).catch((err) => {
        console.warn('Firestore direct write fallback:', err);
      });
    }

    return this.http.post<MailboxResponse>('/api/mailbox', {
      nickname: finalNickname,
      title: finalTitle,
      content,
    }).pipe(
      tap((res) => {
        if (res.success && res.letter) {
          this.publicLetters.update((list) => {
            if (list.some((l) => l.id === res.letter!.id)) return list;
            return [res.letter!, ...list];
          });
          if (typeof res.totalSenders === 'number') {
            this.totalSenders.set(res.totalSenders);
          } else {
            this.totalSenders.update((c) => c + 1);
          }
        }
      }),
      catchError((err) => {
        const errorMsg = err?.error?.message || 'Không thể gửi thư đến khu vườn. Vui lòng kiểm tra lại kết nối mạng.';
        return of({ success: false, message: errorMsg });
      })
    );
  }

  public toggleTag(tag: string): void {
    const current = this.selectedTags();
    if (current.includes(tag)) {
      this.selectedTags.set(current.filter((t) => t !== tag));
    } else {
      this.selectedTags.set([...current, tag]);
    }
  }

  public clearTags(): void {
    this.selectedTags.set([]);
    this.searchQuery.set('');
  }

  public openDetail(char: PublicCharacter): void {
    this.activeCharacter.set(char);
    this.isDetailOpen.set(true);
  }

  public closeDetail(): void {
    this.isDetailOpen.set(false);
  }
}
