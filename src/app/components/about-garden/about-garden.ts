import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-about-garden',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <section id="about" class="max-w-4xl mx-auto px-4 sm:px-6 py-16 scroll-mt-20">
      <div class="bg-gradient-to-br from-white/90 via-[#FFF9F5]/90 to-[#FDF2F4]/90 rounded-3xl p-8 sm:p-12 border border-[#E8D4D8] vintage-shadow relative overflow-hidden">
        
        <!-- Decorative corner accents -->
        <div class="absolute -top-8 -right-8 w-28 h-28 bg-[#EBCBD4]/30 rounded-full blur-xl pointer-events-none"></div>

        <div class="flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBCBD4]/30 border border-[#EBCBD4]/60 text-[#A65B6D] text-xs font-serif tracking-wider uppercase mb-4 w-fit">
          <mat-icon class="text-xs">spa</mat-icon>
          <span>Về Khu Vườn LOVE HAVE</span>
        </div>

        <h2 class="font-serif-vintage text-3xl sm:text-4xl text-[#5B464B] font-bold tracking-tight mb-4">
          A Little Garden of Stories & Hearts
        </h2>

        <p class="font-script-romantic text-xl sm:text-2xl text-[#8E7479] mb-6">
          "Nơi những con chữ kết thành đóa hoa, và mỗi nhân vật là một tâm hồn đang chờ bạn trò chuyện..."
        </p>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
          <!-- Step 1 -->
          <div class="p-5 rounded-2xl bg-white/70 border border-[#ECD9DE] flex flex-col gap-2">
            <div class="w-9 h-9 rounded-full bg-[#EBCBD4]/50 text-[#A65B6D] flex items-center justify-center">
              <mat-icon class="text-base">travel_explore</mat-icon>
            </div>
            <h3 class="font-serif-vintage font-bold text-[#5B464B] text-lg">1. Khám Phá Cốt Truyện</h3>
            <p class="text-xs text-[#78666A] leading-relaxed">
              Dạo bước qua các loài hoa, đọc trích đoạn và tìm kiếm câu chuyện đồng điệu với tâm trạng của bạn hôm nay.
            </p>
          </div>

          <!-- Step 2 -->
          <div class="p-5 rounded-2xl bg-white/70 border border-[#ECD9DE] flex flex-col gap-2">
            <div class="w-9 h-9 rounded-full bg-[#D8CEE9]/50 text-[#7D6B9A] flex items-center justify-center">
              <mat-icon class="text-base">vpn_key</mat-icon>
            </div>
            <h3 class="font-serif-vintage font-bold text-[#5B464B] text-lg">2. Giải Đố Mở Khóa</h3>
            <p class="text-xs text-[#78666A] leading-relaxed">
              Mỗi nhân vật mang một bí mật riêng. Lắng nghe câu hỏi và tìm ra chiếc chìa khóa hoa để mở trọn vẹn chương nhật ký.
            </p>
          </div>

          <!-- Step 3 -->
          <div class="p-5 rounded-2xl bg-white/70 border border-[#ECD9DE] flex flex-col gap-2">
            <div class="w-9 h-9 rounded-full bg-[#B8C8B0]/50 text-[#4E6746] flex items-center justify-center">
              <mat-icon class="text-base">forum</mat-icon>
            </div>
            <h3 class="font-serif-vintage font-bold text-[#5B464B] text-lg">3. Trò Chuyện Trực Tiếp</h3>
            <p class="text-xs text-[#78666A] leading-relaxed">
              Nhấn nút "Mở GG AI" để chuyển sang không gian Google AI Studio chính thức và bắt đầu cuộc đối thoại độc nhất vô nhị.
            </p>
          </div>
        </div>

        <div class="pt-6 border-t border-[#F2E5E8] flex flex-col sm:flex-row items-center justify-between text-xs text-[#9B8287] gap-3">
          <p>
            Tất cả nhân vật và kịch bản đều là tác phẩm sáng tạo cá nhân thuộc về thế giới LOVE HAVE.
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
export class AboutGarden {}
