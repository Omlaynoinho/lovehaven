import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
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
      <div class="bg-gradient-to-br from-white/95 via-[#FFFDFB]/95 to-[#FCF4F6]/95 rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#E8D4D8] vintage-shadow relative overflow-hidden">
        
        <!-- Header -->
        <div class="max-w-2xl mx-auto text-center mb-10">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF0E6] text-[#A65B6D] text-xs font-serif font-medium mb-3">
            <mat-icon class="text-xs">mail</mat-icon>
            <span>Hộp Thư Gửi Gắm Yêu Thương</span>
          </div>

          <h2 class="font-serif-vintage text-3xl sm:text-4xl font-bold text-[#5B464B]">
            Hộp Thư Khu Vườn LOVE HAVE
          </h2>

          <p class="font-script-romantic text-lg sm:text-xl text-[#8E7479] mt-2">
            "Viết một lá thư gửi tới nhân vật bạn yêu mến, kèm theo một đóa hoa dịu dàng..."
          </p>

          <div class="flex items-center justify-center gap-4 text-xs font-serif text-[#78666A] mt-4">
            <span class="flex items-center gap-1">
              <mat-icon class="text-xs text-[#C98F9E]">mark_email_read</mat-icon>
              <span>{{ charService.publicLetters().length }} bức thư đã gửi</span>
            </span>
            <span>•</span>
            <span class="flex items-center gap-1">
              <mat-icon class="text-xs text-[#B8C8B0]">favorite</mat-icon>
              <span>{{ charService.totalSenders() }} tâm hồn đồng điệu</span>
            </span>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <!-- Left Column: Letter Composition Form -->
          <div class="lg:col-span-5 bg-white/80 p-6 sm:p-7 rounded-3xl border border-[#ECD9DE] vintage-shadow">
            <h3 class="font-serif-vintage text-xl font-bold text-[#5B464B] mb-4 flex items-center gap-2">
              <mat-icon class="text-[#C98F9E]">edit_note</mat-icon>
              <span>Viết Lá Thư Của Bạn</span>
            </h3>

            <form [formGroup]="letterForm" (ngSubmit)="sendLetter()" class="space-y-4">
              <!-- Sender Name -->
              <div>
                <label for="senderName" class="block text-xs font-medium text-[#5B464B] mb-1">
                  Tên hoặc biệt danh của bạn:
                </label>
                <input
                  id="senderName"
                  type="text"
                  formControlName="senderName"
                  placeholder="VD: Một đóa cúc họa mi..."
                  class="w-full px-3.5 py-2.5 rounded-xl border border-[#E5D0D5] bg-[#FFFDF9] text-xs sm:text-sm text-[#5B464B] focus:outline-none focus:border-[#C98F9E]"
                />
              </div>

              <!-- Recipient Character -->
              <div>
                <label for="recipientChar" class="block text-xs font-medium text-[#5B464B] mb-1">
                  Gửi tới ai trong khu vườn:
                </label>
                <select
                  id="recipientChar"
                  formControlName="recipientCharacterId"
                  class="w-full px-3.5 py-2.5 rounded-xl border border-[#E5D0D5] bg-[#FFFDF9] text-xs sm:text-sm text-[#5B464B] focus:outline-none focus:border-[#C98F9E]"
                >
                  <option value="">-- Toàn bộ khu vườn & tất cả nhân vật --</option>
                  @for (c of charService.characters(); track c.id) {
                    <option [value]="c.id">{{ c.name }}</option>
                  }
                </select>
              </div>

              <!-- Flower Choice -->
              <div>
                <span class="block text-xs font-medium text-[#5B464B] mb-1.5">
                  Chọn một đóa hoa gửi kèm:
                </span>
                <div class="grid grid-cols-4 gap-2">
                  @for (f of flowers; track f.name) {
                    <button
                      type="button"
                      (click)="selectFlower(f.name)"
                      class="p-2 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1"
                      [class.border-[#C98F9E]]="letterForm.get('flowerChoice')?.value === f.name"
                      [class.bg-[#FFF4F6]]="letterForm.get('flowerChoice')?.value === f.name"
                      [class.border-[#ECD9DE]]="letterForm.get('flowerChoice')?.value !== f.name"
                    >
                      <mat-icon class="text-sm" [style.color]="f.color">{{ f.icon }}</mat-icon>
                      <span class="text-[10px] text-[#5B464B] truncate w-full">{{ f.name }}</span>
                    </button>
                  }
                </div>
              </div>

              <!-- Message Textarea -->
              <div>
                <label for="letterMessage" class="block text-xs font-medium text-[#5B464B] mb-1">
                  Lời tâm tình (bắt buộc):
                </label>
                <textarea
                  id="letterMessage"
                  formControlName="message"
                  rows="4"
                  placeholder="Gửi gắm vài dòng suy nghĩ, tâm sự hoặc lời nhắn nhủ dành cho nhân vật..."
                  class="w-full p-3.5 rounded-xl border border-[#E5D0D5] bg-[#FFFDF9] text-xs sm:text-sm text-[#5B464B] focus:outline-none focus:border-[#C98F9E]"
                ></textarea>
              </div>

              @if (submitSuccess()) {
                <div class="p-3 rounded-xl bg-[#ECFDF5] border border-[#A7F3D0] text-xs text-[#059669] flex items-center gap-1.5">
                  <mat-icon class="text-xs">check_circle</mat-icon>
                  <span>{{ successMessage() }}</span>
                </div>
              }

              <!-- Send Button -->
              <button
                type="submit"
                [disabled]="isSending() || letterForm.invalid"
                class="w-full py-3 rounded-xl bg-gradient-to-r from-[#C98F9E] to-[#A65B6D] hover:from-[#B77A8A] hover:to-[#924C5C] text-white text-xs sm:text-sm font-medium transition-all shadow-xs hover:shadow-md disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2 active:scale-95"
              >
                <mat-icon class="text-sm">send</mat-icon>
                <span>{{ isSending() ? 'Đang gửi...' : 'Gửi lá thư vào hộp thư' }}</span>
              </button>
            </form>
          </div>

          <!-- Right Column: Letters Stream Display -->
          <div class="lg:col-span-7 space-y-4">
            <div class="flex items-center justify-between">
              <h3 class="font-serif-vintage text-xl font-bold text-[#5B464B] flex items-center gap-2">
                <mat-icon class="text-[#B8C8B0]">mark_email_unread</mat-icon>
                <span>Những Lá Thư Đang Nở Hoa</span>
              </h3>
              <span class="text-xs text-[#8E7479] font-serif">Mới nhất</span>
            </div>

            <div class="space-y-3.5 max-h-[560px] overflow-y-auto pr-1">
              @for (letter of charService.publicLetters(); track letter.id) {
                <div class="p-5 rounded-2xl bg-white/90 border border-[#EADCE0] vintage-shadow space-y-2.5">
                  <div class="flex items-center justify-between text-xs">
                    <div class="flex items-center gap-1.5 font-medium text-[#5B464B]">
                      <mat-icon class="text-xs text-[#C98F9E]">favorite</mat-icon>
                      <span>{{ letter.senderName }}</span>
                      <span class="text-[#B59EA3]">gửi tới</span>
                      <span class="text-[#A65B6D] font-serif">{{ letter.recipientCharacterName || 'Khu vườn' }}</span>
                    </div>

                    <span class="text-[11px] px-2 py-0.5 rounded-full bg-[#FAF0E6] text-[#78666A] flex items-center gap-1">
                      <mat-icon class="text-[10px] text-[#C98F9E]">local_florist</mat-icon>
                      <span>{{ letter.flowerChoice }}</span>
                    </span>
                  </div>

                  <p class="text-xs sm:text-sm text-[#6B555A] leading-relaxed whitespace-pre-line font-serif italic">
                    "{{ letter.message }}"
                  </p>

                  <div class="text-[10px] text-[#B09DA2] font-mono text-right">
                    {{ letter.createdAt | date:'HH:mm • dd/MM/yyyy' }}
                  </div>
                </div>
              } @empty {
                <div class="p-8 rounded-2xl bg-white/60 border border-dashed border-[#ECD9DE] text-center text-xs text-[#8E7479]">
                  Hộp thư đang chờ lá thư đầu tiên từ bạn. Hãy là người gieo hạt giống yêu thương đầu tiên!
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

  readonly flowers = [
    { name: 'Hoa Hồng', icon: 'local_florist', color: '#E11D48' },
    { name: 'Oải Hương', icon: 'spa', color: '#8B5CF6' },
    { name: 'Cúc Họa Mi', icon: 'filter_vintage', color: '#059669' },
    { name: 'Mạn Châu Sa', icon: 'grain', color: '#DC2626' },
  ];

  readonly letterForm = new FormGroup({
    senderName: new FormControl(''),
    recipientCharacterId: new FormControl(''),
    flowerChoice: new FormControl('Hoa Hồng'),
    message: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  selectFlower(flowerName: string): void {
    this.sound.playClick();
    this.letterForm.patchValue({ flowerChoice: flowerName });
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
          this.successMessage.set(res.message);
          this.sound.playChime();
          this.letterForm.reset({
            senderName: '',
            recipientCharacterId: '',
            flowerChoice: 'Hoa Hồng',
            message: '',
          });
          setTimeout(() => this.submitSuccess.set(false), 4000);
        },
        error: () => {
          this.isSending.set(false);
        },
      });
  }
}
