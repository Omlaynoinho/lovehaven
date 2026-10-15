import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Music {
  // Configurable YouTube Music URL
  public readonly youtubeUrl = signal<string>('https://youtu.be/MNb6hEKAS08?si=Lz8Kem3N9jptY7dv');
  public readonly isPlaying = signal<boolean>(false);
  public readonly volume = signal<number>(25); // Default gentle background volume ~25%
  public readonly isMuted = signal<boolean>(false);
  public readonly userManuallyPaused = signal<boolean>(false);
  public readonly hasStartedOnce = signal<boolean>(false);
  public readonly isPlayerReady = signal<boolean>(false);
  public readonly isEmbedRestricted = signal<boolean>(false);
  public readonly trackTitle = signal<string>('Khúc dạo đầu khu vườn bí mật — Piano & Lofi Acoustic');

  public readonly videoId = computed(() => {
    return this.extractVideoId(this.youtubeUrl());
  });

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
    this.sendCommand('playVideo');
    this.updateVolume(this.volume());
  }

  public pause(): void {
    this.userManuallyPaused.set(true);
    this.isPlaying.set(false);
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
    this.updateVolume(clamped);
  }

  public toggleMute(): void {
    const nextMute = !this.isMuted();
    this.isMuted.set(nextMute);
    if (nextMute) {
      this.sendCommand('mute');
    } else {
      this.sendCommand('unMute');
      this.updateVolume(this.volume());
    }
  }

  public setCustomYoutubeUrl(url: string): void {
    if (!url) return;
    this.youtubeUrl.set(url.trim());
    this.isEmbedRestricted.set(false);
    if (this.isPlaying()) {
      setTimeout(() => this.play(), 500);
    }
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
