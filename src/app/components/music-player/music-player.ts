import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Music } from '../../services/music';
import { Sound } from '../../services/sound';

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    YT?: any;
  }
}

@Component({
  selector: 'app-music-player',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatIconModule],
  template: `
    <!-- Hidden active YouTube iframe container (1px size keeps background audio active without throttle) -->
    <div aria-hidden="true" class="fixed bottom-0 right-0 w-[2px] h-[2px] opacity-[0.01] pointer-events-none -z-50 overflow-hidden">
      <div id="love-have-yt-player"></div>
    </div>

    <!-- Floating Audio Control Pill -->
    <div class="fixed bottom-4 right-4 z-40 transition-all duration-300">
      
      <!-- Playlist Popover -->
      @if (music.showPlaylist()) {
        <div class="mb-2 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-[#E9D5DA] vintage-shadow-lg w-72 sm:w-80">
          <div class="flex items-center justify-between pb-2 mb-2 border-b border-[#F0DFE3]">
            <span class="font-serif-vintage text-sm font-bold text-[#5B464B] flex items-center gap-1.5">
              <mat-icon class="text-sm text-[#C98F9E]">queue_music</mat-icon>
              <span>Nhạc Nền Khu Vườn (Tự động chuyển bài)</span>
            </span>
            <button
              type="button"
              (click)="music.togglePlaylist()"
              class="text-xs text-[#8E7479] hover:text-[#5B464B] cursor-pointer"
            >
              <mat-icon class="text-xs">close</mat-icon>
            </button>
          </div>

          <div class="space-y-1 max-h-48 overflow-y-auto">
            @for (track of music.tracks; track track.id; let i = $index) {
              <button
                type="button"
                (click)="selectTrack(i)"
                class="w-full text-left px-2.5 py-1.5 rounded-xl text-xs flex items-center justify-between transition-colors cursor-pointer"
                [class.bg-[#FAF0E6]]="music.currentTrackIndex() === i"
                [class.text-[#A65B6D]]="music.currentTrackIndex() === i"
                [class.font-medium]="music.currentTrackIndex() === i"
                [class.text-[#78666A]]="music.currentTrackIndex() !== i"
                [class.hover:bg-[#FFF4F6]]="music.currentTrackIndex() !== i"
              >
                <div class="truncate pr-2">
                  <div class="truncate font-serif">{{ track.title }}</div>
                  <div class="text-[10px] text-[#A39296]">{{ track.artist }}</div>
                </div>

                @if (music.currentTrackIndex() === i && music.isPlaying()) {
                  <mat-icon class="text-xs text-[#C98F9E] animate-pulse">volume_up</mat-icon>
                }
              </button>
            }
          </div>
        </div>
      }

      <!-- Main Controller Bar -->
      <div class="flex items-center gap-1 bg-white/90 hover:bg-white backdrop-blur-md border border-[#E9D5DA] rounded-full p-1 pl-2.5 vintage-shadow hover:shadow-md transition-all">
        
        <!-- Track title & indicator -->
        <button
          type="button"
          (click)="music.togglePlaylist()"
          title="Mở danh sách nhạc nền (Tự động chuyển bài khi hết)"
          class="group flex items-center gap-2 text-[#5B464B] cursor-pointer"
        >
          <div
            class="w-6 h-6 rounded-full border border-[#C98F9E] flex items-center justify-center bg-[#FFF7ED]"
            [class.animate-spin]="music.isPlaying()"
            style="animation-duration: 8s"
          >
            <mat-icon class="text-xs text-[#C98F9E]">local_florist</mat-icon>
          </div>
          <span class="text-xs font-serif-vintage font-medium hidden sm:inline max-w-[110px] truncate">
            {{ currentTrack().title }}
          </span>
        </button>

        <!-- Previous track -->
        <button
          type="button"
          (click)="prevTrack()"
          title="Bài trước đó"
          class="w-7 h-7 rounded-full hover:bg-[#FDF2F4] flex items-center justify-center text-[#A69094] hover:text-[#5B464B] transition-colors cursor-pointer"
        >
          <mat-icon class="text-sm">skip_previous</mat-icon>
        </button>

        <!-- Play/Pause -->
        <button
          type="button"
          (click)="togglePlay()"
          class="w-7 h-7 rounded-full hover:bg-[#FDF2F4] flex items-center justify-center text-[#C98F9E] transition-colors cursor-pointer"
          [title]="music.isPlaying() ? 'Tạm dừng nhạc' : 'Phát nhạc'"
        >
          <mat-icon class="text-base">
            {{ music.isPlaying() ? 'pause' : 'play_arrow' }}
          </mat-icon>
        </button>

        <!-- Next track -->
        <button
          type="button"
          (click)="nextTrack()"
          title="Chuyển bài tiếp theo"
          class="w-7 h-7 rounded-full hover:bg-[#FDF2F4] flex items-center justify-center text-[#A69094] hover:text-[#5B464B] transition-colors cursor-pointer"
        >
          <mat-icon class="text-sm">skip_next</mat-icon>
        </button>

        <!-- Toggle playlist drawer -->
        <button
          type="button"
          (click)="music.togglePlaylist()"
          title="Mở danh sách nhạc"
          class="w-6 h-7 rounded-r-full hover:bg-[#FDF2F4] flex items-center justify-center text-[#A69094] cursor-pointer pr-1"
        >
          <mat-icon class="text-xs">expand_less</mat-icon>
        </button>
      </div>
    </div>
  `,
})
export class MusicPlayer implements OnInit, OnDestroy {
  readonly music = inject(Music);
  readonly sound = inject(Sound);

  private pollerInterval: any = null;

  currentTrack() {
    return this.music.tracks[this.music.currentTrackIndex()] || this.music.tracks[0];
  }

  ngOnInit(): void {
    if (typeof window === 'undefined') return;
    this.loadYouTubeApi();
    this.startPlaybackPoller();
  }

  ngOnDestroy(): void {
    if (this.pollerInterval) {
      clearInterval(this.pollerInterval);
      this.pollerInterval = null;
    }
  }

  private loadYouTubeApi(): void {
    if (window.YT && window.YT.Player) {
      this.initYT();
      return;
    }

    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    if (firstScriptTag && firstScriptTag.parentNode) {
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    } else {
      document.head.appendChild(tag);
    }

    window.onYouTubeIframeAPIReady = () => {
      this.initYT();
    };
  }

  private initYT(): void {
    try {
      new window.YT.Player('love-have-yt-player', {
        height: '2',
        width: '2',
        videoId: this.music.tracks[0].youtubeId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          loop: 0, // MUST BE 0 so it doesn't repeat the same song internally, allowing onStateChange (0 = ENDED)
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
          enablejsapi: 1,
        },
        events: {
          onReady: (event: any) => {
            this.music.initPlayer(event.target);
          },
          onStateChange: (event: any) => {
            // 0: ENDED, 1: PLAYING, 2: PAUSED, 3: BUFFERING
            if (event.data === 0) {
              // Video ended -> Automatically advance to the next song!
              this.music.onTrackEnded();
            } else if (event.data === 1) {
              this.music.isPlaying.set(true);
            } else if (event.data === 2) {
              this.music.isPlaying.set(false);
            }
          },
          onError: (event: any) => {
            // If any error occurs on a track (e.g. copyright/restricted), auto advance to next track
            console.warn('YouTube player event error:', event.data);
            this.music.nextTrack();
          },
        },
      });
    } catch {
      // Ignore YT initialization error in iframe sandbox
    }
  }

  /**
   * Fallback interval poller to guarantee continuous autoplay:
   * If a song reaches within 1 second of its end and hasn't transitioned,
   * trigger onTrackEnded to switch to the next track smoothly.
   */
  private startPlaybackPoller(): void {
    if (typeof window === 'undefined') return;

    this.pollerInterval = setInterval(() => {
      if (!this.music.isPlaying()) return;

      const player = this.music.getPlayer();
      if (player && typeof player.getCurrentTime === 'function' && typeof player.getDuration === 'function') {
        try {
          const currentTime = player.getCurrentTime();
          const duration = player.getDuration();
          if (duration > 0 && currentTime > 0) {
            const timeLeft = duration - currentTime;
            if (timeLeft <= 0.8) {
              this.music.onTrackEnded();
            }
          }
        } catch {
          // Ignore
        }
      }
    }, 1000);
  }

  togglePlay(): void {
    this.sound.playClick();
    this.music.togglePlay();
  }

  nextTrack(): void {
    this.sound.playClick();
    this.music.nextTrack();
  }

  prevTrack(): void {
    this.sound.playClick();
    this.music.prevTrack();
  }

  selectTrack(index: number): void {
    this.sound.playClick();
    this.music.selectTrack(index);
  }
}
