import { ChangeDetectionStrategy, Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CharacterService } from '../../services/character';
import { Sound } from '../../services/sound';

@Component({
  selector: 'app-mailbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatIconModule, ReactiveFormsModule],
  template: `
    <section id="mailbox" class="max-w-6xl mx-auto px-4 sm:px-6 py-16 scroll-mt-20">
      
      <!-- MAIN GARDEN MAILBOX CONTAINER -->
      <div class="relative bg-gradient-to-br from-[#FFFDF9] via-[#FAF3EC] to-[#F7EAE3] rounded-3xl p-6 sm:p-10 lg:p-12 border-2 border-[#E7CDD4] vintage-shadow-lg overflow-hidden">
        
        <!-- Decorative Botanical Ivy Vines & Leaves Around the Mailbox -->
        <div class="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-[#EBCBD4]/30 blur-2xl pointer-events-none"></div>
        <div class="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-[#F4D9C7]/35 blur-2xl pointer-events-none"></div>

        <!-- SECTION HEADER (GARDEN MAILBOX SIGN) -->
        <div class="max-w-2xl mx-auto text-center mb-10 relative z-10">
          
          <!-- Wooden Post Sign Badge with Flowers -->
          <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFF5EC] border border-[#E8C8D0] shadow-xs text-xs font-serif text-[#A65B6D] mb-3">
            <mat-icon class="text-sm text-[#C26D82]">markunread_mailbox</mat-icon>
            <span class="tracking-widest uppercase font-semibold">Hộp Thư Nhỏ Trong Khu Vườn</span>
            <mat-icon class="text-xs text-[#D97706]">local_florist</mat-icon>
          </div>

          <h2 class="font-serif-vintage text-3xl sm:text-5xl font-bold text-[#5B464B] tracking-tight">
            Hộp Thư Khu Vườn
          </h2>

          <p class="font-script-romantic text-xl sm:text-2xl text-[#8E7479] mt-2">
            "Nơi gửi gắm những tâm tư, lời nhắn gửi và những đóa hoa thơm ngát..."
          </p>

          <!-- Mailbox Stats -->
          <div class="flex flex-wrap items-center justify-center gap-3 text-xs font-serif text-[#78666A] mt-4">
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-[#ECD9DE]">
              <mat-icon class="text-xs text-[#C98F9E]">drafts</mat-icon>
              <strong>{{ charService.publicLetters().length }}</strong> bức thư đã gửi
            </span>
            <span class="text-[#C98F9E]">•</span>
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-[#ECD9DE]">
              <mat-icon class="text-xs text-[#B8C8B0]">favorite</mat-icon>
              <strong>{{ charService.totalSenders() }}</strong> người gửi gắm
            </span>
          </div>
        </div>

        <!-- TWO-COLUMN LAYOUT: (1) MAILBOX SUBMISSION POST & (2) LETTERS SHOWCASE STREAM -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
          
          <!-- LEFT: THE GARDEN MAILBOX UNIT & LETTER SUBMISSION FORM -->
          <div class="lg:col-span-5 flex flex-col">
            
            <!-- Garden Mailbox Visual Structure (Postbox with Roof & Red Flag) -->
            <div class="bg-gradient-to-b from-[#8C5866] to-[#6A3F4C] text-white rounded-t-3xl p-5 sm:p-6 shadow-md relative overflow-hidden">
              
              <!-- Mailbox Red Signal Flag (Rises when there are letters) -->
              <div
                class="absolute top-4 right-4 flex items-center gap-1.5 bg-[#DC2626] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md animate-bounce"
                title="Có thư mới trong hộp thư khu vườn!"
              >
                <span>📬</span>
                <span>CÓ THƯ MỚI</span>
              </div>

              <!-- Postbox Brass Plaque -->
              <div class="inline-flex items-center gap-1.5 text-xs text-[#FDE8ED] uppercase tracking-wider font-serif mb-1">
                <mat-icon class="text-sm text-[#FDE8ED]">mark_email_read</mat-icon>
                <span>Love Have Post</span>
              </div>

              <h3 class="font-serif-vintage text-xl sm:text-2xl font-bold text-white">
                Gửi Thư Vào Hộp Thư
              </h3>

              <p class="text-xs text-[#F5D8DE] font-light mt-1">
                Thả một phong thư vào hộp thư nhỏ của khu vườn để lưu giữ mãi mãi.
              </p>

              <!-- Mail Drop Slot Visual Indicator -->
              <div class="mt-4 pt-3 border-t border-white/20 flex items-center justify-between text-[11px] text-[#F3CBD4]">
                <span class="flex items-center gap-1">
                  <mat-icon class="text-xs">forward_to_inbox</mat-icon>
                  <span>Khe bỏ thư khu vườn</span>
                </span>
                <span class="font-mono text-[10px] opacity-80">Tự động lưu trữ</span>
              </div>
            </div>

            <!-- Form Body Container (Looks like antique paper attached to the postbox) -->
            <div class="bg-white/95 rounded-b-3xl p-6 sm:p-7 border-x border-b border-[#E8D0D6] shadow-md space-y-4">
              
              <form [formGroup]="letterForm" (ngSubmit)="sendLetter()" class="space-y-4">
                
                <!-- 1. Sender Name (Tên người gửi) -->
                <div>
                  <label for="senderName" class="block text-xs font-serif font-bold text-[#5B464B] mb-1">
                    Tên hoặc biệt danh của bạn: <span class="text-[#C26D82]">*</span>
                  </label>
                  <div class="relative">
                    <mat-icon class="absolute left-3 top-1/2 -translate-y-1/2 text-[#B0999E] text-sm">person_outline</mat-icon>
                    <input
                      id="senderName"
                      type="text"
                      formControlName="senderName"
                      placeholder="VD: Một đóa cúc mùa thu, Lữ khách..."
                      class="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-[#E5D0D5] bg-[#FFFDF9] text-xs sm:text-sm text-[#5B464B] placeholder:text-[#B59EA3] focus:outline-none focus:border-[#C26D82] focus:ring-1 focus:ring-[#C26D82]"
                    />
                  </div>
                </div>

                <!-- 2. Recipient Character (Gửi tới ai) -->
                <div>
                  <label for="recipientChar" class="block text-xs font-serif font-bold text-[#5B464B] mb-1">
                    Gửi đến nhân vật nào:
                  </label>
                  <div class="relative">
                    <mat-icon class="absolute left-3 top-1/2 -translate-y-1/2 text-[#B0999E] text-sm">favorite_border</mat-icon>
                    <select
                      id="recipientChar"
                      formControlName="recipientCharacterId"
                      class="w-full pl-9 pr-8 py-2.5 rounded-xl border border-[#E5D0D5] bg-[#FFFDF9] text-xs sm:text-sm text-[#5B464B] focus:outline-none focus:border-[#C26D82] focus:ring-1 focus:ring-[#C26D82] appearance-none cursor-pointer"
                    >
                      <option value="">-- Toàn bộ khu vườn & tất cả nhân vật --</option>
                      @for (c of charService.characters(); track c.id) {
                        <option [value]="c.id">{{ c.name }}</option>
                      }
                    </select>
                    <mat-icon class="absolute right-3 top-1/2 -translate-y-1/2 text-[#B0999E] text-xs pointer-events-none">expand_more</mat-icon>
                  </div>
                </div>

                <!-- 3. Flower Attached (Đóa hoa gửi kèm) -->
                <div>
                  <span class="block text-xs font-serif font-bold text-[#5B464B] mb-1.5">
                    Chọn đóa hoa gửi kèm thư:
                  </span>
                  <div class="grid grid-cols-4 gap-2">
                    @for (f of flowers; track f.name) {
                      <button
                        type="button"
                        (click)="selectFlower(f.name)"
                        class="p-2 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1 active:scale-95"
                        [class.border-[#C26D82]]="letterForm.get('flowerChoice')?.value === f.name"
                        [class.bg-[#FFF4F6]]="letterForm.get('flowerChoice')?.value === f.name"
                        [class.shadow-2xs]="letterForm.get('flowerChoice')?.value === f.name"
                        [class.border-[#ECD9DE]]="letterForm.get('flowerChoice')?.value !== f.name"
                      >
                        <mat-icon class="text-sm" [style.color]="f.color">{{ f.icon }}</mat-icon>
                        <span class="text-[10px] text-[#5B464B] truncate w-full font-serif">{{ f.name }}</span>
                      </button>
                    }
                  </div>
                </div>

                <!-- 4. Content / Message (Nội dung thư) -->
                <div>
                  <div class="flex items-center justify-between mb-1">
                    <label for="letterMessage" class="block text-xs font-serif font-bold text-[#5B464B]">
                      Nội dung thư: <span class="text-[#C26D82]">*</span>
                    </label>
                    <span class="text-[10px] text-[#A68F94] font-mono">
                      {{ (letterForm.get('message')?.value || '').length }} ký tự
                    </span>
                  </div>
                  <textarea
                    id="letterMessage"
                    formControlName="message"
                    rows="4"
                    placeholder="Viết những lời thì thầm, tâm sự hoặc suy nghĩ của bạn gửi tới khu vườn..."
                    class="w-full p-3.5 rounded-xl border border-[#E5D0D5] bg-[#FFFDF9] text-xs sm:text-sm text-[#5B464B] placeholder:text-[#B59EA3] focus:outline-none focus:border-[#C26D82] focus:ring-1 focus:ring-[#C26D82] leading-relaxed"
                  ></textarea>
                </div>

                <!-- Success Toast Notification -->
                @if (submitSuccess()) {
                  <div class="p-3.5 rounded-xl bg-[#ECFDF5] border border-[#A7F3D0] text-xs text-[#065F46] flex items-center gap-2 animate-scale-up">
                    <mat-icon class="text-sm text-[#059669]">check_circle</mat-icon>
                    <span class="font-medium">{{ successMessage() }}</span>
                  </div>
                }

                <!-- Submit Button -->
                <button
                  type="submit"
                  [disabled]="isSending() || letterForm.invalid"
                  class="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#B85D75] via-[#C26D82] to-[#A64F65] hover:from-[#A64F65] hover:to-[#8E3B50] text-white font-serif tracking-wide text-xs sm:text-sm font-bold shadow-md hover:shadow-lg disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2 active:scale-95 transition-all"
                >
                  <mat-icon class="text-base">{{ isSending() ? 'hourglass_top' : 'markunread_mailbox' }}</mat-icon>
                  <span>{{ isSending() ? 'Đang bỏ thư vào hộp...' : 'Bỏ Thư Vào Hộp Thư Khu Vườn' }}</span>
                </button>
              </form>

              <!-- Persistent Storage Assurance Note -->
              <div class="pt-2 text-center text-[10px] text-[#A38D92] font-serif italic">
                🌸 Mọi lá thư đều được lưu trữ an toàn và có thể đọc lại bất cứ lúc nào sau khi tải lại trang.
              </div>
            </div>
          </div>

          <!-- RIGHT: LETTERS SHOWCASE (DANH SÁCH THƯ ĐÃ GỬI) -->
          <div class="lg:col-span-7 flex flex-col space-y-4">
            
            <!-- Showcase Top Bar with Search & Filter -->
            <div class="p-4 rounded-2xl bg-white/80 border border-[#ECD9DE] shadow-xs flex flex-wrap items-center justify-between gap-3">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-full bg-[#FAF0E6] flex items-center justify-center text-[#C26D82]">
                  <mat-icon class="text-base">all_inbox</mat-icon>
                </div>
                <div>
                  <h3 class="font-serif-vintage text-lg font-bold text-[#5B464B] leading-none">
                    Danh Sách Thư Trong Hộp
                  </h3>
                  <span class="text-[11px] text-[#8E7479] font-serif">
                    {{ filteredLetters().length }} bức thư được lưu giữ
                  </span>
                </div>
              </div>

              <!-- Search Letters Input -->
              <div class="relative w-full sm:w-48">
                <mat-icon class="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#B0999E] text-xs">search</mat-icon>
                <input
                  type="text"
                  [value]="searchLetterQuery()"
                  (input)="onSearchLetters($event)"
                  placeholder="Tìm theo tên..."
                  class="w-full pl-8 pr-6 py-1.5 rounded-full border border-[#E5D0D5] bg-[#FFFDF9] text-xs text-[#5B464B] placeholder:text-[#B59EA3] focus:outline-none focus:border-[#C26D82]"
                />
                @if (searchLetterQuery()) {
                  <button
                    type="button"
                    (click)="searchLetterQuery.set('')"
                    class="absolute right-2 top-1/2 -translate-y-1/2 text-[#B0999E] hover:text-[#5B464B]"
                  >
                    <mat-icon class="text-xs">close</mat-icon>
                  </button>
                }
              </div>
            </div>

            <!-- Letters Scrollable List -->
            <div class="space-y-4 max-h-[640px] overflow-y-auto pr-1">
              @for (letter of filteredLetters(); track letter.id) {
                <article class="group relative p-5 sm:p-6 rounded-2xl bg-white/95 border border-[#EADCE0] shadow-xs hover:shadow-md transition-all duration-300">
                  
                  <!-- Top Letter Header: Tên & Đóa hoa & Thời gian gửi -->
                  <div class="flex flex-wrap items-start justify-between gap-2 pb-3 mb-3 border-b border-[#F4E8EB]">
                    
                    <!-- Sender Info: Tên người gửi -->
                    <div class="flex items-center gap-2.5">
                      <!-- Wax Seal / Flower Stamp Avatar -->
                      <div class="w-8 h-8 rounded-full bg-gradient-to-tr from-[#FAF0E6] to-[#FFF7F9] border border-[#E8CCD4] flex items-center justify-center text-[#C26D82] shadow-2xs font-serif font-bold text-xs">
                        {{ getInitial(letter.senderName) }}
                      </div>

                      <div>
                        <!-- TÊN NGƯỜI GỬI (PROMINENT NAME) -->
                        <div class="font-serif-vintage text-base font-bold text-[#5B464B] group-hover:text-[#B85D75] transition-colors flex items-center gap-1.5">
                          <span>{{ letter.senderName }}</span>
                          <span class="text-[10px] font-normal text-[#9E858A]">• Lữ khách</span>
                        </div>

                        <!-- Recipient Character -->
                        @if (letter.recipientCharacterName && letter.recipientCharacterName !== 'Toàn bộ khu vườn') {
                          <div class="text-[11px] text-[#8E7479] flex items-center gap-1 mt-0.5">
                            <span class="text-[#B59EA3]">gửi tới:</span>
                            <span class="font-medium text-[#A65B6D] font-serif">{{ letter.recipientCharacterName }}</span>
                          </div>
                        }
                      </div>
                    </div>

                    <!-- Right meta: Flower Badge & THỜI GIAN GỬI -->
                    <div class="flex flex-col items-end gap-1">
                      <!-- Flower Badge -->
                      <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-[#FAF0E6] text-[#78666A] border border-[#ECD9DE]">
                        <mat-icon class="text-[11px] text-[#C26D82]">local_florist</mat-icon>
                        <span>{{ letter.flowerChoice }}</span>
                      </span>

                      <!-- THỜI GIAN GỬI (SENT TIME) -->
                      <time [attr.datetime]="letter.createdAt" class="text-[11px] font-mono text-[#A38D92] flex items-center gap-1">
                        <mat-icon class="text-[11px] text-[#C98F9E]">schedule</mat-icon>
                        <span>{{ letter.createdAt | date:'HH:mm • dd/MM/yyyy' }}</span>
                      </time>
                    </div>
                  </div>

                  <!-- NỘI DUNG THƯ (CONTENT) -->
                  <div class="relative pl-3.5 border-l-2 border-[#EBCBD4]">
                    <p class="text-xs sm:text-sm text-[#5B464B] leading-relaxed whitespace-pre-line font-serif italic selection:bg-[#EBCBD4]">
                      "{{ letter.message }}"
                    </p>
                  </div>

                  <!-- Letter Bottom Bar: Like / Heart Button -->
                  <div class="mt-3 pt-2.5 flex items-center justify-between text-xs border-t border-[#FAF0F3]">
                    <span class="text-[10px] font-serif text-[#B59EA3] flex items-center gap-1">
                      <mat-icon class="text-[11px] text-[#C26D82]">favorite</mat-icon>
                      <span>Lưu lại trong hộp thư khu vườn</span>
                    </span>

                    <button
                      type="button"
                      (click)="toggleLike(letter.id)"
                      class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] transition-colors cursor-pointer border"
                      [class.bg-[#FFF4F6]]="isLiked(letter.id)"
                      [class.text-[#C26D82]]="isLiked(letter.id)"
                      [class.border-[#E8CCD4]]="isLiked(letter.id)"
                      [class.text-[#8E7479]]="!isLiked(letter.id)"
                      [class.border-transparent]="!isLiked(letter.id)"
                      [class.hover:bg-[#FAF0E6]]="!isLiked(letter.id)"
                    >
                      <mat-icon class="text-xs">{{ isLiked(letter.id) ? 'favorite' : 'favorite_border' }}</mat-icon>
                      <span>{{ isLiked(letter.id) ? 'Đã yêu thích' : 'Yêu thích' }}</span>
                    </button>
                  </div>
                </article>
              } @empty {
                <!-- Empty State -->
                <div class="p-10 rounded-2xl bg-white/70 border-2 border-dashed border-[#ECD9DE] text-center space-y-3">
                  <div class="w-12 h-12 mx-auto rounded-full bg-[#FAF0E6] flex items-center justify-center text-[#C26D82]">
                    <mat-icon class="text-2xl">mark_email_read</mat-icon>
                  </div>
                  <h4 class="font-serif-vintage text-base font-bold text-[#5B464B]">
                    Hộp thư đang chờ đón lá thư đầu tiên
                  </h4>
                  <p class="text-xs text-[#8E7479] max-w-sm mx-auto">
                    Chưa có phong thư nào khớp với tìm kiếm. Hãy là người đầu tiên thả vào hộp thư một dòng tâm sự dịu dàng!
                  </p>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class Mailbox {
  readonly charService = inject(CharacterService);
  readonly sound = inject(Sound);

  readonly isSending = signal<boolean>(false);
  readonly submitSuccess = signal<boolean>(false);
  readonly successMessage = signal<string>('');
  readonly searchLetterQuery = signal<string>('');
  readonly likedLetterIds = signal<Set<string>>(new Set<string>());

  readonly flowers = [
    { name: 'Hoa Hồng', icon: 'local_florist', color: '#E11D48' },
    { name: 'Cúc Họa Mi', icon: 'filter_vintage', color: '#059669' },
    { name: 'Oải Hương', icon: 'spa', color: '#8B5CF6' },
    { name: 'Mạn Châu Sa', icon: 'grain', color: '#DC2626' },
    { name: 'Mẫu Đơn', icon: 'yard', color: '#D97706' },
  ];

  readonly letterForm = new FormGroup({
    senderName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    recipientCharacterId: new FormControl(''),
    flowerChoice: new FormControl('Hoa Hồng'),
    message: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  // Filtered letters computed signal based on search query
  readonly filteredLetters = computed(() => {
    const list = this.charService.publicLetters();
    const q = this.searchLetterQuery().trim().toLowerCase();
    if (!q) return list;
    return list.filter(
      (l) =>
        l.senderName.toLowerCase().includes(q) ||
        l.message.toLowerCase().includes(q) ||
        (l.recipientCharacterName && l.recipientCharacterName.toLowerCase().includes(q))
    );
  });

  constructor() {
    this.loadLikedLetters();
  }

  private loadLikedLetters(): void {
    if (typeof window === 'undefined') return;
    try {
      const saved = localStorage.getItem('love_have_liked_letters');
      if (saved) {
        this.likedLetterIds.set(new Set(JSON.parse(saved)));
      }
    } catch {
      // Storage error ignored
    }
  }

  isLiked(id: string): boolean {
    return this.likedLetterIds().has(id);
  }

  toggleLike(id: string): void {
    this.sound.playClick();
    const next = new Set(this.likedLetterIds());
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    this.likedLetterIds.set(next);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('love_have_liked_letters', JSON.stringify(Array.from(next)));
      } catch {
        // Storage error ignored
      }
    }
  }

  getInitial(name: string): string {
    if (!name) return '💌';
    const trimmed = name.trim();
    return trimmed.charAt(0).toUpperCase();
  }

  selectFlower(flowerName: string): void {
    this.sound.playClick();
    this.letterForm.patchValue({ flowerChoice: flowerName });
  }

  onSearchLetters(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchLetterQuery.set(input.value);
  }

  sendLetter(): void {
    if (this.letterForm.invalid) return;

    this.sound.playPaper();
    this.isSending.set(true);
    this.submitSuccess.set(false);

    const val = this.letterForm.value;
    const recipientChar = this.charService.characters().find((c) => c.id === val.recipientCharacterId);

    this.charService
      .sendMailboxLetter({
        senderName: (val.senderName || '').trim() || 'Lữ khách ẩn danh',
        recipientCharacterId: val.recipientCharacterId || undefined,
        recipientCharacterName: recipientChar ? recipientChar.name : 'Toàn bộ khu vườn',
        message: (val.message || '').trim(),
        flowerChoice: val.flowerChoice || 'Hoa Hồng',
      })
      .subscribe({
        next: (res) => {
          this.isSending.set(false);
          this.submitSuccess.set(true);
          this.successMessage.set(res.message || 'Lá thư của bạn đã được bỏ vào hộp thư khu vườn an yên!');
          this.sound.playChime();
          this.letterForm.reset({
            senderName: '',
            recipientCharacterId: '',
            flowerChoice: 'Hoa Hồng',
            message: '',
          });
          setTimeout(() => this.submitSuccess.set(false), 5000);
        },
        error: () => {
          this.isSending.set(false);
        },
      });
  }
}
