import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { GardenBackground } from './components/garden-background/garden-background';
import { WelcomeEnvelope } from './components/welcome-envelope/welcome-envelope';
import { HeaderNav } from './components/header-nav/header-nav';
import { MusicPlayer } from './components/music-player/music-player';
import { CharacterCard } from './components/character-card/character-card';
import { CharacterDetailModal } from './components/character-detail-modal/character-detail-modal';
import { MailboxSection } from './components/mailbox/mailbox';
import { AboutGarden } from './components/about-garden/about-garden';
import { CharacterService } from './services/character';
import { Sound } from './services/sound';
import { PublicCharacter } from './models/character.model';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatIconModule,
    ReactiveFormsModule,
    GardenBackground,
    WelcomeEnvelope,
    HeaderNav,
    MusicPlayer,
    CharacterCard,
    CharacterDetailModal,
    MailboxSection,
    AboutGarden,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  readonly charService = inject(CharacterService);
  readonly sound = inject(Sound);

  readonly hasEnteredGarden = signal<boolean>(false);
  readonly searchControl = new FormControl('');

  constructor() {
    // Check session storage for entered state
    if (typeof window !== 'undefined') {
      const entered = sessionStorage.getItem('love_have_entered_session');
      if (entered === 'true') {
        this.hasEnteredGarden.set(true);
      }
    }

    // Sync search control with characterService
    this.searchControl.valueChanges.subscribe((val) => {
      this.charService.searchQuery.set(val || '');
    });
  }

  onWelcomeEntered(): void {
    this.hasEnteredGarden.set(true);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('love_have_entered_session', 'true');
    }
  }

  reopenWelcomeEnvelope(): void {
    this.hasEnteredGarden.set(false);
  }

  scrollToSection(selector: string): void {
    this.sound.playClick();
    if (typeof document !== 'undefined') {
      const el = document.querySelector(selector);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  onTagClick(tag: string): void {
    this.sound.playChime();
    this.charService.toggleTag(tag);
  }

  onClearFilters(): void {
    this.sound.playClick();
    this.searchControl.setValue('');
    this.charService.clearTags();
  }

  isTagSelected(tag: string): boolean {
    return this.charService.selectedTags().includes(tag);
  }

  openCharacter(char: PublicCharacter): void {
    this.charService.openDetail(char);
  }

  closeCharacterModal(): void {
    this.charService.closeDetail();
  }
}
