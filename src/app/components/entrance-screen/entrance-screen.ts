import { ChangeDetectionStrategy, Component, inject, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Sound } from '../../services/sound';

interface FallingPetal {
  id: number;
  left: number;
  delay: number;
  duration: number;
  driftX: number;
  rotation: number;
  size: number;
  color: string;
  type: 'petal' | 'maple' | 'leaf';
}

@Component({
  selector: 'app-entrance-screen',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatIconModule],
  template: `
    <div
      class="fixed inset-0 z-50 flex items-center justify-center overflow-hidden transition-all duration-1000 ease-in-out select-none"
      [class.opacity-0]="isFadingOut()"
      [class.scale-105]="isFadingOut()"
      [class.pointer-events-none]="isFadingOut()"
      [class.backdrop-blur-md]="isFadingOut()"
    >
      <!-- AUTUMN GARDEN BACKGROUND -->
      <div class="absolute inset-0 bg-gradient-to-br from-[#FFFDF8] via-[#FFDCE5] to-[#FFC0CB]">
        
        <!-- Warm Autumn Sunbeams & Bokeh Lights -->
        <div class="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#FFE4EC]/60 blur-3xl pointer-events-none"></div>
        <div class="absolute top-1/4 -right-20 w-[450px] h-[450px] rounded-full bg-[#FFD5C8]/45 blur-3xl pointer-events-none"></div>
        <div class="absolute -bottom-24 left-1/3 w-[500px] h-[500px] rounded-full bg-[#F3D7C6]/50 blur-3xl pointer-events-none"></div>
        
        <!-- Subtle Vintage Paper Grain Texture Overlay -->
        <div
          class="absolute inset-0 opacity-25 pointer-events-none mix-blend-multiply"
          style="background-image: radial-gradient(#8C5866 0.75px, transparent 0.75px); background-size: 24px 24px;"
        ></div>

        <!-- Autumn Foliage SVG Decorative Borders (Top & Bottom Branches) -->
        <!-- Top Left Autumn Branch -->
        <svg
          class="absolute -top-6 -left-6 w-56 sm:w-80 h-56 sm:h-80 pointer-events-none opacity-40 text-[#C27358]"
          viewBox="0 0 200 200"
          fill="currentColor"
        >
          <path d="M0,0 C50,20 80,60 110,120 C100,100 120,70 150,60 C130,80 150,110 170,100 C150,120 130,130 110,120 C80,140 40,160 0,180 Z" opacity="0.6"/>
          <circle cx="80" cy="50" r="18" fill="#D97706" opacity="0.35"/>
          <circle cx="120" cy="85" r="14" fill="#B91C1C" opacity="0.3"/>
          <circle cx="45" cy="110" r="12" fill="#E18A9E" opacity="0.4"/>
        </svg>

        <!-- Top Right Autumn Blossom Spray -->
        <svg
          class="absolute -top-8 -right-8 w-60 sm:w-88 h-60 sm:h-88 pointer-events-none opacity-40 text-[#B85D75]"
          viewBox="0 0 200 200"
          fill="currentColor"
        >
          <path d="M200,0 C150,25 120,65 90,120 C100,95 80,75 50,60 C70,85 50,115 30,105 C50,125 70,135 90,120 C120,145 160,165 200,180 Z" opacity="0.6"/>
          <circle cx="120" cy="50" r="20" fill="#E89874" opacity="0.35"/>
          <circle cx="80" cy="90" r="15" fill="#881337" opacity="0.25"/>
          <circle cx="155" cy="115" r="13" fill="#D97706" opacity="0.4"/>
        </svg>

        <!-- Floating Autumn Ambient Petals (Constant subtle drift) -->
        <div class="absolute inset-0 pointer-events-none overflow-hidden">
          @for (p of ambientPetals; track p.id) {
            <div
              class="absolute rounded-full opacity-60"
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

      <!-- MAIN ENTRANCE CONTAINER (CENTERED) -->
      <div class="relative z-10 flex flex-col items-center justify-center max-w-xl sm:max-w-2xl w-full px-5 py-6 sm:py-10 text-center">
        
        <!-- Autumn Flower Crest & Season Tag -->
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 backdrop-blur-xs border border-[#E8D0D6] shadow-2xs text-xs font-serif text-[#A65B6D] mb-4 sm:mb-5">
          <mat-icon class="text-sm text-[#D97706]">eco</mat-icon>
          <span class="tracking-widest uppercase font-semibold">Mùa Thu Ở Khu Vườn • Autumn Edition</span>
          <mat-icon class="text-sm text-[#B91C1C]">local_florist</mat-icon>
        </div>

        <!-- BRAND NAME: LOVE HAVE (CENTRAL POSITION) -->
        <h1 class="font-serif-vintage text-5xl sm:text-7xl lg:text-8xl font-extrabold text-[#54383F] tracking-wide mb-2 sm:mb-3 drop-shadow-xs transition-transform hover:scale-102 duration-500">
          LOVE HAVE
        </h1>

        <!-- Script Romantic Tagline -->
        <p class="font-script-romantic text-2xl sm:text-3xl text-[#925B69] mb-3 sm:mb-4">
          "A Little Garden of Stories & Hearts..."
        </p>

        <!-- Poetic Romantic Greeting -->
        <p class="font-serif italic text-xs sm:text-sm md:text-base text-[#6F555C] max-w-lg leading-relaxed mb-6 sm:mb-8 font-light px-2">
          Mùa thu thay áo, gió heo may cuộn theo những lá thư thầm kín.<br class="hidden sm:inline" />
          Có một khu vườn nhỏ dịu dàng đang chờ bạn khẽ bước vào...
        </p>

        <!-- THE ENVELOPE (PHONG THƯ TRANG TRÍ VỚI HOA VÀ NƠ) -->
        <div class="relative w-72 sm:w-96 perspective-1000 mb-6 sm:mb-8">
          
          <!-- Outer Decorative Flower Garland & Autumn Leaves on Envelope -->
          <!-- Top Left Floral Cluster -->
          <div class="absolute -top-6 -left-6 z-30 pointer-events-none flex items-center justify-center">
            <!-- Flower Badge -->
            <div class="relative w-12 h-12 rounded-full bg-[#FAF3EC] border border-[#E6CBD1] shadow-sm flex items-center justify-center text-[#B85D75]">
              <mat-icon class="text-2xl text-[#C26D82]">local_florist</mat-icon>
              <!-- Small maple leaf accent -->
              <span class="absolute -bottom-1 -right-1 text-sm">🍂</span>
            </div>
          </div>

          <!-- Top Right Autumn Rose & Blossom Cluster -->
          <div class="absolute -top-6 -right-6 z-30 pointer-events-none flex items-center justify-center">
            <div class="relative w-12 h-12 rounded-full bg-[#FAF3EC] border border-[#E6CBD1] shadow-sm flex items-center justify-center text-[#D97706]">
              <mat-icon class="text-2xl text-[#D97706]">spa</mat-icon>
              <!-- Small flower blossom accent -->
              <span class="absolute -bottom-1 -left-1 text-sm">🌸</span>
            </div>
          </div>

          <!-- Bottom Garland Petals -->
          <div class="absolute -bottom-3 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex items-center gap-1.5 opacity-80">
            <span class="text-xs">🍁</span>
            <span class="text-xs text-[#B85D75]">❦</span>
            <span class="text-xs">🍂</span>
            <span class="text-xs text-[#B85D75]">❦</span>
            <span class="text-xs">🍁</span>
          </div>

          <!-- ENVELOPE BODY CARD -->
          <div
            class="relative w-full h-44 sm:h-56 bg-gradient-to-b from-[#FFFDF9] via-[#FAF3EC] to-[#F7EAE3] rounded-2xl border-2 border-[#E7CDD4] shadow-xl overflow-hidden transition-all duration-700"
            [class.shadow-2xl]="isOpening()"
          >
            <!-- Vintage Postal Stamped Marks -->
            <div class="absolute top-3 left-4 border border-dashed border-[#C98F9E]/50 px-2.5 py-1 rounded-md text-[10px] font-serif text-[#C98F9E] tracking-wider uppercase opacity-85">
              Love &bull; Have
            </div>

            <div class="absolute top-3 right-4 flex items-center gap-1 text-[10px] font-serif text-[#9E737B] opacity-75">
              <mat-icon class="text-xs text-[#D97706]">wb_sunny</mat-icon>
              <span>Autumn 2026</span>
            </div>

            <!-- THE LETTER (Tucked inside, rises up when opening) -->
            <div
              class="absolute inset-x-4 top-4 bottom-2 bg-gradient-to-b from-white to-[#FFFDF9] rounded-xl border border-[#EDD5DC] shadow-inner p-4 text-center transition-transform duration-700 ease-out flex flex-col items-center justify-center z-10"
              [style.transform]="isOpening() ? 'translateY(-55px) scale(1.03)' : 'translateY(8px)'"
            >
              <div class="w-8 h-8 rounded-full bg-[#FAF0E6] border border-[#EACCD4] flex items-center justify-center text-[#B85D75] mb-2 shadow-2xs">
                <mat-icon class="text-sm">favorite</mat-icon>
              </div>
              <h3 class="font-serif-vintage text-sm sm:text-base font-bold text-[#5B464B] leading-tight">
                Gửi Người Bạn Của Khu Vườn
              </h3>
              <p class="font-script-romantic text-xs sm:text-sm text-[#8E7479] mt-0.5">
                Mở ra những câu chuyện và những tấm lòng...
              </p>
            </div>

            <!-- ENVELOPE FRONT FOLDS (Pocket) -->
            <div class="absolute inset-0 z-20 pointer-events-none">
              <!-- Left Triangle Fold -->
              <div
                class="absolute bottom-0 left-0 w-0 h-0 border-l-[144px] sm:border-l-[192px] border-l-[#F6E7E0] border-t-[88px] sm:border-t-[112px] border-t-transparent border-b-[88px] sm:border-b-[112px] border-b-[#F0DBD3] opacity-90"
              ></div>
              <!-- Right Triangle Fold -->
              <div
                class="absolute bottom-0 right-0 w-0 h-0 border-r-[144px] sm:border-r-[192px] border-r-[#F6E7E0] border-t-[88px] sm:border-t-[112px] border-t-transparent border-b-[88px] sm:border-b-[112px] border-b-[#F0DBD3] opacity-90"
              ></div>
              <!-- Bottom Triangle Fold -->
              <div
                class="absolute bottom-0 inset-x-0 h-0 border-b-[95px] sm:border-b-[120px] border-b-[#F9EDE6] border-l-[144px] sm:border-l-[192px] border-l-transparent border-r-[144px] sm:border-r-[192px] border-r-transparent"
              ></div>
            </div>

            <!-- ENVELOPE FLAP (Top Triangle, rotates open) -->
            <div
              class="absolute top-0 inset-x-0 h-0 border-t-[90px] sm:border-t-[115px] border-t-[#F1DDD4] border-l-[144px] sm:border-l-[192px] border-l-transparent border-r-[144px] sm:border-r-[192px] border-r-transparent origin-top transition-transform duration-700 ease-out z-25"
              [style.transform]="isOpening() ? 'rotateX(180deg)' : 'rotateX(0deg)'"
              [style.z-index]="isOpening() ? '5' : '25'"
            ></div>

            <!-- SILK RIBBON & BOW (NƠ TRANG TRÍ CHÍNH GIỮA) -->
            <div
              class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none transition-all duration-500 flex flex-col items-center justify-center"
              [class.opacity-0]="isOpening()"
              [class.scale-75]="isOpening()"
            >
              <!-- Bow knot and loops -->
              <div class="relative flex items-center justify-center">
                <!-- Left Bow Loop -->
                <div class="w-7 h-5 sm:w-9 sm:h-6 rounded-full bg-gradient-to-r from-[#C26D82] to-[#B85D75] border border-[#A64F65] shadow-sm transform -rotate-20 origin-right"></div>
                
                <!-- Central Ribbon Knot (Rose Wax Seal Center) -->
                <div class="relative z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-[#9B4158] to-[#C9778E] border-2 border-white shadow-md flex items-center justify-center text-white">
                  <mat-icon class="text-base sm:text-lg">favorite</mat-icon>
                </div>
                
                <!-- Right Bow Loop -->
                <div class="w-7 h-5 sm:w-9 sm:h-6 rounded-full bg-gradient-to-l from-[#C26D82] to-[#B85D75] border border-[#A64F65] shadow-sm transform rotate-20 origin-left"></div>
              </div>

              <!-- Ribbon Tails (Dải ruy-băng thả mềm mại) -->
              <div class="flex items-center justify-center -mt-1 gap-2">
                <div class="w-3.5 h-6 sm:w-4 sm:h-8 bg-gradient-to-b from-[#B85D75] to-[#A64F65] rounded-b-sm transform -rotate-12 origin-top shadow-xs"></div>
                <div class="w-3.5 h-6 sm:w-4 sm:h-8 bg-gradient-to-b from-[#B85D75] to-[#A64F65] rounded-b-sm transform rotate-12 origin-top shadow-xs"></div>
              </div>
            </div>

            <!-- GOLDEN LIGHT BEAM EFFECT WHEN OPENING -->
            @if (isOpening()) {
              <div class="absolute inset-0 z-30 pointer-events-none flex items-center justify-center animate-pulse">
                <div class="w-48 h-48 rounded-full bg-amber-300/30 blur-2xl"></div>
              </div>
            }
          </div>
        </div>

        <!-- MAIN ACTION BUTTON: EXACT TEXT "GỬI THƯ" -->
        <button
          type="button"
          (click)="onSendLetter()"
          [disabled]="isOpening()"
          class="group relative px-10 sm:px-14 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-[#B85D75] via-[#C26D82] to-[#A64F65] hover:from-[#A64F65] hover:to-[#8E3B50] text-white font-serif tracking-widest text-sm sm:text-base font-bold shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer flex items-center justify-center gap-2.5 active:scale-95 border border-white/40"
        >
          <!-- Shimmer line on hover -->
          <div class="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
            <div class="w-1/2 h-full bg-white/20 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000"></div>
          </div>

          <mat-icon class="text-lg text-rose-200 transition-transform group-hover:scale-115">mail</mat-icon>
          <span class="tracking-widest uppercase">GỬI THƯ</span>
          <mat-icon class="text-sm text-rose-200 transition-transform group-hover:translate-x-1">arrow_forward</mat-icon>
        </button>

        <p class="text-[11px] font-serif text-[#A3878E] mt-3 tracking-wide">
          Nhấn để mở phong thư và bắt đầu khám phá khu vườn
        </p>
      </div>

      <!-- ANIMATED AUTUMN PETALS FLURRY (WHEN USER CLICKS GỬI THƯ) -->
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
  readonly enter = output<void>();

  readonly isOpening = signal<boolean>(false);
  readonly showPetals = signal<boolean>(false);
  readonly isFadingOut = signal<boolean>(false);

  // Background subtle floating decorative petals
  readonly ambientPetals = [
    { id: 1, left: 10, top: 15, size: 8, bg: '#F8B4A5', rot: 25, delay: 0 },
    { id: 2, left: 85, top: 20, size: 10, bg: '#EFA48B', rot: -40, delay: 1.5 },
    { id: 3, left: 25, top: 75, size: 9, bg: '#E297A6', rot: 50, delay: 2.2 },
    { id: 4, left: 78, top: 80, size: 7, bg: '#F6C28B', rot: -15, delay: 0.8 },
    { id: 5, left: 5, top: 60, size: 11, bg: '#DE8C9E', rot: 35, delay: 3.1 },
    { id: 6, left: 92, top: 55, size: 8, bg: '#EAA972', rot: -60, delay: 2.7 },
  ];

  // Dynamic flying petals generated on click "GỬI THƯ"
  activePetals: FallingPetal[] = [];

  onSendLetter(): void {
    if (this.isOpening()) return;

    // 1. Play auditory paper unsealing & gentle chime
    this.sound.playPaper();
    setTimeout(() => {
      this.sound.playChime();
    }, 250);

    // 2. Trigger envelope flap opening and letter slide
    this.isOpening.set(true);

    // 3. Generate burst of 28 autumn petals and leaves
    this.generatePetals();
    this.showPetals.set(true);

    // 4. Smooth screen fade-out sequence
    setTimeout(() => {
      this.isFadingOut.set(true);
    }, 750);

    // 5. Complete transition and reveal home interface
    setTimeout(() => {
      this.enter.emit();
    }, 1450);
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

    const types: ('petal' | 'maple' | 'leaf')[] = ['petal', 'petal', 'maple', 'leaf', 'petal'];

    this.activePetals = Array.from({ length: 32 }, (_, i) => {
      return {
        id: i,
        left: Math.random() * 96 + 2,
        delay: Math.random() * 0.45,
        duration: 2.2 + Math.random() * 1.8,
        driftX: (Math.random() - 0.4) * 220,
        rotation: Math.random() * 720 - 360,
        size: 14 + Math.random() * 16,
        color: colors[Math.floor(Math.random() * colors.length)],
        type: types[Math.floor(Math.random() * types.length)],
      };
    });
  }
}
