import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CharacterService } from '../../services/character';
import { Sound } from '../../services/sound';

@Component({
  selector: 'app-mailbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatIconModule, ReactiveFormsModule],
  template: `
    <section id="mailbox" class="relative max-w-4xl mx-auto px-4 sm:px-6 py-16 scroll-mt-20">
      
      <!-- Section Header -->
      <div class="text-center mb-10">
        <div class="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#EBCBD4]/40 border border-[#EBCBD4] text-[#A65B6D] text-xs font-serif tracking-widest uppercase mb-3">
          <mat-icon class="text-xs">mark_email_unread</mat-icon>
          <span>Góc Thư Trong Vườn</span>
          <mat-icon class="text-xs">mark_email_unread</mat-icon>
        </div>

        <h2 class="font-serif-vintage text-3xl sm:text-4xl md:text-5xl text-[#5B464B] font-bold tracking-tight">
          Hòm thư nhỏ của LOVE HAVE
        </h2>

        <p class="font-script-romantic text-xl sm:text-2xl text-[#8E7479] mt-2 max-w-lg mx-auto">
          Bạn có điều gì muốn gửi lại khu vườn này không?
        </p>
        <p class="text-xs text-[#A69094] mt-1 max-w-md mx-auto">
          Mỗi lời nhắn nhủ, cảm nghĩ về câu chuyện hay mong muốn nhân vật mới đều được nâng niu và chuyển thẳng đến chủ nhân khu vườn.
        </p>
      </div>

      <!-- Main Envelope Letter Desk -->
      <div class="relative bg-white/95 rounded-3xl p-6 sm:p-10 border border-[#EAD5DA] vintage-shadow-lg overflow-hidden">
        
        <!-- Lace pattern ribbon at top of parchment -->
        <div class="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-[#EBCBD4] via-[#D8CEE9] to-[#EBCBD4]"></div>

        @if (isSentSuccess()) {
          <!-- Success State: Sealed Envelope & Heartfelt Appreciation -->
          <div class="py-12 px-4 text-center flex flex-col items-center animate-fade-in">
            <!-- Sealed Vintage Envelope Illustration -->
            <div class="relative w-48 h-32 bg-[#FAF4ED] rounded-2xl border-2 border-[#D8C0C6] shadow-md flex items-center justify-center mb-6">
              <div class="w-12 h-12 rounded-full bg-[#C98F9E] text-white flex items-center justify-center shadow-sm">
                <mat-icon class="text-xl">favorite</mat-icon>
              </div>
              <!-- Stamp -->
              <div class="absolute top-2 right-2 w-8 h-10 border border-dashed border-[#C98F9E] rounded flex items-center justify-center">
                <mat-icon class="text-xs text-[#C98F9E]">local_florist</mat-icon>
              </div>
            </div>

            <h3 class="font-serif-vintage text-2xl sm:text-3xl text-[#5B464B] font-bold">
              Lá Thư Đã Được Gửi Đi!
            </h3>

            <p class="font-script-romantic text-xl text-[#A65B6D] mt-2">
              "Cảm ơn bạn đã để lại một nhành hoa dịu dàng trong khu vườn này..."
            </p>

            <p class="text-xs sm:text-sm text-[#78666A] max-w-md mt-2">
              Thư của bạn đã được lưu trữ an toàn trong hòm thư riêng của người tạo vườn. Những dòng tâm sự này sẽ không được công khai để bảo vệ sự riêng tư của bạn.
            </p>

            <button
              type="button"
              (click)="resetForm()"
              class="mt-6 px-6 py-2.5 rounded-full text-xs sm:text-sm font-medium border border-[#C98F9E] text-[#A65B6D] hover:bg-[#FDF2F4] transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <mat-icon class="text-sm">edit</mat-icon>
              <span>Viết thêm một lá thư khác</span>
            </button>
          </div>
        } @else {
          <!-- Letter Writing Form -->
          <form [formGroup]="letterForm" (ngSubmit)="onSubmitLetter()" class="flex flex-col gap-5">
            
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <!-- Nickname Field (Optional) -->
              <div class="flex flex-col gap-1.5">
                <label for="nickname" class="text-xs font-medium text-[#78666A] flex items-center gap-1">
                  <mat-icon class="text-sm text-[#C98F9E]">person_outline</mat-icon>
                  <span>Biệt danh của bạn (tùy chọn)</span>
                </label>
                <input
                  id="nickname"
                  type="text"
                  formControlName="nickname"
                  placeholder="Ví dụ: Người qua đường mộng mơ, Lữ khách..."
                  maxlength="50"
                  class="px-4 py-2.5 rounded-xl border border-[#E5D0D5] bg-[#FFFDF9] text-sm text-[#5B464B] placeholder:text-[#B59EA3] focus:outline-none focus:border-[#C98F9E] focus:ring-1 focus:ring-[#C98F9E] transition-all"
                />
              </div>

              <!-- Title Field (Required) -->
              <div class="flex flex-col gap-1.5">
                <label for="title" class="text-xs font-medium text-[#78666A] flex items-center gap-1">
                  <mat-icon class="text-sm text-[#C98F9E]">title</mat-icon>
                  <span>Tiêu đề lá thư <span class="text-[#C98F9E]">*</span></span>
                </label>
                <input
                  id="title"
                  type="text"
                  formControlName="title"
                  placeholder="Gửi một lời chào, góp ý hay chia sẻ cảm xúc..."
                  maxlength="120"
                  class="px-4 py-2.5 rounded-xl border border-[#E5D0D5] bg-[#FFFDF9] text-sm text-[#5B464B] placeholder:text-[#B59EA3] focus:outline-none focus:border-[#C98F9E] focus:ring-1 focus:ring-[#C98F9E] transition-all"
                />
                @if (letterForm.get('title')?.touched && letterForm.get('title')?.hasError('required')) {
                  <span class="text-[11px] text-[#A64A5E]">Vui lòng nhập tiêu đề bức thư.</span>
                }
              </div>
            </div>

            <!-- Content Field (Required) -->
            <div class="flex flex-col gap-1.5">
              <div class="flex items-center justify-between">
                <label for="content" class="text-xs font-medium text-[#78666A] flex items-center gap-1">
                  <mat-icon class="text-sm text-[#C98F9E]">border_color</mat-icon>
                  <span>Nội dung thư <span class="text-[#C98F9E]">*</span></span>
                </label>
                <span class="text-[11px] text-[#A69094]">
                  {{ contentCount() }} / 3000 ký tự
                </span>
              </div>
              <textarea
                id="content"
                rows="6"
                formControlName="content"
                placeholder="Hãy viết ra những điều trong lòng bạn. Khu vườn luôn lắng nghe..."
                maxlength="3000"
                class="px-4 py-3 rounded-2xl border border-[#E5D0D5] bg-[#FFFDF9] text-sm text-[#5B464B] placeholder:text-[#B59EA3] leading-relaxed focus:outline-none focus:border-[#C98F9E] focus:ring-1 focus:ring-[#C98F9E] transition-all"
              ></textarea>
              @if (letterForm.get('content')?.touched && letterForm.get('content')?.hasError('required')) {
                <span class="text-[11px] text-[#A64A5E]">Nội dung thư không được để trống.</span>
              }
              @if (letterForm.get('content')?.hasError('minlength')) {
                <span class="text-[11px] text-[#A64A5E]">Nội dung thư cần tối thiểu 5 ký tự.</span>
              }
            </div>

            <!-- Error Feedback if any -->
            @if (serverError()) {
              <div class="p-3.5 rounded-xl bg-[#FFF0F2] border border-[#F3CCD2] text-xs text-[#A64A5E] flex items-center gap-2">
                <mat-icon class="text-base shrink-0">error_outline</mat-icon>
                <span>{{ serverError() }}</span>
              </div>
            }

            <!-- Submit Button: "Gửi thư" -->
            <div class="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div class="flex items-center gap-1.5 text-xs text-[#9B8287] italic">
                <mat-icon class="text-xs text-[#C98F9E]">lock</mat-icon>
                <span>Thư gửi trực tiếp đến hộp thư riêng tư của chủ website.</span>
              </div>

              <button
                type="submit"
                [disabled]="isSubmitting() || letterForm.invalid"
                class="w-full sm:w-auto px-8 py-3 rounded-full bg-[#C98F9E] hover:bg-[#B77A8A] text-white text-sm font-medium tracking-wide shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                @if (isSubmitting()) {
                  <mat-icon class="text-base animate-spin">refresh</mat-icon>
                  <span>Đang dán tem gửi thư...</span>
                } @else {
                  <mat-icon class="text-base">send</mat-icon>
                  <span>Gửi thư</span>
                }
              </button>
            </div>
          </form>
        }
      </div>
    </section>
  `,
  styles: [`
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(6px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in {
      animation: fadeIn 0.4s ease-out forwards;
    }
  `],
})
export class MailboxSection {
  private charService = inject(CharacterService);
  private sound = inject(Sound);

  readonly letterForm = new FormGroup({
    nickname: new FormControl(''),
    title: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(120)]),
    content: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(3000)]),
  });

  readonly isSubmitting = signal<boolean>(false);
  readonly isSentSuccess = signal<boolean>(false);
  readonly serverError = signal<string>('');

  get contentCount(): () => number {
    return () => (this.letterForm.get('content')?.value || '').length;
  }

  onSubmitLetter(): void {
    if (this.letterForm.invalid) {
      this.letterForm.markAllAsTouched();
      return;
    }

    const val = this.letterForm.value;
    this.sound.playClick();
    this.isSubmitting.set(true);
    this.serverError.set('');

    this.charService.sendMail(val.nickname || '', val.title || '', val.content || '').subscribe({
      next: (res) => {
        this.isSubmitting.set(false);
        if (res.success) {
          this.sound.playSendMail();
          this.isSentSuccess.set(true);
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

  resetForm(): void {
    this.sound.playClick();
    this.letterForm.reset();
    this.isSentSuccess.set(false);
    this.serverError.set('');
  }
}
