import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-garden-background',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none" aria-hidden="true">
      <!-- Soft romantic gradient overlays -->
      <div class="absolute -top-32 -left-32 w-96 h-96 bg-[#FBECEF]/60 rounded-full blur-3xl"></div>
      <div class="absolute top-1/3 -right-32 w-[32rem] h-[32rem] bg-[#FFF2E5]/50 rounded-full blur-3xl"></div>
      <div class="absolute bottom-10 left-1/4 w-[28rem] h-[28rem] bg-[#F5ECEE]/40 rounded-full blur-3xl"></div>

      <!-- Subtle parchment noise pattern -->
      <div class="absolute inset-0 opacity-[0.025] bg-[radial-gradient(#5B464B_1px,transparent_1px)] [background-size:24px_24px]"></div>
    </div>
  `,
})
export class GardenBackground {}
