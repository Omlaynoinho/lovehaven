import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Sound } from '../../services/sound';

@Component({
  selector: 'app-welcome-envelope',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatIconModule],
  template: `
    @if (isOpen()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs transition-opacity">
        <div class="relative w-full max-w-lg bg-gradient-to-br from-[#FFFDF9] via-[#FAF3ED] to-[#FFF7F9] rounded-3xl p-6 sm:p-9 border-2 border-[#E8D4D8] vintage-shadow-lg text-center overflow-hidden">
          
          <!-- Decorative Stamp & Ribbon -->
          <div class="absolute top-4 right-4 sm:top-6 sm:right-6 border-2 border-dashed border-[#C98F9E]/50 px-2.5 py-1.5 rounded-lg text-xs font-serif text-[#C98F9E] flex items-center gap-1 opacity-80">
            <mat-icon class="text-xs">local_florist</mat-icon>
            <span>LOVE HAVE</span>
          </div>

          <!-- Wax Seal Icon -->
          <div class="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-gradient-to-tr from-[#C98F9E] to-[#EBCBD4] border-2 border-white shadow-md flex items-center justify-center text-white mb-5">
            <mat-icon class="text-3xl sm:text-4xl">favorite</mat-icon>
          </div>

          <span class="text-xs font-serif uppercase tracking-widest text-[#A65B6D] font-semibold">
            Thư Chào Mừng Đến Với Khu Vườn
          </span>

          <h2 class="font-serif-vintage text-2xl sm:text-3xl font-bold text-[#5B464B] mt-1 mb-3">
            Chào Mừng Bạn Đến Với LOVE HAVE
          </h2>

          <p class="font-script-romantic text-lg sm:text-xl text-[#8E7479] mb-4">
            "Có một khu vườn nhỏ dịu dàng đang chờ bạn dạo bước..."
          </p>

          <div class="text-xs sm:text-sm text-[#6B555A] leading-relaxed space-y-2 mb-6 text-left bg-white/70 p-4 sm:p-5 rounded-2xl border border-[#F0DFE3]">
            <p>
              🌸 <strong>Khám phá thế giới nhân vật:</strong> Đọc thử cốt truyện và giải những câu đố nho nhỏ để mở khóa toàn bộ kịch bản.
            </p>
            <p>
              💬 <strong>Ghé thăm Google AI Studio:</strong> Nhấp vào nút trải nghiệm để trò chuyện trực tiếp cùng nhân vật trên nền tảng AI.
            </p>
            <p>
              💌 <strong>Hộp thư gửi gắm:</strong> Để lại những tâm tình, lời nhắn gửi hay tặng những đóa hoa thầm kín.
            </p>
            <p>
              🎨 <strong>Commission & TOS:</strong> Đặt sáng tác prompt nhân vật độc quyền theo ý tưởng của riêng bạn.
            </p>
          </div>

          <button
            type="button"
            (click)="onClose()"
            class="px-8 py-3 rounded-full bg-gradient-to-r from-[#C98F9E] to-[#A65B6D] hover:from-[#B77A8A] hover:to-[#924C5C] text-white text-xs sm:text-sm font-medium transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center gap-2 mx-auto active:scale-95"
          >
            <mat-icon class="text-sm">auto_stories</mat-icon>
            <span>Bắt đầu dạo bước vào vườn hoa</span>
          </button>
        </div>
      </div>
    }
  `,
})
export class WelcomeEnvelope {
  readonly sound = inject(Sound);
  readonly isOpen = input<boolean>(false);
  readonly closeEnvelope = output<void>();

  onClose(): void {
    this.sound.playPaper();
    this.closeEnvelope.emit();
  }
}
