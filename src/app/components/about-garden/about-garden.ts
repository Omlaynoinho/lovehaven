import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Sound } from '../../services/sound';

@Component({
  selector: 'app-about-garden',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatIconModule],
  template: `
    <section id="about" class="max-w-6xl mx-auto px-4 sm:px-6 py-16 scroll-mt-20">
      <div class="bg-gradient-to-br from-[#FFFDF9]/95 via-white/95 to-[#FCF4F6]/95 rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#E8D4D8] vintage-shadow relative overflow-hidden">
        
        <!-- Ambient Decor -->
        <div class="absolute -top-12 -left-12 w-48 h-48 bg-[#EBCBD4]/20 rounded-full blur-3xl pointer-events-none"></div>

        <div class="max-w-3xl mx-auto text-center mb-12">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF0E6] text-[#A65B6D] text-xs font-serif font-medium mb-3">
            <mat-icon class="text-xs">spa</mat-icon>
            <span>Giới Thiệu Khu Vườn</span>
          </div>

          <h2 class="font-serif-vintage text-3xl sm:text-4xl font-bold text-[#5B464B]">
            Về LOVE HAVE & Tác Giả Yue Yue
          </h2>

          <p class="font-script-romantic text-lg sm:text-xl text-[#8E7479] mt-2">
            "Nơi mỗi câu chuyện là một hạt mầm được chăm chút bằng tất cả dịu dàng và cảm xúc..."
          </p>

          <!-- Yue's Author Intro Note -->
          <div class="mt-5 p-5 sm:p-6 rounded-2xl bg-white/80 border border-[#E8D4D8] text-sm text-[#6B555A] leading-relaxed max-w-2xl mx-auto shadow-2xs font-serif text-center">
            <p>
              Yue hay viết char ngược là chủ yếu nhưng sẽ có vài char vui vẻ - hài hước, Yue chỉ tập trung tạo char Trung Quốc - Việt Nam thôi. Nên nếu có xuất hiện mấy char mà tên nước ngoài là Yue đang tập tành làm quen. Yue hay viết dựa trên audio, truyện tiểu thuyết và cảm nghĩ tự do.
            </p>
          </div>
        </div>

        <!-- 3 Feature Cards: Facebook, Discord, Commission -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          <!-- 1. Facebook Card -->
          <a
            href="https://www.facebook.com/qingyue224"
            target="_blank"
            rel="noopener noreferrer"
            (click)="onLinkClick()"
            class="group p-6 rounded-2xl bg-white/85 hover:bg-white border border-[#E4D2D7] hover:border-[#1877F2]/50 transition-all duration-300 hover:shadow-md flex flex-col justify-between cursor-pointer"
          >
            <div>
              <div class="flex items-center justify-between mb-4">
                <div class="w-12 h-12 rounded-2xl bg-[#1877F2]/10 text-[#1877F2] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </div>
                <span class="text-xs font-serif text-[#1877F2] flex items-center gap-1">
                  <span>Trang cá nhân</span>
                  <mat-icon class="text-xs">open_in_new</mat-icon>
                </span>
              </div>

              <h4 class="font-serif-vintage text-lg font-bold text-[#5B464B] group-hover:text-[#1877F2] transition-colors">
                Facebook: Yue Yue
              </h4>
              <p class="text-xs font-mono text-[#8E7479] mt-0.5 truncate">
                fb.com/qingyue224
              </p>
              <p class="text-xs text-[#78666A] mt-3 leading-relaxed">
                Kênh liên hệ chính thức, trao đổi trực tiếp về kịch bản, nhận phản hồi và cập nhật tiến độ commission.
              </p>
            </div>

            <div class="mt-5 pt-3 border-t border-[#F3E5E8] flex items-center gap-1 text-xs font-medium text-[#1877F2]">
              <span>Ghé thăm Facebook</span>
              <mat-icon class="text-xs">arrow_forward</mat-icon>
            </div>
          </a>

          <!-- 2. Discord Link Card -->
          <a
            href="https://discord.gg/bbtXfxp48"
            target="_blank"
            rel="noopener noreferrer"
            (click)="onLinkClick()"
            class="group p-6 rounded-2xl bg-white/85 hover:bg-white border border-[#E4D2D7] hover:border-[#5865F2]/50 transition-all duration-300 hover:shadow-md flex flex-col justify-between cursor-pointer"
          >
            <div>
              <div class="flex items-center justify-between mb-4">
                <div class="w-12 h-12 rounded-2xl bg-[#5865F2]/10 text-[#5865F2] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                  </svg>
                </div>
                <span class="text-xs font-serif text-[#9A84B8] flex items-center gap-1 group-hover:text-[#5865F2]">
                  <span>Tham gia server</span>
                  <mat-icon class="text-xs">open_in_new</mat-icon>
                </span>
              </div>

              <h4 class="font-serif-vintage text-lg font-bold text-[#5B464B] group-hover:text-[#5865F2] transition-colors">
                Liên kết Discord
              </h4>
              <p class="text-xs font-mono text-[#8E7479] mt-0.5 truncate">
                discord.gg/bbtXfxp48
              </p>
              <p class="text-xs text-[#78666A] mt-3 leading-relaxed">
                Máy chủ cộng đồng chính thức: giao lưu chia sẻ trải nghiệm nhập vai, thảo luận kịch bản và nhận thông báo bot mới.
              </p>
            </div>

            <div class="mt-5 pt-3 border-t border-[#F3E5E8] flex items-center gap-1 text-xs font-medium text-[#5865F2]">
              <span>Tham gia Discord</span>
              <mat-icon class="text-xs">arrow_forward</mat-icon>
            </div>
          </a>

          <!-- 3. Commission Service Button Card -->
          <button
            type="button"
            (click)="scrollToCommission()"
            class="group text-left p-6 rounded-2xl bg-gradient-to-br from-[#FFF7F9] to-white hover:from-[#FDF0F3] hover:to-white border border-[#EBCBD4] hover:border-[#C98F9E] transition-all duration-300 hover:shadow-md flex flex-col justify-between cursor-pointer w-full"
          >
            <div>
              <div class="flex items-center justify-between mb-4">
                <div class="w-12 h-12 rounded-2xl bg-[#EBCBD4]/40 text-[#A65B6D] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <mat-icon class="text-2xl text-[#C98F9E]">palette</mat-icon>
                </div>
                <span class="text-xs font-serif text-[#C98F9E] flex items-center gap-1 bg-white/80 px-2.5 py-0.5 rounded-full border border-[#EBCBD4]">
                  <mat-icon class="text-[11px]">auto_fix_high</mat-icon>
                  <span>Mở nhận đơn</span>
                </span>
              </div>

              <div class="text-[11px] uppercase font-serif tracking-widest text-[#A65B6D] font-bold mb-1">
                Ôm Lấy Nỗi Nhớ Của Yue Yue
              </div>
              <h4 class="font-serif-vintage text-lg font-bold text-[#5B464B] group-hover:text-[#A65B6D] transition-colors">
                PRICE & TOS Commission
              </h4>
              <p class="text-xs font-mono text-[#8E7479] mt-0.5 truncate">
                5 gói giá • 7 phụ phí • 10 Điều khoản TOS
              </p>
              <p class="text-xs text-[#78666A] mt-3 leading-relaxed">
                Nhận sáng tác character độc quyền, thiết kế bối cảnh, prompt engineering chuyên sâu cho Google AI Studio, SillyTavern, JanitorAI theo yêu cầu.
              </p>
            </div>

            <div class="mt-5 pt-3 border-t border-[#F3E5E8] flex items-center justify-between w-full">
              <span class="text-xs font-medium text-[#C98F9E] group-hover:text-[#A65B6D] flex items-center gap-1">
                <span>Khám phá bảng giá & TOS</span>
                <mat-icon class="text-xs">arrow_downward</mat-icon>
              </span>
              <span class="text-[11px] uppercase font-serif tracking-wider text-[#A65B6D] bg-[#FFF0F3] border border-[#EBCBD4] px-2.5 py-0.5 rounded-full font-bold">
                Chỉ từ 60k
              </span>
            </div>
          </button>
        </div>

        <!-- How to enjoy section -->
        <div class="pt-8 border-t border-[#F0DFE3]">
          <h3 class="font-serif-vintage text-xl font-bold text-[#5B464B] mb-5 flex items-center gap-2">
            <mat-icon class="text-base text-[#9A84B8]">explore</mat-icon>
            <span>Cách Thưởng Thức Khu Vườn LOVE HAVE</span>
          </h3>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="p-5 rounded-2xl bg-white/75 border border-[#ECD9DE] flex flex-col gap-2">
              <div class="w-9 h-9 rounded-full bg-[#EBCBD4]/50 text-[#A65B6D] flex items-center justify-center">
                <mat-icon class="text-base">travel_explore</mat-icon>
              </div>
              <h4 class="font-serif-vintage font-bold text-[#5B464B] text-base">
                1. Khám Phá Cốt Truyện
              </h4>
              <p class="text-xs text-[#78666A] leading-relaxed">
                Dạo bước qua các loài hoa, đọc trích đoạn mở màn và tìm kiếm câu chuyện đồng điệu với tâm trạng của bạn hôm nay.
              </p>
            </div>

            <div class="p-5 rounded-2xl bg-white/75 border border-[#ECD9DE] flex flex-col gap-2">
              <div class="w-9 h-9 rounded-full bg-[#D8CEE9]/50 text-[#7D6B9A] flex items-center justify-center">
                <mat-icon class="text-base">vpn_key</mat-icon>
              </div>
              <h4 class="font-serif-vintage font-bold text-[#5B464B] text-base">
                2. Giải Đố Mở Khóa
              </h4>
              <p class="text-xs text-[#78666A] leading-relaxed">
                Mỗi nhân vật mang một bí mật riêng. Lắng nghe câu hỏi và tìm ra chiếc chìa khóa hoa để mở trọn vẹn chương nhật ký.
              </p>
            </div>

            <div class="p-5 rounded-2xl bg-white/75 border border-[#ECD9DE] flex flex-col gap-2">
              <div class="w-9 h-9 rounded-full bg-[#B8C8B0]/50 text-[#4E6746] flex items-center justify-center">
                <mat-icon class="text-base">forum</mat-icon>
              </div>
              <h4 class="font-serif-vintage font-bold text-[#5B464B] text-base">
                3. Trò Chuyện Trực Tiếp
              </h4>
              <p class="text-xs text-[#78666A] leading-relaxed">
                Nhấn nút "Mở Google AI Studio" để chuyển sang không gian chính thức và bắt đầu cuộc đối thoại độc nhất vô nhị.
              </p>
            </div>
          </div>
        </div>

        <!-- Footer Notice -->
        <div class="mt-10 pt-6 border-t border-[#F2E5E8] flex flex-col sm:flex-row items-center justify-between text-xs text-[#9B8287] gap-3">
          <p>
            Tất cả nhân vật và kịch bản đều là tác phẩm sáng tạo cá nhân thuộc bản quyền thế giới LOVE HAVE.
          </p>
          <div class="flex items-center gap-1.5 font-serif">
            <mat-icon class="text-xs text-[#C98F9E]">favorite</mat-icon>
            <span>LOVE HAVE © 2026. Made with tenderness.</span>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class AboutGarden {
  readonly sound = inject(Sound);

  onLinkClick(): void {
    this.sound.playClick();
  }

  scrollToCommission(): void {
    this.sound.playClick();
    if (typeof document !== 'undefined') {
      const el = document.querySelector('#commission');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
}
