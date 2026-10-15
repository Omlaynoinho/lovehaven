import { Injectable, signal, computed } from '@angular/core';
import { PLAYLIST, Track } from '../../data/music.data';

@Injectable({
  providedIn: 'root',
})
export class Music {
  // Configurable YouTube Music URL
  public readonly playlist = signal<Track[]>(PLAYLIST);
  public readonly currentTrackIndex = signal<number>(0);
  
  public readonly currentTrack = computed(() => this.playlist()[this.currentTrackIndex()]);
  public readonly youtubeUrl = computed(() => this.currentTrack().url);
  
  public readonly isPlaying = signal<boolean>(false);
  public readonly volume = signal<number>(25); // Default gentle background volume ~25%
  public readonly isMuted = signal<boolean>(false);
  public readonly userManuallyPaused = signal<boolean>(false);
  public readonly hasStartedOnce = signal<boolean>(false);
  public readonly isPlayerReady = signal<boolean>(false);
  public readonly isEmbedRestricted = signal<boolean>(false);
  public readonly autoPlayNext = signal<boolean>(true);
  
  public readonly trackTitle = computed(() => this.currentTrack().title);

  public readonly videoId = computed(() => {
    return this.extractVideoId(this.youtubeUrl());
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private ytPlayer: any = null;
  private playerElement: HTMLIFrameElement | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      const savedVolume = localStorage.getItem('love_have_music_volume');
      if (savedVolume !== null) {
        const parsed = parseInt(savedVolume, 10);
        if (!isNaN(parsed) && parsed >= 0 && parsed <= 100) {
          this.volume.set(parsed);
        }
      }
    }
  }

  public extractVideoId(url: string): string {
    if (!url) return '5qap5aO4i9A';
    try {
      if (url.includes('youtu.be/')) {
        const parts = url.split('youtu.be/')[1];
        return parts ? parts.split(/[?#&]/)[0] : '5qap5aO4i9A';
      }
      if (url.includes('youtube.com/watch')) {
        const match = url.match(/[?&]v=([^&#]+)/);
        return match && match[1] ? match[1] : '5qap5aO4i9A';
      }
      if (url.includes('youtube.com/embed/')) {
        const parts = url.split('youtube.com/embed/')[1];
        return parts ? parts.split(/[?#&]/)[0] : '5qap5aO4i9A';
      }
      // If given pure ID
      if (/^[a-zA-Z0-9_-]{11}$/.test(url.trim())) {
        return url.trim();
      }
    } catch {
      // Fallback
    }
    return '5qap5aO4i9A';
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public registerYTPlayer(player: any): void {
    this.ytPlayer = player;
    this.isPlayerReady.set(true);
  }

  public registerIframe(iframe: HTMLIFrameElement): void {
    this.playerElement = iframe;
    this.isPlayerReady.set(true);
  }

  public startGardenMusic(): void {
    if (this.userManuallyPaused()) return;
    this.hasStartedOnce.set(true);
    this.play();
  }

  public play(): void {
    this.userManuallyPaused.set(false);
    this.isPlaying.set(true);
    if (this.ytPlayer && typeof this.ytPlayer.playVideo === 'function') {
      try {
        this.ytPlayer.playVideo();
      } catch {
        // Ignored
      }
    }
    this.sendCommand('playVideo');
    this.updateVolume(this.volume());
  }

  public pause(): void {
    this.userManuallyPaused.set(true);
    this.isPlaying.set(false);
    if (this.ytPlayer && typeof this.ytPlayer.pauseVideo === 'function') {
      try {
        this.ytPlayer.pauseVideo();
      } catch {
        // Ignored
      }
    }
    this.sendCommand('pauseVideo');
  }

  public togglePlay(): void {
    if (this.isPlaying()) {
      this.pause();
    } else {
      this.play();
    }
  }

  public setVolume(vol: number): void {
    const clamped = Math.max(0, Math.min(100, vol));
    this.volume.set(clamped);
    if (typeof window !== 'undefined') {
      localStorage.setItem('love_have_music_volume', String(clamped));
    }
    if (this.ytPlayer && typeof this.ytPlayer.setVolume === 'function') {
      try {
        this.ytPlayer.setVolume(clamped);
      } catch {
        // Ignored
      }
    }
    this.updateVolume(clamped);
  }

  public toggleMute(): void {
    const nextMute = !this.isMuted();
    this.isMuted.set(nextMute);
    if (this.ytPlayer) {
      try {
        if (nextMute && typeof this.ytPlayer.mute === 'function') {
          this.ytPlayer.mute();
        } else if (!nextMute && typeof this.ytPlayer.unMute === 'function') {
          this.ytPlayer.unMute();
          if (typeof this.ytPlayer.setVolume === 'function') {
            this.ytPlayer.setVolume(this.volume());
          }
        }
      } catch {
        // Ignored
      }
    }
    if (nextMute) {
      this.sendCommand('mute');
    } else {
      this.sendCommand('unMute');
      this.updateVolume(this.volume());
    }
  }

  public selectTrack(index: number): void {
    if (index >= 0 && index < this.playlist().length) {
      this.currentTrackIndex.set(index);
      const track = this.playlist()[index];
      const vid = this.extractVideoId(track.url);
      if (this.ytPlayer && typeof this.ytPlayer.loadVideoById === 'function') {
        try {
          this.ytPlayer.loadVideoById(vid);
          this.isPlaying.set(true);
          this.userManuallyPaused.set(false);
        } catch {
          setTimeout(() => this.play(), 200);
        }
      } else {
        if (this.isPlaying()) {
          // Restart play for new track fallback
          setTimeout(() => this.play(), 200);
        }
      }
    }
  }

  public setCustomYoutubeUrl(url: string): void {
    if (!url) return;
    const newTrack: Track = {
      id: this.extractVideoId(url),
      title: 'Nhạc tùy chỉnh',
      url: url.trim()
    };
    
    // Add to playlist if not already there, or just select it
    const existingIndex = this.playlist().findIndex(t => t.id === newTrack.id);
    if (existingIndex !== -1) {
      this.selectTrack(existingIndex);
    } else {
      this.playlist.update(p => [...p, newTrack]);
      this.selectTrack(this.playlist().length - 1);
    }

    this.isEmbedRestricted.set(false);
  }

  public nextTrack(): void {
    let nextIndex = this.currentTrackIndex() + 1;
    if (nextIndex >= this.playlist().length) {
      nextIndex = 0; // Loop back to start
    }
    this.selectTrack(nextIndex);
  }

  public prevTrack(): void {
    let prevIndex = this.currentTrackIndex() - 1;
    if (prevIndex < 0) {
      prevIndex = this.playlist().length - 1;
    }
    this.selectTrack(prevIndex);
  }

  private updateVolume(vol: number): void {
    this.sendCommand('setVolume', [vol]);
  }

  private sendCommand(func: string, args: unknown[] = []): void {
    if (!this.playerElement || !this.playerElement.contentWindow) return;
    try {
      const message = JSON.stringify({
        event: 'command',
        func,
        args,
      });
      this.playerElement.contentWindow.postMessage(message, '*');
    } catch {
      // PostMessage failed
    }
  }
}
