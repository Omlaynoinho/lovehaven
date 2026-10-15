import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-garden-background',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none" aria-hidden="true">
      <!-- Ambient garden gradient layers -->
      <div class="absolute inset-0 bg-gradient-to-b from-[#FFF7ED] via-[#FDF3F5]/80 to-[#FAF0EA]/90"></div>
      
      <!-- Soft dappled light & sunbeams -->
      <div class="absolute -top-32 -left-20 w-96 h-96 rounded-full bg-[#EBCBD4]/25 blur-3xl"></div>
      <div class="absolute top-1/3 -right-24 w-[28rem] h-[28rem] rounded-full bg-[#D8CEE9]/20 blur-3xl"></div>
      <div class="absolute -bottom-24 left-1/4 w-[32rem] h-[32rem] rounded-full bg-[#B8C8B0]/20 blur-3xl"></div>

      <!-- Falling autumn leaves & floating petals -->
      @for (leaf of leaves; track leaf.id) {
        <div
          class="absolute animate-leaf-fall opacity-70"
          [style.left]="leaf.left + '%'"
          [style.animation-delay]="leaf.delay + 's'"
          [style.animation-duration]="leaf.duration + 's'"
          [style.transform]="'scale(' + leaf.scale + ')'"
        >
          @if (leaf.type === 'maple') {
            <!-- Autumn Maple Leaf SVG -->
            <svg class="w-6 h-6 text-[#C98F9E]/80 filter drop-shadow-sm" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L13.8 6.5L18.5 5.5L16.5 10L21 12L16.5 14L18.5 18.5L13.8 17.5L12 22L10.2 17.5L5.5 18.5L7.5 14L3 12L7.5 10L5.5 5.5L10.2 6.5L12 2Z" />
            </svg>
          } @else if (leaf.type === 'petal') {
            <!-- Soft Flower Petal SVG -->
            <svg class="w-5 h-5 text-[#EBCBD4] filter drop-shadow-sm" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8 6 6 10 6 14C6 18 9 21 12 22C15 21 18 18 18 14C18 10 16 6 12 2Z" />
            </svg>
          } @else {
            <!-- Small Autumn Birch Leaf SVG -->
            <svg class="w-4 h-4 text-[#D6A987]/70 filter drop-shadow-sm" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C15 6 19 10 19 15C19 19 16 22 12 22C8 22 5 19 5 15C5 10 9 6 12 2Z" />
            </svg>
          }
        </div>
      }

      <!-- Delicate hovering butterflies positioned gracefully at outskirts -->
      <div class="absolute top-24 left-8 animate-butterfly-hover hidden sm:block opacity-65">
        <svg class="w-7 h-7 text-[#C98F9E]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 11C11.5 8 9 5 6 6C3 7 3.5 12 6.5 13C3.5 14 3 19 6 20C9 21 11.5 18 12 15C12.5 18 15 21 18 20C21 19 20.5 14 17.5 13C20.5 12 21 7 18 6C15 5 12.5 8 12 11Z" />
        </svg>
      </div>

      <div class="absolute top-2/3 right-10 animate-butterfly-hover-alt hidden md:block opacity-60">
        <svg class="w-6 h-6 text-[#9A84B8]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 11C11.5 8 9 5 6 6C3 7 3.5 12 6.5 13C3.5 14 3 19 6 20C9 21 11.5 18 12 15C12.5 18 15 21 18 20C21 19 20.5 14 17.5 13C20.5 12 21 7 18 6C15 5 12.5 8 12 11Z" />
        </svg>
      </div>

      <!-- Glowing gentle dust motes -->
      @for (mote of motes; track mote.id) {
        <div
          class="absolute rounded-full bg-[#FFE5B4]/60 animate-mote-pulse"
          [style.left]="mote.x + '%'"
          [style.top]="mote.y + '%'"
          [style.width]="mote.size + 'px'"
          [style.height]="mote.size + 'px'"
          [style.animation-delay]="mote.delay + 's'"
          [style.animation-duration]="mote.duration + 's'"
        ></div>
      }
    </div>
  `,
  styles: [`
    @keyframes leafFall {
      0% {
        transform: translateY(-80px) rotate(0deg) translateX(0);
        opacity: 0;
      }
      10% {
        opacity: 0.75;
      }
      85% {
        opacity: 0.65;
      }
      100% {
        transform: translateY(105vh) rotate(360deg) translateX(40px);
        opacity: 0;
      }
    }

    @keyframes butterflyHover {
      0%, 100% {
        transform: translate(0, 0) rotate(2deg) scale(1);
      }
      30% {
        transform: translate(12px, -18px) rotate(-4deg) scale(0.96);
      }
      70% {
        transform: translate(-10px, 14px) rotate(5deg) scale(1.02);
      }
    }

    @keyframes butterflyHoverAlt {
      0%, 100% {
        transform: translate(0, 0) rotate(-3deg);
      }
      40% {
        transform: translate(-16px, -20px) rotate(6deg);
      }
      80% {
        transform: translate(14px, 10px) rotate(-4deg);
      }
    }

    @keyframes motePulse {
      0%, 100% {
        transform: scale(0.8) translateY(0);
        opacity: 0.2;
      }
      50% {
        transform: scale(1.4) translateY(-15px);
        opacity: 0.65;
      }
    }

    .animate-leaf-fall {
      animation: leafFall linear infinite;
    }
    .animate-butterfly-hover {
      animation: butterflyHover 7s ease-in-out infinite;
    }
    .animate-butterfly-hover-alt {
      animation: butterflyHoverAlt 9s ease-in-out infinite;
    }
    .animate-mote-pulse {
      animation: motePulse ease-in-out infinite;
    }
  `],
})
export class GardenBackground {
  readonly leaves = [
    { id: 1, type: 'maple', left: 8, delay: 0, duration: 16, scale: 0.9 },
    { id: 2, type: 'petal', left: 24, delay: 4, duration: 13, scale: 0.8 },
    { id: 3, type: 'birch', left: 42, delay: 8, duration: 18, scale: 0.75 },
    { id: 4, type: 'petal', left: 58, delay: 2, duration: 15, scale: 0.85 },
    { id: 5, type: 'maple', left: 74, delay: 11, duration: 20, scale: 0.7 },
    { id: 6, type: 'petal', left: 88, delay: 6, duration: 14, scale: 0.9 },
    { id: 7, type: 'birch', left: 16, delay: 13, duration: 19, scale: 0.65 },
    { id: 8, type: 'petal', left: 82, delay: 15, duration: 16, scale: 0.8 },
  ];

  readonly motes = [
    { id: 1, x: 14, y: 22, size: 4, delay: 0.5, duration: 4.5 },
    { id: 2, x: 38, y: 48, size: 5, delay: 1.2, duration: 5.5 },
    { id: 3, x: 72, y: 18, size: 4, delay: 2.5, duration: 4 },
    { id: 4, x: 84, y: 62, size: 6, delay: 0.8, duration: 6 },
    { id: 5, x: 50, y: 80, size: 3, delay: 3.1, duration: 5.2 },
  ];
}
