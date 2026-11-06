import { ChangeDetectionStrategy, Component, inject, signal, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Sound } from '../../services/sound';
import { Music } from '../../services/music';

@Component({
  selector: 'app-header-nav',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatIconModule],
  template: `
    <header class="sticky top-0 z-30 w-full transition-all duration-300 bg-[#FFFDFB]/90 backdrop-blur-md border-b border-[#F0BAC8]/60 shadow-2xs">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        
        <!-- Logo & Branding -->
        <a
          href="#top"
          (click)="onNavClick('#top', $event)"
          class="flex items-center gap-2 sm:gap-3 group cursor-pointer"
        >
          <!-- Vintage Rose Icon Ribbon -->
          <div class="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-[#FFD1DC] via-[#FFEBEF] to-[#FFF7ED] border border-[#F0A8B8]/60 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
            <mat-icon class="text-[#C98F9E] text-lg sm:text-xl">local_florist</mat-icon>
          </div>

          <div class="flex flex-col">
            <div class="flex items-center gap-1.5">
              <span class="font-serif-vintage text-xl sm:text-2xl text-[#5B464B] font-semibold tracking-wide leading-none group-hover:text-[#C98F9E] transition-colors">
                LOVE HAVE
              </span>
              <!-- Dainty Ribbon Bow Icon -->
              <svg class="w-3.5 h-3.5 text-[#F092A5] opacity-80" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 9c-1.5-2.5-4-3-6-2s-2.5 3.5-.5 5.5c1.8 1.8 4.5 1.5 6.5-0.5c2 2 4.7 2.3 6.5 0.5c2-2 1.5-4.5-.5-5.5s-4.5-0.5-6 2zm-1.5 2c-1.3 1.3-3 1.2-4.2 0c-1-1-0.8-2.2 0.2-2.8c1.1-0.6 2.8-0.2 4 1.3v1.5zm3 0v-1.5c1.2-1.5 2.9-1.9 4-1.3c1 0.6 1.2 1.8 0.2 2.8c-1.2 1.2-2.9 1.3-4.2 0z"/>
              </svg>
            </div>
            <span class="font-script-romantic text-xs sm:text-sm text-[#8E7479] mt-0.5 hidden xs:inline">
              A Little Garden of Stories & Hearts
            </span>
          </div>
        </a>

        <!-- Desktop Navigation Items -->
        <nav class="hidden md:flex items-center gap-1.5 lg:gap-2 text-[#78666A]">
          <a
            href="#top"
            (click)="onNavClick('#top', $event)"
            class="px-3 py-1.5 rounded-full hover:bg-[#FBECEF] text-xs lg:text-sm font-medium transition-colors flex items-center gap-1.5"
          >
            <mat-icon class="text-xs text-[#C98F9E]">home</mat-icon>
            <span>Trang chủ</span>
          </a>

          <a
            href="#characters"
            (click)="onNavClick('#characters', $event)"
            class="px-3 py-1.5 rounded-full hover:bg-[#FBECEF] text-xs lg:text-sm font-medium transition-colors flex items-center gap-1.5"
          >
            <mat-icon class="text-xs text-[#B8C8B0]">eco</mat-icon>
            <span>Vườn nhân vật</span>
          </a>

          <a
            href="#tags-section"
            (click)="onNavClick('#tags-section', $event)"
            class="px-3 py-1.5 rounded-full hover:bg-[#FBECEF] text-xs lg:text-sm font-medium transition-colors flex items-center gap-1.5"
          >
            <mat-icon class="text-xs text-[#9A84B8]">local_offer</mat-icon>
            <span>Tag</span>
          </a>

          <a
            href="#mailbox"
            (click)="onNavClick('#mailbox', $event)"
            class="px-3 py-1.5 rounded-full hover:bg-[#FBECEF] text-xs lg:text-sm font-medium transition-colors flex items-center gap-1.5"
          >
            <mat-icon class="text-xs text-[#C98F9E]">mail</mat-icon>
            <span>Hộp thư</span>
          </a>

          <a
            href="#commission"
            (click)="onNavClick('#commission', $event)"
            class="px-3 py-1.5 rounded-full hover:bg-[#FBECEF] text-xs lg:text-sm font-medium transition-colors flex items-center gap-1.5"
          >
            <mat-icon class="text-xs text-[#A65B6D]">palette</mat-icon>
            <span>Commission</span>
          </a>

          <a
            href="#about"
            (click)="onNavClick('#about', $event)"
            class="px-3 py-1.5 rounded-full hover:bg-[#FBECEF] text-xs lg:text-sm font-medium transition-colors flex items-center gap-1.5"
          >
            <mat-icon class="text-xs text-[#D8CEE9]">spa</mat-icon>
            <span>Giới thiệu</span>
          </a>
        </nav>

        <!-- Right Quick Actions -->
        <div class="flex items-center gap-2">
          <!-- Sound SFX Toggle -->
          <button
            type="button"
            (click)="toggleSound()"
            [title]="sound.soundEnabled() ? 'Âm thanh tương tác: Bật' : 'Âm thanh tương tác: Tắt'"
            class="w-8 h-8 rounded-full border border-[#E9D5DA] hover:border-[#C98F9E] bg-white/70 hover:bg-white text-[#78666A] flex items-center justify-center transition-all cursor-pointer"
          >
            <mat-icon class="text-base text-[#C98F9E]">
              {{ sound.soundEnabled() ? 'notifications_active' : 'notifications_off' }}
            </mat-icon>
          </button>

          <!-- Reopen Welcome Entrance Screen Button -->
          <button
            type="button"
            (click)="onReopenEntrance()"
            title="Xem lại màn hình chào"
            class="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF0E6] hover:bg-[#F7E1E6] border border-[#E8D4D8] text-xs text-[#78666A] font-medium transition-colors cursor-pointer"
          >
            <mat-icon class="text-xs text-[#C98F9E]">mark_email_read</mat-icon>
            <span>Màn hình chào</span>
          </button>

          <!-- Mobile Hamburger Toggle -->
          <button
            type="button"
            (click)="toggleMobileMenu()"
            class="md:hidden w-9 h-9 rounded-full border border-[#E9D5DA] bg-white/80 flex items-center justify-center text-[#78666A] transition-colors"
            aria-label="Menu"
          >
            <mat-icon>{{ mobileMenuOpen() ? 'close' : 'menu' }}</mat-icon>
          </button>
        </div>
      </div>

      <!-- Mobile Dropdown Drawer -->
      @if (mobileMenuOpen()) {
        <div class="md:hidden border-t border-[#EBCBD4]/40 bg-[#FFF7ED]/98 px-6 py-4 flex flex-col gap-2.5 shadow-lg">
          <a
            href="#top"
            (click)="onNavClick('#top', $event)"
            class="flex items-center gap-2.5 py-2 px-3 rounded-xl hover:bg-[#FBECEF] text-sm font-medium text-[#5B464B]"
          >
            <mat-icon class="text-sm text-[#C98F9E]">home</mat-icon>
            <span>Trang chủ</span>
          </a>

          <a
            href="#characters"
            (click)="onNavClick('#characters', $event)"
            class="flex items-center gap-2.5 py-2 px-3 rounded-xl hover:bg-[#FBECEF] text-sm font-medium text-[#5B464B]"
          >
            <mat-icon class="text-sm text-[#B8C8B0]">eco</mat-icon>
            <span>Vườn nhân vật</span>
          </a>

          <a
            href="#tags-section"
            (click)="onNavClick('#tags-section', $event)"
            class="flex items-center gap-2.5 py-2 px-3 rounded-xl hover:bg-[#FBECEF] text-sm font-medium text-[#5B464B]"
          >
            <mat-icon class="text-sm text-[#9A84B8]">local_offer</mat-icon>
            <span>Tìm theo Tag</span>
          </a>

          <a
            href="#mailbox"
            (click)="onNavClick('#mailbox', $event)"
            class="flex items-center gap-2.5 py-2 px-3 rounded-xl hover:bg-[#FBECEF] text-sm font-medium text-[#5B464B]"
          >
            <mat-icon class="text-sm text-[#C98F9E]">mail</mat-icon>
            <span>Hộp thư gửi gắm</span>
          </a>

          <a
            href="#commission"
            (click)="onNavClick('#commission', $event)"
            class="flex items-center gap-2.5 py-2 px-3 rounded-xl hover:bg-[#FBECEF] text-sm font-medium text-[#5B464B]"
          >
            <mat-icon class="text-sm text-[#A65B6D]">palette</mat-icon>
            <span>Commission & TOS</span>
          </a>

          <a
            href="#about"
            (click)="onNavClick('#about', $event)"
            class="flex items-center gap-2.5 py-2 px-3 rounded-xl hover:bg-[#FBECEF] text-sm font-medium text-[#5B464B]"
          >
            <mat-icon class="text-sm text-[#D8CEE9]">spa</mat-icon>
            <span>Giới thiệu khu vườn</span>
          </a>

          <div class="pt-2 border-t border-[#F2E5E8] flex items-center justify-between">
            <button
              type="button"
              (click)="openWelcomeEnvelope()"
              class="inline-flex items-center gap-1.5 text-xs text-[#C98F9E] font-medium"
            >
              <mat-icon class="text-xs">mark_email_read</mat-icon>
              <span>Mở lại phong thư chào mừng</span>
            </button>
            <button
              type="button"
              (click)="toggleSound()"
              class="text-xs text-[#8E7479] flex items-center gap-1"
            >
              <span>Âm thanh:</span>
              <span class="font-medium text-[#5B464B]">{{ sound.soundEnabled() ? 'BẬT' : 'TẮT' }}</span>
            </button>
          </div>
        </div>
      }
    </header>
  `,
})
export class HeaderNav {
  readonly sound = inject(Sound);
  readonly music = inject(Music);

  readonly reopenWelcome = output<void>();
  readonly reopenEntrance = output<void>();
  readonly mobileMenuOpen = signal<boolean>(false);

  toggleMobileMenu(): void {
    this.sound.playClick();
    this.mobileMenuOpen.update((v) => !v);
  }

  toggleSound(): void {
    this.sound.toggleSound();
  }

  onReopenEntrance(): void {
    this.sound.playPaper();
    this.mobileMenuOpen.set(false);
    this.reopenEntrance.emit();
  }

  openWelcomeEnvelope(): void {
    this.sound.playPaper();
    this.mobileMenuOpen.set(false);
    this.reopenWelcome.emit();
  }

  onNavClick(anchor: string, event: Event): void {
    event.preventDefault();
    this.sound.playClick();
    this.mobileMenuOpen.set(false);

    if (typeof document !== 'undefined') {
      const el = document.querySelector(anchor);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
}
