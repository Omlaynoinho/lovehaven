import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
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
    <!-- Hidden YouTube iframe container -->
    <div aria-hidden="true" class="fixed -bottom-96 -right-96 w-10 h-10 pointer-events-none opacity-0 overflow-hidden">
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
              <span>Nhạc Nền Khu Vườn</span>
            </span>
            <button
              type="button"
              (click)="music.togglePlaylist()"
              class="text-xs text-[#8E7479] hover:text-[#5B464B]"
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
          title="Mở bảng nhạc nền"
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
export class MusicPlayer implements OnInit {
  readonly music = inject(Music);
  readonly sound = inject(Sound);

  currentTrack() {
    return this.music.tracks[this.music.currentTrackIndex()] || this.music.tracks[0];
  }

  ngOnInit(): void {
    if (typeof window === 'undefined') return;
    this.loadYouTubeApi();
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
        height: '10',
        width: '10',
        videoId: this.music.tracks[0].youtubeId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          loop: 1,
          playlist: this.music.tracks[0].youtubeId,
        },
        events: {
          onReady: (event: any) => {
            this.music.initPlayer(event.target);
          },
          onStateChange: (event: any) => {
            if (event.data === 1) {
              this.music.isPlaying.set(true);
            } else if (event.data === 2) {
              this.music.isPlaying.set(false);
            } else if (event.data === 0) {
              this.music.nextTrack();
            }
          },
        },
      });
    } catch {
      // Ignore YT initialization error in iframe sandbox
    }
  }

  togglePlay(): void {
    this.sound.playClick();
    this.music.togglePlay();
  }

  nextTrack(): void {
    this.sound.playClick();
    this.music.nextTrack();
  }

  selectTrack(index: number): void {
    this.sound.playClick();
    this.music.selectTrack(index);
  }
}
