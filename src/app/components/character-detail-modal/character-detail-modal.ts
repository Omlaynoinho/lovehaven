import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { CharacterService } from '../../services/character';
import { Sound } from '../../services/sound';

@Component({
  selector: 'app-character-detail-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatIconModule, ReactiveFormsModule],
  template: `
    @if (charService.isDetailOpen() && char(); as c) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-xs transition-opacity">
        <div class="relative w-full max-w-3xl max-h-[90vh] bg-gradient-to-br from-[#FFFDF9] via-[#FAF4ED] to-[#FFF7F9] rounded-3xl p-6 sm:p-9 border border-[#E8D4D8] vintage-shadow-lg flex flex-col justify-between overflow-hidden">
          
          <!-- Close Button -->
          <button
            type="button"
            (click)="onClose()"
            class="absolute top-4 right-4 sm:top-6 sm:right-6 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-[#78666A] hover:text-[#5B464B] border border-[#E9D5DA] flex items-center justify-center transition-all cursor-pointer shadow-xs"
            aria-label="Đóng"
          >
            <mat-icon class="text-base">close</mat-icon>
          </button>

          <!-- Scrollable Content -->
          <div class="overflow-y-auto pr-1 sm:pr-2 space-y-6">
            
            <!-- Character Header -->
            <div>
              <div class="flex items-center gap-2 mb-2">
                <span class="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-serif bg-[#FAF0E6] text-[#78666A]">
                  <mat-icon class="text-xs" [style.color]="c.flowerColor">{{ c.flowerSymbol }}</mat-icon>
                  <span>{{ c.flowerTheme }}</span>
                </span>

                @if (isUnlocked()) {
                  <span class="text-xs px-2.5 py-0.5 rounded-full bg-[#ECFDF5] text-[#059669] font-medium border border-[#A7F3D0] flex items-center gap-1">
                    <mat-icon class="text-xs">lock_open</mat-icon>
                    <span>Đã mở khóa</span>
                  </span>
                } @else {
                  <span class="text-xs px-2.5 py-0.5 rounded-full bg-[#FFF0F3] text-[#C98F9E] font-medium border border-[#F3D1D9] flex items-center gap-1">
                    <mat-icon class="text-xs">lock</mat-icon>
                    <span>Khóa bí mật</span>
                  </span>
                }
              </div>

              <h2 class="font-serif-vintage text-2xl sm:text-3xl font-bold text-[#5B464B]">
                {{ c.name }}
              </h2>

              @if (c.accentQuote) {
                <p class="font-script-romantic text-base sm:text-lg text-[#8E7479] mt-1 italic">
                  "{{ c.accentQuote }}"
                </p>
              }

              <!-- Tags -->
              <div class="flex flex-wrap gap-1.5 mt-3">
                @for (tag of c.tags; track tag) {
                  <span class="text-xs px-2.5 py-0.5 rounded-md bg-white/80 text-[#8E7479] border border-[#F0E0E4]">
                    #{{ tag }}
                  </span>
                }
              </div>
            </div>

            <!-- Summary Box -->
            <div class="p-4 sm:p-5 rounded-2xl bg-white/70 border border-[#ECD9DE]">
              <h4 class="text-xs font-serif uppercase tracking-wider text-[#A65B6D] font-bold mb-1">
                Tóm Tắt Khái Quát
              </h4>
              <p class="text-xs sm:text-sm text-[#6B555A] leading-relaxed">
                {{ c.summary }}
              </p>
            </div>

            <!-- UNLOCKED VIEW: Full Plot & Google AI Studio CTA -->
            @if (isUnlocked()) {
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <h4 class="font-serif-vintage text-lg font-bold text-[#5B464B] flex items-center gap-1.5">
                    <mat-icon class="text-base text-[#C98F9E]">auto_stories</mat-icon>
                    <span>Nhật Ký Cốt Truyện</span>
                  </h4>

                  <button
                    type="button"
                    (click)="copyPlot()"
                    class="text-xs text-[#8E7479] hover:text-[#5B464B] flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/80 border border-[#ECD9DE] transition-colors cursor-pointer"
                  >
                    <mat-icon class="text-xs">content_copy</mat-icon>
                    <span>{{ isCopied() ? 'Đã chép!' : 'Sao chép' }}</span>
                  </button>
                </div>

                @if (unlockedDetail()?.unlockExplanation) {
                  <div class="p-3.5 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] text-xs text-[#166534]">
                    🌸 {{ unlockedDetail()?.unlockExplanation }}
                  </div>
                }

                <div class="p-5 rounded-2xl bg-[#FFFDFB] border border-[#ECD9DE] text-xs sm:text-sm text-[#5B464B] leading-relaxed whitespace-pre-line font-serif selection:bg-[#FBECEF]">
                  {{ unlockedDetail()?.plot || c.plot }}
                </div>

                <!-- Google AI Studio Action -->
                @if (unlockedDetail()?.googleStudioUrl || c.googleStudioUrl; as studioUrl) {
                  <div class="pt-4 border-t border-[#F0DFE3] flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div class="text-xs text-[#8E7479]">
                      Sẵn sàng trò chuyện cùng <strong>{{ c.name }}</strong> trên Google AI Studio chính thức?
                    </div>

                    <a
                      [href]="studioUrl"
                      target="_blank"
                      rel="noopener noreferrer"
                      (click)="sound.playClick()"
                      class="w-full sm:w-auto px-6 py-2.5 rounded-full bg-gradient-to-r from-[#1877F2] to-[#2563EB] hover:from-[#166FE5] hover:to-[#1D4ED8] text-white text-xs sm:text-sm font-medium transition-all shadow-xs hover:shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Mở Google AI Studio</span>
                      <mat-icon class="text-xs">open_in_new</mat-icon>
                    </a>
                  </div>
                }
              </div>
            } @else {
              <!-- LOCKED VIEW: Quiz Question & Answer Input -->
              <div class="p-6 rounded-2xl bg-white/90 border border-[#EBCBD4] space-y-4">
                <div class="flex items-center gap-2 text-[#A65B6D]">
                  <mat-icon class="text-xl">vpn_key</mat-icon>
                  <h4 class="font-serif-vintage text-base sm:text-lg font-bold">
                    Chiếc Khóa Hoa Của {{ c.name }}
                  </h4>
                </div>

                <div class="p-4 rounded-xl bg-[#FFF9FA] border border-[#F5E0E5]">
                  <p class="text-xs sm:text-sm font-medium text-[#5B464B] mb-1">
                    {{ c.lockQuestion || 'Nhập câu trả lời để mở khóa chương nhật ký bí mật:' }}
                  </p>
                  @if (c.lockHint) {
                    <p class="text-xs text-[#8E7479] italic">
                      Gợi ý: {{ c.lockHint }}
                    </p>
                  }
                </div>

                <div class="flex flex-col sm:flex-row gap-2.5">
                  <input
                    type="text"
                    [formControl]="answerControl"
                    (keydown.enter)="submitAnswer()"
                    placeholder="Nhập câu trả lời tại đây..."
                    class="flex-1 px-4 py-2.5 rounded-xl border border-[#ECD9DE] bg-[#FFFDF9] text-xs sm:text-sm text-[#5B464B] focus:outline-none focus:border-[#C98F9E] focus:ring-1 focus:ring-[#C98F9E]"
                  />
                  <button
                    type="button"
                    (click)="submitAnswer()"
                    [disabled]="isSubmitting()"
                    class="px-6 py-2.5 rounded-xl bg-[#C98F9E] hover:bg-[#B77A8A] text-white text-xs sm:text-sm font-medium transition-all shadow-xs disabled:opacity-50 cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    @if (isSubmitting()) {
                      <mat-icon class="text-xs animate-spin">refresh</mat-icon>
                      <span>Đang kiểm tra...</span>
                    } @else {
                      <mat-icon class="text-xs">key</mat-icon>
                      <span>Mở khóa cốt truyện</span>
                    }
                  </button>
                </div>

                @if (errorMessage()) {
                  <p class="text-xs text-[#E11D48] flex items-center gap-1">
                    <mat-icon class="text-xs">error_outline</mat-icon>
                    <span>{{ errorMessage() }}</span>
                  </p>
                }
              </div>
            }
          </div>
        </div>
      </div>
    }
  `,
})
export class CharacterDetailModal {
  readonly charService = inject(CharacterService);
  readonly sound = inject(Sound);

  readonly answerControl = new FormControl('');
  readonly errorMessage = signal<string>('');
  readonly isSubmitting = signal<boolean>(false);
  readonly isCopied = signal<boolean>(false);

  char() {
    return this.charService.activeCharacter();
  }

  isUnlocked(): boolean {
    const c = this.char();
    if (!c) return false;
    return this.charService.isUnlocked(c.id);
  }

  unlockedDetail() {
    const c = this.char();
    if (!c) return null;
    return this.charService.getUnlockedDetail(c.id);
  }

  onClose(): void {
    this.sound.playPaper();
    this.errorMessage.set('');
    this.answerControl.setValue('');
    this.charService.closeCharacter();
  }

  submitAnswer(): void {
    const c = this.char();
    if (!c) return;

    const val = (this.answerControl.value || '').trim();
    if (!val) {
      this.errorMessage.set('Vui lòng nhập câu trả lời trước khi mở khóa.');
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set('');

    this.charService.verifyUnlock(c.id, val).subscribe({
      next: (res) => {
        this.isSubmitting.set(false);
        if (res.success) {
          this.sound.playChime();
          this.errorMessage.set('');
        } else {
          this.sound.playClick();
          this.errorMessage.set(res.message || 'Chìa khóa hoa chưa chính xác. Hãy thử lại nhé!');
        }
      },
      error: () => {
        this.isSubmitting.set(false);
        this.errorMessage.set('Có lỗi xảy ra khi kiểm tra chìa khóa. Vui lòng thử lại!');
      },
    });
  }

  copyPlot(): void {
    const c = this.char();
    if (!c) return;
    const text = this.unlockedDetail()?.plot || c.plot || '';
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        this.sound.playChime();
        this.isCopied.set(true);
        setTimeout(() => this.isCopied.set(false), 2000);
      });
    }
  }
}
