import { ChangeDetectionStrategy, Component, inject, signal, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Sound } from '../../services/sound';
import { Music } from '../../services/music';

@Component({
  selector: 'app-welcome-envelope',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <div
      class="fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-700 backdrop-blur-md"
      [class.opacity-0]="isFadingOut()"
      [class.pointer-events-none]="isFadingOut()"
      style="background: radial-gradient(circle at center, rgba(255, 247, 237, 0.96) 0%, rgba(247, 226, 233, 0.94) 70%, rgba(225, 204, 218, 0.92) 100%);"
    >
      <!-- Decorative fairy ambient sparkles -->
      <div class="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div class="absolute top-10 left-12 w-28 h-28 rounded-full bg-[#EBCBD4]/40 blur-2xl animate-pulse"></div>
        <div class="absolute bottom-16 right-16 w-36 h-36 rounded-full bg-[#D8CEE9]/40 blur-2xl animate-pulse"></div>
      </div>

      <div class="relative w-full max-w-lg mx-auto text-center flex flex-col items-center">
        <!-- Title & Subtitle Header -->
        <div class="mb-6 animate-fade-in">
          <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 border border-[#C98F9E]/30 text-[#C98F9E] text-xs tracking-widest uppercase mb-3 shadow-xs">
            <mat-icon class="text-sm scale-75">favorite</mat-icon>
            <span>A Little Garden of Stories & Hearts</span>
            <mat-icon class="text-sm scale-75">favorite</mat-icon>
          </div>

          <h1 class="font-serif-vintage text-4xl sm:text-5xl md:text-6xl text-[#5B464B] tracking-tight font-medium drop-shadow-xs">
            LOVE HAVE
          </h1>

          <p class="mt-2 font-script-romantic text-xl sm:text-2xl text-[#8E7479] max-w-sm mx-auto">
            Có một khu vườn nhỏ đang chờ bạn khám phá...
          </p>
        </div>

        <!-- The Vintage Postal Envelope Visual -->
        <div class="relative w-72 sm:w-84 md:w-96 h-52 sm:h-60 mx-auto my-3 transition-transform duration-500" [class.scale-105]="isOpening()">
          <!-- Envelope Body Base -->
          <div class="absolute inset-0 bg-[#FAF4ED] rounded-2xl shadow-xl border-2 border-[#E5D2D6] overflow-hidden flex flex-col justify-end p-4">
            
            <!-- Delicate lace border pattern -->
            <div class="absolute inset-x-0 top-0 h-3 bg-repeat-x opacity-40" style="background-image: radial-gradient(circle at 6px 0px, transparent 4px, #C98F9E 4px); background-size: 12px 6px;"></div>

            <!-- Vintage Postal Stamp in upper right -->
            <div class="absolute top-4 right-4 w-12 h-14 bg-white border border-dashed border-[#C98F9E] rounded p-1 flex flex-col items-center justify-center shadow-xs rotate-3">
              <mat-icon class="text-[#C98F9E] text-base">local_florist</mat-icon>
              <span class="text-[8px] font-serif text-[#78666A] mt-0.5">POSTE</span>
              <span class="text-[7px] text-[#A69094]">1999</span>
            </div>

            <!-- Envelope Letter Sliding Up on Open -->
            <div
              class="absolute inset-x-6 bg-white rounded-t-lg border border-[#E9D9DC] p-3 text-left transition-all duration-700 vintage-shadow"
              [style.top]="isOpening() ? '-28%' : '35%'"
              [style.opacity]="isOpening() ? '1' : '0.85'"
            >
              <div class="w-12 h-1 bg-[#EBCBD4] rounded mb-1.5"></div>
              <div class="w-full h-1 bg-[#F1E5E8] rounded mb-1"></div>
              <div class="w-3/4 h-1 bg-[#F1E5E8] rounded"></div>
              <div class="mt-2 flex items-center justify-between text-[10px] text-[#A69094] font-serif">
                <span>To: A special visitor</span>
                <mat-icon class="text-[12px] text-[#C98F9E]">auto_awesome</mat-icon>
              </div>
            </div>

            <!-- Envelope Lower Fold Triangles -->
            <div class="absolute inset-0 pointer-events-none">
              <!-- Left fold -->
              <div class="absolute bottom-0 left-0 w-0 h-0 border-b-[100px] sm:border-b-[120px] border-b-[#F4ECE3] border-r-[144px] sm:border-r-[192px] border-r-transparent"></div>
              <!-- Right fold -->
              <div class="absolute bottom-0 right-0 w-0 h-0 border-b-[100px] sm:border-b-[120px] border-b-[#EFE7DE] border-l-[144px] sm:border-l-[192px] border-l-transparent"></div>
              <!-- Bottom fold -->
              <div class="absolute bottom-0 inset-x-0 h-0 border-b-[75px] sm:border-b-[90px] border-b-[#EBE1D7] border-x-[144px] sm:border-x-[192px] border-x-transparent opacity-90"></div>
            </div>

            <!-- Vintage Wax Seal in center -->
            <button
              type="button"
              class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-gradient-to-tr from-[#A65B6D] via-[#C98F9E] to-[#E3ADB9] text-white shadow-lg flex items-center justify-center transition-all duration-500 cursor-pointer border-0"
              [class.scale-125]="isOpening()"
              [class.rotate-45]="isOpening()"
              (click)="handleEnter()"
              aria-label="Mở phong bì"
            >
              <div class="w-10 h-10 rounded-full border border-white/40 flex items-center justify-center">
                <mat-icon class="text-lg">favorite</mat-icon>
              </div>
            </button>

            <!-- Envelope Flap Top -->
            <div
              class="absolute top-0 inset-x-0 h-0 border-t-[85px] sm:border-t-[100px] border-t-[#F0E6DB] border-x-[144px] sm:border-x-[192px] border-x-transparent origin-top transition-transform duration-700 z-10"
              [style.transform]="isOpening() ? 'rotateX(180deg)' : 'rotateX(0deg)'"
            ></div>
          </div>

          <!-- Petals Burst Animation when opening -->
          @if (isOpening()) {
            <div class="absolute -top-10 inset-x-0 flex justify-center items-center pointer-events-none">
              @for (i of burstParticles; track i) {
                <div
                  class="absolute animate-burst-petal text-[#C98F9E]"
                  [style.--tx]="i.x + 'px'"
                  [style.--ty]="i.y + 'px'"
                  [style.--rot]="i.rot + 'deg'"
                >
                  <mat-icon class="text-sm">local_florist</mat-icon>
                </div>
              }
            </div>
          }
        </div>

        <!-- The exact required CTA button: "Gửi thư" -->
        <div class="mt-8">
          <button
            type="button"
            (click)="handleEnter()"
            [disabled]="isOpening()"
            class="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full text-base font-medium tracking-wide text-white transition-all duration-300 transform active:scale-95 shadow-lg hover:shadow-xl cursor-pointer"
            style="background: linear-gradient(135deg, #C98F9E 0%, #B77A8A 50%, #A46575 100%);"
          >
            <!-- Glowing halo ring -->
            <span class="absolute inset-0 rounded-full bg-[#EBCBD4]/40 blur-md group-hover:blur-lg transition-all"></span>

            <mat-icon class="relative text-xl transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:rotate-6">
              mail_outline
            </mat-icon>
            <span class="relative font-medium tracking-wider text-white">Gửi thư</span>
            <mat-icon class="relative text-sm transition-transform duration-300 group-hover:translate-x-1">
              arrow_forward
            </mat-icon>
          </button>

          <p class="mt-3 text-xs text-[#9B8287] italic">
            Nhấn “Gửi thư” để mở cánh cổng bước vào khu vườn hoa
          </p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @keyframes burstPetal {
      0% {
        transform: translate(0, 0) rotate(0deg) scale(0.5);
        opacity: 1;
      }
      100% {
        transform: translate(var(--tx), var(--ty)) rotate(var(--rot)) scale(1.1);
        opacity: 0;
      }
    }

    .animate-burst-petal {
      animation: burstPetal 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    .animate-fade-in {
      animation: fadeIn 0.8s ease-out forwards;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `],
})
export class WelcomeEnvelope {
  private sound = inject(Sound);
  private music = inject(Music);

  readonly entered = output<void>();

  readonly isOpening = signal<boolean>(false);
  readonly isFadingOut = signal<boolean>(false);

  readonly burstParticles = [
    { x: -70, y: -60, rot: -45 },
    { x: -40, y: -90, rot: -20 },
    { x: 0, y: -100, rot: 15 },
    { x: 45, y: -80, rot: 35 },
    { x: 75, y: -50, rot: 60 },
    { x: -85, y: -20, rot: -70 },
    { x: 85, y: -15, rot: 80 },
  ];

  handleEnter(): void {
    if (this.isOpening()) return;

    // 1. Play paper rustle & celebratory chime
    this.sound.playPaper();
    setTimeout(() => this.sound.playChime(), 150);

    // 2. Animate envelope open & burst petals
    this.isOpening.set(true);

    // 3. Initiate YouTube music playback
    this.music.startGardenMusic();

    // 4. Fade out screen smoothly
    setTimeout(() => {
      this.isFadingOut.set(true);
    }, 700);

    // 5. Complete transition
    setTimeout(() => {
      this.entered.emit();
    }, 1100);
  }
}
