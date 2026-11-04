import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Character } from '../../../data/characters.data';

@Component({
  selector: 'app-character-detail',
  imports: [MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (character(); as char) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
        <div class="relative w-full max-w-3xl max-h-[90vh] bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
          
          <!-- Modal Header -->
          <div class="p-6 border-b border-slate-800 bg-slate-950/60 flex items-start justify-between gap-4">
            <div>
              <div class="flex items-center gap-2 mb-2">
                <span class="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  #{{ char.displayOrder }}
                </span>
                @if (char.featured) {
                  <span class="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                    <mat-icon class="!w-3 !h-3 !text-xs">star</mat-icon> Nổi Bật
                  </span>
                }
              </div>
              <h3 class="text-2xl font-extrabold text-white">{{ char.name }}</h3>
              @if (char.subtitle) {
                <p class="text-slate-400 text-xs mt-1">{{ char.subtitle }}</p>
              }
            </div>

            <button
              (click)="closed.emit()"
              class="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Đóng"
            >
              <mat-icon>close</mat-icon>
            </button>
          </div>

          <!-- Tags Bar -->
          <div class="px-6 py-3 bg-slate-950/40 border-b border-slate-800/80 flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
            @for (tag of char.tags; track tag) {
              <span class="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700/60">
                #{{ tag }}
              </span>
            }
          </div>

          <!-- Modal Body (Plot) -->
          <div class="p-6 overflow-y-auto space-y-4 text-slate-300 text-sm leading-relaxed whitespace-pre-line flex-1 font-sans selection:bg-rose-500 selection:text-white">
            <h4 class="text-xs uppercase tracking-wider font-bold text-rose-400 flex items-center gap-1.5 mb-2">
              <mat-icon class="!w-4 !h-4 !text-base">auto_stories</mat-icon>
              Nhật Ký Cốt Truyện & Bối Cảnh
            </h4>
            <div class="bg-slate-950/70 p-5 rounded-xl border border-slate-800/80 text-slate-200">
              {{ char.plot }}
            </div>
          </div>

          <!-- Modal Footer -->
          <div class="p-4 bg-slate-950/80 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div class="flex items-center gap-2">
              @if (char.promptLink) {
                <a
                  [href]="char.promptLink"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-medium text-xs shadow-md shadow-rose-600/30 transition-all"
                >
                  <mat-icon class="!w-4 !h-4 !text-base">open_in_new</mat-icon>
                  Mở Prompt Google AI Studio
                </a>

                <button
                  (click)="copyLink(char.promptLink)"
                  class="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs transition-colors"
                >
                  <mat-icon class="!w-4 !h-4 !text-base">{{ copied() ? 'check' : 'content_copy' }}</mat-icon>
                  {{ copied() ? 'Đã sao chép!' : 'Sao chép link prompt' }}
                </button>
              }
            </div>

            <button
              (click)="closed.emit()"
              class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors ml-auto"
            >
              Đóng
            </button>
          </div>

        </div>
      </div>
    }
  `
})
export class CharacterDetail {
  readonly character = input<Character | null>(null);
  readonly closed = output<void>();
  readonly copied = signal<boolean>(false);

  copyLink(link: string): void {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(link).then(() => {
        this.copied.set(true);
        setTimeout(() => this.copied.set(false), 2000);
      }).catch(() => {
        // Fallback
      });
    }
  }
}
