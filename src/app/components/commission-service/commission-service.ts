import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Sound } from '../../services/sound';

export interface CommissionTier {
  id: string;
  name: string;
  badge?: string;
  price: string;
  priceNum: number;
  description: string;
  features: string[];
  recommendedFor: string;
  accentColor: string;
  bgLight: string;
}

export interface SurchargeItem {
  id: string;
  name: string;
  fee: string;
  description: string;
  icon: string;
}

export interface TosSection {
  number: string;
  title: string;
  icon: string;
  items: string[];
  highlight?: string;
}

@Component({
  selector: 'app-commission-service',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatIconModule],
  template: `
    <section id="commission" class="max-w-6xl mx-auto px-4 sm:px-6 py-16 scroll-mt-20">
      
      <!-- Container with vintage parchment feel -->
      <div class="bg-gradient-to-br from-white/95 via-[#FFFDFB]/95 to-[#FCF4F6]/95 rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#E8D4D8] vintage-shadow relative overflow-hidden">
        
        <!-- Decorative Ambient Blurs -->
        <div class="absolute -top-10 -right-10 w-44 h-44 bg-[#EBCBD4]/25 rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute -bottom-10 -left-10 w-44 h-44 bg-[#D8CEE9]/25 rounded-full blur-3xl pointer-events-none"></div>

        <!-- Header Ribbon Badge -->
        <div class="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EBCBD4]/40 border border-[#EBCBD4] text-[#A65B6D] text-xs font-serif tracking-widest uppercase mb-4 w-fit shadow-2xs">
          <mat-icon class="text-xs">palette</mat-icon>
          <span>Ôm Lấy Nỗi Nhớ Của Yue Yue</span>
          <mat-icon class="text-xs">favorite</mat-icon>
        </div>

        <!-- Main Title Header -->
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4 pb-4 border-b border-[#EBCBD4]/50">
          <div>
            <h2 class="font-serif-vintage text-3xl sm:text-4xl lg:text-5xl text-[#5B464B] font-bold tracking-tight">
              PRICE & TOS
            </h2>
            <p class="font-script-romantic text-xl sm:text-2xl text-[#8E7479] mt-1">
              Dịch vụ mở commission viết kịch bản & System Prompt AI theo yêu cầu
            </p>
          </div>

          <!-- Quick Action Buttons -->
          <div class="flex items-center gap-2">
            <a
              href="https://www.facebook.com/qingyue224"
              target="_blank"
              rel="noopener noreferrer"
              (click)="sound.playClick()"
              class="px-4 py-2 rounded-full bg-[#1877F2] hover:bg-[#166FE5] text-white text-xs font-medium flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>Nhắn Facebook</span>
            </a>

            <a
              href="https://discord.gg/qxQfxTGyk"
              target="_blank"
              rel="noopener noreferrer"
              (click)="sound.playClick()"
              class="px-4 py-2 rounded-full bg-[#5865F2] hover:bg-[#4752C4] text-white text-xs font-medium flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
              <span>Vào Discord</span>
            </a>
          </div>
        </div>

        <!-- Mandatory Agreement Notice Banner -->
        <div class="mb-8 p-4 rounded-2xl bg-[#FFF8EB] border border-[#F3DFC1] text-xs sm:text-sm text-[#7D5B28] flex items-center gap-3 shadow-2xs">
          <div class="w-8 h-8 rounded-full bg-[#ECC688]/40 flex items-center justify-center shrink-0 text-[#8F5910]">
            <mat-icon class="text-base">gavel</mat-icon>
          </div>
          <div class="leading-relaxed">
            <span class="font-bold text-[#674415]">Vui lòng đọc kỹ trước khi đặt commission.</span>
            <span class="ml-1">Đặt đơn / thanh toán = đồng ý với toàn bộ điều khoản TOS dưới đây.</span>
          </div>
        </div>

        <!-- Tab Controls Navigation -->
        <div class="flex flex-wrap items-center gap-2 mb-8 p-1.5 rounded-2xl bg-[#F5ECEE]/70 border border-[#ECD9DE] w-fit">
          <button
            type="button"
            (click)="setActiveTab('pricing')"
            class="px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center gap-1.5 cursor-pointer"
            [class.bg-white]="activeTab() === 'pricing'"
            [class.text-[#A65B6D]]="activeTab() === 'pricing'"
            [class.shadow-xs]="activeTab() === 'pricing'"
            [class.text-[#78666A]]="activeTab() !== 'pricing'"
          >
            <mat-icon class="text-sm">loyalty</mat-icon>
            <span>Bảng Giá Commission (5 gói)</span>
          </button>

          <button
            type="button"
            (click)="setActiveTab('surcharge')"
            class="px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center gap-1.5 cursor-pointer"
            [class.bg-white]="activeTab() === 'surcharge'"
            [class.text-[#A65B6D]]="activeTab() === 'surcharge'"
            [class.shadow-xs]="activeTab() === 'surcharge'"
            [class.text-[#78666A]]="activeTab() !== 'surcharge'"
          >
            <mat-icon class="text-sm">add_circle_outline</mat-icon>
            <span>Phụ Phí (7 mục)</span>
          </button>

          <button
            type="button"
            (click)="setActiveTab('tos')"
            class="px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center gap-1.5 cursor-pointer"
            [class.bg-white]="activeTab() === 'tos'"
            [class.text-[#A65B6D]]="activeTab() === 'tos'"
            [class.shadow-xs]="activeTab() === 'tos'"
            [class.text-[#78666A]]="activeTab() !== 'tos'"
          >
            <mat-icon class="text-sm">menu_book</mat-icon>
            <span>10 Điều Khoản TOS</span>
          </button>
        </div>

        <!-- TAB 1: BẢNG GIÁ COMMISSION -->
        @if (activeTab() === 'pricing') {
          <div class="space-y-6">
            <div class="flex items-center justify-between">
              <h3 class="font-serif-vintage text-2xl font-bold text-[#5B464B] flex items-center gap-2">
                <mat-icon class="text-[#C98F9E]">format_list_bulleted</mat-icon>
                <span>Các Gói Commission Khả Dụng</span>
              </h3>
              <span class="text-xs text-[#8E7479] font-serif">Đơn vị: VNĐ (k = nghìn đồng)</span>
            </div>

            <!-- Grid of 5 Tiers -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              @for (tier of tiers; track tier.id) {
                <div
                  class="rounded-2xl p-6 border transition-all duration-300 flex flex-col justify-between hover:shadow-md bg-white/90 relative"
                  [class.border-[#E8D4D8]]="tier.id !== 'advanced' && tier.id !== 'premium'"
                  [class.border-[#C98F9E]]="tier.id === 'advanced' || tier.id === 'premium'"
                  [class.ring-2]="tier.id === 'advanced'"
                  [class.ring-[#C98F9E]/20]="tier.id === 'advanced'"
                >
                  <!-- Optional Best Seller / Popular Ribbon -->
                  @if (tier.badge) {
                    <div class="absolute -top-3 right-4 px-3 py-0.5 rounded-full bg-[#C98F9E] text-white text-[11px] font-medium tracking-wide shadow-2xs">
                      {{ tier.badge }}
                    </div>
                  }

                  <div>
                    <!-- Tier Name & Price -->
                    <div class="flex items-baseline justify-between mb-2">
                      <h4 class="font-serif-vintage text-2xl font-bold text-[#5B464B]">
                        {{ tier.name }}
                      </h4>
                      <span class="text-2xl font-bold text-[#A65B6D] font-mono">
                        {{ tier.price }}
                      </span>
                    </div>

                    <!-- Recommended Purpose -->
                    <p class="text-xs text-[#8E7479] italic mb-4 pb-3 border-b border-[#F0DFE3]">
                      {{ tier.recommendedFor }}
                    </p>

                    <!-- Features List -->
                    <ul class="space-y-2 text-xs sm:text-sm text-[#6B555A] mb-6">
                      @for (feat of tier.features; track feat) {
                        <li class="flex items-start gap-2">
                          <mat-icon class="text-sm text-[#C98F9E] shrink-0 mt-0.5">check_circle</mat-icon>
                          <span>{{ feat }}</span>
                        </li>
                      }
                    </ul>
                  </div>

                  <!-- Quick Order Actions -->
                  <div class="pt-4 border-t border-[#F5E5E8] flex items-center justify-between gap-2">
                    <a
                      href="https://www.facebook.com/qingyue224"
                      target="_blank"
                      rel="noopener noreferrer"
                      (click)="sound.playClick()"
                      class="flex-1 py-2.5 rounded-xl bg-[#FAF0E6] hover:bg-[#1877F2] text-[#78666A] hover:text-white text-xs font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                    >
                      <mat-icon class="text-xs">chat</mat-icon>
                      <span>Đặt qua FB</span>
                    </a>
                    <a
                      href="https://discord.gg/qxQfxTGyk"
                      target="_blank"
                      rel="noopener noreferrer"
                      (click)="sound.playClick()"
                      class="flex-1 py-2.5 rounded-xl bg-[#FAF0E6] hover:bg-[#5865F2] text-[#78666A] hover:text-white text-xs font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                    >
                      <mat-icon class="text-xs">forum</mat-icon>
                      <span>Đặt qua Discord</span>
                    </a>
                  </div>
                </div>
              }
            </div>
          </div>
        }

        <!-- TAB 2: PHỤ PHÍ (NẾU CÓ) -->
        @if (activeTab() === 'surcharge') {
          <div class="space-y-6">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="font-serif-vintage text-2xl font-bold text-[#5B464B] flex items-center gap-2">
                  <mat-icon class="text-[#9A84B8]">receipt_long</mat-icon>
                  <span>Bảng Phụ Phí Chi Tiết (7 Mục)</span>
                </h3>
                <p class="text-xs text-[#8E7479] mt-1">
                  Áp dụng khi đơn phát sinh thêm yêu cầu đặc thù hoặc vượt hạn mức của gói đã chọn.
                </p>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              @for (item of surcharges; track item.id) {
                <div class="p-5 rounded-2xl bg-white/90 border border-[#ECD9DE] hover:border-[#D8CEE9] transition-all flex items-start gap-4">
                  <div class="w-10 h-10 rounded-xl bg-[#D8CEE9]/30 text-[#7D6B9A] flex items-center justify-center shrink-0">
                    <mat-icon class="text-xl">{{ item.icon }}</mat-icon>
                  </div>
                  <div class="flex-1">
                    <div class="flex items-baseline justify-between mb-1">
                      <h4 class="font-serif-vintage text-base font-bold text-[#5B464B]">
                        {{ item.name }}
                      </h4>
                      <span class="text-sm font-bold text-[#A65B6D] font-mono bg-[#FFF3F5] px-2.5 py-0.5 rounded-full border border-[#EBCBD4]">
                        {{ item.fee }}
                      </span>
                    </div>
                    <p class="text-xs text-[#78666A] leading-relaxed">
                      {{ item.description }}
                    </p>
                  </div>
                </div>
              }
            </div>

            <!-- Helpful Surcharge Advice Box -->
            <div class="p-5 rounded-2xl bg-[#F7F2FA] border border-[#E3D9EE] text-xs sm:text-sm text-[#5B4C72] flex items-start gap-3">
              <mat-icon class="text-[#7D6B9A] text-lg shrink-0 mt-0.5">info</mat-icon>
              <div class="leading-relaxed">
                <strong>Lưu ý về phụ phí:</strong> Mọi phụ phí đều được trao đổi rõ ràng và chốt trước khi bạn thanh toán hoặc đặt cọc. Không phát sinh chi phí ngầm trong quá trình thực hiện kịch bản.
              </div>
            </div>
          </div>
        }

        <!-- TAB 3: TERMS OF SERVICE (10 ĐIỀU KHOẢN) -->
        @if (activeTab() === 'tos') {
          <div class="space-y-6">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="font-serif-vintage text-2xl font-bold text-[#5B464B] flex items-center gap-2">
                  <mat-icon class="text-[#C98F9E]">article</mat-icon>
                  <span>10 Điều Khoản Dịch Vụ (TOS)</span>
                </h3>
                <p class="text-xs text-[#8E7479] mt-1">
                  Đảm bảo quyền lợi, tính minh bạch và sự thống nhất tuyệt đối giữa hai bên.
                </p>
              </div>
            </div>

            <!-- Search or Toggle All -->
            <div class="flex items-center gap-2">
              <button
                type="button"
                (click)="toggleAllTos()"
                class="px-3.5 py-1.5 rounded-full bg-white border border-[#ECD9DE] text-xs font-medium text-[#78666A] hover:text-[#5B464B] transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
              >
                <mat-icon class="text-xs">{{ allExpanded() ? 'unfold_less' : 'unfold_more' }}</mat-icon>
                <span>{{ allExpanded() ? 'Thu gọn tất cả' : 'Mở rộng tất cả 10 mục' }}</span>
              </button>
            </div>

            <!-- 10 TOS Accordion Cards -->
            <div class="space-y-3.5">
              @for (sec of tosList; track sec.number) {
                <div class="rounded-2xl border transition-all overflow-hidden bg-white/95"
                  [class.border-[#E8D4D8]]="!isTosExpanded(sec.number)"
                  [class.border-[#C98F9E]]="isTosExpanded(sec.number)"
                  [class.shadow-xs]="isTosExpanded(sec.number)"
                >
                  <!-- Card Header Bar -->
                  <button
                    type="button"
                    (click)="toggleTosItem(sec.number)"
                    class="w-full px-5 py-4 flex items-center justify-between text-left cursor-pointer hover:bg-[#FFF9FA] transition-colors"
                  >
                    <div class="flex items-center gap-3">
                      <span class="w-8 h-8 rounded-full bg-[#EBCBD4]/40 text-[#A65B6D] text-xs font-serif font-bold flex items-center justify-center shrink-0">
                        {{ sec.number }}
                      </span>
                      <span class="font-serif-vintage text-base sm:text-lg font-bold text-[#5B464B]">
                        {{ sec.title }}
                      </span>
                    </div>

                    <div class="flex items-center gap-2 text-[#8E7479]">
                      <mat-icon class="text-sm transition-transform duration-200" [class.rotate-180]="isTosExpanded(sec.number)">
                        expand_more
                      </mat-icon>
                    </div>
                  </button>

                  <!-- Card Body -->
                  @if (isTosExpanded(sec.number)) {
                    <div class="px-5 pb-5 pt-1 border-t border-[#F5E5E8] text-xs sm:text-sm text-[#6B555A] leading-relaxed space-y-2.5 animate-fade-in">
                      @for (p of sec.items; track p) {
                        <div class="flex items-start gap-2.5">
                          <mat-icon class="text-xs text-[#C98F9E] shrink-0 mt-1">arrow_right</mat-icon>
                          <span>{{ p }}</span>
                        </div>
                      }
                      @if (sec.highlight) {
                        <div class="mt-3 p-3 rounded-xl bg-[#FFF8EB] border border-[#F5E1C3] text-xs text-[#7A5722] font-medium flex items-center gap-2">
                          <mat-icon class="text-xs text-[#C28222]">lightbulb</mat-icon>
                          <span>{{ sec.highlight }}</span>
                        </div>
                      }
                    </div>
                  }
                </div>
              }
            </div>

            <!-- TOS Confirmation Final Badge -->
            <div class="p-6 rounded-2xl bg-gradient-to-r from-[#FFF0F3] via-white to-[#F6EDF8] border border-[#EBCBD4] text-center">
              <mat-icon class="text-2xl text-[#C98F9E] mb-1">verified</mat-icon>
              <h4 class="font-serif-vintage text-lg font-bold text-[#5B464B]">
                10. XÁC NHẬN ĐỒNG Ý
              </h4>
              <p class="text-xs sm:text-sm text-[#78666A] max-w-xl mx-auto mt-1 leading-relaxed">
                Việc bạn đặt commission và thanh toán đồng nghĩa với việc bạn đã đọc, hiểu và đồng ý với toàn bộ các điều khoản trên. Chúc bạn có những giây phút roleplay thật vui vẻ và đáng nhớ cùng character của mình!
              </p>
            </div>
          </div>
        }

        <!-- Bottom Footer of Section -->
        <div class="mt-12 pt-6 border-t border-[#F0DFE3] flex flex-col sm:flex-row items-center justify-between text-xs text-[#8E7479] gap-3">
          <div class="flex items-center gap-2 font-serif">
            <mat-icon class="text-xs text-[#C98F9E]">auto_awesome</mat-icon>
            <span>Tác giả: Yue Yue (qingyue224) • LOVE HAVE Commission Service</span>
          </div>

          <div class="flex items-center gap-3">
            <a
              href="https://www.facebook.com/qingyue224"
              target="_blank"
              rel="noopener noreferrer"
              class="hover:text-[#1877F2] transition-colors"
            >
              Facebook: fb.com/qingyue224
            </a>
            <span>•</span>
            <a
              href="https://discord.gg/qxQfxTGyk"
              target="_blank"
              rel="noopener noreferrer"
              class="hover:text-[#5865F2] transition-colors"
            >
              Discord: discord.gg/qxQfxTGyk
            </a>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class CommissionServiceComponent {
  readonly sound = inject(Sound);

  readonly activeTab = signal<'pricing' | 'surcharge' | 'tos'>('pricing');
  readonly expandedTosSet = signal<Set<string>>(new Set(['01', '02', '03']));
  readonly allExpanded = signal<boolean>(false);

  // 5 Tiers Data
  readonly tiers: CommissionTier[] = [
    {
      id: 'basic',
      name: 'Basic',
      price: '60k',
      priceNum: 60,
      description: 'Dành cho character đơn giản, dễ chơi, có tầm 1-2 NPC.',
      features: [
        'Prompt hoàn chỉnh',
        'Profile ngắn: tên, tuổi, giới tính, vài nét tính cách',
        'Hỗ trợ 1 - 2 NPC cơ bản',
      ],
      recommendedFor: 'Phù hợp người mới thử nghiệm bot, nhân vật tình huống nhanh.',
      accentColor: '#9A84B8',
      bgLight: '#FAF5FF',
    },
    {
      id: 'standard',
      name: 'Standard',
      price: '80 - 90k',
      priceNum: 85,
      description: 'Dành cho character cơ bản, có plot mở/drama.',
      features: [
        'Prompt hoàn chỉnh',
        'Profile cơ bản: tên, tuổi, giới tính, tính cách, ngoại hình',
        'Backstory < 2.000 ký tự',
        'First message < 2.000 ký tự',
        'Rule Anti-OOC',
        '≤ 3 NPC cơ bản',
      ],
      recommendedFor: 'Cân bằng, phổ biến cho các cốt truyện đời thường, học đường, tình cảm.',
      accentColor: '#C98F9E',
      bgLight: '#FFF7F9',
    },
    {
      id: 'advanced',
      name: 'Advanced',
      badge: 'Khuyên Dùng',
      price: '100 - 140k',
      priceNum: 120,
      description: 'Dành cho character có cốt truyện rõ ràng, được xây dựng chỉn chu. Có plot ẩn/drama.',
      features: [
        'Prompt chuyên sâu',
        'Profile đầy đủ: tính cách, ngoại hình, sở thích/ghét, quan hệ và thông tin liên quan',
        'Backstory < 5.000 ký tự',
        'First message < 5.000 ký tự',
        'Rule Anti-OOC',
        'Rule Anti-User Role Stealing',
        '≤ 5 NPC cơ bản',
      ],
      recommendedFor: 'Cốt truyện nhiều kịch tính, thế giới đô thị, hào môn, tâm lý có chiều sâu.',
      accentColor: '#A65B6D',
      bgLight: '#FFF0F3',
    },
    {
      id: 'premium',
      name: 'Premium',
      badge: 'Nổi Bật',
      price: '150 - 200k',
      priceNum: 175,
      description: 'Dành cho character có drama, plot ẩn, bí mật hoặc nhiều lớp thông tin.',
      features: [
        'Prompt cao cấp',
        'Profile chi tiết đa tầng',
        'Backstory < 8.000 ký tự',
        'First message < 8.000 ký tự',
        'Rule Anti-OOC',
        'Rule Anti-User Role Stealing',
        'Lệnh riêng theo {{char}}',
        '≤ 3 NPC phức tạp',
      ],
      recommendedFor: 'Nhân vật đa nhân cách, trinh thám, tranh đoạt quyền lực, ngược tâm sâu sắc.',
      accentColor: '#8E4858',
      bgLight: '#FAF0E6',
    },
    {
      id: 'custom',
      name: 'Custom',
      price: 'Trên 200k+',
      priceNum: 220,
      description: 'Dành cho project có độ phức tạp cao / Open World.',
      features: [
        'Lore / Worldbuilding riêng biệt',
        'Nhiều NPC / nhiều tuyến nhân vật song song',
        'Cốt truyện phân nhánh / hidden plot bí mật',
        'Format RP riêng biệt / lệnh riêng chuyên sâu',
        'Báo giá linh hoạt theo yêu cầu cụ thể',
      ],
      recommendedFor: 'Dự án game RPG lớn, vũ trụ tiểu thuyết riêng, Open World hoàn chỉnh.',
      accentColor: '#5B464B',
      bgLight: '#F5ECEE',
    },
  ];

  // 7 Surcharges Data
  readonly surcharges: SurchargeItem[] = [
    {
      id: 'private',
      name: 'Private',
      fee: '+20%',
      description: 'Giữ bot riêng tư tuyệt đối, không công khai dưới mọi hình thức, không làm sample.',
      icon: 'lock',
    },
    {
      id: 'basic-npc',
      name: 'NPC cơ bản',
      fee: '+10K / NPC',
      description: 'Tính cách ngắn gọn, vai trò phụ, xuất hiện hỗ trợ cốt truyện.',
      icon: 'person_outline',
    },
    {
      id: 'complex-npc',
      name: 'NPC phức tạp',
      fee: '+20K / NPC',
      description: 'Có tính cách riêng, mục tiêu riêng, can thiệp sâu vào diễn biến cốt truyện.',
      icon: 'groups',
    },
    {
      id: 'overlength',
      name: 'Vượt giới hạn ký tự',
      fee: '+15K / ~1K ký tự',
      description: 'Backstory hoặc First Message vượt quá số ký tự quy định của gói đã chọn.',
      icon: 'text_fields',
    },
    {
      id: 'canon',
      name: 'Dựa trên tác phẩm có sẵn',
      fee: '+20 - 50K',
      description: 'Cần thời gian nghiên cứu chuyên sâu về character, lore, mối quan hệ và văn phong canon gốc.',
      icon: 'auto_stories',
    },
    {
      id: 'worldbuilding',
      name: 'Worldbuilding riêng',
      fee: '+30K trở lên',
      description: 'Cần xây dựng bối cảnh riêng, hệ thống phép thuật, cấp bậc hoặc thế giới mới hoàn toàn.',
      icon: 'public',
    },
    {
      id: 'rush',
      name: 'Rush Order',
      fee: '+30 - 50%',
      description: 'Hoàn thành gấp trước deadline tiêu chuẩn (tùy theo độ gấp và khối lượng công việc).',
      icon: 'bolt',
    },
  ];

  // 10 TOS Sections Data
  readonly tosList: TosSection[] = [
    {
      number: '01',
      title: 'QUY TRÌNH LÀM VIỆC',
      icon: 'alt_route',
      items: [
        'Trao đổi ý tưởng, bối cảnh, yêu cầu cụ thể cho character.',
        'Thống nhất gói commission, phụ phí (nếu có) và deadline.',
        'Bạn đặt cọc / thanh toán theo thỏa thuận.',
        'Mình lên First Message (FM) và Backstory (BS) cơ bản.',
        'Gửi bản nháp để bạn duyệt phong cách mở đầu và hướng phát triển.',
        'Hoàn thiện toàn bộ prompt, profile, rules và các phần còn lại.',
        'Gửi sản phẩm hoàn chỉnh để bạn test trong vòng 3 ngày.',
        'Hỗ trợ chỉnh sửa theo đúng quy định ở mục 02.',
      ],
      highlight: 'Thời gian test thử nghiệm miễn phí: 3 ngày kể từ khi bàn giao bản hoàn chỉnh.',
    },
    {
      number: '02',
      title: 'CHỈNH SỬA & BẢO HÀNH',
      icon: 'published_with_changes',
      items: [
        'Chỉnh sửa miễn phí nếu: Bot không đúng với brief ban đầu, lỗi prompt nghiêm trọng khiến bot không hoạt động, bot OOC nặng so với thỏa thuận ban đầu.',
        'Có tính phí nếu: Bạn muốn thay đổi cốt truyện, đổi tính cách, thêm thắt tình tiết mới lệch khỏi brief ban đầu sau khi đã hoàn thành.',
        'Thời hạn hỗ trợ: Tối đa 10 ngày kể từ ngày bàn giao sản phẩm hoàn chỉnh. Sau thời gian này, mọi chỉnh sửa đều tính phí như làm mới một phần.',
      ],
    },
    {
      number: '03',
      title: 'THANH TOÁN & HOÀN TIỀN',
      icon: 'payments',
      items: [
        'Thanh toán: Chấp nhận chuyển khoản ngân hàng (ưu tiên) hoặc ví điện tử. Thanh toán 100% trước khi làm hoặc cọc 50% sau khi thống nhất brief và duyệt FM + BS cơ bản (áp dụng cho đơn từ Standard trở lên).',
        'Hoàn tiền 100%: Nếu mình không thể hoàn thành đơn đúng hạn vì lý do cá nhân mà không báo trước hoặc hai bên không tìm được tiếng nói chung trong giai đoạn lên khung (chưa viết chi tiết).',
        'Hoàn tiền một phần (30 - 50%): Nếu hủy đơn khi mình đã hoàn thành xong FM và BS cơ bản.',
        'Không hoàn tiền: Khi sản phẩm đã hoàn thành và gửi bản test/bản chính thức.',
      ],
    },
    {
      number: '04',
      title: 'QUYỀN SỞ HỮU & SỬ DỤNG',
      icon: 'shield',
      items: [
        'Bạn có toàn quyền sử dụng character cho mục đích cá nhân: chơi trên các nền tảng AI (JanitorAI, Chub, CharacterAI...), chia sẻ cho bạn bè (nếu không đặt gói Private).',
        'Bạn KHÔNG ĐƯỢC: Bán lại prompt, claim prompt là do bạn tự viết 100%, sử dụng cho mục đích thương mại khi chưa có thỏa thuận riêng.',
        'Quyền của mình: Mình có quyền giữ credit là người tạo prompt. Với các đơn không đặt gói Private, mình có quyền đăng bot lên trang cá nhân/kênh của mình dưới dạng sample sau khi bạn đã nhận hàng tối thiểu 3 ngày.',
      ],
    },
    {
      number: '05',
      title: 'CHARACTER DỰA TRÊN TÁC PHẨM CÓ SẴN',
      icon: 'menu_book',
      items: [
        'Đối với character từ phim, anime, game, tiểu thuyết: Mình sẽ cố gắng bám sát canon nhất có thể. Tuy nhiên, AI vẫn là AI — prompt chỉ đóng vai trò định hướng khoảng 70-80%, còn lại phụ thuộc vào model AI bạn sử dụng.',
        'Vui lòng cung cấp tư liệu nếu character quá ít thông tin hoặc là nhân vật phụ ít đất diễn.',
      ],
    },
    {
      number: '06',
      title: 'TÍNH MINH BẠCH VỀ AI (AI TRANSPARENCY)',
      icon: 'psychology',
      items: [
        'Trong quá trình làm bot, mình có thể sử dụng AI để hỗ trợ sắp xếp thông tin, kiểm tra logic prompt hoặc tối ưu hóa từ ngữ.',
        'Tuy nhiên, ý tưởng cốt truyện, cấu trúc prompt, thiết lập nhân vật và kiểm duyệt chất lượng đều do mình trực tiếp thực hiện và kiểm soát.',
        'Nếu bạn yêu cầu 100% thủ công không qua bất kỳ công cụ AI nào hỗ trợ, vui lòng thông báo trước và phụ phí sẽ áp dụng.',
      ],
    },
    {
      number: '07',
      title: 'GIỚI HẠN CỦA PROMPT & NỀN TẢNG',
      icon: 'memory',
      items: [
        'Prompt là khung xương giúp định hình nhân vật, nhưng chất lượng roleplay thực tế còn phụ thuộc vào: model AI bạn dùng (Claude, GPT, Gemini, Wizard...), jailbreak / prefill, context size và cách viết của chính bạn (User).',
        'Mình cam kết tối ưu prompt tốt nhất trong khả năng, nhưng không chịu trách nhiệm nếu nền tảng AI bạn dùng bị thay đổi thuật toán, kiểm duyệt gắt gao hơn hoặc model hoạt động kém ổn định sau thời gian bàn giao.',
      ],
    },
    {
      number: '08',
      title: 'DEADLINE',
      icon: 'hourglass_top',
      items: [
        'Thời gian hoàn thành tiêu chuẩn: 7 - 14 ngày tùy độ phức tạp của gói (tính từ ngày thanh toán/cọc).',
        'Với các đơn dài hoặc đợt quá tải, mình sẽ chủ động thông báo nếu cần thêm thời gian.',
        'Đơn cần gấp (dưới 5 ngày) vui lòng chọn phụ phí Rush Order (+30 - 50%).',
      ],
    },
    {
      number: '09',
      title: 'QUYỀN TỪ CHỐI',
      icon: 'block',
      items: [
        'Mình có quyền từ chối các đơn: Có nội dung vi phạm pháp luật nghiêm trọng, thể loại mình không thoải mái / không đủ tự tin làm tốt, hoặc thái độ của khách không tôn trọng, toxic trong quá trình trao đổi.',
      ],
    },
    {
      number: '10',
      title: 'XÁC NHẬN ĐỒNG Ý',
      icon: 'verified',
      items: [
        'Việc bạn đặt commission và thanh toán đồng nghĩa với việc bạn đã đọc, hiểu và đồng ý với toàn bộ các điều khoản trên.',
        'Chúc bạn có những giây phút roleplay thật vui vẻ và đáng nhớ cùng character của mình!',
      ],
    },
  ];

  setActiveTab(tab: 'pricing' | 'surcharge' | 'tos'): void {
    this.sound.playClick();
    this.activeTab.set(tab);
  }

  isTosExpanded(num: string): boolean {
    return this.expandedTosSet().has(num);
  }

  toggleTosItem(num: string): void {
    this.sound.playClick();
    this.expandedTosSet.update((set) => {
      const next = new Set(set);
      if (next.has(num)) {
        next.delete(num);
      } else {
        next.add(num);
      }
      return next;
    });
  }

  toggleAllTos(): void {
    this.sound.playClick();
    if (this.allExpanded()) {
      this.expandedTosSet.set(new Set());
      this.allExpanded.set(false);
    } else {
      const allNums = this.tosList.map((t) => t.number);
      this.expandedTosSet.set(new Set(allNums));
      this.allExpanded.set(true);
    }
  }
}
