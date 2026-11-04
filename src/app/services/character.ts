import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { PublicCharacter, SiteConfig, PublicMailboxLetter, MailboxResponseData } from '../models/character.model';
import { CHARACTERS_DATA, DEFAULT_SITE_CONFIG } from '../../data/characters.data';
import { subscribeToLetters, saveLetterToFirestore } from './firebase';

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

  // Mailbox letters
  public readonly publicLetters = signal<PublicMailboxLetter[]>([]);
  public readonly totalSenders = signal<number>(0);
  public readonly isLoadingLetters = signal<boolean>(false);

  // Unique tags
  public readonly availableTags = computed(() => {
    const set = new Set<string>();
    this.characters().forEach((c) => c.tags.forEach((t) => set.add(t)));
    return Array.from(set);
  });

  // Filtered characters
  public readonly filteredCharacters = computed(() => {
    const list = this.characters();
    const query = normalizeTextLocal(this.searchQuery());
    const tags = this.selectedTags();

    return list.filter((c) => {
      // Filter by tag
      if (tags.length > 0) {
        const hasTag = tags.every((t) => c.tags.includes(t));
        if (!hasTag) return false;
      }

      // Filter by search query
      if (query) {
        const nameNorm = normalizeTextLocal(c.name);
        const sumNorm = normalizeTextLocal(c.summary);
        const tagStr = normalizeTextLocal(c.tags.join(' '));
        if (!nameNorm.includes(query) && !sumNorm.includes(query) && !tagStr.includes(query)) {
          return false;
        }
      }

      return true;
    });
  });

  constructor() {
    this.loadInitialData();
  }

  loadInitialData(): void {
    // 1. Initial characters from local data
    const localPublicList: PublicCharacter[] = CHARACTERS_DATA.map((c) => ({
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
    })).sort((a, b) => a.displayOrder - b.displayOrder);

    this.characters.set(localPublicList);

    // 2. Fetch from backend /api/characters
    this.http
      .get<PublicCharacter[]>('/api/characters')
      .pipe(
        catchError(() => of(localPublicList)),
        tap((res) => {
          if (res && res.length > 0) {
            this.characters.set(res);
          }
        })
      )
      .subscribe();

    // 3. Load mailbox letters
    this.loadLetters();

    // 4. Subscribe to Firestore letters real-time
    if (typeof window !== 'undefined') {
      subscribeToLetters((firestoreLetters) => {
        if (firestoreLetters && firestoreLetters.length > 0) {
          this.publicLetters.set(firestoreLetters);
          const uniqueSenders = new Set(firestoreLetters.map((l) => l.senderName));
          this.totalSenders.set(uniqueSenders.size);
        }
      });
    }
  }

  loadLetters(): void {
    this.isLoadingLetters.set(true);
    this.http
      .get<MailboxResponseData>('/api/mailbox')
      .pipe(
        catchError(() =>
          of({
            letters: [
              {
                id: 'seed-1',
                senderName: 'Một lữ khách qua đường',
                recipientCharacterId: 'co-giang-chi',
                recipientCharacterName: 'Cố Giang Chi',
                message: 'Gửi Cố thiếu gia, hy vọng anh sớm tìm lại được bình yên trong tâm hồn giữa những toan tính lạnh lùng.',
                flowerChoice: 'Hoa Hồng',
                createdAt: new Date().toISOString(),
                isPublic: true,
              },
            ],
            totalSenders: 1,
          })
        ),
        tap((res) => {
          this.publicLetters.set(res.letters || []);
          this.totalSenders.set(res.totalSenders || (res.letters ? res.letters.length : 0));
          this.isLoadingLetters.set(false);
        })
      )
      .subscribe();
  }

  toggleTag(tag: string): void {
    const current = this.selectedTags();
    if (current.includes(tag)) {
      this.selectedTags.set(current.filter((t) => t !== tag));
    } else {
      this.selectedTags.set([...current, tag]);
    }
  }

  clearTags(): void {
    this.selectedTags.set([]);
  }

  setSearchQuery(q: string): void {
    this.searchQuery.set(q);
  }

  openCharacter(character: PublicCharacter): void {
    this.activeCharacter.set(character);
    this.isDetailOpen.set(true);
  }

  closeCharacter(): void {
    this.isDetailOpen.set(false);
    this.activeCharacter.set(null);
  }

  isUnlocked(id: string): boolean {
    const char = this.characters().find((c) => c.id === id);
    if (char && !char.locked) return true;
    return this.unlockedIds().has(id);
  }

  getUnlockedDetail(id: string): { plot: string; googleStudioUrl: string; unlockExplanation?: string } | null {
    const char = this.characters().find((c) => c.id === id);
    if (char && !char.locked && char.plot && char.googleStudioUrl) {
      return {
        plot: char.plot,
        googleStudioUrl: char.googleStudioUrl,
        unlockExplanation: char.unlockExplanation,
      };
    }
    return this.unlockedDetails().get(id) || null;
  }

  verifyUnlock(characterId: string, answer: string): Observable<UnlockResponse> {
    return this.http
      .post<UnlockResponse>('/api/characters/verify-unlock', {
        characterId,
        answer,
      })
      .pipe(
        catchError(() => {
          // Local fallback verification
          const char = CHARACTERS_DATA.find((c) => c.id === characterId);
          if (!char) {
            return of({ success: false, message: 'Không tìm thấy nhân vật.' });
          }

          if (!char.locked) {
            return of({
              success: true,
              plot: char.plot,
              googleStudioUrl: char.googleStudioUrl,
              unlockExplanation: char.unlockExplanation,
            });
          }

          const normInput = collapseTextLocal(answer);
          const matched = (char.acceptedAnswers || []).some(
            (ans) => collapseTextLocal(ans) === normInput
          );

          if (matched) {
            return of({
              success: true,
              plot: char.plot,
              googleStudioUrl: char.googleStudioUrl,
              unlockExplanation: char.unlockExplanation,
            });
          }

          return of({
            success: false,
            message: 'Chìa khóa chưa chính xác. Hãy đọc kỹ gợi ý hoa nhé!',
          });
        }),
        tap((res) => {
          if (res.success && res.plot && res.googleStudioUrl) {
            this.unlockedIds.update((s) => new Set(s).add(characterId));
            this.unlockedDetails.update((m) => {
              const next = new Map(m);
              next.set(characterId, {
                plot: res.plot!,
                googleStudioUrl: res.googleStudioUrl!,
                unlockExplanation: res.unlockExplanation,
              });
              return next;
            });
          }
        })
      );
  }

  sendMailboxLetter(payload: {
    senderName: string;
    recipientCharacterId?: string;
    recipientCharacterName?: string;
    message: string;
    flowerChoice: string;
  }): Observable<MailboxResponse> {
    // Also save to Firestore in background
    saveLetterToFirestore({
      senderName: payload.senderName,
      recipientCharacterId: payload.recipientCharacterId,
      recipientCharacterName: payload.recipientCharacterName,
      message: payload.message,
      flowerChoice: payload.flowerChoice,
      createdAt: new Date().toISOString(),
      isPublic: true,
    });

    return this.http
      .post<MailboxResponse>('/api/mailbox', payload)
      .pipe(
        catchError(() => {
          const letter: PublicMailboxLetter = {
            id: 'local-' + Date.now(),
            senderName: payload.senderName || 'Ẩn danh',
            recipientCharacterId: payload.recipientCharacterId,
            recipientCharacterName: payload.recipientCharacterName,
            message: payload.message,
            flowerChoice: payload.flowerChoice,
            createdAt: new Date().toISOString(),
            isPublic: true,
          };
          this.publicLetters.update((list) => [letter, ...list]);
          this.totalSenders.update((c) => c + 1);
          return of({
            success: true,
            message: 'Lá thư của bạn đã được trao gửi an yên vào khu vườn!',
            letter,
          });
        }),
        tap((res) => {
          if (res.success && res.letter) {
            this.publicLetters.update((list) => [res.letter!, ...list.filter((l) => l.id !== res.letter!.id)]);
            if (res.totalSenders) {
              this.totalSenders.set(res.totalSenders);
            }
          }
        })
      );
  }
}
