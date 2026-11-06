import { Injectable, signal, computed } from '@angular/core';

export interface GardenFlower {
  id: string;
  name: string;
  species: 'rose' | 'daisy' | 'peony' | 'camellia' | 'blossom';
  color: string;
  petalColor: string;
  centerColor: string;
  leafColor: string;
  xPercent: number;
  yPercent: number;
  rotation: number;
  scale: number;
  hasRibbon: boolean;
  ribbonColor: string;
}

export type WindIntensity = 'gentle' | 'low' | 'off';

@Injectable({
  providedIn: 'root',
})
export class GardenTheme {
  // Motion mode: 'gentle' (default autumn breeze), 'low' (low power/spec), 'off' (static)
  readonly windMode = signal<WindIntensity>('gentle');

  // Seed / generation counter for random flowers
  readonly flowerGeneration = signal<number>(1);

  // Available flower species & autumn colors
  private readonly speciesList: Array<GardenFlower['species']> = [
    'rose',
    'daisy',
    'peony',
    'camellia',
    'blossom',
  ];

  private readonly colorPalettes = [
    { name: 'Hồng Phấn Cổ Tích', petal: '#FFB6C1', accent: '#FF69B4', center: '#FFF2B2', leaf: '#8FA88B', ribbon: '#FFD1DC' },
    { name: 'Hồng Đào Mùa Thu', petal: '#FFBFA9', accent: '#FA8072', center: '#FFE4B5', leaf: '#7D9B78', ribbon: '#FFE4E1' },
    { name: 'Bạch Trà Kem Sữa', petal: '#FFFBF5', accent: '#FFD6DF', center: '#FFE680', leaf: '#97A88D', ribbon: '#FFC0CB' },
    { name: 'Cúc Vàng Nắng Thu', petal: '#FCE6A4', accent: '#F5B041', center: '#D35400', leaf: '#8BA183', ribbon: '#FADBD8' },
    { name: 'Tử Đằng Mộng Mơ', petal: '#E8D5E5', accent: '#C8A2C8', center: '#FFF9E6', leaf: '#7B9477', ribbon: '#F4E7EB' },
  ];

  // Generated floral clusters around the garden
  readonly decorativeFlowers = computed<GardenFlower[]>(() => {
    // Rely on flowerGeneration signal
    const gen = this.flowerGeneration();
    const flowers: GardenFlower[] = [];

    // Distinct positions along corners and borders
    const anchorPositions = [
      { x: 4, y: 8 },
      { x: 94, y: 12 },
      { x: 2, y: 35 },
      { x: 96, y: 45 },
      { x: 5, y: 68 },
      { x: 95, y: 78 },
      { x: 8, y: 92 },
      { x: 92, y: 95 },
    ];

    anchorPositions.forEach((pos, idx) => {
      // Deterministic pseudo-random based on gen + idx
      const pseudo = (Math.sin((gen * 17) + (idx * 31)) + 1) / 2;
      const paletteIndex = Math.floor(pseudo * this.colorPalettes.length) % this.colorPalettes.length;
      const palette = this.colorPalettes[paletteIndex];
      const speciesIndex = Math.floor(((pseudo * 100) % this.speciesList.length));
      const species = this.speciesList[speciesIndex];

      flowers.push({
        id: `flower-${gen}-${idx}`,
        name: palette.name,
        species,
        color: palette.petal,
        petalColor: palette.petal,
        centerColor: palette.center,
        leafColor: palette.leaf,
        xPercent: pos.x + ((pseudo - 0.5) * 4),
        yPercent: pos.y + (((idx % 2 === 0 ? 1 : -1) * pseudo * 2)),
        rotation: Math.floor(pseudo * 360),
        scale: 0.85 + (pseudo * 0.35),
        hasRibbon: idx % 3 === 0,
        ribbonColor: palette.ribbon,
      });
    });

    return flowers;
  });

  constructor() {
    // Check system prefers-reduced-motion
    if (typeof window !== 'undefined' && window.matchMedia) {
      try {
        const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (motionQuery.matches) {
          this.windMode.set('low');
        }
        motionQuery.addEventListener('change', (e) => {
          if (e.matches) {
            this.windMode.set('low');
          }
        });
      } catch {
        // Fallback gracefully
      }
    }
  }

  // Shuffle & randomize decorative flowers
  randomizeFlowers(): void {
    this.flowerGeneration.update((g) => g + 1);
  }

  setWindMode(mode: WindIntensity): void {
    this.windMode.set(mode);
  }

  toggleWindMode(): void {
    const current = this.windMode();
    if (current === 'gentle') {
      this.windMode.set('low');
    } else if (current === 'low') {
      this.windMode.set('off');
    } else {
      this.windMode.set('gentle');
    }
  }
}
