import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { PublicCharacter } from '../../models/character.model';
import { CharacterService } from '../../services/character';
import { Sound } from '../../services/sound';

@Component({
  selector: 'app-character-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatIconModule],
  template: `
    <article
      class="group relative h-full flex flex-col justify-between bg-white/90 hover:bg-white rounded-3xl p-6 sm:p-7 border border-[#E8D4D8] transition-all duration-400 vintage-shadow hover:vintage-shadow-lg hover:-translate-y-1.5 overflow-hidden"
    >
      <!-- Top Decorative Lace & Flower Motif -->
      <div
        class="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-35 pointer-events-none transition-transform group-hover:scale-125 duration-500"
        [style.background]="'radial-gradient(circle, ' + char().flowerColor + ' 0%, transparent 70%)'"
      ></div>

      <!-- Top Card Header: Flower Theme Seal (NO AVATARS!) -->
      <div>
        <div class="flex items-start justify-between gap-3 mb-4">
          <!-- Botanical Flower Heraldry Crest -->
          <div
            class="flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-dashed text-xs font-serif transition-colors"
            [style.border-color]="char().flowerColor"
            [style.background-color]="char().flowerColor + '20'"
          >
            <mat-icon class="text-sm scale-90" [style.color]="'#A65B6D'">
              {{ char().flowerSymbol || 'local_florist' }}
            </mat-icon>
            <span class="font-medium tracking-wide text-[#5B464B]">{{ char().flowerTheme }}</span>
          </div>

          <!-- Lock/Unlock Status Badge -->
          @if (isUnlocked()) {
            <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-[#B8C8B0]/30 text-[#476040] border border-[#B8C8B0]/60 shadow-2xs">
              <mat-icon class="text-xs">lock_open</mat-icon>
              <span>Đã mở khóa</span>
            </span>
          } @else {
            <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-[#EBCBD4]/40 text-[#8B4858] border border-[#EBCBD4] shadow-2xs">
              <mat-icon class="text-xs">lock</mat-icon>
              <span>Chưa mở khóa</span>
            </span>
          }
        </div>

        <!-- Character Name in Romantic Serif -->
        <h3 class="font-serif-vintage text-2xl sm:text-3xl text-[#5B464B] font-semibold tracking-wide mb-2 group-hover:text-[#C98F9E] transition-colors">
          {{ char().name }}
        </h3>

        <!-- Accent Quote / Short Thought -->
        @if (char().accentQuote) {
          <p class="font-script-romantic text-base text-[#9A7D84] italic mb-3">
            "{{ char().accentQuote }}"
          </p>
        }

        <!-- Summary / Intro Excerpt -->
        <p class="text-sm text-[#78666A] leading-relaxed line-clamp-3 mb-5 font-light">
          {{ char().summary }}
        </p>
      </div>

      <!-- Bottom: Tags & Action Button -->
      <div class="pt-4 border-t border-[#F2E5E8]/80 flex flex-col gap-4">
        <!-- Tags Pill Row -->
        <div class="flex flex-wrap gap-1.5">
          @for (tag of char().tags; track tag) {
            <span class="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#FFF7ED] text-[#8E7479] border border-[#ECD9DE]">
              #{{ tag }}
            </span>
          }
        </div>

        <!-- Action Button "Khám phá" -->
        <button
          type="button"
          (click)="onExploreClick()"
          class="w-full py-2.5 px-4 rounded-2xl flex items-center justify-center gap-2 text-sm font-medium transition-all duration-300 shadow-2xs group-hover:shadow-md cursor-pointer"
          [class.bg-[#C98F9E]]="!isUnlocked()"
          [class.hover:bg-[#B77A8A]]="!isUnlocked()"
          [class.text-white]="true"
          [class.bg-[#8FA887]]="isUnlocked()"
          [class.hover:bg-[#7D9775]]="isUnlocked()"
        >
          <mat-icon class="text-base">
            {{ isUnlocked() ? 'auto_stories' : 'vpn_key' }}
          </mat-icon>
          <span>{{ isUnlocked() ? 'Đọc cốt truyện' : 'Khám phá & Giải đố' }}</span>
          <mat-icon class="text-sm transition-transform duration-300 group-hover:translate-x-1">
            arrow_forward
          </mat-icon>
        </button>
      </div>
    </article>
  `,
})
export class CharacterCard {
  readonly char = input.required<PublicCharacter>();
  readonly explore = output<PublicCharacter>();

  private charService = inject(CharacterService);
  private sound = inject(Sound);

  isUnlocked(): boolean {
    return this.charService.isCharacterUnlocked(this.char().id);
  }

  onExploreClick(): void {
    this.sound.playClick();
    this.explore.emit(this.char());
  }
}
