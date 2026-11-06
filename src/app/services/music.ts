import { Injectable, signal } from '@angular/core';

export interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  youtubeId: string;
}

@Injectable({
  providedIn: 'root',
})
export class Music {
  readonly isPlaying = signal<boolean>(false);
  readonly currentTrackIndex = signal<number>(0);
  readonly isMuted = signal<boolean>(false);
  readonly showPlaylist = signal<boolean>(false);
  readonly hasAutoPlayedFirstTime = signal<boolean>(false);

  private player: any = null;
  private shouldAutoPlayOnReady = false;

  readonly tracks: MusicTrack[] = [
    {
      id: 'gone-bad',
      title: 'GoneBad蝴蝶步 (封神版)',
      artist: 'Phong Thần Bản',
      youtubeId: '_8kmc_tFzQw',
    },
    {
      id: 'chuo-xue-inst',
      title: '灼雪【伴奏】',
      artist: 'Chước Tuyết (Beat / Bán Tấu)',
      youtubeId: 'nTd5NhJxmkk',
    },
    {
      id: 'gui-si',
      title: 'Quy Tứ (归肆)',
      artist: 'Cổ Phong Trầm Lắng',
      youtubeId: 'GEGSzh4vUuE',
    },
    {
      id: 'lightning-moment-harp',
      title: 'Lightning Moment (竖琴版)',
      artist: 'Thụ Cầm Bản (Harp Version)',
      youtubeId: 'KVremu955Qk',
    },
    {
      id: 'jing-wei',
      title: 'Tinh Vệ (精卫)',
      artist: 'Huyền Âm Cổ Phong',
      youtubeId: 'pWAQZ3bg1Qk',
    },
  ];

  initPlayer(playerInstance: any): void {
    this.player = playerInstance;
    // If the user already clicked "GỬI THƯ" before player was ready, start playing immediately
    if (this.shouldAutoPlayOnReady) {
      this.play();
    }
  }

  /**
   * Prioritize auto-playing music when user clicks "GỬI THƯ" for the first time.
   * This is triggered by a real user gesture (click), satisfying browser autoplay policies.
   */
  autoPlayOnSendLetter(): void {
    this.shouldAutoPlayOnReady = true;
    this.hasAutoPlayedFirstTime.set(true);
    this.play();
  }

  play(): void {
    this.shouldAutoPlayOnReady = true;
    if (!this.player) return;
    try {
      if (this.player.unMute) {
        this.player.unMute();
        this.isMuted.set(false);
      }
      if (this.player.setVolume) {
        this.player.setVolume(75);
      }
      if (this.player.playVideo) {
        this.player.playVideo();
        this.isPlaying.set(true);
      }
    } catch {
      this.isPlaying.set(true);
    }
  }

  pause(): void {
    if (!this.player) return;
    try {
      if (this.player.pauseVideo) {
        this.player.pauseVideo();
      }
    } catch {
      // Ignore
    }
    this.isPlaying.set(false);
  }

  togglePlay(): void {
    if (!this.player) return;
    try {
      if (this.isPlaying()) {
        this.player.pauseVideo();
        this.isPlaying.set(false);
      } else {
        this.player.playVideo();
        this.isPlaying.set(true);
      }
    } catch {
      this.isPlaying.update((v) => !v);
    }
  }

  nextTrack(): void {
    const nextIdx = (this.currentTrackIndex() + 1) % this.tracks.length;
    this.selectTrack(nextIdx);
  }

  selectTrack(index: number): void {
    this.currentTrackIndex.set(index);
    if (this.player && this.player.loadVideoById) {
      try {
        this.player.loadVideoById(this.tracks[index].youtubeId);
        this.isPlaying.set(true);
      } catch {
        // Fallback
      }
    }
  }

  toggleMute(): void {
    if (!this.player) return;
    try {
      if (this.isMuted()) {
        this.player.unMute();
        this.isMuted.set(false);
      } else {
        this.player.mute();
        this.isMuted.set(true);
      }
    } catch {
      this.isMuted.update((v) => !v);
    }
  }

  togglePlaylist(): void {
    this.showPlaylist.update((v) => !v);
  }
}
