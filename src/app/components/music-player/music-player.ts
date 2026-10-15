import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  afterNextRender,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { Music } from '../../services/music';
import { Sound } from '../../services/sound';

@Component({
  selector: 'app-music-player',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatIconModule, ReactiveFormsModule],
  template: `
    <!-- Hidden YouTube Player Container (managed by YT.Player API) -->
    <div class="fixed -bottom-96 -right-96 w-10 h-10 pointer-events-none opacity-0 overflow-hidden" aria-hidden="true">
      <div id="love-have-yt-player"></div>
    </div>

    <!-- Floating Vintage Music Box Widget -->
    <div class="fixed bottom-4 right-4 z-40 transition-all duration-300">
      @if (isExpanded()) {
        <!-- Expanded Panel -->
        <div class="w-72 sm:w-84 bg-white/95 backdrop-blur-md border border-[#E9D5DA] rounded-2xl p-4 vintage-shadow-lg text-[#78666A] animate-slide-up">
          <!-- Header with Close/Minimize -->
          <div class="flex items-center justify-between border-b border-[#F2E5E8] pb-2 mb-3">
            <div class="flex items-center gap-2">
              <mat-icon class="text-[#C98F9E] text-base animate-spin-slow">music_note</mat-icon>
              <span class="font-serif-vintage font-semibold text-sm text-[#5B464B]">Nhạc Nền Khu Vườn</span>
            </div>
            <button
              type="button"
              (click)="toggleExpanded()"
              class="w-6 h-6 rounded-full hover:bg-[#FDF2F4] flex items-center justify-center text-[#A69094] transition-colors cursor-pointer"
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
              <p class="text-xs font-semibold text-[#5B464B] truncate" [title]="music.trackTitle()">
                {{ music.trackTitle() }}
              </p>
              <p class="text-[11px] text-[#A69094] flex items-center gap-1 mt-0.5">
                <span class="w-1.5 h-1.5 rounded-full" [class.bg-emerald-400]="music.isPlaying()" [class.bg-rose-300]="!music.isPlaying()"></span>
                <span>{{ music.isPlaying() ? 'Đang ngân nga...' : 'Đang tạm dừng' }}</span>
              </p>
            </div>
          </div>

          <!-- Controls: Prev, Play/Pause, Next & Volume -->
          <div class="flex flex-col gap-2.5 bg-[#FFF7ED]/70 rounded-xl p-2.5 mb-3 border border-[#F3E5E8]">
            <div class="flex items-center justify-between gap-2">
              <!-- Prev Track Button -->
              <button
                type="button"
                (click)="onPrevTrack()"
                class="w-8 h-8 rounded-full bg-white hover:bg-[#FDF2F4] text-[#78666A] flex items-center justify-center border border-[#E9D5DA] transition-all active:scale-95 cursor-pointer shadow-2xs"
                title="Bài trước"
              >
                <mat-icon class="text-base">skip_previous</mat-icon>
              </button>

              <!-- Play/Pause Button -->
              <button
                type="button"
                (click)="togglePlay()"
                class="w-10 h-10 rounded-full bg-[#C98F9E] hover:bg-[#B77A8A] text-white flex items-center justify-center shadow-xs transition-all active:scale-95 cursor-pointer"
                [title]="music.isPlaying() ? 'Tạm dừng' : 'Phát nhạc'"
              >
                <mat-icon class="text-xl">
                  {{ music.isPlaying() ? 'pause' : 'play_arrow' }}
                </mat-icon>
              </button>

              <!-- Next Track Button -->
              <button
                type="button"
                (click)="onNextTrack()"
                class="w-8 h-8 rounded-full bg-white hover:bg-[#FDF2F4] text-[#78666A] flex items-center justify-center border border-[#E9D5DA] transition-all active:scale-95 cursor-pointer shadow-2xs"
                title="Bài tiếp theo"
              >
                <mat-icon class="text-base">skip_next</mat-icon>
              </button>

              <!-- Volume & Mute -->
              <div class="flex items-center gap-1.5 flex-1 ml-1.5">
                <button
                  type="button"
                  (click)="toggleMute()"
                  class="text-[#A69094] hover:text-[#5B464B] transition-colors cursor-pointer"
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

            <!-- Auto-play & Auto-switch notification badge -->
            <div class="flex items-center justify-between text-[10px] text-[#8E7479] pt-1 border-t border-[#F1E4E7]">
              <span class="flex items-center gap-1">
                <mat-icon class="text-[12px] text-[#C98F9E]">autorenew</mat-icon>
                <span>Tự động chuyển bài khi hết nhạc</span>
              </span>
              <span class="text-[#2E7D32] bg-emerald-50 px-1.5 py-0.5 rounded text-[9px] font-medium border border-emerald-100">
                Đang bật
              </span>
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
              class="hover:text-[#5B464B] text-[#C98F9E] font-medium transition-colors cursor-pointer"
            >
              {{ showUrlPrompt() ? 'Đóng cài đặt' : 'Đổi link nhạc' }}
            </button>
          </div>

          <!-- Playlist Selection (5 tracks) -->
          <div class="mt-2 mb-2 max-h-36 overflow-y-auto pr-1 flex flex-col gap-1 custom-scrollbar">
            @for (track of music.playlist(); track track.id; let idx = $index) {
              <button
                type="button"
                (click)="selectTrack(idx)"
                class="flex items-center gap-2 p-1.5 rounded-lg text-left transition-all cursor-pointer"
                [class.bg-[#C98F9E]/10]="music.currentTrackIndex() === idx"
                [class.text-[#C98F9E]]="music.currentTrackIndex() === idx"
                [class.font-semibold]="music.currentTrackIndex() === idx"
                [class.hover:bg-[#FDF2F4]]="music.currentTrackIndex() !== idx"
              >
                <mat-icon class="text-sm shrink-0">
                  {{ music.currentTrackIndex() === idx ? 'volume_up' : 'music_note' }}
                </mat-icon>
                <span class="text-[11px] truncate flex-1">{{ idx + 1 }}. {{ track.title }}</span>
                @if (music.currentTrackIndex() === idx && music.isPlaying()) {
                  <span class="w-1.5 h-1.5 rounded-full bg-[#C98F9E] animate-ping shrink-0"></span>
                }
              </button>
            }
          </div>

          <!-- Custom YouTube URL Input -->
          @if (showUrlPrompt()) {
            <div class="mt-2 pt-2 border-t border-[#F2E5E8] flex flex-col gap-1.5">
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
                  class="px-2.5 py-1 text-xs bg-[#C98F9E] text-white rounded-lg hover:bg-[#B77A8A] transition-colors cursor-pointer"
                >
                  Lưu
                </button>
              </div>
            </div>
          }
        </div>
      } @else {
        <!-- Minimized Floating Pill Button -->
        <div class="flex items-center gap-1 bg-white/90 hover:bg-white backdrop-blur-md border border-[#E9D5DA] rounded-full p-1 pl-2.5 vintage-shadow hover:shadow-md transition-all">
          <button
            type="button"
            (click)="toggleExpanded()"
            class="group flex items-center gap-2 text-[#5B464B] cursor-pointer"
            title="Mở bảng nhạc nền"
          >
            <!-- Spinning Flower Disc Indicator -->
            <div
              class="w-6 h-6 rounded-full border border-[#C98F9E] flex items-center justify-center bg-[#FFF7ED]"
              [class.animate-spin-slow]="music.isPlaying()"
            >
              <mat-icon class="text-xs text-[#C98F9E]">local_florist</mat-icon>
            </div>

            <span class="text-xs font-serif-vintage font-medium hidden sm:inline max-w-[110px] truncate">
              {{ music.trackTitle() }}
            </span>
          </button>

          <!-- Quick Toggle Play Button in Pill -->
          <button
            type="button"
            (click)="togglePlay()"
            class="w-7 h-7 rounded-full hover:bg-[#FDF2F4] flex items-center justify-center text-[#C98F9E] transition-colors cursor-pointer"
            [title]="music.isPlaying() ? 'Tạm dừng' : 'Phát nhạc'"
          >
            <mat-icon class="text-base">
              {{ music.isPlaying() ? 'pause' : 'play_arrow' }}
            </mat-icon>
          </button>

          <!-- Quick Next Track Button in Pill -->
          <button
            type="button"
            (click)="onNextTrack()"
            class="w-7 h-7 rounded-full hover:bg-[#FDF2F4] flex items-center justify-center text-[#A69094] hover:text-[#5B464B] transition-colors cursor-pointer"
            title="Chuyển bài tiếp theo"
          >
            <mat-icon class="text-sm">skip_next</mat-icon>
          </button>

          <button
            type="button"
            (click)="toggleExpanded()"
            class="w-6 h-7 rounded-r-full hover:bg-[#FDF2F4] flex items-center justify-center text-[#A69094] cursor-pointer pr-1"
            title="Mở danh sách nhạc"
          >
            <mat-icon class="text-xs">expand_less</mat-icon>
          </button>
        </div>
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
export class MusicPlayer implements OnDestroy {
  readonly music = inject(Music);
  private sound = inject(Sound);

  readonly isExpanded = signal<boolean>(false);
  readonly showUrlPrompt = signal<boolean>(false);
  readonly customUrlControl = new FormControl('');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private ytPlayerInstance: any = null;
  private unlockListener: (() => void) | null = null;
  private checkInterval: ReturnType<typeof setInterval> | null = null;

  constructor() {
    afterNextRender(() => {
      this.customUrlControl.setValue(this.music.youtubeUrl());
      this.initYouTubePlayer();
      this.setupAutoplayUnlockGesture();
    });
  }

  ngOnDestroy(): void {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
    }
    if (this.unlockListener && typeof window !== 'undefined') {
      window.removeEventListener('click', this.unlockListener);
      window.removeEventListener('touchstart', this.unlockListener);
      window.removeEventListener('keydown', this.unlockListener);
    }
  }

  private initYouTubePlayer(): void {
    if (typeof window === 'undefined') return;

    const createPlayer = () => {
      if (this.ytPlayerInstance) return;
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const YT = (window as any).YT;
        if (!YT || !YT.Player) return;

        this.ytPlayerInstance = new YT.Player('love-have-yt-player', {
          height: '200',
          width: '200',
          videoId: this.music.currentTrack().id,
          playerVars: {
            autoplay: 1,
            controls: 0,
            disablekb: 1,
            fs: 0,
            modestbranding: 1,
            rel: 0,
            showinfo: 0,
            iv_load_policy: 3,
            origin: window.location.origin,
          },
          events: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onReady: (event: any) => {
              this.music.registerYTPlayer(event.target);
              event.target.setVolume(this.music.volume());
              if (this.music.isMuted()) {
                event.target.mute();
              }
              // Attempt to auto play immediately
              if (!this.music.userManuallyPaused()) {
                try {
                  event.target.playVideo();
                  this.music.isPlaying.set(true);
                } catch {
                  // Handled by user gesture listener
                }
              }
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onStateChange: (event: any) => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const YTState = (window as any).YT?.PlayerState;
              const state = event.data;
              // 0 = ENDED: Automatic transition to next track
              if (state === (YTState ? YTState.ENDED : 0)) {
                this.music.nextTrack();
              } else if (state === (YTState ? YTState.PLAYING : 1)) {
                this.music.isPlaying.set(true);
              } else if (state === (YTState ? YTState.PAUSED : 2)) {
                if (this.music.userManuallyPaused()) {
                  this.music.isPlaying.set(false);
                }
              }
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (event: any) => {
              console.warn('YouTube error encountered code:', event.data, 'Auto-skipping to next song...');
              setTimeout(() => {
                this.music.nextTrack();
              }, 1200);
            },
          },
        });
      } catch (err) {
        console.warn('YT.Player instantiation caught:', err);
      }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (typeof (window as any).YT !== 'undefined' && (window as any).YT.Player) {
      createPlayer();
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const prevCallback = (window as any).onYouTubeIframeAPIReady;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).onYouTubeIframeAPIReady = () => {
        if (typeof prevCallback === 'function') prevCallback();
        createPlayer();
      };

      // Periodic check if script loaded
      let attempts = 0;
      this.checkInterval = setInterval(() => {
        attempts++;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (typeof (window as any).YT !== 'undefined' && (window as any).YT.Player) {
          if (this.checkInterval) clearInterval(this.checkInterval);
          createPlayer();
        } else if (attempts > 40) {
          if (this.checkInterval) clearInterval(this.checkInterval);
        }
      }, 200);
    }
  }

  private setupAutoplayUnlockGesture(): void {
    if (typeof window === 'undefined') return;

    this.unlockListener = () => {
      if (!this.music.isPlaying() && !this.music.userManuallyPaused()) {
        this.music.play();
      }
      if (this.unlockListener) {
        window.removeEventListener('click', this.unlockListener);
        window.removeEventListener('touchstart', this.unlockListener);
        window.removeEventListener('keydown', this.unlockListener);
        this.unlockListener = null;
      }
    };

    window.addEventListener('click', this.unlockListener, { passive: true });
    window.addEventListener('touchstart', this.unlockListener, { passive: true });
    window.addEventListener('keydown', this.unlockListener, { passive: true });
  }

  toggleExpanded(): void {
    this.sound.playClick();
    this.isExpanded.update((v) => !v);
  }

  togglePlay(): void {
    this.sound.playClick();
    this.music.togglePlay();
  }

  onPrevTrack(): void {
    this.sound.playClick();
    this.music.prevTrack();
  }

  onNextTrack(): void {
    this.sound.playClick();
    this.music.nextTrack();
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

  selectTrack(index: number): void {
    if (this.music.currentTrackIndex() !== index) {
      this.sound.playClick();
      this.music.selectTrack(index);
    }
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
