import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { HeaderNav } from './components/header-nav/header-nav';
import { GardenBackground } from './components/garden-background/garden-background';
import { WelcomeEnvelope } from './components/welcome-envelope/welcome-envelope';
import { CharacterCard } from './components/character-card/character-card';
import { CharacterDetailModal } from './components/character-detail-modal/character-detail-modal';
import { Mailbox } from './components/mailbox/mailbox';
import { CommissionServiceComponent } from './components/commission-service/commission-service';
import { AboutGarden } from './components/about-garden/about-garden';
import { MusicPlayer } from './components/music-player/music-player';
import { CharacterService } from './services/character';
import { Sound } from './services/sound';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatIconModule,
    HeaderNav,
    GardenBackground,
    WelcomeEnvelope,
    CharacterCard,
    CharacterDetailModal,
    Mailbox,
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

  readonly welcomeOpen = signal<boolean>(false);

  openWelcome(): void {
    this.sound.playPaper();
    this.welcomeOpen.set(true);
  }

  scrollTo(anchor: string): void {
    this.sound.playClick();
    if (typeof document !== 'undefined') {
      const el = document.querySelector(anchor);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
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
}
