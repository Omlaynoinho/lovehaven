import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { CharacterService } from '../../services/character';
import { Sound } from '../../services/sound';

@Component({
  selector: 'app-mailbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatIconModule, ReactiveFormsModule],
  template: `
    <section id="mailbox" class="relative max-w-5xl mx-auto px-4 sm:px-6 py-16 scroll-mt-20">
      
      <!-- Section Header -->
      <div class="text-center mb-10">
        <div class="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#EBCBD4]/40 border border-[#EBCBD4] text-[#A65B6D] text-xs font-serif tracking-widest uppercase mb-3">
          <mat-icon class="text-xs">mark_email_unread</mat-icon>
          <span>Hộp Thư Công Khai</span>
          <mat-icon class="text-xs">mark_email_unread</mat-icon>
        </div>

        <h2 class="font-serif-vintage text-3xl sm:text-4xl md:text-5xl text-[#5B464B] font-bold tracking-tight">
          Hòm thư nhỏ của LOVE HAVE
        </h2>

        <p class="font-script-romantic text-xl sm:text-2xl text-[#8E7479] mt-2 max-w-lg mx-auto">
          Những dòng thư và cảm xúc được gửi gắm công khai giữa khu vườn...
        </p>

        <!-- Total Senders Count Badge -->
        <div class="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-[#E8D4D8] vintage-shadow-sm text-xs sm:text-sm text-[#5B464B] font-medium">
          <mat-icon class="text-base text-[#C98F9E]">mark_email_read</mat-icon>
          <span>Hiện có <strong class="text-[#A65B6D] font-bold text-sm sm:text-base">{{ charService.totalSenders() }}</strong> người gửi thư vào khu vườn</span>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        <!-- CỘT 1: FORM GỬI THƯ (5 COLS ON LG) -->
        <div class="lg:col-span-5 bg-white/95 rounded-3xl p-6 sm:p-7 border border-[#EAD5DA] vintage-shadow-lg relative overflow-hidden">
          <div class="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#EBCBD4] via-[#D8CEE9] to-[#EBCBD4]"></div>

          <div class="flex items-center justify-between pb-3 mb-4 border-b border-[#F2E5E8]">
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded-full bg-[#FAF0E6] flex items-center justify-center text-[#C98F9E]">
                <mat-icon class="text-base">edit_note</mat-icon>
              </div>
              <div>
                <h3 class="font-serif-vintage font-bold text-lg text-[#5B464B]">Viết Thư Mới</h3>
                <span class="text-[11px] text-[#A69094]">Thư sẽ được hiển thị công khai</span>
              </div>
            </div>
          </div>

          <form [formGroup]="letterForm" (ngSubmit)="onSubmitLetter()" class="flex flex-col gap-4">
            
            <!-- 1. Biệt danh (tùy chọn) -->
            <div class="flex flex-col gap-1">
              <label for="mailbox-nickname" class="text-xs font-medium text-[#78666A] flex items-center gap-1">
                <mat-icon class="text-sm text-[#C98F9E]">person_outline</mat-icon>
                <span>Biệt danh (tùy chọn)</span>
              </label>
              <input
                id="mailbox-nickname"
                type="text"
                formControlName="nickname"
                placeholder="Ví dụ: Người qua đường, Mộng mơ..."
                maxlength="50"
                class="px-3.5 py-2.5 rounded-xl border border-[#E5D0D5] bg-[#FFFDF9] text-sm text-[#5B464B] placeholder:text-[#B59EA3] focus:outline-none focus:border-[#C98F9E] focus:ring-1 focus:ring-[#C98F9E] transition-all"
              />
            </div>

            <!-- 2. Tiêu đề (tùy chọn) -->
            <div class="flex flex-col gap-1">
              <label for="mailbox-title" class="text-xs font-medium text-[#78666A] flex items-center gap-1">
                <mat-icon class="text-sm text-[#C98F9E]">title</mat-icon>
                <span>Tiêu đề (tùy chọn)</span>
              </label>
              <input
                id="mailbox-title"
                type="text"
                formControlName="title"
                placeholder="Ví dụ: Lời nhắn gửi khu vườn..."
                maxlength="120"
                class="px-3.5 py-2.5 rounded-xl border border-[#E5D0D5] bg-[#FFFDF9] text-sm text-[#5B464B] placeholder:text-[#B59EA3] focus:outline-none focus:border-[#C98F9E] focus:ring-1 focus:ring-[#C98F9E] transition-all"
              />
            </div>

            <!-- 3. Nội dung (bắt buộc) -->
            <div class="flex flex-col gap-1">
              <div class="flex items-center justify-between">
                <label for="mailbox-content" class="text-xs font-medium text-[#78666A] flex items-center gap-1">
                  <mat-icon class="text-sm text-[#C98F9E]">border_color</mat-icon>
                  <span>Nội dung thư <span class="text-[#C98F9E]">*</span></span>
                </label>
                <span class="text-[10px] text-[#A69094]">
                  {{ contentCount() }} / 3000 ký tự
                </span>
              </div>
              <textarea
                id="mailbox-content"
                rows="5"
                formControlName="content"
                placeholder="Gửi một lời nhắn nhủ, cảm xúc hay điều bạn muốn nói..."
                maxlength="3000"
                (keydown.control.enter)="onSubmitLetter()"
                (keydown.meta.enter)="onSubmitLetter()"
                class="px-3.5 py-2.5 rounded-xl border border-[#E5D0D5] bg-[#FFFDF9] text-sm text-[#5B464B] placeholder:text-[#B59EA3] leading-relaxed focus:outline-none focus:border-[#C98F9E] focus:ring-1 focus:ring-[#C98F9E] transition-all"
              ></textarea>
            </div>

            <!-- Error message if any -->
            @if (serverError()) {
              <div class="p-3 rounded-xl bg-[#FFF0F2] border border-[#F3CCD2] text-xs text-[#A64A5E] flex items-center gap-2">
                <mat-icon class="text-sm shrink-0">error_outline</mat-icon>
                <span>{{ serverError() }}</span>
              </div>
            }

            <!-- Success notification banner -->
            @if (successMessage()) {
              <div class="p-3 rounded-xl bg-[#F4F9F2] border border-[#D5E6D1] text-xs text-[#42583C] flex items-center gap-2 animate-fade-in">
                <mat-icon class="text-sm text-[#7D9775] shrink-0">check_circle</mat-icon>
                <span>{{ successMessage() }}</span>
              </div>
            }

            <!-- 4. Nút Gửi thư -->
            <button
              type="submit"
              [disabled]="isSubmitting()"
              class="w-full mt-1 py-3 px-6 rounded-full bg-[#C98F9E] hover:bg-[#B77A8A] text-white text-sm font-medium tracking-wide shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              @if (isSubmitting()) {
                <mat-icon class="text-base animate-spin">refresh</mat-icon>
                <span>Đang gửi thư...</span>
              } @else {
                <mat-icon class="text-base">send</mat-icon>
                <span>Gửi thư</span>
              }
            </button>
          </form>
        </div>

        <!-- CỘT 2: DANH SÁCH NGƯỜI GỬI & LÁ THƯ (7 COLS ON LG) -->
        <div class="lg:col-span-7 flex flex-col gap-4">
          <div class="flex items-center justify-between pb-2 border-b border-[#EBCBD4]/60">
            <div class="flex items-center gap-2">
              <mat-icon class="text-base text-[#C98F9E]">all_inbox</mat-icon>
              <h3 class="font-serif-vintage font-bold text-xl text-[#5B464B]">Danh Sách Người Gửi</h3>
            </div>
            <span class="text-xs text-[#8E7479] font-medium font-serif">
              {{ charService.publicLetters().length }} lá thư đã gửi
            </span>
          </div>

          <!-- Letters List Display -->
          @if (charService.publicLetters().length > 0) {
            <div class="flex flex-col gap-3.5 max-h-[640px] overflow-y-auto pr-1">
              @for (letter of charService.publicLetters(); track letter.id) {
                <article class="bg-white/90 rounded-2xl p-5 border border-[#E9D6DC] vintage-shadow-sm hover:vintage-shadow transition-all relative overflow-hidden group">
                  
                  <!-- Top Postal Header of Each Letter -->
                  <div class="flex items-start justify-between gap-3 mb-2.5">
                    <div class="flex items-center gap-2">
                      <div class="w-7 h-7 rounded-full bg-[#FAF0E6] border border-[#E8D4D8] flex items-center justify-center text-[#A65B6D]">
                        <mat-icon class="text-xs">local_florist</mat-icon>
                      </div>
                      <div>
                        <h4 class="font-serif-vintage font-bold text-sm text-[#5B464B]">
                          {{ letter.nickname || 'Người lữ khách vô danh' }}
                        </h4>
                        <time class="text-[10px] text-[#A69094] block">
                          {{ formatDate(letter.createdAt) }}
                        </time>
                      </div>
                    </div>

                    <!-- Small Vintage Postage Stamp Visual -->
                    <div class="w-7 h-9 border border-dashed border-[#C98F9E] rounded flex items-center justify-center bg-[#FFFDF9] text-[#C98F9E] opacity-70 shrink-0">
                      <mat-icon class="text-[11px]">mail</mat-icon>
                    </div>
                  </div>

                  <!-- Letter Title -->
                  <h5 class="font-serif-vintage text-base font-semibold text-[#6E4F56] mb-1.5">
                    {{ letter.title }}
                  </h5>

                  <!-- Letter Content -->
                  <p class="text-xs sm:text-sm text-[#665457] leading-relaxed whitespace-pre-line font-light">
                    {{ letter.content }}
                  </p>
                </article>
              }
            </div>
          } @else {
            <!-- Empty state when no letters sent yet -->
            <div class="py-16 px-6 text-center bg-white/70 rounded-3xl border border-dashed border-[#E5D0D5] flex flex-col items-center">
              <div class="w-12 h-12 rounded-full bg-[#FAF0E6] flex items-center justify-center text-[#C98F9E] mb-3">
                <mat-icon class="text-2xl">mail_outline</mat-icon>
              </div>
              <h4 class="font-serif-vintage text-lg font-bold text-[#5B464B]">
                Chưa có lá thư nào được gửi
              </h4>
              <p class="text-xs text-[#8E7479] mt-1 max-w-xs">
                Hãy là người đầu tiên để lại một lá thư dịu dàng trong hòm thư của khu vườn nhé!
              </p>
            </div>
          }
        </div>

      </div>
    </section>
  `,
  styles: [`
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(4px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in {
      animation: fadeIn 0.3s ease-out forwards;
    }
  `],
})
export class MailboxSection {
  readonly charService = inject(CharacterService);
  private sound = inject(Sound);

  readonly letterForm = new FormGroup({
    nickname: new FormControl(''),
    title: new FormControl(''),
    content: new FormControl(''),
  });

  readonly isSubmitting = signal<boolean>(false);
  readonly serverError = signal<string>('');
  readonly successMessage = signal<string>('');

  get contentCount(): () => number {
    return () => (this.letterForm.get('content')?.value || '').length;
  }

  formatDate(isoString: string): string {
    if (!isoString) return '';
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return isoString;
    }
  }

  onSubmitLetter(): void {
    const val = this.letterForm.value;
    const contentText = (val.content || '').trim();

    if (!contentText) {
      this.sound.playWrongAnswer();
      this.serverError.set('Vui lòng nhập nội dung thư trước khi bấm Gửi thư nhé!');
      return;
    }

    this.sound.playClick();
    this.isSubmitting.set(true);
    this.serverError.set('');
    this.successMessage.set('');

    const titleText = (val.title || '').trim();

    this.charService.sendMail(val.nickname || '', titleText, contentText).subscribe({
      next: (res) => {
        this.isSubmitting.set(false);
        if (res.success) {
          this.sound.playSendMail();
          this.successMessage.set('Lá thư đã được gửi công khai thành công vào danh sách!');
          this.letterForm.reset();

          // Clear success banner after 4s
          setTimeout(() => {
            this.successMessage.set('');
          }, 4000);
        } else {
          this.sound.playWrongAnswer();
          this.serverError.set(res.message);
        }
      },
      error: () => {
        this.isSubmitting.set(false);
        this.sound.playWrongAnswer();
        this.serverError.set('Không thể kết nối đến máy chủ. Vui lòng thử lại sau giây lát!');
      },
    });
  }
}
