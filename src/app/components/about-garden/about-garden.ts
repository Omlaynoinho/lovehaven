import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Sound } from '../../services/sound';

@Component({
  selector: 'app-about-garden',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatIconModule],
  template: `
    <section id="about" class="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14 scroll-mt-20 animate-fadeIn">
      <div class="bg-gradient-to-br from-[#FFFDF9]/98 via-white/95 to-[#FCF4F6]/98 rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#F0BAC8]/80 vintage-shadow relative overflow-hidden space-y-10">
        
        <!-- Ambient Decor Glow -->
        <div class="absolute -top-12 -left-12 w-56 h-56 bg-[#FFD1DC]/25 rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute -bottom-12 -right-12 w-56 h-56 bg-[#FBE4E9]/30 rounded-full blur-3xl pointer-events-none"></div>

        <!-- 1. Header with Coquette Bow & Angels Accent -->
        <div class="max-w-2xl mx-auto text-center relative z-10">
          <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF0E6] text-[#A65B6D] text-xs font-serif font-medium mb-3 shadow-2xs border border-[#ECD9DE]">
            <span>꒰ა ♡ ໒꒱</span>
            <span class="tracking-wide">ABOUT AUTHOR</span>
            <span>꒰ა ♡ ໒꒱</span>
          </div>

          <h2 class="font-serif-vintage text-3xl sm:text-4xl lg:text-5xl font-bold text-[#5B464B] tracking-tight">
            Ôm Lấy Nỗi Nhớ Của Yue Yue
          </h2>

          <p class="font-script-romantic text-xl sm:text-2xl text-[#8E7479] mt-2">
            "Nơi mỗi câu chuyện là một hạt mầm được chăm chút bằng tất cả dịu dàng và cảm xúc..."
          </p>
        </div>

        <!-- 2. PERSONAL INFORMATION CARD -->
        <div class="p-6 sm:p-8 rounded-3xl bg-white/90 border border-[#F0BAC8]/75 vintage-shadow relative overflow-hidden">
          <div class="flex items-center justify-center gap-2 mb-6">
            <span class="text-sm text-[#C98F9E]">꒰ა ♡ ໒꒱</span>
            <h3 class="font-serif-vintage text-lg sm:text-xl font-bold text-[#5B464B] tracking-wider uppercase">
              PERSONAL INFORMATION
            </h3>
            <span class="text-sm text-[#C98F9E]">꒰ა ♡ ໒꒱</span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 font-serif">
            
            <!-- Tên gọi -->
            <div class="p-4 rounded-2xl bg-[#FFF9FA] border border-[#F3D7DF] flex items-center gap-3">
              <span class="text-base text-[#C98F9E] shrink-0">୨୧</span>
              <div>
                <div class="text-[11px] text-[#9E8288] uppercase tracking-wider">Tên gọi</div>
                <div class="text-xs sm:text-sm font-bold text-[#5B464B]">Ôm Lấy Nỗi Nhớ Của Yue Yue</div>
              </div>
            </div>

            <!-- Biệt danh -->
            <div class="p-4 rounded-2xl bg-[#FFF9FA] border border-[#F3D7DF] flex items-center gap-3">
              <span class="text-base text-[#C98F9E] shrink-0">୨୧</span>
              <div>
                <div class="text-[11px] text-[#9E8288] uppercase tracking-wider">Biệt danh</div>
                <div class="text-xs sm:text-sm font-bold text-[#5B464B]">Yue Yue</div>
              </div>
            </div>

            <!-- Ngày sinh -->
            <div class="p-4 rounded-2xl bg-[#FFF9FA] border border-[#F3D7DF] flex items-center gap-3">
              <span class="text-base text-[#C98F9E] shrink-0">୨୧</span>
              <div>
                <div class="text-[11px] text-[#9E8288] uppercase tracking-wider">Ngày sinh</div>
                <div class="text-xs sm:text-sm font-bold text-[#5B464B]">21/10</div>
              </div>
            </div>

            <!-- Tuổi -->
            <div class="p-4 rounded-2xl bg-[#FFF9FA] border border-[#F3D7DF] flex items-center gap-3">
              <span class="text-base text-[#C98F9E] shrink-0">୨୧</span>
              <div>
                <div class="text-[11px] text-[#9E8288] uppercase tracking-wider">Tuổi</div>
                <div class="text-xs sm:text-sm font-bold text-[#5B464B]">20+</div>
              </div>
            </div>

            <!-- Cung hoàng đạo -->
            <div class="p-4 rounded-2xl bg-[#FFF9FA] border border-[#F3D7DF] flex items-center gap-3 sm:col-span-2 lg:col-span-2">
              <span class="text-base text-[#C98F9E] shrink-0">୨୧</span>
              <div>
                <div class="text-[11px] text-[#9E8288] uppercase tracking-wider">Cung hoàng đạo</div>
                <div class="text-xs sm:text-sm font-bold text-[#5B464B] flex items-center gap-1.5">
                  <span>Thiên Bình</span>
                  <span class="text-[#A65B6D] text-xs font-normal">♎ (Libra)</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        <!-- 3. A LITTLE ABOUT ME CARD -->
        <div class="p-6 sm:p-8 rounded-3xl bg-white/90 border border-[#F0BAC8]/75 vintage-shadow space-y-6">
          <div class="text-center">
            <span class="text-sm text-[#C98F9E]">˚₊‧꒰ა</span>
            <h3 class="inline font-serif-vintage text-lg sm:text-xl font-bold text-[#5B464B] tracking-wider uppercase mx-2">
              A LITTLE ABOUT ME
            </h3>
            <span class="text-sm text-[#C98F9E]">໒꒱‧₊˚</span>
          </div>

          <!-- Main paragraph -->
          <div class="p-5 sm:p-6 rounded-2xl bg-[#FFFDFB] border border-[#F3D7DF] text-xs sm:text-sm text-[#665055] leading-relaxed font-serif text-center max-w-3xl mx-auto shadow-2xs">
            <p>
              Yue hay viết char ngược là chủ yếu nhưng sẽ có vài char vui vẻ - hài hước, Yue chỉ tập trung tạo char Trung Quốc - Việt Nam thôi. Nên nếu có xuất hiện mấy char mà tên nước ngoài là Yue đang tập tành làm quen. Yue hay viết dựa trên audio, truyện tiểu thuyết và cảm nghĩ tự do.
            </p>
          </div>

          <!-- Preferences 3 cards (Sở thích, Yêu thích, Không thích) -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 font-serif text-center">
            
            <!-- Sở thích -->
            <div class="p-5 rounded-2xl bg-[#FFF9FA] border border-[#F0BAC8]/70 hover:border-[#C98F9E] transition-colors shadow-2xs">
              <div class="text-lg text-[#C98F9E] mb-1">♡</div>
              <div class="text-xs uppercase tracking-wider text-[#9E8288] font-bold mb-1">Sở thích</div>
              <div class="text-sm font-bold text-[#5B464B]">Viết char ngược</div>
            </div>

            <!-- Yêu thích -->
            <div class="p-5 rounded-2xl bg-[#FFF9FA] border border-[#F0BAC8]/70 hover:border-[#C98F9E] transition-colors shadow-2xs">
              <div class="text-lg text-[#FF6584] mb-1">♡</div>
              <div class="text-xs uppercase tracking-wider text-[#9E8288] font-bold mb-1">Yêu thích</div>
              <div class="text-sm font-bold text-[#5B464B]">Yêu quý các nàng</div>
            </div>

            <!-- Không thích -->
            <div class="p-5 rounded-2xl bg-[#FFF9FA] border border-[#F0BAC8]/70 hover:border-[#C98F9E] transition-colors shadow-2xs">
              <div class="text-lg text-[#8E7479] mb-1">♡</div>
              <div class="text-xs uppercase tracking-wider text-[#9E8288] font-bold mb-1">Không thích</div>
              <div class="text-sm font-bold text-[#5B464B]">Không được feedback</div>
            </div>

          </div>
        </div>

        <!-- 4. MY CONTACT CHANNELS -->
        <div class="p-6 sm:p-8 rounded-3xl bg-white/90 border border-[#F0BAC8]/75 vintage-shadow space-y-6">
          <div class="text-center">
            <span class="text-sm text-[#C98F9E]">୨୧</span>
            <h3 class="inline font-serif-vintage text-lg sm:text-xl font-bold text-[#5B464B] tracking-wider uppercase mx-2">
              MY CONTACT
            </h3>
            <span class="text-sm text-[#C98F9E]">୨୧</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
            
            <!-- 1. Facebook Link -->
            <a
              href="https://www.facebook.com/qingyue224"
              target="_blank"
              rel="noopener noreferrer"
              (click)="onLinkClick()"
              class="group p-5 rounded-2xl bg-[#FFF9FA] hover:bg-white border border-[#E9D5DA] hover:border-[#1877F2]/60 transition-all duration-300 hover:shadow-md flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div class="flex items-center justify-between mb-3">
                  <div class="w-10 h-10 rounded-xl bg-[#1877F2]/10 text-[#1877F2] flex items-center justify-center group-hover:scale-105 transition-transform">
                    <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </div>
                  <span class="text-xs text-[#1877F2] flex items-center gap-1 font-serif">
                    <span>Mở link</span>
                    <mat-icon class="text-xs">open_in_new</mat-icon>
                  </span>
                </div>

                <div class="flex items-center gap-1.5 text-sm font-bold text-[#5B464B] group-hover:text-[#1877F2] transition-colors">
                  <span class="text-[#C98F9E]">𐙚</span>
                  <span>Facebook</span>
                </div>
                <p class="text-xs font-mono text-[#8E7479] mt-0.5 truncate">
                  fb.com/qingyue224
                </p>
                <p class="text-xs text-[#78666A] mt-2.5 leading-relaxed font-serif">
                  Nhắn tin trao đổi kịch bản, cốt truyện và đặt commission trực tiếp.
                </p>
              </div>

              <div class="mt-4 pt-3 border-t border-[#F2E5E8] flex items-center gap-1 text-xs font-medium text-[#1877F2]">
                <span>Ghé thăm trang Facebook</span>
                <mat-icon class="text-xs">arrow_forward</mat-icon>
              </div>
            </a>

            <!-- 2. Discord Link (Updated) -->
            <a
              href="https://discord.gg/FCwQ56R6y"
              target="_blank"
              rel="noopener noreferrer"
              (click)="onLinkClick()"
              class="group p-5 rounded-2xl bg-[#FFF9FA] hover:bg-white border border-[#E9D5DA] hover:border-[#5865F2]/60 transition-all duration-300 hover:shadow-md flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div class="flex items-center justify-between mb-3">
                  <div class="w-10 h-10 rounded-xl bg-[#5865F2]/10 text-[#5865F2] flex items-center justify-center group-hover:scale-105 transition-transform">
                    <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.894a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                    </svg>
                  </div>
                  <span class="text-xs text-[#5865F2] flex items-center gap-1 font-serif">
                    <span>Tham gia server</span>
                    <mat-icon class="text-xs">open_in_new</mat-icon>
                  </span>
                </div>

                <div class="flex items-center gap-1.5 text-sm font-bold text-[#5B464B] group-hover:text-[#5865F2] transition-colors">
                  <span class="text-[#C98F9E]">𐙚</span>
                  <span>Discord</span>
                </div>
                <p class="text-xs font-mono text-[#8E7479] mt-0.5 truncate">
                  discord.gg/FCwQ56R6y
                </p>
                <p class="text-xs text-[#78666A] mt-2.5 leading-relaxed font-serif">
                  Máy chủ cộng đồng: giao lưu, thảo luận và nhận thông báo bot mới nhất.
                </p>
              </div>

              <div class="mt-4 pt-3 border-t border-[#F2E5E8] flex items-center gap-1 text-xs font-medium text-[#5865F2]">
                <span>Tham gia Discord</span>
                <mat-icon class="text-xs">arrow_forward</mat-icon>
              </div>
            </a>

            <!-- 3. NGL Letter Link (New) -->
            <a
              href="https://ngl.link/omlaynoinho1"
              target="_blank"
              rel="noopener noreferrer"
              (click)="onLinkClick()"
              class="group p-5 rounded-2xl bg-gradient-to-br from-[#FFF5F7] to-white hover:from-[#FDEEF2] hover:to-white border border-[#F0BAC8] hover:border-[#C98F9E] transition-all duration-300 hover:shadow-md flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div class="flex items-center justify-between mb-3">
                  <div class="w-10 h-10 rounded-xl bg-[#C98F9E]/15 text-[#A65B6D] flex items-center justify-center group-hover:scale-105 transition-transform">
                    <mat-icon class="text-xl text-[#C98F9E]">favorite</mat-icon>
                  </div>
                  <span class="text-xs text-[#A65B6D] flex items-center gap-1 font-serif bg-white px-2 py-0.5 rounded-full border border-[#ECD9DE]">
                    <span>Gửi thư ẩn danh</span>
                    <mat-icon class="text-xs">mail_outline</mat-icon>
                  </span>
                </div>

                <div class="flex items-center gap-1.5 text-sm font-bold text-[#5B464B] group-hover:text-[#A65B6D] transition-colors">
                  <span class="text-[#C98F9E]">𐙚</span>
                  <span>Lá thư tình yêu</span>
                </div>
                <p class="text-xs font-mono text-[#8E7479] mt-0.5 truncate">
                  ngl.link/omlaynoinho1
                </p>
                <p class="text-xs text-[#78666A] mt-2.5 leading-relaxed font-serif">
                  Gửi lá thư tình yêu, tâm sự ẩn danh và những lời nhắn nhủ ngọt ngào đến Yue.
                </p>
              </div>

              <div class="mt-4 pt-3 border-t border-[#F2E5E8] flex items-center gap-1 text-xs font-medium text-[#A65B6D]">
                <span>Gửi thư đến Yue ngay</span>
                <mat-icon class="text-xs">arrow_forward</mat-icon>
              </div>
            </a>

          </div>
        </div>

        <!-- 5. Closing Sweet Message -->
        <div class="p-6 sm:p-8 rounded-3xl bg-[#FFF9FA] border border-[#F0BAC8]/70 text-center relative overflow-hidden">
          <p class="font-script-romantic text-2xl sm:text-3xl text-[#8E7479] leading-relaxed">
            ₊˚⊹♡ Cảm ơn vì đã ghé thăm góc nhỏ của Yue! ♡
          </p>
          <p class="text-xs text-[#A69094] font-serif mt-2">
            LOVE HAVE • Ôm Lấy Nỗi Nhớ Của Yue Yue
          </p>
        </div>

      </div>
    </section>
  `,
})
export class AboutGarden {
  readonly sound = inject(Sound);
  readonly goToCommission = output<void>();

  onLinkClick(): void {
    this.sound.playClick();
  }
}
