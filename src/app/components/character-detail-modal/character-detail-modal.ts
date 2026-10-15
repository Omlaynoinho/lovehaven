import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
  signal,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { PublicCharacter } from '../../models/character.model';
import { CharacterService } from '../../services/character';
import { Sound } from '../../services/sound';

@Component({
  selector: 'app-character-detail-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatIconModule, ReactiveFormsModule],
  template: `
    <!-- Modal Backdrop & Dialog -->
    <div
      class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="char-modal-title"
      tabindex="-1"
      (keydown.escape)="closeModal()"
    >
      <!-- Clickable dark backdrop -->
      <button
        type="button"
        class="fixed inset-0 bg-[#4A3A3E]/60 backdrop-blur-sm border-0 w-full h-full cursor-pointer"
        (click)="closeModal()"
        aria-label="Đóng cửa sổ"
      ></button>

      <!-- Modal Container -->
      <div
        class="relative w-full max-w-2xl bg-[#FFFDF9] rounded-3xl border-2 border-[#EAD5DA] vintage-shadow-lg overflow-hidden flex flex-col max-h-[92vh] animate-scale-up z-10"
      >
        <!-- Modal Top Bar -->
        <div class="px-6 py-4 border-b border-[#F2E5E8] flex items-center justify-between bg-[#FFF7ED]/90">
          <div class="flex items-center gap-2">
            <!-- Flower Theme Crest -->
            <div class="w-8 h-8 rounded-full border border-dashed border-[#C98F9E] flex items-center justify-center bg-white text-[#C98F9E]">
              <mat-icon class="text-base">{{ char().flowerSymbol || 'local_florist' }}</mat-icon>
            </div>
            <div>
              <span class="text-xs font-serif text-[#8E7479] tracking-wider uppercase">{{ char().flowerTheme }}</span>
              <h2 id="char-modal-title" class="font-serif-vintage text-xl sm:text-2xl font-bold text-[#5B464B] leading-none">
                {{ char().name }}
              </h2>
            </div>
          </div>

          <!-- Close Modal Button -->
          <button
            type="button"
            (click)="closeModal()"
            class="w-8 h-8 rounded-full hover:bg-[#FBECEF] text-[#8E7479] hover:text-[#5B464B] flex items-center justify-center transition-colors cursor-pointer"
            title="Đóng cửa sổ"
          >
            <mat-icon>close</mat-icon>
          </button>
        </div>

        <!-- Scrollable Content Body -->
        <div class="p-6 sm:p-8 overflow-y-auto flex-1 paper-texture">
          
          <!-- Character Summary & Tags Bar -->
          <div class="mb-6 pb-5 border-b border-[#F0E2E5]">
            <div class="flex flex-wrap gap-1.5 mb-3">
              @for (tag of char().tags; track tag) {
                <span class="px-3 py-1 rounded-full text-xs font-medium bg-[#FFF7ED] text-[#78666A] border border-[#ECD9DE]">
                  #{{ tag }}
                </span>
              }
            </div>

            @if (char().accentQuote) {
              <p class="font-script-romantic text-lg sm:text-xl text-[#8A6770] italic mb-2">
                "{{ char().accentQuote }}"
              </p>
            }

            <p class="text-sm sm:text-base text-[#6E5A5E] leading-relaxed font-light">
              {{ char().summary }}
            </p>
          </div>

          <!-- Case 1: Character is Unlocked -> Full Plot Diary Display -->
          @if (isUnlocked()) {
            <div class="relative bg-white rounded-2xl p-6 sm:p-8 border border-[#E9D7DC] vintage-shadow-sm mb-6">
              <!-- Decorative corner ribbon/leaves -->
              <div class="flex items-center justify-between pb-4 mb-4 border-b border-[#F3E5E8]">
                <div class="flex items-center gap-2 text-xs font-serif text-[#476040]">
                  <mat-icon class="text-base text-[#7D9775]">menu_book</mat-icon>
                  <span class="font-medium tracking-wide">Trang Nhật Ký Cốt Truyện</span>
                </div>
                <div class="flex items-center gap-1 text-[11px] text-[#A69094] italic font-serif">
                  <mat-icon class="text-xs text-[#C98F9E]">favorite</mat-icon>
                  <span>Chương mở khóa</span>
                </div>
              </div>

              <!-- Unlocked Explanation Banner (if solved by quiz) -->
              @if (currentUnlockedData()?.unlockExplanation) {
                <div class="mb-5 p-3.5 rounded-xl bg-[#F4F9F2] border border-[#D5E6D1] text-xs text-[#42583C] flex items-start gap-2.5">
                  <mat-icon class="text-[#7D9775] text-base shrink-0 mt-0.5">verified</mat-icon>
                  <div>
                    <p class="font-medium">Chìa khóa đã kết nối tâm hồn:</p>
                    <p class="mt-0.5">{{ currentUnlockedData()?.unlockExplanation }}</p>
                  </div>
                </div>
              }

              <!-- The Full Plot Text with Preserved Linebreaks -->
              <div class="prose max-w-none text-sm sm:text-base text-[#5B464B] leading-relaxed whitespace-pre-line font-serif-vintage tracking-wide">
                {{ currentUnlockedData()?.plot || char().plot }}
              </div>

              <!-- Romantic Botanical Divider -->
              <div class="my-6 flex items-center justify-center gap-3 text-[#C98F9E]/60">
                <span class="w-16 h-px bg-[#EBCBD4]"></span>
                <mat-icon class="text-sm">local_florist</mat-icon>
                <span class="w-16 h-px bg-[#EBCBD4]"></span>
              </div>

              <!-- Action: Open Google AI Studio Chatbot Link -->
              <div class="flex flex-col items-center gap-2 pt-2">
                @if (googleStudioUrl()) {
                  <button
                    type="button"
                    (click)="openGoogleStudio()"
                    class="w-full sm:w-auto px-8 py-3.5 rounded-full text-base font-medium tracking-wide text-white bg-gradient-to-r from-[#C98F9E] to-[#B77A8A] hover:from-[#B77A8A] hover:to-[#A46575] shadow-md hover:shadow-lg transition-all transform active:scale-95 flex items-center justify-center gap-2.5 cursor-pointer"
                  >
                    <span>Mở GG AI</span>
                    <mat-icon class="text-lg">open_in_new</mat-icon>
                  </button>
                  <p class="text-xs text-[#9B8287] italic text-center">
                    Bấm để chuyển sang trò chuyện trực tiếp cùng nhân vật trên Google AI Studio
                  </p>
                } @else {
                  <div class="p-3 bg-[#FAF2F4] text-xs text-[#9A7D84] rounded-xl border border-[#F0DDE2]">
                    Nhân vật này chưa có liên kết chatbot.
                  </div>
                }
              </div>
            </div>
          }

          <!-- Case 2: Character is Locked -> Secret Envelope Quiz Box -->
          @else {
            <div class="relative bg-[#FAF5EE] rounded-3xl p-6 sm:p-8 border-2 border-dashed border-[#DCC3C9] vintage-shadow mb-4">
              
              <!-- Secret Letter Emblem Header -->
              <div class="text-center mb-6">
                <div class="w-14 h-14 mx-auto rounded-full bg-white border border-[#E0CBD0] flex items-center justify-center text-[#C98F9E] shadow-xs mb-3">
                  <mat-icon class="text-2xl">lock</mat-icon>
                </div>

                <h4 class="font-serif-vintage text-xl sm:text-2xl font-bold text-[#5B464B]">
                  Bí Mật Khóa Ký Ức
                </h4>
                <p class="text-xs sm:text-sm text-[#8E7479] mt-1 max-w-md mx-auto">
                  Cốt truyện của {{ char().name }} đang được khóa kín. Hãy trả lời câu hỏi bên dưới để giải mã chiếc chìa khóa hoa!
                </p>
              </div>

              <!-- The Quiz Question -->
              <div class="bg-white rounded-2xl p-5 border border-[#EBD6DC] shadow-xs mb-5">
                <div class="flex items-center gap-2 text-xs font-semibold text-[#C98F9E] mb-2 uppercase tracking-wider">
                  <mat-icon class="text-sm">quiz</mat-icon>
                  <span>Câu hỏi mở khóa:</span>
                </div>
                <p class="text-sm sm:text-base font-serif-vintage text-[#554347] font-medium leading-relaxed">
                  {{ char().lockQuestion || 'Ký ức đầu tiên giữa bạn và nhân vật là gì?' }}
                </p>
              </div>

              <!-- Answer Input & Submit Form -->
              <div class="flex flex-col gap-3">
                <div class="relative">
                  <input
                    type="text"
                    [formControl]="answerControl"
                    (keydown.enter)="checkAnswer()"
                    placeholder="Nhập câu trả lời mở khóa tại đây..."
                    class="w-full px-4 py-3 rounded-xl border-2 border-[#E3CDD2] bg-white text-sm sm:text-base text-[#5B464B] placeholder:text-[#A69094] focus:outline-none focus:border-[#C98F9E] shadow-2xs transition-colors"
                  />
                </div>

                <!-- Action Buttons: Check Answer & View Hint -->
                <div class="flex flex-col sm:flex-row gap-2.5">
                  <button
                    type="button"
                    (click)="checkAnswer()"
                    [disabled]="isVerifying() || !answerControl.value?.trim()"
                    class="flex-1 py-3 px-6 rounded-xl bg-[#C98F9E] hover:bg-[#B77A8A] text-white font-medium text-sm transition-all shadow-xs disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                  >
                    @if (isVerifying()) {
                      <mat-icon class="text-base animate-spin">refresh</mat-icon>
                      <span>Đang đối chiếu chìa khóa...</span>
                    } @else {
                      <mat-icon class="text-base">vpn_key</mat-icon>
                      <span>Kiểm tra đáp án</span>
                    }
                  </button>

                  <button
                    type="button"
                    (click)="toggleHint()"
                    class="py-3 px-4 rounded-xl border border-[#DDC6CC] hover:bg-white text-xs sm:text-sm font-medium text-[#78666A] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <mat-icon class="text-sm text-[#C98F9E]">lightbulb</mat-icon>
                    <span>{{ showHint() ? 'Ẩn gợi ý' : 'Xem gợi ý' }}</span>
                  </button>
                </div>

                <!-- Feedback Error Message -->
                @if (errorMessage()) {
                  <div class="p-3.5 rounded-xl bg-[#FFF0F2] border border-[#F3CCD2] text-xs sm:text-sm text-[#A64A5E] flex items-center gap-2 animate-shake">
                    <mat-icon class="text-base shrink-0">sentiment_dissatisfied</mat-icon>
                    <span>{{ errorMessage() }}</span>
                  </div>
                }

                <!-- Hint Content Display -->
                @if (showHint() && char().lockHint) {
                  <div class="p-4 rounded-xl bg-[#FFFDF5] border border-[#EFE2B8] text-xs sm:text-sm text-[#7D6B3C] animate-fade-in flex items-start gap-2.5">
                    <mat-icon class="text-base text-[#B39B4B] shrink-0 mt-0.5">tips_and_updates</mat-icon>
                    <div>
                      <span class="font-semibold">Gợi ý từ khu vườn:</span>
                      <p class="mt-0.5 italic">{{ char().lockHint }}</p>
                    </div>
                  </div>
                }
              </div>

              <!-- Success Blooming Animation Overlay -->
              @if (isBlooming()) {
                <div class="absolute inset-0 bg-white/95 rounded-3xl flex flex-col items-center justify-center p-6 text-center animate-fade-in z-20">
                  <div class="w-16 h-16 rounded-full bg-[#EBCBD4] flex items-center justify-center text-[#A65B6D] mb-3 animate-bounce">
                    <mat-icon class="text-3xl">local_florist</mat-icon>
                  </div>
                  <h3 class="font-serif-vintage text-2xl text-[#5B464B] font-bold">
                    Khóa Ký Ức Đã Mở!
                  </h3>
                  <p class="text-xs sm:text-sm text-[#7D9775] mt-1 font-medium">
                    Hoa đã nở rộ, trang cốt truyện đang mở ra trước mắt bạn...
                  </p>
                </div>
              }
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    @keyframes scaleUp {
      from {
        opacity: 0;
        transform: scale(0.95);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }
    .animate-scale-up {
      animation: scaleUp 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      20%, 60% { transform: translateX(-5px); }
      40%, 80% { transform: translateX(5px); }
    }
    .animate-shake {
      animation: shake 0.4s ease-in-out;
    }
  `],
})
export class CharacterDetailModal {
  readonly char = input.required<PublicCharacter>();
  readonly dismiss = output<void>();

  private charService = inject(CharacterService);
  private sound = inject(Sound);

  readonly answerControl = new FormControl('', [Validators.required]);
  readonly showHint = signal<boolean>(false);
  readonly isVerifying = signal<boolean>(false);
  readonly errorMessage = signal<string>('');
  readonly isBlooming = signal<boolean>(false);

  readonly isUnlocked = computed(() => {
    return this.charService.isCharacterUnlocked(this.char().id);
  });

  readonly currentUnlockedData = computed(() => {
    return this.charService.getCharacterUnlockedData(this.char().id);
  });

  readonly googleStudioUrl = computed(() => {
    const data = this.currentUnlockedData();
    return data?.googleStudioUrl || this.char().googleStudioUrl;
  });

  closeModal(): void {
    this.sound.playClick();
    this.dismiss.emit();
  }

  toggleHint(): void {
    this.sound.playChime();
    this.showHint.update((v) => !v);
  }

  checkAnswer(): void {
    const answer = this.answerControl.value?.trim();
    if (!answer) return;

    this.sound.playClick();
    this.isVerifying.set(true);
    this.errorMessage.set('');

    this.charService.verifyUnlock(this.char().id, answer).subscribe({
      next: (res) => {
        this.isVerifying.set(false);
        if (res.success) {
          // Play celebratory sound and trigger blooming animation
          this.sound.playUnlockSuccess();
          this.isBlooming.set(true);

          setTimeout(() => {
            this.isBlooming.set(false);
          }, 1400);
        } else {
          this.sound.playWrongAnswer();
          this.errorMessage.set(res.message || 'Hình như chiếc chìa khóa này chưa đúng rồi, thử lại nhé!');
        }
      },
      error: () => {
        this.isVerifying.set(false);
        this.sound.playWrongAnswer();
        this.errorMessage.set('Hình như chiếc chìa khóa này chưa đúng rồi, thử lại nhé!');
      },
    });
  }

  openGoogleStudio(): void {
    const url = this.googleStudioUrl();
    if (!url) return;

    this.sound.playClick();
    if (typeof window !== 'undefined') {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  }
}
