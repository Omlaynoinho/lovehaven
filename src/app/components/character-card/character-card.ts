import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
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
    <div
      (click)="onClick()"
      class="group relative h-full flex flex-col justify-between p-6 sm:p-7 rounded-3xl bg-[#FFFDFB]/92 hover:bg-white border border-[#F0C9D2]/75 hover:border-[#E89EAE] transition-all duration-300 vintage-shadow hover:shadow-xl cursor-pointer overflow-hidden transform hover:-translate-y-1"
    >
      <!-- Corner Botanical Leaf & Ribbon Accent -->
      <div class="absolute -top-1 -right-1 w-14 h-14 overflow-hidden pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity">
        <svg viewBox="0 0 40 40" class="w-full h-full text-[#F092A5]">
          <path d="M0 0 L40 0 L40 40 Z" fill="#FFE5EC"/>
          <path d="M22 6 C 30 14, 32 24, 34 34" stroke="#EAA2B2" stroke-width="1.2" fill="none"/>
        </svg>
      </div>

      <!-- Background Ambient Glow -->
      <div
        class="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-15 group-hover:opacity-25 transition-opacity blur-2xl pointer-events-none"
        [style.background-color]="char().flowerColor"
      ></div>

      <div>
        <!-- Top Status Bar: Flower Theme & Lock Badge -->
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-serif bg-[#FAF0E6] text-[#78666A]">
            <mat-icon class="text-xs" [style.color]="char().flowerColor">{{ char().flowerSymbol }}</mat-icon>
            <span class="truncate max-w-[130px]">{{ char().flowerTheme }}</span>
          </div>

          @if (isUnlocked()) {
            <span class="flex items-center gap-1 text-[11px] font-medium text-[#059669] bg-[#ECFDF5] border border-[#A7F3D0] px-2.5 py-0.5 rounded-full">
              <mat-icon class="text-xs">lock_open</mat-icon>
              <span>Đã mở</span>
            </span>
          } @else {
            <span class="flex items-center gap-1 text-[11px] font-medium text-[#C98F9E] bg-[#FFF0F3] border border-[#F3D1D9] px-2.5 py-0.5 rounded-full">
              <mat-icon class="text-xs">lock</mat-icon>
              <span>Câu đố hoa</span>
            </span>
          }
        </div>

        <!-- Character Title -->
        <h3 class="font-serif-vintage text-xl sm:text-2xl font-bold text-[#5B464B] group-hover:text-[#A65B6D] transition-colors mb-2">
          {{ char().name }}
        </h3>

        <!-- Tags List -->
        <div class="flex flex-wrap gap-1.5 mb-3">
          @for (tag of char().tags.slice(0, 4); track tag) {
            <span class="text-[11px] px-2 py-0.5 rounded-md bg-[#FAF4F5] text-[#8E7479] border border-[#F0E0E4]">
              #{{ tag }}
            </span>
          }
          @if (char().tags.length > 4) {
            <span class="text-[11px] px-1.5 py-0.5 text-[#B0999E]">
              +{{ char().tags.length - 4 }}
            </span>
          }
        </div>

        <!-- Summary -->
        <p class="text-xs sm:text-sm text-[#78666A] line-clamp-3 leading-relaxed mb-4">
          {{ char().summary }}
        </p>
      </div>

      <!-- Footer Action CTA -->
      <div class="pt-4 border-t border-[#F5E5E8] flex items-center justify-between text-xs font-medium text-[#A65B6D]">
        <span class="group-hover:translate-x-1 transition-transform flex items-center gap-1">
          <span>Xem chi tiết & đọc nhật ký</span>
          <mat-icon class="text-xs">arrow_forward</mat-icon>
        </span>
        <mat-icon class="text-sm opacity-60 group-hover:opacity-100 transition-opacity">auto_stories</mat-icon>
      </div>
    </div>
  `,
})
export class CharacterCard {
  readonly char = input.required<PublicCharacter>();
  private charService = inject(CharacterService);
  private sound = inject(Sound);

  isUnlocked(): boolean {
    return this.charService.isUnlocked(this.char().id);
  }

  onClick(): void {
    this.sound.playPaper();
    this.charService.openCharacter(this.char());
  }
}
