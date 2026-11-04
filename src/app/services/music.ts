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

  readonly tracks: MusicTrack[] = [
    {
      id: 'gui-ling',
      title: '归零 (Quy Linh)',
      artist: 'Romantic Piano OST',
      youtubeId: 'MNb6hEKAS08',
    },
    {
      id: 'garden-serenade',
      title: 'Garden of Memories',
      artist: 'Acoustic Guitar & Violin',
      youtubeId: '5qap5aO4i9A',
    },
    {
      id: 'gentle-rain',
      title: 'Autumn Rain in Peking',
      artist: 'Classical Ambient',
      youtubeId: 'jfKfPfyJRdk',
    },
  ];

  private player: any = null;

  initPlayer(playerInstance: any): void {
    this.player = playerInstance;
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
