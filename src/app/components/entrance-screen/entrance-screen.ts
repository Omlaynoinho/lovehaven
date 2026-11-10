import { ChangeDetectionStrategy, Component, inject, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Sound } from '../../services/sound';
import { Music } from '../../services/music';

interface FallingPetal {
  id: number;
  left: number;
  delay: number;
  duration: number;
  driftX: number;
  rotation: number;
  size: number;
  color: string;
  type: 'petal' | 'maple' | 'leaf' | 'sparkle';
}

@Component({
  selector: 'app-entrance-screen',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatIconModule],
  template: `
    <div
      class="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 overflow-hidden transition-all duration-1000 ease-in-out select-none"
      [class.opacity-0]="isFadingOut()"
      [class.scale-105]="isFadingOut()"
      [class.pointer-events-none]="isFadingOut()"
      [class.backdrop-blur-md]="isFadingOut()"
    >
      <!-- 1. AUTUMN GARDEN BACKGROUND WITH BLURRED NEW AVATAR BACKDROP -->
      <div class="absolute inset-0 bg-gradient-to-br from-[#FFFDF8] via-[#FFDCE5] to-[#FFC0CB]">
        
        <!-- Blurred Avatar Backdrop Layer ("Thay cả ảnh mờ đằng sau đó") -->
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
          <img
            src="/assets/entrance-avatar.jpg"
            alt="Blurred Avatar Backdrop"
            class="w-full h-full object-cover scale-125 filter blur-3xl opacity-55 brightness-105 saturate-125"
            referrerpolicy="no-referrer"
          />
          <div class="absolute inset-0 bg-gradient-to-br from-[#FFFDF8]/70 via-[#FFDCE5]/60 to-[#FFC0CB]/75 mix-blend-screen"></div>
        </div>

        <!-- Warm Autumn Sunbeams & Glowing Bokeh Orbs -->
        <div class="absolute -top-24 -left-24 w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-[#FFE4EC]/75 blur-3xl pointer-events-none"></div>
        <div class="absolute top-1/3 -right-24 w-[420px] h-[420px] rounded-full bg-[#FFD5C8]/60 blur-3xl pointer-events-none"></div>
        <div class="absolute -bottom-24 left-1/4 w-[480px] h-[480px] rounded-full bg-[#FDE2CF]/55 blur-3xl pointer-events-none"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#FFF0F4]/45 blur-3xl pointer-events-none"></div>
        
        <!-- Subtle Vintage Paper Grain Texture Overlay -->
        <div
          class="absolute inset-0 opacity-20 pointer-events-none mix-blend-multiply"
          style="background-image: radial-gradient(#8C5866 0.75px, transparent 0.75px); background-size: 24px 24px;"
        ></div>

        <!-- Ambient Falling Petals (Continuous gentle floating) -->
        <div class="absolute inset-0 pointer-events-none overflow-hidden">
          @for (p of ambientPetals; track p.id) {
            <div
              class="absolute rounded-full opacity-65"
              [style.left.%]="p.left"
              [style.top.%]="p.top"
              [style.width.px]="p.size"
              [style.height.px]="p.size * 1.3"
              [style.background]="p.bg"
              [style.transform]="'rotate(' + p.rot + 'deg)'"
              style="animation: floatGentle 6s ease-in-out infinite;"
              [style.animation-delay]="p.delay + 's'"
            ></div>
          }
        </div>
      </div>

      <!-- 2. MAIN ENTRANCE CONTAINER (CENTERED) -->
      <div class="relative z-10 flex flex-col items-center justify-center max-w-3xl w-full my-auto px-2">
        
        <!-- Top Badge: Thay đổi thành "Lưu Giữ Bức Thư Người Thương" -->
        <div class="inline-flex items-center gap-2 px-4 sm:px-6 py-1.5 sm:py-2 rounded-full bg-white/85 backdrop-blur-xs border border-[#E8CCD4] shadow-2xs text-xs sm:text-sm font-serif text-[#A65B6D] mb-3 sm:mb-4">
          <span class="text-xs">꒰ა ♡ ໒꒱</span>
          <span class="tracking-widest font-semibold">Lưu Giữ Bức Thư Người Thương</span>
          <span class="text-xs">꒰ა ♡ ໒꒱</span>
        </div>

        <!-- THE ORNATE ARTWORK CENTERPIECE CARD (Matches IMG_1324 with new Avatar & Backdrop) -->
        <div class="relative w-full max-w-xl sm:max-w-2xl md:max-w-3xl aspect-[900/793] select-none mx-auto rounded-3xl overflow-hidden shadow-2xl border-2 border-[#F0BAC8]/90 bg-[#FFF5F7]">
          
          <!-- Blurred Avatar Backdrop Layer inside card ("Thay cả ảnh mờ đằng sau đó") -->
          <div class="absolute inset-0 overflow-hidden pointer-events-none z-0">
            <img
              src="/assets/entrance-avatar.jpg"
              alt="Blurred Backdrop Inside Card"
              class="w-full h-full object-cover scale-110 filter blur-xl opacity-65 brightness-105"
              referrerpolicy="no-referrer"
            />
            <div class="absolute inset-0 bg-[#FFDCE5]/40 mix-blend-soft-light"></div>
          </div>

          <!-- Base Artwork Image -->
          <img
            src="/assets/aistudio/IMG_1324_df40aa0a.jpeg"
            alt="Khung hoa mùa thu Lovehaven"
            class="absolute inset-0 w-full h-full object-contain pointer-events-none select-none relative z-10"
            referrerpolicy="no-referrer"
          />

          <!-- NEW AVATAR OVERLAY: KÍCH CỠ BẰNG NHAU, VỪA KHÍT KHUNG TRÒN HOA -->
          <!-- Positioned precisely over the avatar circle of IMG_1324 -->
          <div
            class="absolute z-15 rounded-full overflow-hidden border-[3px] border-[#F2CAD4] shadow-md transition-transform duration-300 hover:scale-102 pointer-events-auto"
            style="left: 8.2%; top: 44.8%; width: 29.0%; height: 32.8%; border-radius: 50%; box-shadow: inset 0 0 10px rgba(235, 175, 190, 0.4), 0 4px 12px rgba(91, 70, 75, 0.15);"
            title="Avatar Ôm Lấy Nỗi Nhớ"
          >
            <img
              src="/assets/entrance-avatar.jpg"
              alt="Avatar Màn hình chờ mới"
              class="w-full h-full object-cover object-center select-none"
              referrerpolicy="no-referrer"
            />
          </div>

          <!-- OVERLAY ZONE 1: TÊN 𝑳𝒐𝒗𝒆𝒉𝒂𝒗𝒆𝒏 Ở VỊ TRÍ TRUNG TÂM VÀ LỜI CHÀO THƠ MỘNG -->
          <!-- Placed in the scenic lake area to the right of the avatar maiden -->
          <div
            class="absolute flex flex-col items-center justify-center text-center px-3 sm:px-6 z-20 pointer-events-auto"
            style="left: 36%; top: 24.5%; width: 57%; height: 37.3%;"
          >
            <!-- Coquette Dainty Ribbon Motif -->
            <div class="inline-flex items-center gap-1.5 text-xs text-[#B85D75] font-serif mb-1 opacity-90 drop-shadow-xs">
              <span>୨୧</span>
              <span class="tracking-widest text-[10px] sm:text-[11px] uppercase font-medium">A Little Garden Of Stories & Hearts</span>
              <span>୨୧</span>
            </div>

            <!-- TÊN 𝑳𝒐𝒗𝒆𝒉𝒂𝒗𝒆𝒏 ĐƯỢC ĐẶT Ở VỊ TRÍ TRUNG TÂM -->
            <h1 class="font-serif-vintage text-3xl sm:text-4xl md:text-5xl font-black text-[#54383F] tracking-wide drop-shadow-[0_2px_10px_rgba(255,255,255,0.95)] leading-tight transition-transform duration-300 hover:scale-102 cursor-default">
              𝑳𝒐𝒗𝒆𝒉𝒂𝒗𝒆𝒏
            </h1>
            
            <!-- LỜI CHÀO NGẮN MANG PHONG CÁCH THƠ MỘNG -->
            <p class="font-script-romantic text-sm sm:text-base md:text-lg text-[#7E4553] drop-shadow-[0_1px_6px_rgba(255,255,255,0.95)] mt-1 sm:mt-1.5 font-medium leading-relaxed max-w-sm">
              "Nơi những cánh hoa thu thì thầm cùng ký ức dịu dàng..."
            </p>

            <!-- Subtle Sub-text Accent -->
            <div class="flex items-center justify-center gap-2 mt-1 sm:mt-2 text-[11px] sm:text-xs text-[#9E6775] font-serif opacity-85 drop-shadow-xs">
              <span>₊˚⊹♡</span>
              <span class="italic">Gửi trao tâm tình đến người thương</span>
              <span>♡⊹˚₊</span>
            </div>
          </div>

          <!-- OVERLAY ZONE 2: NÚT "GỬI THƯ" THAY THẾ CHỖ TÊN NEKOMACORE -->
          <!-- Exactly aligned with the pill coordinates of IMG_1324_df40aa0a.jpeg -->
          <button
            type="button"
            (click)="onSendLetter()"
            [disabled]="isTransitioning()"
            style="left: 42.2%; top: 62.4%; width: 39.4%; height: 7.7%;"
            class="absolute z-30 rounded-full bg-gradient-to-r from-[#FFF0F4]/95 via-white/95 to-[#FDE8EF]/95 border-2 border-white/95 shadow-[0_0_16px_rgba(255,182,193,0.9),0_3px_10px_rgba(184,93,117,0.35)] backdrop-blur-xs flex items-center justify-center gap-1.5 sm:gap-2.5 cursor-pointer transition-all duration-300 hover:scale-102 hover:shadow-[0_0_24px_rgba(255,182,193,1),0_4px_14px_rgba(184,93,117,0.4)] active:scale-95 group overflow-hidden"
            title="Nhấn Gửi Thư để bước vào khu vườn"
          >
            <!-- Animated shimmer streak -->
            <div class="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
              <div class="w-1/2 h-full bg-white/40 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000"></div>
            </div>

            <!-- Left floral knot accent -->
            <span class="text-xs sm:text-sm md:text-base select-none filter drop-shadow-xs transition-transform group-hover:rotate-12">
              🌸
            </span>

            <!-- Mail icon -->
            <mat-icon class="text-xs sm:text-sm md:text-base text-[#B85D75] transition-transform group-hover:scale-115">
              mail
            </mat-icon>

            <!-- Prominent Button Label: Gửi Thư -->
            <span class="font-serif font-bold text-xs sm:text-sm md:text-base text-[#54383F] tracking-widest uppercase transition-colors group-hover:text-[#8E3B50]">
              Gửi Thư
            </span>

            <!-- Right floral knot accent -->
            <span class="text-xs sm:text-sm md:text-base select-none filter drop-shadow-xs transition-transform group-hover:-rotate-12">
              🌸
            </span>
          </button>

        </div>

        <!-- Gentle Bottom Instruction Hint -->
        <p class="text-[11px] sm:text-xs font-serif text-[#8E7479] mt-3 tracking-wide text-center drop-shadow-xs">
          Nhấn nút <span class="font-bold text-[#A65B6D]">[Gửi Thư]</span> để bắt đầu dạo bước vào khu vườn
        </p>

      </div>

      <!-- 3. ANIMATED AUTUMN PETALS FLURRY (WHEN USER CLICKS GỬI THƯ) -->
      @if (showPetals()) {
        <div class="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          @for (petal of activePetals; track petal.id) {
            <div
              class="absolute pointer-events-none"
              [style.left.%]="petal.left"
              [style.top]="'-40px'"
              [style.animation]="'petalFall ' + petal.duration + 's cubic-bezier(0.25, 1, 0.5, 1) forwards'"
              [style.animation-delay]="petal.delay + 's'"
              [style.--petal-x]="petal.driftX + 'px'"
              [style.--petal-rot]="petal.rotation + 'deg'"
            >
              @if (petal.type === 'maple') {
                <span
                  class="block filter drop-shadow-xs"
                  [style.font-size.px]="petal.size"
                  [style.color]="petal.color"
                >🍁</span>
              } @else if (petal.type === 'leaf') {
                <span
                  class="block filter drop-shadow-xs"
                  [style.font-size.px]="petal.size"
                  [style.color]="petal.color"
                >🍂</span>
              } @else if (petal.type === 'sparkle') {
                <span
                  class="block filter drop-shadow-xs text-amber-300"
                  [style.font-size.px]="petal.size * 0.8"
                >✨</span>
              } @else {
                <div
                  class="rounded-full shadow-2xs"
                  [style.width.px]="petal.size"
                  [style.height.px]="petal.size * 1.4"
                  [style.background]="petal.color"
                  style="border-radius: 50% 0 50% 50%;"
                ></div>
              }
            </div>
          }
        </div>
      }
    </div>
  `,
})
export class EntranceScreen {
  readonly sound = inject(Sound);
  readonly music = inject(Music);
  readonly enter = output<void>();

  readonly isTransitioning = signal<boolean>(false);
  readonly showPetals = signal<boolean>(false);
  readonly isFadingOut = signal<boolean>(false);

  // Background subtle floating decorative petals
  readonly ambientPetals = [
    { id: 1, left: 8, top: 12, size: 8, bg: '#F8B4A5', rot: 25, delay: 0 },
    { id: 2, left: 88, top: 18, size: 10, bg: '#EFA48B', rot: -40, delay: 1.5 },
    { id: 3, left: 22, top: 78, size: 9, bg: '#E297A6', rot: 50, delay: 2.2 },
    { id: 4, left: 82, top: 82, size: 7, bg: '#F6C28B', rot: -15, delay: 0.8 },
    { id: 5, left: 6, top: 62, size: 11, bg: '#DE8C9E', rot: 35, delay: 3.1 },
    { id: 6, left: 94, top: 58, size: 8, bg: '#EAA972', rot: -60, delay: 2.7 },
    { id: 7, left: 50, top: 8, size: 9, bg: '#F9C2BD', rot: 15, delay: 1.1 },
  ];

  // Dynamic flying petals generated on click "GỬI THƯ"
  activePetals: FallingPetal[] = [];

  onSendLetter(): void {
    if (this.isTransitioning()) return;

    // 1. Prioritize starting relaxing music on user interaction
    this.music.autoPlayOnSendLetter();

    // 2. Play paper opening sound and gentle musical chime
    this.sound.playPaper();
    setTimeout(() => {
      this.sound.playChime();
    }, 200);

    // 3. Mark transition start and launch autumn petals flurry
    this.isTransitioning.set(true);
    this.generatePetals();
    this.showPetals.set(true);

    // 4. Smooth screen fade-out sequence
    setTimeout(() => {
      this.isFadingOut.set(true);
    }, 600);

    // 5. Complete transition and reveal home interface with smooth fade-in (no page reload)
    setTimeout(() => {
      this.enter.emit();
    }, 1250);
  }

  private generatePetals(): void {
    const colors = [
      '#B85D75', // Dusty rose
      '#C26D82', // Romantic pink
      '#D97706', // Amber gold
      '#C2410C', // Autumn maple
      '#991B1B', // Deep crimson
      '#E89874', // Soft apricot
      '#FCD34D', // Gold sparkle
    ];

    const types: ('petal' | 'maple' | 'leaf' | 'sparkle')[] = [
      'petal', 'petal', 'maple', 'leaf', 'petal', 'sparkle',
    ];

    this.activePetals = Array.from({ length: 36 }, (_, i) => {
      return {
        id: i,
        left: Math.random() * 96 + 2,
        delay: Math.random() * 0.45,
        duration: 2.0 + Math.random() * 1.6,
        driftX: (Math.random() - 0.4) * 240,
        rotation: Math.random() * 720 - 360,
        size: 14 + Math.random() * 16,
        color: colors[Math.floor(Math.random() * colors.length)],
        type: types[Math.floor(Math.random() * types.length)],
      };
    });
  }
}
