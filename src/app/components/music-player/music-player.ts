import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  signal,
  computed,
  viewChild,
  afterNextRender,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Music } from '../../services/music';
import { Sound } from '../../services/sound';

@Component({
  selector: 'app-music-player',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatIconModule, ReactiveFormsModule],
  template: `
    <!-- Hidden / Minimized YouTube IFrame Engine -->
    <div class="fixed -bottom-96 -right-96 w-10 h-10 pointer-events-none opacity-0 overflow-hidden" aria-hidden="true">
      <iframe
        #ytIframe
        id="love-have-yt-frame"
        width="200"
        height="200"
        [src]="trustedIframeSrc()"
        title="LOVE HAVE Garden Music"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>

    <!-- Floating Vintage Music Box Widget -->
    <div class="fixed bottom-4 right-4 z-40 transition-all duration-300">
      @if (isExpanded()) {
        <!-- Expanded Panel -->
        <div class="w-72 sm:w-80 bg-white/95 backdrop-blur-md border border-[#E9D5DA] rounded-2xl p-4 vintage-shadow-lg text-[#78666A] animate-slide-up">
          <!-- Header with Close/Minimize -->
          <div class="flex items-center justify-between border-b border-[#F2E5E8] pb-2 mb-3">
            <div class="flex items-center gap-2">
              <mat-icon class="text-[#C98F9E] text-base animate-spin-slow">music_note</mat-icon>
              <span class="font-serif-vintage font-semibold text-sm text-[#5B464B]">Nhạc Nền Khu Vườn</span>
            </div>
            <button
              type="button"
              (click)="toggleExpanded()"
              class="w-6 h-6 rounded-full hover:bg-[#FDF2F4] flex items-center justify-center text-[#A69094] transition-colors"
              title="Thu nhỏ"
            >
              <mat-icon class="text-sm">keyboard_arrow_down</mat-icon>
            </button>
          </div>

          <!-- Track Info & Floral Turntable -->
          <div class="flex items-center gap-3 mb-3">
            <!-- Spinning Botanical Disc -->
            <div
              class="relative w-12 h-12 rounded-full border-2 border-[#C98F9E]/40 flex items-center justify-center bg-gradient-to-tr from-[#FFF7ED] to-[#F7E1E6] shrink-0"
              [class.animate-spin-slow]="music.isPlaying()"
            >
              <div class="w-5 h-5 rounded-full border border-[#C98F9E]/60 flex items-center justify-center bg-white">
                <mat-icon class="text-[10px] text-[#C98F9E]">local_florist</mat-icon>
              </div>
            </div>

            <!-- Title & Status -->
            <div class="overflow-hidden flex-1">
              <p class="text-xs font-medium text-[#5B464B] truncate" [title]="music.trackTitle()">
                {{ music.trackTitle() }}
              </p>
              <p class="text-[11px] text-[#A69094] flex items-center gap-1 mt-0.5">
                <span class="w-1.5 h-1.5 rounded-full" [class.bg-emerald-400]="music.isPlaying()" [class.bg-rose-300]="!music.isPlaying()"></span>
                <span>{{ music.isPlaying() ? 'Đang ngân nga...' : 'Đang tạm dừng' }}</span>
              </p>
            </div>
          </div>

          <!-- Controls: Play/Pause, Mute, Volume -->
          <div class="flex items-center justify-between gap-2 bg-[#FFF7ED]/70 rounded-xl p-2 mb-3 border border-[#F3E5E8]">
            <button
              type="button"
              (click)="togglePlay()"
              class="w-9 h-9 rounded-full bg-[#C98F9E] hover:bg-[#B77A8A] text-white flex items-center justify-center shadow-xs transition-all active:scale-95"
              [title]="music.isPlaying() ? 'Tạm dừng' : 'Phát nhạc'"
            >
              <mat-icon class="text-lg">
                {{ music.isPlaying() ? 'pause' : 'play_arrow' }}
              </mat-icon>
            </button>

            <!-- Volume Slider -->
            <div class="flex items-center gap-1.5 flex-1 mx-2">
              <button
                type="button"
                (click)="toggleMute()"
                class="text-[#A69094] hover:text-[#5B464B] transition-colors"
                [title]="music.isMuted() ? 'Bật âm' : 'Tắt tiếng'"
              >
                <mat-icon class="text-base">
                  {{ music.isMuted() || music.volume() === 0 ? 'volume_off' : music.volume() < 40 ? 'volume_down' : 'volume_up' }}
                </mat-icon>
              </button>
              <input
                type="range"
                min="0"
                max="100"
                [value]="music.volume()"
                (input)="onVolumeChange($event)"
                class="w-full h-1 bg-[#EBCBD4] rounded-lg appearance-none cursor-pointer accent-[#C98F9E]"
              />
              <span class="text-[10px] text-[#A69094] w-6 text-right font-mono">{{ music.volume() }}%</span>
            </div>
          </div>

          <!-- YouTube Direct Link & Config Dropdown -->
          <div class="flex items-center justify-between text-[11px] text-[#9A84B8] pt-1">
            <a
              [href]="music.youtubeUrl()"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1 hover:text-[#78666A] transition-colors"
              title="Mở video trên YouTube"
            >
              <span>Mở trên YouTube</span>
              <mat-icon class="text-[12px]">open_in_new</mat-icon>
            </a>

            <button
              type="button"
              (click)="showUrlPrompt.set(!showUrlPrompt())"
              class="hover:text-[#5B464B] text-[#C98F9E] font-medium transition-colors"
            >
              {{ showUrlPrompt() ? 'Đóng cài đặt' : 'Đổi link nhạc' }}
            </button>
          </div>

          <!-- Custom YouTube URL Input -->
          @if (showUrlPrompt()) {
            <div class="mt-3 pt-3 border-t border-[#F2E5E8] flex flex-col gap-2">
              <label for="yt-music-input" class="text-[10px] text-[#8E7479] font-medium">Nhập đường dẫn YouTube mới:</label>
              <div class="flex gap-1.5">
                <input
                  id="yt-music-input"
                  type="text"
                  [formControl]="customUrlControl"
                  placeholder="https://www.youtube.com/watch?v=..."
                  class="flex-1 px-2.5 py-1 text-xs rounded-lg border border-[#E9D5DA] bg-white text-[#5B464B] focus:outline-none focus:border-[#C98F9E]"
                />
                <button
                  type="button"
                  (click)="applyCustomUrl()"
                  class="px-2.5 py-1 text-xs bg-[#C98F9E] text-white rounded-lg hover:bg-[#B77A8A] transition-colors"
                >
                  Lưu
                </button>
              </div>
            </div>
          }
        </div>
      } @else {
        <!-- Minimized Floating Pill Button -->
        <button
          type="button"
          (click)="toggleExpanded()"
          class="group flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-white/90 hover:bg-white backdrop-blur-md border border-[#E9D5DA] text-[#5B464B] vintage-shadow hover:scale-105 active:scale-95 transition-all cursor-pointer"
          title="Nhạc nền khu vườn"
        >
          <!-- Spinning Flower Disc Indicator -->
          <div
            class="w-6 h-6 rounded-full border border-[#C98F9E] flex items-center justify-center bg-[#FFF7ED]"
            [class.animate-spin-slow]="music.isPlaying()"
          >
            <mat-icon class="text-xs text-[#C98F9E]">local_florist</mat-icon>
          </div>

          <span class="text-xs font-serif-vintage font-medium hidden sm:inline">
            {{ music.isPlaying() ? 'Nhạc vườn ♫' : 'Bật nhạc ♪' }}
          </span>

          <mat-icon class="text-sm text-[#A69094] group-hover:text-[#C98F9E] transition-colors">
            {{ music.isPlaying() ? 'volume_up' : 'volume_mute' }}
          </mat-icon>
        </button>
      }
    </div>
  `,
  styles: [`
    @keyframes spinSlow {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    .animate-spin-slow {
      animation: spinSlow 8s linear infinite;
    }
    .animate-slide-up {
      animation: slideUp 0.25s ease-out forwards;
    }
    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(10px) scale(0.97);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }
  `],
})
export class MusicPlayer {
  readonly music = inject(Music);
  private sound = inject(Sound);
  private sanitizer = inject(DomSanitizer);

  readonly iframeRef = viewChild<ElementRef<HTMLIFrameElement>>('ytIframe');

  readonly isExpanded = signal<boolean>(false);
  readonly showUrlPrompt = signal<boolean>(false);
  readonly customUrlControl = new FormControl('');

  readonly trustedIframeSrc = computed<SafeResourceUrl>(() => {
    const id = this.music.videoId();
    const url = `https://www.youtube-nocookie.com/embed/${id}?enablejsapi=1&version=3&loop=1&playlist=${id}&controls=0&showinfo=0&rel=0&iv_load_policy=3`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  });

  constructor() {
    afterNextRender(() => {
      const el = this.iframeRef()?.nativeElement;
      if (el) {
        this.music.registerIframe(el);
      }
      this.customUrlControl.setValue(this.music.youtubeUrl());
    });
  }

  toggleExpanded(): void {
    this.sound.playClick();
    this.isExpanded.update((v) => !v);
  }

  togglePlay(): void {
    this.sound.playClick();
    this.music.togglePlay();
  }

  toggleMute(): void {
    this.sound.playClick();
    this.music.toggleMute();
  }

  onVolumeChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const vol = parseInt(target.value, 10);
    this.music.setVolume(vol);
  }

  applyCustomUrl(): void {
    const val = this.customUrlControl.value;
    if (val) {
      this.sound.playChime();
      this.music.setCustomYoutubeUrl(val);
      this.showUrlPrompt.set(false);
    }
  }
}
