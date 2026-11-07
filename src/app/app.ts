import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { HeaderNav } from './components/header-nav/header-nav';
import { GardenBackground } from './components/garden-background/garden-background';
import { WelcomeEnvelope } from './components/welcome-envelope/welcome-envelope';
import { CharacterCard } from './components/character-card/character-card';
import { CharacterDetailModal } from './components/character-detail-modal/character-detail-modal';
import { CommissionServiceComponent } from './components/commission-service/commission-service';
import { AboutGarden } from './components/about-garden/about-garden';
import { EntranceScreen } from './components/entrance-screen/entrance-screen';
import { MusicPlayer } from './components/music-player/music-player';
import { CharacterService } from './services/character';
import { Sound } from './services/sound';
import { Music } from './services/music';
import { ActiveTab, PublicCharacter } from './models/character.model';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatIconModule,
    EntranceScreen,
    HeaderNav,
    GardenBackground,
    WelcomeEnvelope,
    CharacterCard,
    CharacterDetailModal,
    CommissionServiceComponent,
    AboutGarden,
    MusicPlayer,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  readonly charService = inject(CharacterService);
  readonly sound = inject(Sound);
  readonly music = inject(Music);

  readonly hasEntered = signal<boolean>(false);
  readonly welcomeOpen = signal<boolean>(false);
  readonly activeTab = signal<ActiveTab>('home');

  onEnterGarden(): void {
    this.hasEntered.set(true);
    // Ưu tiên tự động phát nhạc khi người dùng nhấn GỬI THƯ lần đầu
    this.music.autoPlayOnSendLetter();
  }

  reopenEntrance(): void {
    this.sound.playPaper();
    this.hasEntered.set(false);
  }

  readonly fbLiked = signal<boolean>(false);
  readonly fbLikeCount = signal<number>(224);
  readonly copySuccess = signal<boolean>(false);

  toggleFbLike(): void {
    this.sound.playFlower();
    this.fbLiked.update((v) => {
      const next = !v;
      this.fbLikeCount.update((c) => (next ? c + 1 : c - 1));
      return next;
    });
  }

  shareProfile(): void {
    this.sound.playClick();
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      this.copySuccess.set(true);
      setTimeout(() => this.copySuccess.set(false), 2500);
    }
  }

  openWelcome(): void {
    this.sound.playPaper();
    this.welcomeOpen.set(true);
  }

  setTab(tab: ActiveTab): void {
    this.sound.playClick();
    this.activeTab.set(tab);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  selectTagAndSwitch(tag: string): void {
    this.sound.playClick();
    this.charService.clearTags();
    this.charService.toggleTag(tag);
    this.activeTab.set('tags');
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  onSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.charService.setSearchQuery(input.value);
  }

  clearSearch(): void {
    this.charService.setSearchQuery('');
  }

  toggleTag(tag: string): void {
    this.sound.playClick();
    this.charService.toggleTag(tag);
  }

  isTagSelected(tag: string): boolean {
    return this.charService.selectedTags().includes(tag);
  }

  resetFilters(): void {
    this.sound.playClick();
    this.charService.clearTags();
    this.charService.setSearchQuery('');
  }

  openCharacter(char: PublicCharacter): void {
    this.sound.playFlower();
    this.charService.openCharacter(char);
  }
}
