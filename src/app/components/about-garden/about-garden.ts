import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Sound } from '../../services/sound';

@Component({
  selector: 'app-about-garden',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <section id="about" class="max-w-5xl mx-auto px-4 sm:px-6 py-16 scroll-mt-20">
      <div class="bg-gradient-to-br from-white/95 via-[#FFF9F5]/95 to-[#FDF2F4]/95 rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#E8D4D8] vintage-shadow relative overflow-hidden">
        
        <!-- Decorative corner accents -->
        <div class="absolute -top-8 -right-8 w-32 h-32 bg-[#EBCBD4]/30 rounded-full blur-2xl pointer-events-none"></div>
        <div class="absolute -bottom-8 -left-8 w-32 h-32 bg-[#D8CEE9]/25 rounded-full blur-2xl pointer-events-none"></div>

        <!-- Section Badge -->
        <div class="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBCBD4]/35 border border-[#EBCBD4]/70 text-[#A65B6D] text-xs font-serif tracking-wider uppercase mb-4 w-fit shadow-2xs">
          <mat-icon class="text-xs">spa</mat-icon>
          <span>Giới thiệu về LOVE HAVE</span>
        </div>

        <!-- Main Title Header -->
        <h2 class="font-serif-vintage text-3xl sm:text-4xl lg:text-5xl text-[#5B464B] font-bold tracking-tight mb-3">
          Giới thiệu về LOVE HAVE
        </h2>

        <!-- Poetic Tagline -->
        <p class="font-script-romantic text-xl sm:text-2xl lg:text-3xl text-[#8E7479] mb-6 leading-relaxed">
          "A Little Garden of Stories & Hearts — Nơi những con chữ kết thành đóa hoa, và mỗi nhân vật là một tâm hồn đang chờ bạn trò chuyện..."
        </p>

        <!-- Short Introduction About the Website -->
        <div class="p-6 sm:p-8 rounded-2xl bg-white/80 border border-[#ECD9DE] shadow-2xs mb-10 text-[#6B555A] leading-relaxed text-sm sm:text-base space-y-4">
          <div class="flex items-start gap-3">
            <div class="w-8 h-8 rounded-full bg-[#EBCBD4]/40 text-[#A65B6D] flex items-center justify-center shrink-0 mt-0.5">
              <mat-icon class="text-sm">auto_awesome</mat-icon>
            </div>
            <div>
              <p>
                <strong class="text-[#5B464B] font-serif-vintage font-bold">LOVE HAVE</strong> là khu vườn trực tuyến lưu giữ và trưng bày những kịch bản nhân vật tương tác AI được sáng tác độc quyền. Mang đậm phong cách cổ điển, lãng mạn và dịu dàng, LOVE HAVE mở ra những thế giới sống động dành riêng cho độc giả yêu thích văn học mạng, tiểu thuyết ngôn tình, tình cảm hiện đại, cổ trang và huyền huyễn.
              </p>
            </div>
          </div>

          <div class="flex items-start gap-3">
            <div class="w-8 h-8 rounded-full bg-[#D8CEE9]/40 text-[#7D6B9A] flex items-center justify-center shrink-0 mt-0.5">
              <mat-icon class="text-sm">lock_open</mat-icon>
            </div>
            <div>
              <p>
                Tại đây, mỗi nhân vật đều được gắn liền với một loài hoa biểu tượng, một trích đoạn nhật ký cốt truyện đắt giá cùng thử thách giải đố hoa để mở khóa trọn vẹn chương truyện bí mật. Người đọc có thể dễ dàng chuyển tiếp sang nền tảng <strong class="text-[#5B464B]">Google AI Studio</strong> chính thức để bắt đầu cuộc trò chuyện nhập vai độc nhất vô nhị với từng nhân vật.
              </p>
            </div>
          </div>
        </div>

        <!-- OFFICIAL LINKS & COMMISSION SECTION -->
        <div class="mb-12">
          <div class="flex items-center gap-2 mb-6">
            <mat-icon class="text-base text-[#C98F9E]">favorite_border</mat-icon>
            <h3 class="font-serif-vintage text-2xl font-bold text-[#5B464B]">
              Kênh Liên Kết & Dịch Vụ
            </h3>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
            <!-- 1. Facebook Link Card -->
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
                  <span class="text-xs font-serif text-[#9A84B8] flex items-center gap-1 group-hover:text-[#1877F2]">
                    <span>Mở liên kết</span>
                    <mat-icon class="text-xs">open_in_new</mat-icon>
                  </span>
                </div>

                <h4 class="font-serif-vintage text-lg font-bold text-[#5B464B] group-hover:text-[#1877F2] transition-colors">
                  Liên kết Facebook
                </h4>
                <p class="text-xs font-mono text-[#8E7479] mt-0.5 truncate">
                  facebook.com/qingyue224
                </p>
                <p class="text-xs text-[#78666A] mt-3 leading-relaxed">
                  Trang Facebook cá nhân của tác giả: cập nhật thông báo nhân vật mới, chia sẻ nhật ký hậu trường và tương tác trực tiếp.
                </p>
              </div>

              <div class="mt-5 pt-3 border-t border-[#F3E5E8] flex items-center gap-1 text-xs font-medium text-[#1877F2]">
                <span>Ghé thăm Facebook</span>
                <mat-icon class="text-xs">arrow_forward</mat-icon>
              </div>
            </a>

            <!-- 2. Discord Link Card -->
            <a
              href="https://discord.gg/Rfgx6g8Q5"
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
                  discord.gg/Rfgx6g8Q5
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
              (click)="openCommissionModal()"
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

                <h4 class="font-serif-vintage text-lg font-bold text-[#5B464B] group-hover:text-[#A65B6D] transition-colors">
                  Dịch vụ mở commission
                </h4>
                <p class="text-xs font-mono text-[#8E7479] mt-0.5 truncate">
                  Viết kịch bản & System Prompt AI theo yêu cầu
                </p>
                <p class="text-xs text-[#78666A] mt-3 leading-relaxed">
                  Nhận sáng tác nhân vật độc quyền, thiết kế bối cảnh, prompt engineering chuyên sâu cho Google AI Studio theo ý bạn.
                </p>
              </div>

              <div class="mt-5 pt-3 border-t border-[#F3E5E8] flex items-center justify-between w-full">
                <span class="text-xs font-medium text-[#C98F9E] group-hover:text-[#A65B6D] flex items-center gap-1">
                  <span>Chi tiết & Đặt làm</span>
                  <mat-icon class="text-xs">arrow_forward</mat-icon>
                </span>
                <span class="text-[10px] uppercase font-serif tracking-wider text-[#A69094] bg-[#FAF0E6] px-2 py-0.5 rounded">
                  Price & TOS
                </span>
              </div>
            </button>
          </div>
        </div>

        <!-- 3 GUIDANCE STEPS FOR VISITORS -->
        <div class="pt-8 border-t border-[#F0DFE3]">
          <h3 class="font-serif-vintage text-xl font-bold text-[#5B464B] mb-5 flex items-center gap-2">
            <mat-icon class="text-base text-[#9A84B8]">explore</mat-icon>
            <span>Cách Thưởng Thức Khu Vườn LOVE HAVE</span>
          </h3>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Step 1 -->
            <div class="p-5 rounded-2xl bg-white/75 border border-[#ECD9DE] flex flex-col gap-2">
              <div class="w-9 h-9 rounded-full bg-[#EBCBD4]/50 text-[#A65B6D] flex items-center justify-center">
                <mat-icon class="text-base">travel_explore</mat-icon>
              </div>
              <h4 class="font-serif-vintage font-bold text-[#5B464B] text-base">1. Khám Phá Cốt Truyện</h4>
              <p class="text-xs text-[#78666A] leading-relaxed">
                Dạo bước qua các loài hoa, đọc trích đoạn mở màn và tìm kiếm câu chuyện đồng điệu với tâm trạng của bạn hôm nay.
              </p>
            </div>

            <!-- Step 2 -->
            <div class="p-5 rounded-2xl bg-white/75 border border-[#ECD9DE] flex flex-col gap-2">
              <div class="w-9 h-9 rounded-full bg-[#D8CEE9]/50 text-[#7D6B9A] flex items-center justify-center">
                <mat-icon class="text-base">vpn_key</mat-icon>
              </div>
              <h4 class="font-serif-vintage font-bold text-[#5B464B] text-base">2. Giải Đố Mở Khóa</h4>
              <p class="text-xs text-[#78666A] leading-relaxed">
                Mỗi nhân vật mang một bí mật riêng. Lắng nghe câu hỏi và tìm ra chiếc chìa khóa hoa để mở trọn vẹn chương nhật ký.
              </p>
            </div>

            <!-- Step 3 -->
            <div class="p-5 rounded-2xl bg-white/75 border border-[#ECD9DE] flex flex-col gap-2">
              <div class="w-9 h-9 rounded-full bg-[#B8C8B0]/50 text-[#4E6746] flex items-center justify-center">
                <mat-icon class="text-base">forum</mat-icon>
              </div>
              <h4 class="font-serif-vintage font-bold text-[#5B464B] text-base">3. Trò Chuyện Trực Tiếp</h4>
              <p class="text-xs text-[#78666A] leading-relaxed">
                Nhấn nút "Mở GG AI" để chuyển sang không gian Google AI Studio chính thức và bắt đầu cuộc đối thoại độc nhất vô nhị.
              </p>
            </div>
          </div>
        </div>

        <!-- Section Footer Note -->
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

    <!-- COMMISSION INFORMATION MODAL (POPUP) -->
    @if (isCommissionModalOpen()) {
      <div
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="commission-modal-title"
      >
        <!-- Backdrop Button -->
        <button
          type="button"
          class="fixed inset-0 w-full h-full bg-black/45 backdrop-blur-xs transition-opacity cursor-pointer border-none"
          (click)="closeCommissionModal()"
          aria-label="Đóng cửa sổ điều khoản commission"
        ></button>

        <!-- Modal Content Container -->
        <div
          class="relative bg-gradient-to-br from-[#FFFDF9] via-white to-[#FDF5F7] rounded-3xl p-6 sm:p-8 max-w-2xl w-full border border-[#E8D4D8] shadow-2xl max-h-[90vh] overflow-y-auto z-10 animate-fade-in"
        >
          <!-- Close button -->
          <button
            type="button"
            (click)="closeCommissionModal()"
            class="absolute top-5 right-5 w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 text-[#78666A] flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Đóng"
          >
            <mat-icon class="text-lg">close</mat-icon>
          </button>

          <!-- Modal Header -->
          <div class="flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBCBD4]/40 border border-[#EBCBD4] text-[#A65B6D] text-xs font-serif uppercase tracking-wider w-fit mb-3">
            <mat-icon class="text-xs">palette</mat-icon>
            <span>Dịch vụ mở commission • LOVE HAVE</span>
          </div>

          <h3 id="commission-modal-title" class="font-serif-vintage text-2xl sm:text-3xl font-bold text-[#5B464B] mb-2">
            Thông Tin & Điều Khoản Commission (TOS)
          </h3>
          <p class="text-xs sm:text-sm text-[#8E7479] font-script-romantic text-lg sm:text-xl mb-6">
            "Biến ý tưởng và nhân vật trong mơ của bạn thành những cuộc đối thoại sống động có chiều sâu..."
          </p>

          <!-- Detailed Items -->
          <div class="space-y-4 text-xs sm:text-sm text-[#6B555A] leading-relaxed">
            <!-- Service 1 -->
            <div class="p-4 rounded-xl bg-white border border-[#ECD9DE]">
              <div class="flex items-center gap-2 text-[#A65B6D] font-bold font-serif-vintage text-base mb-1">
                <mat-icon class="text-sm">edit_note</mat-icon>
                <span>1. Viết Kịch Bản & Thiết Lập Bot AI</span>
              </div>
              <ul class="list-disc list-inside space-y-1 text-[#78666A] pl-1">
                <li>Xây dựng hồ sơ nhân vật chi tiết: tính cách, thói quen, cách xưng hô, bí mật nội tâm, điểm yếu.</li>
                <li>Tối ưu hóa System Prompt chuyên biệt cho Google AI Studio, SillyTavern, JanitorAI...</li>
                <li>Viết First Message (tin nhắn mở đầu) cuốn hút, đẩy cao cao trào hoặc nhịp cảm xúc.</li>
              </ul>
            </div>

            <!-- Service 2 -->
            <div class="p-4 rounded-xl bg-white border border-[#ECD9DE]">
              <div class="flex items-center gap-2 text-[#7D6B9A] font-bold font-serif-vintage text-base mb-1">
                <mat-icon class="text-sm">category</mat-icon>
                <span>2. Thể Loại Nhận Viết Đa Dạng</span>
              </div>
              <p class="text-[#78666A]">
                Nhận phong phú các thể loại: <strong>BG, Đô thị, Cổ trang, Trọng sinh, Học đường, Huyền huyễn, Slow burn, Chiếm hữu, Ngược luyến, Hài hước, R18 / R21</strong>... Tùy biến hoàn toàn theo cốt truyện độc quyền của bạn.
              </p>
            </div>

            <!-- Service 3 -->
            <div class="p-4 rounded-xl bg-white border border-[#ECD9DE]">
              <div class="flex items-center gap-2 text-[#4E6746] font-bold font-serif-vintage text-base mb-1">
                <mat-icon class="text-sm">task_alt</mat-icon>
                <span>3. Quy Trình Làm Việc & Cam Kết</span>
              </div>
              <ol class="list-decimal list-inside space-y-1 text-[#78666A] pl-1">
                <li>Liên hệ trao đổi qua Facebook hoặc Discord để trao đổi sơ lược ý tưởng.</li>
                <li>Thống nhất bối cảnh, prompt template và thời gian bàn giao dự kiến.</li>
                <li>Gửi bản phác thảo & test phản ứng của bot; hỗ trợ chỉnh sửa theo phản hồi của bạn.</li>
                <li>Bảo mật hoàn toàn ý tưởng và không public nếu có yêu cầu bảo mật riêng tư.</li>
              </ol>
            </div>
          </div>

          <!-- Quick Actions / Contact Buttons -->
          <div class="mt-8 pt-5 border-t border-[#F2E5E8] flex flex-col sm:flex-row items-center justify-between gap-3">
            <span class="text-xs text-[#8E7479] font-serif">
              Liên hệ trao đổi trực tiếp qua:
            </span>

            <div class="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              <!-- Contact via Facebook -->
              <a
                href="https://www.facebook.com/qingyue224"
                target="_blank"
                rel="noopener noreferrer"
                (click)="sound.playClick()"
                class="flex-1 sm:flex-none px-4 py-2.5 rounded-full bg-[#1877F2] hover:bg-[#166FE5] text-white text-xs font-medium flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
              >
                <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span>Nhắn qua Facebook</span>
              </a>

              <!-- Contact via Discord -->
              <a
                href="https://discord.gg/Rfgx6g8Q5"
                target="_blank"
                rel="noopener noreferrer"
                (click)="sound.playClick()"
                class="flex-1 sm:flex-none px-4 py-2.5 rounded-full bg-[#5865F2] hover:bg-[#4752C4] text-white text-xs font-medium flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
              >
                <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
                <span>Nhắn qua Discord</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    .animate-fade-in {
      animation: fadeIn 0.2s ease-out forwards;
    }
  `],
})
export class AboutGarden {
  readonly sound = inject(Sound);
  readonly isCommissionModalOpen = signal<boolean>(false);

  openCommissionModal(): void {
    this.sound.playPaper();
    this.isCommissionModalOpen.set(true);
  }

  closeCommissionModal(): void {
    this.sound.playClick();
    this.isCommissionModalOpen.set(false);
  }

  onLinkClick(): void {
    this.sound.playClick();
  }
}
