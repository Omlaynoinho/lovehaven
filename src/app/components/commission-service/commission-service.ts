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
        <div class="max-w-3xl mx-auto text-center mb-10">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF0E6] border border-[#E8D4D8] text-xs font-serif text-[#A65B6D] mb-3">
            <mat-icon class="text-xs">palette</mat-icon>
            <span class="tracking-wide">Dịch Vụ Commission Character Độc Quyền</span>
          </div>

          <h2 class="font-serif-vintage text-3xl sm:text-4xl lg:text-5xl font-bold text-[#5B464B] tracking-tight">
            Ôm Lấy Nỗi Nhớ Của Yue Yue
          </h2>
          <p class="font-serif text-sm sm:text-base text-[#8E7479] mt-1 tracking-widest uppercase font-semibold">
            PRICE & TOS COMMISSION
          </p>
          <p class="font-script-romantic text-lg sm:text-xl text-[#A65B6D] mt-2">
            "Vui lòng đọc kỹ trước khi đặt commission. Đặt đơn / thanh toán = đồng ý với TOS."
          </p>

          <!-- Contact Quick Pill Buttons -->
          <div class="flex flex-wrap items-center justify-center gap-3 mt-5">
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
              href="https://discord.gg/FCwQ56R6y"
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

        <!-- Section Navigation Tabs -->
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
                  class="rounded-3xl p-6 sm:p-7 bg-white/90 border border-[#E9D7DC] hover:border-[#C98F9E] transition-all duration-300 vintage-shadow hover:shadow-xl flex flex-col justify-between relative overflow-hidden"
                >
                  <!-- Badge for Best-Seller / Popular -->
                  @if (tier.badge) {
                    <div class="absolute top-4 right-4 bg-gradient-to-r from-[#C98F9E] to-[#A65B6D] text-white text-[10px] font-serif uppercase tracking-wider font-bold py-1 px-3 rounded-full shadow-2xs">
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
                      href="https://discord.gg/FCwQ56R6y"
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
                <div class="p-5 rounded-2xl bg-white/90 border border-[#ECD9DE] hover:border-[#C98F9E]/50 transition-all vintage-shadow flex gap-4">
                  <div class="w-10 h-10 rounded-2xl bg-[#FAF0E6] text-[#A65B6D] flex items-center justify-center shrink-0">
                    <mat-icon class="text-xl">{{ item.icon }}</mat-icon>
                  </div>
                  <div class="flex-1">
                    <div class="flex items-center justify-between mb-1">
                      <h4 class="font-serif-vintage font-bold text-[#5B464B] text-base">
                        {{ item.name }}
                      </h4>
                      <span class="font-mono font-bold text-[#A65B6D] text-sm">
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
          </div>
        }

        <!-- TAB 3: ĐIỀU KHOẢN TOS (10 ĐIỀU) -->
        @if (activeTab() === 'tos') {
          <div class="space-y-6">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 class="font-serif-vintage text-2xl font-bold text-[#5B464B] flex items-center gap-2">
                  <mat-icon class="text-[#A65B6D]">menu_book</mat-icon>
                  <span>Điều Khoản Dịch Vụ (TOS)</span>
                </h3>
                <p class="text-xs text-[#8E7479] mt-1">
                  10 quy định và nguyên tắc làm việc rõ ràng bảo vệ quyền lợi đôi bên.
                </p>
              </div>

              <button
                type="button"
                (click)="toggleAllTos()"
                class="px-3.5 py-1.5 rounded-full bg-[#FAF0E6] hover:bg-[#FBE4E9] text-xs font-serif text-[#A65B6D] transition-colors cursor-pointer w-fit"
              >
                {{ allExpanded() ? 'Thu gọn tất cả' : 'Mở rộng tất cả 10 điều' }}
              </button>
            </div>

            <!-- TOS Accordion List -->
            <div class="space-y-3">
              @for (tos of tosList; track tos.number) {
                <div class="rounded-2xl border border-[#ECD9DE] bg-white/90 overflow-hidden transition-all">
                  <button
                    type="button"
                    (click)="toggleTosItem(tos.number)"
                    class="w-full p-4 sm:p-5 text-left flex items-center justify-between hover:bg-[#FFF9FA] transition-colors cursor-pointer"
                  >
                    <div class="flex items-center gap-3">
                      <span class="w-8 h-8 rounded-full bg-[#FAF0E6] text-[#A65B6D] font-mono font-bold text-xs flex items-center justify-center shrink-0">
                        {{ tos.number }}
                      </span>
                      <div class="flex items-center gap-2">
                        <mat-icon class="text-sm text-[#C98F9E]">{{ tos.icon }}</mat-icon>
                        <h4 class="font-serif-vintage text-sm sm:text-base font-bold text-[#5B464B]">
                          {{ tos.title }}
                        </h4>
                      </div>
                    </div>

                    <mat-icon class="text-base text-[#8E7479] transition-transform duration-200" [class.rotate-180]="isTosExpanded(tos.number)">
                      expand_more
                    </mat-icon>
                  </button>

                  @if (isTosExpanded(tos.number)) {
                    <div class="px-5 pb-5 pt-1 border-t border-[#F5E5E8] text-xs sm:text-sm text-[#6B555A] space-y-2 leading-relaxed bg-[#FFFDFB]">
                      @for (item of tos.items; track item) {
                        <p class="flex items-start gap-2">
                          <span class="text-[#C98F9E] mt-0.5">•</span>
                          <span>{{ item }}</span>
                        </p>
                      }

                      @if (tos.highlight) {
                        <div class="mt-2 p-2.5 rounded-xl bg-[#FFF4F6] border border-[#F5DCE2] text-xs text-[#A65B6D] font-medium">
                          ⚠️ {{ tos.highlight }}
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
              <h4 class="font-serif-vintage text-lg font-bold text-[#5B464B] tracking-wide">
                ĐẶT COMMISSION = ĐỒNG Ý VỚI TOS
              </h4>
              <p class="text-xs sm:text-sm text-[#78666A] max-w-xl mx-auto mt-2 leading-relaxed font-serif">
                Việc thanh toán / đặt commission đồng nghĩa với việc khách hàng đã đọc, hiểu và đồng ý với toàn bộ nội dung của TOS này. Mọi tranh chấp phát sinh (nếu có) sẽ được giải quyết trên tinh thần thiện chí và căn cứ theo các điều khoản đã nêu trong TOS.
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
              href="https://discord.gg/FCwQ56R6y"
              target="_blank"
              rel="noopener noreferrer"
              class="hover:text-[#5865F2] transition-colors"
            >
              Discord: discord.gg/FCwQ56R6y
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
        'Dành cho character đơn giản, dễ chơi, có tầm 1-2 NPC',
        'Prompt chuẩn chỉnh, tối ưu hóa',
        'Profile ngắn: tên, tuổi, giới tính, vài nét tính cách',
      ],
      recommendedFor: 'Dành cho character đơn giản, dễ chơi, có tầm 1-2 NPC.',
      accentColor: '#B8C8B0',
      bgLight: '#F4F7F3',
    },
    {
      id: 'standard',
      name: 'Standard',
      price: '80 - 90k',
      priceNum: 85,
      description: 'Dành cho character cơ bản, có plot mở/drama.',
      features: [
        'Dành cho character cơ bản, có plot mở/drama',
        'Profile cơ bản: tên, tuổi, giới tính, tính cách, ngoại hình',
        'Backstory <2K ký tự',
        'First message <2K ký tự',
        'Rule Anti-OOC',
        '≤3 NPC cơ bản',
      ],
      recommendedFor: 'Dành cho character cơ bản, có plot mở/drama.',
      accentColor: '#D8CEE9',
      bgLight: '#F8F6FC',
    },
    {
      id: 'advanced',
      name: 'Advanced',
      badge: 'Phổ Biến Nhất',
      price: '100 - 140k',
      priceNum: 120,
      description: 'Dành cho character có cốt truyện rõ ràng, được xây dựng chỉnh chu. Có plot ẩn/drama.',
      features: [
        'Cốt truyện rõ ràng, chỉnh chu, plot ẩn/drama',
        'Profile đầy đủ: tính cách, ngoại hình, sở thích/ghét, quan hệ và thông tin liên quan',
        'Backstory <5K ký tự',
        'First message <5K ký tự',
        'Rule Anti-OOC',
        'Rule Anti-User Role Stealing',
        '≤5 NPC cơ bản',
      ],
      recommendedFor: 'Character có cốt truyện rõ ràng, chỉnh chu. Có plot ẩn/drama.',
      accentColor: '#C98F9E',
      bgLight: '#FCF2F5',
    },
    {
      id: 'premium',
      name: 'Premium',
      badge: 'Chuyên Sâu',
      price: '150 - 200k',
      priceNum: 175,
      description: 'Dành cho character có drama, plot ẩn, bí mật hoặc nhiều lớp thông tin.',
      features: [
        'Có drama, plot ẩn, bí mật hoặc nhiều lớp thông tin',
        'Profile chi tiết sâu sắc',
        'Backstory <8K ký tự',
        'First message <8K ký tự',
        'Rule Anti-OOC',
        'Rule Anti-User Role Stealing',
        'Lệnh riêng theo {{char}}',
        '≤3 NPC phức tạp',
      ],
      recommendedFor: 'Character có drama, plot ẩn, bí mật hoặc nhiều lớp thông tin.',
      accentColor: '#A65B6D',
      bgLight: '#FBF0F3',
    },
    {
      id: 'custom',
      name: 'Custom',
      badge: 'Open World',
      price: 'Trên 200k+',
      priceNum: 220,
      description: 'Dành cho project có độ phức tạp cao/Open World.',
      features: [
        'Dành cho project có độ phức tạp cao / Open World',
        'Lore / Worldbuilding riêng',
        'Nhiều NPC & nhiều tuyến cốt truyện',
        'Hidden plot / Plot twist',
        'Hệ thống RP / lệnh riêng',
        'Các yêu cầu đặc biệt theo brief',
        'Giá Custom được báo riêng dựa trên độ phức tạp và khối lượng công việc',
      ],
      recommendedFor: 'Dành cho project có độ phức tạp cao/Open World.',
      accentColor: '#5B464B',
      bgLight: '#F5ECEE',
    },
  ];

  // 7 Surcharges
  readonly surcharges: SurchargeItem[] = [
    {
      id: 'private',
      name: 'Private',
      fee: '+20%',
      description: 'Commission được giữ riêng và không công khai dưới bất kỳ hình thức nào.',
      icon: 'lock',
    },
    {
      id: 'npc-basic',
      name: 'NPC cơ bản',
      fee: '+10K / NPC',
      description: 'Tên, vai trò, tính cách và thông tin cần thiết cho RP.',
      icon: 'person_add',
    },
    {
      id: 'npc-complex',
      name: 'NPC phức tạp',
      fee: '+20K / NPC',
      description: 'Tên, tuổi, vai trò, tính cách, cốt truyện, quan hệ với {{char}} / {{user}} và các thông tin liên quan.',
      icon: 'psychology',
    },
    {
      id: 'overlength',
      name: 'Backstory / First message vượt giới hạn',
      fee: '+15K / ~1K ký tự',
      description: 'Chỉ áp dụng khi khách yêu cầu vượt giới hạn của gói đã chọn.',
      icon: 'format_size',
    },
    {
      id: 'canon',
      name: 'Character dựa trên tác phẩm có sẵn',
      fee: '+20 – 50K',
      description: 'Áp dụng cho character dựa trên Game, Tiểu thuyết, Phim, Series hoặc IP có sẵn. Phụ phí bao gồm việc research canon, lore, bối cảnh và quan hệ nhân vật. Mức phí tùy độ dài và độ phức tạp của tác phẩm.',
      icon: 'auto_stories',
    },
    {
      id: 'worldbuilding',
      name: 'Worldbuilding',
      fee: '+30K trở lên',
      description: 'Chỉ áp dụng khi cần xây dựng thế giới / lore riêng quy mô lớn.',
      icon: 'public',
    },
    {
      id: 'rush',
      name: 'Rush Order',
      fee: '+30 – 50% tổng đơn',
      description: 'Áp dụng khi khách cần hoàn thành trước deadline thông thường. Mức phí phụ thuộc vào độ gấp của deadline.',
      icon: 'speed',
    },
  ];

  // 10 TOS Items
  readonly tosList: TosSection[] = [
    {
      number: '01',
      title: 'Quy trình làm việc',
      icon: 'timeline',
      items: [
        '1. Nhận brief: Khách gửi thông tin theo form brief hoặc trao đổi trực tiếp.',
        '2. Báo giá & Deadline: Xác nhận gói, phụ phí (nếu có) và ngày bàn giao dự kiến.',
        '3. Chốt đơn & Thanh toán: Đặt cọc hoặc thanh toán theo thỏa thuận để xếp lịch.',
        '4. Bắt đầu thực hiện: Đơn chỉ được tính là bắt đầu sau khi hoàn tất thanh toán.',
        '5. Cập nhật tiến độ: Báo tiến độ theo từng giai đoạn, đặc biệt với các gói lớn.',
        '6. Gửi bản demo: Khách đọc bản nháp và phản hồi theo quy định chỉnh sửa.',
        '7. Test & Fix: Điều chỉnh prompt dựa trên kết quả test và bàn giao file hoàn chỉnh.',
      ],
    },
    {
      number: '02',
      title: 'Quy định chỉnh sửa',
      icon: 'edit_note',
      items: [
        'Sửa lỗi / Sai brief: Miễn phí nếu lỗi thuộc về phía tác giả (viết sai thông tin đã thống nhất trong brief, OOC nghiêm trọng so với định hướng ban đầu).',
        'Đổi ý / Phát sinh ngoài brief: Có tính phí nếu khách thay đổi concept, đổi lore, đổi tính cách nhân vật sau khi đã bắt đầu viết hoặc yêu cầu thêm nội dung ngoài thỏa thuận ban đầu.',
        'Thời hạn hỗ trợ test & chỉnh sửa: Tối đa 10 ngày kể từ ngày bàn giao bản demo. Sau thời hạn này, đơn được coi là hoàn tất và mọi chỉnh sửa phát sinh sẽ tính phí như đơn mới.',
      ],
      highlight: 'Thời hạn hỗ trợ test & chỉnh sửa tối đa 10 ngày kể từ ngày bàn giao bản demo.',
    },
    {
      number: '03',
      title: 'Thanh toán & Hoàn tiền',
      icon: 'payments',
      items: [
        'Thanh toán 100% trước khi bắt đầu hoặc cọc 50% trước và thanh toán 50% còn lại sau khi duyệt First Message + Backstory, trước khi nhận full prompt hoàn chỉnh.',
        'Hủy đơn từ phía khách: Hủy trước khi tác giả bắt đầu viết: Hoàn tiền sau khi trừ 10% phí giữ slot. Hủy sau khi tác giả đã bắt đầu viết: Không hoàn tiền phần công việc đã thực hiện. Mức hoàn (nếu có) do tác giả quyết định dựa trên tiến độ thực tế.',
        'Hủy đơn từ phía tác giả: Hoàn 100% số tiền đã nhận nếu tác giả không thể hoàn thành đơn vì lý do cá nhân hoặc bất khả kháng.',
      ],
    },
    {
      number: '04',
      title: 'Quyền sử dụng & Bản quyền',
      icon: 'copyright',
      items: [
        'Quyền của khách hàng: Toàn quyền sử dụng character / prompt cho mục đích cá nhân (chơi RP trên các nền tảng SillyTavern, JanitorAI, RisuAI, Google AI Studio, v.v.).',
        'Khách KHÔNG được: Tự ý bán lại, chia sẻ công khai hoặc sử dụng cho mục đích thương mại trừ khi có thỏa thuận riêng với tác giả.',
        'Credit tác giả: Được ghi credit tác giả (Yue Yue / qingyue224) nếu chia sẻ trích đoạn hoặc giới thiệu nhân vật với cộng đồng.',
        'Quyền của tác giả: Có quyền sử dụng trích đoạn prompt, first message hoặc ý tưởng nhân vật làm sample portfolio / quảng bá sản phẩm, trừ khi khách đã mua gói Private. Giữ quyền tác giả đối với phong cách viết và cấu trúc prompt.',
        'Đơn thương mại: Sử dụng character để kiếm lợi nhuận, tích hợp vào sản phẩm thương mại vui lòng liên hệ riêng để báo giá bản quyền thương mại.',
      ],
    },
    {
      number: '05',
      title: 'Character dựa trên tác phẩm có sẵn (Fanmade / Canon)',
      icon: 'auto_stories',
      items: [
        'Đơn làm character dựa trên Game, Phim, Tiểu thuyết, Anime/Manga có sẵn sẽ tính thêm phụ phí research canon.',
        'Khách vui lòng cung cấp thông tin canon quan trọng mà khách muốn nhấn mạnh (route cụ thể, tính cách ở giai đoạn nào, quan hệ cụ thể với user, v.v.).',
        'Tác giả không chịu trách nhiệm nếu character không đúng với chi tiết sâu trong canon mà khách không đề cập trước trong brief.',
      ],
      highlight: 'Vui lòng cung cấp canon quan trọng muốn nhấn mạnh trong brief ban đầu.',
    },
    {
      number: '06',
      title: 'Minh bạch về việc sử dụng AI (AI Transparency)',
      icon: 'psychology',
      items: [
        'Tác giả sử dụng AI như công cụ hỗ trợ trong quá trình viết và tối ưu prompt: sắp xếp thông tin, kiểm tra logic, tối ưu hóa token và tinh chỉnh câu từ.',
        'Toàn bộ cấu trúc prompt, định hướng tính cách, bối cảnh, lore, voice nhân vật và các rule hành vi đều do tác giả tự tay xây dựng, thiết kế và kiểm thử.',
        'Sản phẩm bàn giao là kết quả của quá trình creative writing kết hợp prompt engineering, không phải sản phẩm tự động 100% từ AI.',
        'Nếu khách có yêu cầu đặc biệt về mức độ can thiệp của AI, vui lòng trao đổi trước khi chốt đơn.',
      ],
    },
    {
      number: '07',
      title: 'Giới hạn của Prompt & Bản chất AI',
      icon: 'tips_and_updates',
      items: [
        'Prompt là công cụ định hướng hành vi của AI thông qua hướng dẫn, ví dụ và ràng buộc. Prompt KHÔNG THỂ đảm bảo 100% AI sẽ luôn hành xử chính xác trong mọi trường hợp, do bản chất ngẫu nhiên của các Large Language Model (LLM).',
        'Trải nghiệm RP thực tế phụ thuộc lớn vào: model sử dụng (Claude, GPT, Gemini, v.v.), preset / sampler settings, context limit và nền tảng chơi (SillyTavern, JanitorAI, v.v.).',
        'Các rule (Anti-OOC, Anti-User Role Stealing, v.v.) có tác dụng giảm thiểu tối đa hành vi lỗi nhưng không thể triệt tiêu hoàn toàn bản chất hallucinations (ảo giác) của AI.',
        'Tác giả hỗ trợ test và tinh chỉnh prompt để đạt hiệu quả tốt nhất trên model khách thường dùng, nhưng không chịu trách nhiệm về lỗi hệ thống hoặc hạn chế kỹ thuật của bản thân model AI.',
      ],
    },
    {
      number: '08',
      title: 'Thời gian thực hiện & Deadline',
      icon: 'schedule',
      items: [
        'Deadline được thống nhất trước khi bắt đầu và tính từ thời điểm khách hoàn tất thanh toán / cọc.',
        'Thời gian tiêu chuẩn: Tối thiểu 7 ngày làm việc tùy thuộc vào độ dài và độ phức tạp của gói đã chọn.',
        'Nếu khách phản hồi demo chậm (quá 48h), deadline bàn giao sẽ tự động được lùi tương ứng với thời gian trễ.',
        'Với các đơn cần gấp (Rush Order): Vui lòng thông báo ngay từ đầu để sắp xếp lịch và tính phụ phí tương ứng.',
      ],
    },
    {
      number: '09',
      title: 'Quyền từ chối đơn',
      icon: 'block',
      items: [
        'Tác giả có quyền từ chối hoặc hủy đơn trong các trường hợp sau:',
        '• Yêu cầu vượt quá khả năng chuyên môn hoặc phạm vi dịch vụ của tác giả.',
        '• Deadline khách yêu cầu không khả thi và khách không đồng ý điều chỉnh.',
        '• Khách liên tục thay đổi yêu cầu cốt lõi nhiều lần làm gián đoạn quá trình thực hiện.',
        '• Khách có thái độ thiếu tôn trọng, xúc phạm hoặc vi phạm quy tắc ứng xử văn minh.',
        '• Nội dung vi phạm pháp luật hoặc vi phạm điều khoản dịch vụ của các nền tảng liên quan.',
        'Trong trường hợp tác giả chủ động hủy đơn vì các lý do trên, chi phí sẽ được giải quyết theo điều khoản Thanh toán & Hoàn tiền.',
      ],
      highlight: 'Tác giả có quyền từ chối nếu vi phạm pháp luật hoặc có hành vi thiếu tôn trọng.',
    },
    {
      number: '10',
      title: 'Xác nhận',
      icon: 'verified',
      items: [
        'Việc thanh toán / đặt commission đồng nghĩa với việc khách hàng đã đọc, hiểu và đồng ý với toàn bộ nội dung của TOS này.',
        'Mọi tranh chấp phát sinh (nếu có) sẽ được giải quyết trên tinh thần thiện chí và căn cứ theo các điều khoản đã nêu trong TOS.',
        'ĐẶT COMMISSION = ĐỒNG Ý VỚI TOS',
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
