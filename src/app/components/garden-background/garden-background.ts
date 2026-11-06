import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { GardenTheme } from '../../services/garden-theme';
import { Sound } from '../../services/sound';

interface Particle {
  type: 'maple' | 'ginkgo' | 'petal' | 'blossom';
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotSpeed: number;
  flip: number;
  flipSpeed: number;
  color: string;
  opacity: number;
  swayFreq: number;
  swayAmp: number;
  timeOffset: number;
}

interface Butterfly {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  speed: number;
  scale: number;
  color: string;
  wingAngle: number;
  wingSpeed: number;
  heading: number;
}

@Component({
  selector: 'app-garden-background',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatIconModule],
  template: `
    <div class="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none" aria-hidden="true">
      <!-- Base Master #FFC0CB Palette Gradient (Soothing, Not Harsh) -->
      <div class="absolute inset-0 bg-[#FFC0CB]"></div>

      <!-- Dreamy Autumn Garden Atmospheric Wash (Blends cream, blush, peach, beige, soft leaf green) -->
      <div class="absolute inset-0 bg-gradient-to-br from-[#FFFDF8]/70 via-[#FFD8E2]/55 to-[#FFD5C8]/50"></div>
      
      <!-- Luminous Fairy-Tale Garden Light Dappling -->
      <div class="absolute -top-40 -left-40 w-[42rem] h-[42rem] bg-gradient-to-br from-[#FFF9F2]/75 to-[#FFE4EC]/40 rounded-full blur-3xl"></div>
      <div class="absolute top-1/4 -right-48 w-[38rem] h-[38rem] bg-gradient-to-bl from-[#FFE8DE]/60 via-[#FFF4EB]/50 to-transparent rounded-full blur-3xl"></div>
      <div class="absolute bottom-10 left-1/5 w-[36rem] h-[36rem] bg-gradient-to-tr from-[#EBF2E8]/45 via-[#FFDFE7]/50 to-transparent rounded-full blur-3xl"></div>
      <div class="absolute -bottom-36 right-1/4 w-[34rem] h-[34rem] bg-gradient-to-t from-[#FFF6ED]/60 to-[#FCE3EC]/35 rounded-full blur-3xl"></div>

      <!-- Subtle Fairy Garden Texture Grid -->
      <div class="absolute inset-0 opacity-[0.035] bg-[radial-gradient(#8E5A68_1px,transparent_1px)] [background-size:28px_28px]"></div>

      <!-- Dynamic Canvas: Falling Autumn Leaves, Petals & Graceful Butterflies -->
      @if (theme.windMode() !== 'off') {
        <canvas
          #autumnCanvas
          class="absolute inset-0 w-full h-full pointer-events-none"
        ></canvas>
      }

      <!-- Top-Left Swaying Botanical Branch with Autumn Leaves, Blossoms & Bow -->
      <div class="absolute -top-6 -left-6 w-56 sm:w-80 h-56 sm:h-80 opacity-80 pointer-events-none autumn-branch-left">
        <svg viewBox="0 0 320 320" fill="none" class="w-full h-full drop-shadow-xs">
          <!-- Main Woody Branch -->
          <path d="M-10 -10 C 60 50, 130 90, 210 110 C 260 120, 290 150, 310 190" stroke="#8E6A56" stroke-width="4.5" stroke-linecap="round"/>
          <path d="M90 68 C 130 50, 180 40, 240 30" stroke="#9A7561" stroke-width="3" stroke-linecap="round"/>
          <path d="M170 100 C 190 140, 220 170, 250 200" stroke="#9A7561" stroke-width="2.5" stroke-linecap="round"/>

          <!-- Gentle Autumn Leaves (Peach, Green, Blush) -->
          <!-- Leaf 1: Soft Maple Peach -->
          <g transform="translate(140, 52) rotate(25)" class="leaf-sway">
            <path d="M0 0 C 15 -18, 32 -10, 42 0 C 32 10, 15 18, 0 0" fill="#FFB7A5" fill-opacity="0.85"/>
            <path d="M0 0 L 36 0" stroke="#D97A66" stroke-width="0.8"/>
          </g>
          <!-- Leaf 2: Gentle Meadow Green -->
          <g transform="translate(200, 34) rotate(-15)" class="leaf-sway">
            <path d="M0 0 C 14 -16, 28 -8, 38 0 C 28 8, 14 16, 0 0" fill="#8FA88B" fill-opacity="0.85"/>
            <path d="M0 0 L 32 0" stroke="#6F886B" stroke-width="0.8"/>
          </g>
          <!-- Leaf 3: Golden Ginkgo Fan -->
          <g transform="translate(250, 130) rotate(55)">
            <path d="M0 0 C 8 -22, 28 -28, 35 -14 C 40 2, 22 18, 0 0" fill="#F8C779" fill-opacity="0.85"/>
            <path d="M0 0 L 25 -8" stroke="#D49A44" stroke-width="0.8"/>
          </g>
          <!-- Leaf 4: Rose Blush Leaf -->
          <g transform="translate(225, 185) rotate(-30)">
            <path d="M0 0 C 12 -14, 25 -6, 32 0 C 25 6, 12 14, 0 0" fill="#FFB6C1" fill-opacity="0.85"/>
          </g>

          <!-- Autumn Floral Blossom (5-petal Pink Camellia) -->
          <g transform="translate(185, 95)">
            <circle cx="-10" cy="-6" r="9" fill="#FFFDF8" stroke="#F5CAD5" stroke-width="1"/>
            <circle cx="10" cy="-6" r="9" fill="#FFD1DC" stroke="#F5CAD5" stroke-width="1"/>
            <circle cx="12" cy="10" r="9" fill="#FFB6C1" stroke="#F5CAD5" stroke-width="1"/>
            <circle cx="-6" cy="14" r="9" fill="#FFD6DF" stroke="#F5CAD5" stroke-width="1"/>
            <circle cx="-13" cy="4" r="9" fill="#FFF5F7" stroke="#F5CAD5" stroke-width="1"/>
            <circle cx="0" cy="3" r="5" fill="#FFE885"/>
          </g>

          <!-- Dainty Pastel Pink Silk Ribbon / Bow -->
          <g transform="translate(85, 62) scale(0.9)">
            <!-- Bow Left Loop -->
            <path d="M0 0 C -18 -15, -25 5, -3 10 Z" fill="#FFB6C1" fill-opacity="0.95" stroke="#ECA0AF" stroke-width="1"/>
            <!-- Bow Right Loop -->
            <path d="M0 0 C 18 -15, 25 5, 3 10 Z" fill="#FFB6C1" fill-opacity="0.95" stroke="#ECA0AF" stroke-width="1"/>
            <!-- Knot -->
            <circle cx="0" cy="5" r="4" fill="#FFA5B5"/>
            <!-- Tails -->
            <path d="M-2 8 C -8 18, -14 26, -18 32 C -12 28, -6 24, -2 12" fill="#FFC0CB"/>
            <path d="M2 8 C 8 18, 14 26, 18 32 C 12 28, 6 24, 2 12" fill="#FFC0CB"/>
          </g>
        </svg>
      </div>

      <!-- Bottom-Right Swaying Botanical Branch with Autumn Leaves, Berries & Blossoms -->
      <div class="absolute -bottom-8 -right-8 w-60 sm:w-88 h-60 sm:h-88 opacity-75 pointer-events-none autumn-branch-right">
        <svg viewBox="0 0 340 340" fill="none" class="w-full h-full drop-shadow-xs">
          <!-- Main Branch from Bottom Right -->
          <path d="M350 350 C 270 280, 200 240, 120 220 C 70 205, 40 170, 20 120" stroke="#8E6A56" stroke-width="4.5" stroke-linecap="round"/>
          <path d="M220 250 C 180 270, 130 280, 70 300" stroke="#9A7561" stroke-width="3" stroke-linecap="round"/>
          <path d="M140 220 C 120 175, 90 145, 60 120" stroke="#9A7561" stroke-width="2.5" stroke-linecap="round"/>

          <!-- Autumn Leaves -->
          <g transform="translate(160, 265) rotate(145)" class="leaf-sway">
            <path d="M0 0 C 16 -18, 30 -10, 40 0 C 30 10, 16 18, 0 0" fill="#FFB7A5" fill-opacity="0.85"/>
          </g>
          <g transform="translate(100, 210) rotate(-65)" class="leaf-sway">
            <path d="M0 0 C 15 -16, 28 -8, 36 0 C 28 8, 15 16, 0 0" fill="#8FA88B" fill-opacity="0.85"/>
          </g>
          <g transform="translate(70, 160) rotate(35)">
            <path d="M0 0 C 10 -22, 26 -26, 34 -12 C 38 2, 20 16, 0 0" fill="#F8C779" fill-opacity="0.85"/>
          </g>

          <!-- Autumn Berry Cluster -->
          <circle cx="175" cy="235" r="4" fill="#D9534F"/>
          <circle cx="182" cy="242" r="3.5" fill="#E67E22"/>
          <circle cx="170" cy="245" r="4" fill="#C0392B"/>

          <!-- Flower Blossom -->
          <g transform="translate(125, 215)">
            <circle cx="-8" cy="-5" r="8" fill="#FFFDF8" stroke="#F5CAD5" stroke-width="1"/>
            <circle cx="8" cy="-5" r="8" fill="#FFD1DC" stroke="#F5CAD5" stroke-width="1"/>
            <circle cx="9" cy="8" r="8" fill="#FFB6C1" stroke="#F5CAD5" stroke-width="1"/>
            <circle cx="-5" cy="11" r="8" fill="#FFD6DF" stroke="#F5CAD5" stroke-width="1"/>
            <circle cx="-11" cy="3" r="8" fill="#FFF5F7" stroke="#F5CAD5" stroke-width="1"/>
            <circle cx="0" cy="2" r="4.5" fill="#FFE885"/>
          </g>

          <!-- Soft Silk Bow Accent -->
          <g transform="translate(230, 260) scale(0.85)">
            <path d="M0 0 C -16 -14, -22 4, -3 8 Z" fill="#FFBFA9" fill-opacity="0.95" stroke="#EAA28D" stroke-width="1"/>
            <path d="M0 0 C 16 -14, 22 4, 3 8 Z" fill="#FFBFA9" fill-opacity="0.95" stroke="#EAA28D" stroke-width="1"/>
            <circle cx="0" cy="4" r="3.5" fill="#E89680"/>
            <path d="M-2 6 C -6 14, -10 22, -14 26 C -9 23, -5 19, -2 9" fill="#FFC9BA"/>
            <path d="M2 6 C 6 14, 10 22, 14 26 C 9 23, 5 19, 2 9" fill="#FFC9BA"/>
          </g>
        </svg>
      </div>

      <!-- Randomized Decorative Botanical Flowers (Generated dynamically) -->
      @for (flower of theme.decorativeFlowers(); track flower.id) {
        <div
          class="absolute pointer-events-none transition-all duration-700 ease-out hidden lg:block"
          [style.left.%]="flower.xPercent"
          [style.top.%]="flower.yPercent"
          [style.transform]="'rotate(' + flower.rotation + 'deg) scale(' + flower.scale + ')'"
          [style.opacity]="0.75"
        >
          <svg width="44" height="44" viewBox="-22 -22 44 44" class="drop-shadow-xs">
            <!-- Leaves Behind -->
            <path d="M-6 -8 C -18 -18, -20 -4, -6 0 Z" [attr.fill]="flower.leafColor" opacity="0.85"/>
            <path d="M6 8 C 18 18, 20 4, 6 0 Z" [attr.fill]="flower.leafColor" opacity="0.85"/>

            <!-- 5 Petals -->
            @for (angle of [0, 72, 144, 216, 288]; track angle) {
              <path
                d="M0 0 C -7 -16, 7 -16, 0 0"
                [attr.transform]="'rotate(' + angle + ')'"
                [attr.fill]="flower.petalColor"
                stroke="#FFFDF8"
                stroke-width="0.8"
                opacity="0.9"
              />
            }
            <!-- Golden Flower Center -->
            <circle cx="0" cy="0" r="4.5" [attr.fill]="flower.centerColor" stroke="#E5B25D" stroke-width="0.5"/>

            <!-- Optional Mini Ribbon -->
            @if (flower.hasRibbon) {
              <g transform="translate(0, 7) scale(0.6)">
                <path d="M0 0 C -10 -8, -14 2, -2 4 Z" [attr.fill]="flower.ribbonColor"/>
                <path d="M0 0 C 10 -8, 14 2, 2 4 Z" [attr.fill]="flower.ribbonColor"/>
                <circle cx="0" cy="2" r="2" [attr.fill]="flower.color"/>
              </g>
            }
          </svg>
        </div>
      }
    </div>

    <!-- Floating Interactive Garden Settings Widget (Bottom-Left) -->
    <div class="fixed bottom-4 left-4 z-30 pointer-events-auto">
      <div class="flex items-center gap-1.5 p-1 rounded-full bg-white/85 backdrop-blur-md border border-[#F0BAC8] shadow-md text-xs text-[#5B464B]">
        <!-- Wind / Performance Toggle -->
        <button
          type="button"
          (click)="onToggleWind()"
          class="px-2.5 py-1 rounded-full hover:bg-[#FAF0E6] transition-colors flex items-center gap-1 cursor-pointer font-serif"
          [title]="'Chế độ gió thu: ' + (theme.windMode() === 'gentle' ? 'Nhẹ nhàng' : theme.windMode() === 'low' ? 'Tiết kiệm pin' : 'Tĩnh lặng')"
        >
          <mat-icon class="text-sm text-[#C98F9E]">
            {{ theme.windMode() === 'gentle' ? 'air' : theme.windMode() === 'low' ? 'eco' : 'power_settings_new' }}
          </mat-icon>
          <span class="hidden sm:inline font-medium">
            {{ theme.windMode() === 'gentle' ? 'Gió thu: Nhẹ' : theme.windMode() === 'low' ? 'Gió thu: Êm' : 'Tĩnh lặng' }}
          </span>
        </button>

        <span class="text-[#E9D0D6]">|</span>

        <!-- Randomize / Shuffle Garden Flowers Button -->
        <button
          type="button"
          (click)="onShuffleFlowers()"
          title="Đổi hoa trang trí ngẫu nhiên quanh khu vườn"
          class="px-2.5 py-1 rounded-full hover:bg-[#FCE8ED] text-[#A65B6D] transition-colors flex items-center gap-1 cursor-pointer font-serif"
        >
          <mat-icon class="text-sm">autorenew</mat-icon>
          <span class="hidden sm:inline font-medium">Đổi hoa</span>
        </button>
      </div>
    </div>
  `,
})
export class GardenBackground implements OnInit, OnDestroy {
  @ViewChild('autumnCanvas') canvasRef?: ElementRef<HTMLCanvasElement>;

  readonly theme = inject(GardenTheme);
  readonly sound = inject(Sound);

  private ctx: CanvasRenderingContext2D | null = null;
  private animFrameId: number | null = null;
  private width = 0;
  private height = 0;
  private isVisible = true;

  // Particle storage
  private particles: Particle[] = [];
  private butterflies: Butterfly[] = [];

  // Wind state
  private windPhase = 0;

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this.onResize);
      document.addEventListener('visibilitychange', this.onVisibilityChange);
      setTimeout(() => this.initCanvas(), 60);
    }
  }

  ngOnDestroy(): void {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.onResize);
      document.removeEventListener('visibilitychange', this.onVisibilityChange);
    }
    if (this.animFrameId !== null) {
      cancelAnimationFrame(this.animFrameId);
    }
  }

  onToggleWind(): void {
    this.sound.playClick();
    this.theme.toggleWindMode();
    this.reinitParticles();
  }

  onShuffleFlowers(): void {
    this.sound.playFlower();
    this.theme.randomizeFlowers();
  }

  private onVisibilityChange = (): void => {
    if (typeof document !== 'undefined') {
      this.isVisible = !document.hidden;
      if (this.isVisible && !this.animFrameId) {
        this.renderLoop();
      }
    }
  };

  private onResize = (): void => {
    this.setupCanvasSize();
  };

  private initCanvas(): void {
    const canvas = this.canvasRef?.nativeElement;
    if (!canvas) return;

    this.ctx = canvas.getContext('2d');
    if (!this.ctx) return;

    this.setupCanvasSize();
    this.createParticles();
    this.createButterflies();

    if (this.theme.windMode() !== 'off') {
      this.renderLoop();
    }
  }

  private setupCanvasSize(): void {
    const canvas = this.canvasRef?.nativeElement;
    if (!canvas) return;

    this.width = window.innerWidth;
    this.height = window.innerHeight;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = this.width * dpr;
    canvas.height = this.height * dpr;

    if (this.ctx) {
      this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
  }

  private reinitParticles(): void {
    this.particles = [];
    this.butterflies = [];
    if (this.theme.windMode() !== 'off') {
      this.createParticles();
      this.createButterflies();
      if (!this.animFrameId) {
        this.renderLoop();
      }
    } else {
      if (this.animFrameId !== null) {
        cancelAnimationFrame(this.animFrameId);
        this.animFrameId = null;
      }
      if (this.ctx && this.canvasRef) {
        this.ctx.clearRect(0, 0, this.width, this.height);
      }
    }
  }

  private createParticles(): void {
    const count = this.theme.windMode() === 'low' ? 10 : 24;
    const types: Particle['type'][] = ['maple', 'ginkgo', 'petal', 'blossom'];
    const colors = [
      '#FFB7A5', // Peach autumn
      '#FFB6C1', // Blush pink
      '#F8C779', // Golden ginkgo amber
      '#FFD6DF', // Light rose
      '#FADBD8', // Soft warm cream
      '#8FA88B', // Soft meadow green
      '#E67E72', // Terracotta rose
    ];

    for (let i = 0; i < count; i++) {
      this.particles.push({
        type: types[i % types.length],
        x: Math.random() * (this.width || 1200),
        y: Math.random() * (this.height || 800),
        size: 10 + Math.random() * 14,
        speedY: 0.6 + Math.random() * 0.9,
        speedX: 0.2 + Math.random() * 0.4,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 1.5,
        flip: Math.random() * Math.PI,
        flipSpeed: 0.02 + Math.random() * 0.03,
        color: colors[i % colors.length],
        opacity: 0.55 + Math.random() * 0.35,
        swayFreq: 0.008 + Math.random() * 0.012,
        swayAmp: 18 + Math.random() * 25,
        timeOffset: Math.random() * 1000,
      });
    }
  }

  private createButterflies(): void {
    const count = this.theme.windMode() === 'low' ? 1 : 2;
    const colors = ['#FFAEC9', '#FFD1DC', '#FFDAC6'];

    for (let i = 0; i < count; i++) {
      this.butterflies.push({
        x: (this.width * 0.2) + Math.random() * (this.width * 0.6),
        y: (this.height * 0.2) + Math.random() * (this.height * 0.6),
        targetX: Math.random() * this.width,
        targetY: Math.random() * this.height,
        speed: 0.55 + Math.random() * 0.35,
        scale: 0.75 + Math.random() * 0.25,
        color: colors[i % colors.length],
        wingAngle: 0,
        wingSpeed: 0.16 + Math.random() * 0.08,
        heading: 0,
      });
    }
  }

  private renderLoop = (): void => {
    if (!this.isVisible || this.theme.windMode() === 'off') {
      this.animFrameId = null;
      return;
    }

    if (!this.ctx) {
      const canvas = this.canvasRef?.nativeElement;
      if (canvas) this.ctx = canvas.getContext('2d');
    }

    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.width, this.height);

      this.windPhase += 0.01;
      const globalWind = Math.sin(this.windPhase) * 0.5;

      // Update & Draw Particles
      this.updateAndDrawParticles(globalWind);

      // Update & Draw Butterflies
      this.updateAndDrawButterflies();
    }

    this.animFrameId = requestAnimationFrame(this.renderLoop);
  };

  private updateAndDrawParticles(globalWind: number): void {
    if (!this.ctx) return;
    const ctx = this.ctx;
    const now = Date.now();

    for (const p of this.particles) {
      // Natural horizontal sway & downward drift
      const sway = Math.sin((now * p.swayFreq) + p.timeOffset) * p.swayAmp * 0.05;
      p.x += p.speedX + globalWind + sway;
      p.y += p.speedY;
      p.rotation += p.rotSpeed;
      p.flip += p.flipSpeed;

      // Wrap around screen edges
      if (p.y > this.height + 30) {
        p.y = -30;
        p.x = Math.random() * this.width;
      }
      if (p.x > this.width + 40) {
        p.x = -40;
      } else if (p.x < -40) {
        p.x = this.width + 40;
      }

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.scale(Math.cos(p.flip), 1);
      ctx.globalAlpha = p.opacity;

      this.drawParticleShape(ctx, p);

      ctx.restore();
    }
  }

  private drawParticleShape(ctx: CanvasRenderingContext2D, p: Particle): void {
    ctx.fillStyle = p.color;

    if (p.type === 'maple') {
      // 3-lobed Autumn Maple Leaf
      const s = p.size;
      ctx.beginPath();
      ctx.moveTo(0, s * 0.5);
      ctx.lineTo(s * 0.2, s * 0.2);
      ctx.lineTo(s * 0.6, s * 0.25);
      ctx.lineTo(s * 0.35, 0);
      ctx.lineTo(s * 0.5, -s * 0.4);
      ctx.lineTo(s * 0.2, -s * 0.25);
      ctx.lineTo(0, -s * 0.6);
      ctx.lineTo(-s * 0.2, -s * 0.25);
      ctx.lineTo(-s * 0.5, -s * 0.4);
      ctx.lineTo(-s * 0.35, 0);
      ctx.lineTo(-s * 0.6, s * 0.25);
      ctx.lineTo(-s * 0.2, s * 0.2);
      ctx.closePath();
      ctx.fill();

      // Delicate stem
      ctx.strokeStyle = '#8E5A48';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, s * 0.2);
      ctx.lineTo(0, s * 0.6);
      ctx.stroke();
    } else if (p.type === 'ginkgo') {
      // Fan-shaped Autumn Ginkgo Leaf
      const s = p.size;
      ctx.beginPath();
      ctx.moveTo(0, s * 0.4);
      ctx.quadraticCurveTo(s * 0.5, s * 0.1, s * 0.6, -s * 0.4);
      ctx.quadraticCurveTo(s * 0.2, -s * 0.6, 0, -s * 0.45);
      ctx.quadraticCurveTo(-s * 0.2, -s * 0.6, -s * 0.6, -s * 0.4);
      ctx.quadraticCurveTo(-s * 0.5, s * 0.1, 0, s * 0.4);
      ctx.fill();

      // Stem
      ctx.strokeStyle = '#C9933B';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, s * 0.3);
      ctx.lineTo(0, s * 0.65);
      ctx.stroke();
    } else if (p.type === 'blossom') {
      // 5-petal Autumn Blossom
      const r = p.size * 0.4;
      for (let a = 0; a < 5; a++) {
        const rad = (a * 72 * Math.PI) / 180;
        const px = Math.cos(rad) * r;
        const py = Math.sin(rad) * r;
        ctx.beginPath();
        ctx.arc(px, py, r * 0.85, 0, Math.PI * 2);
        ctx.fill();
      }
      // Center
      ctx.fillStyle = '#FFE680';
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.45, 0, Math.PI * 2);
      ctx.fill();
    } else {
      // Gentle Oval Petal
      const s = p.size * 0.65;
      ctx.beginPath();
      ctx.ellipse(0, 0, s * 0.6, s, 0, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  private updateAndDrawButterflies(): void {
    if (!this.ctx) return;
    const ctx = this.ctx;

    for (const b of this.butterflies) {
      // Wander toward target slowly
      const dx = b.targetX - b.x;
      const dy = b.targetY - b.y;
      const dist = Math.sqrt((dx * dx) + (dy * dy));

      if (dist < 40) {
        // Pick new relaxed destination
        b.targetX = (this.width * 0.1) + Math.random() * (this.width * 0.8);
        b.targetY = (this.height * 0.1) + Math.random() * (this.height * 0.8);
      }

      b.heading = Math.atan2(dy, dx);
      b.x += Math.cos(b.heading) * b.speed;
      b.y += Math.sin(b.heading) * b.speed;

      // Soft wing flap oscillation
      b.wingAngle += b.wingSpeed;
      const flapScale = Math.sin(b.wingAngle);

      ctx.save();
      ctx.translate(b.x, b.y);
      ctx.rotate(b.heading + (Math.PI / 2));
      ctx.scale(b.scale, b.scale);

      // Draw Butterfly Body
      ctx.fillStyle = '#6E4852';
      ctx.beginPath();
      ctx.ellipse(0, 0, 1.8, 8, 0, 0, Math.PI * 2);
      ctx.fill();

      // Antennas
      ctx.strokeStyle = '#6E4852';
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(-1, -7);
      ctx.quadraticCurveTo(-5, -12, -4, -14);
      ctx.moveTo(1, -7);
      ctx.quadraticCurveTo(5, -12, 4, -14);
      ctx.stroke();

      // Left Wing
      ctx.save();
      ctx.scale(Math.abs(flapScale), 1);
      ctx.fillStyle = b.color;
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 0.8;

      ctx.beginPath();
      ctx.moveTo(-1, -2);
      ctx.bezierCurveTo(-14, -16, -20, 2, -1, 5);
      ctx.bezierCurveTo(-15, 8, -12, 16, -1, 4);
      ctx.fill();
      ctx.stroke();
      ctx.restore();

      // Right Wing
      ctx.save();
      ctx.scale(-Math.abs(flapScale), 1);
      ctx.fillStyle = b.color;
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 0.8;

      ctx.beginPath();
      ctx.moveTo(-1, -2);
      ctx.bezierCurveTo(-14, -16, -20, 2, -1, 5);
      ctx.bezierCurveTo(-15, 8, -12, 16, -1, 4);
      ctx.fill();
      ctx.stroke();
      ctx.restore();

      ctx.restore();
    }
  }
}
