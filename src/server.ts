import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { CHARACTERS_DATA, DEFAULT_SITE_CONFIG } from './data/characters.data';
import { MailboxLetter, PublicCharacter } from './app/models/character.model';

const browserDistFolder = join(import.meta.dirname, '../browser');
const dataDir = join(process.cwd(), 'data');
const lettersFilePath = join(dataDir, 'letters.json');

// Ensure data directory exists
if (!existsSync(dataDir)) {
  try {
    mkdirSync(dataDir, { recursive: true });
  } catch {
    // Ignore error
  }
}

function normalizeText(text: string): string {
  return (text || '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[.,!?:;"'“”‘’()\-_\s]+/g, ' ')
    .trim();
}

function collapseText(text: string): string {
  return normalizeText(text).replace(/[^a-z0-9]/g, '');
}

// Process-level error protection
process.on('unhandledRejection', (reason) => {
  console.error('[Server] Unhandled Rejection:', reason);
});

process.on('uncaughtException', (err) => {
  console.error('[Server] Uncaught Exception:', err);
});

const app = express();
const angularApp = new AngularNodeAppEngine();

app.use(express.json());

// 1. Get Site Configuration
app.get('/api/config', (_req, res) => {
  res.json(DEFAULT_SITE_CONFIG);
});

// 2. Get Public Character List
app.get('/api/characters', (_req, res) => {
  const publicList: PublicCharacter[] = CHARACTERS_DATA.map((c) => ({
    id: c.id,
    name: c.name,
    tags: c.tags,
    summary: c.summary,
    locked: c.locked,
    lockQuestion: c.lockQuestion,
    lockHint: c.lockHint,
    unlockExplanation: c.unlockExplanation,
    displayOrder: c.displayOrder,
    flowerTheme: c.flowerTheme,
    flowerColor: c.flowerColor,
    flowerSymbol: c.flowerSymbol,
    accentQuote: c.accentQuote,
    plot: c.locked ? undefined : c.plot,
    googleStudioUrl: c.locked ? undefined : c.googleStudioUrl,
  })).sort((a, b) => a.displayOrder - b.displayOrder);

  res.json(publicList);
});

// 3. Verify Character Quiz & Unlock
app.post('/api/characters/verify-unlock', (req, res) => {
  const { characterId, answer } = req.body || {};

  if (!characterId || typeof answer !== 'string') {
    res.status(400).json({
      success: false,
      message: 'Thiếu thông tin nhân vật hoặc câu trả lời.',
    });
    return;
  }

  const char = CHARACTERS_DATA.find((c) => c.id === characterId);
  if (!char) {
    res.status(404).json({
      success: false,
      message: 'Không tìm thấy nhân vật trong khu vườn.',
    });
    return;
  }

  if (!char.locked) {
    res.json({
      success: true,
      plot: char.plot,
      googleStudioUrl: char.googleStudioUrl,
      unlockExplanation: char.unlockExplanation || 'Nhân vật này luôn mở rộng vòng tay chào đón bạn.',
    });
    return;
  }

  const normalizedInput = collapseText(answer);
  const isMatch = (char.acceptedAnswers || []).some((ans) => collapseText(ans) === normalizedInput);

  if (isMatch) {
    res.json({
      success: true,
      plot: char.plot,
      googleStudioUrl: char.googleStudioUrl,
      unlockExplanation: char.unlockExplanation || 'Chúc mừng bạn đã tìm ra chiếc chìa khóa định mệnh!',
    });
  } else {
    res.status(400).json({
      success: false,
      message: 'Chìa khóa hoa chưa khớp. Hãy xem kỹ gợi ý nhé!',
    });
  }
});

// Helper for letters file
function readStoredLetters(): MailboxLetter[] {
  try {
    if (existsSync(lettersFilePath)) {
      const content = readFileSync(lettersFilePath, 'utf8');
      return JSON.parse(content) || [];
    }
  } catch {
    // Ignore error
  }
  return [];
}

function writeStoredLetters(letters: MailboxLetter[]): void {
  try {
    writeFileSync(lettersFilePath, JSON.stringify(letters, null, 2), 'utf8');
  } catch {
    // Ignore error
  }
}

// 4. Get Mailbox Letters
app.get('/api/mailbox', (_req, res) => {
  const letters = readStoredLetters();
  const senders = new Set(letters.map((l) => l.senderName));
  res.json({
    letters: letters.filter((l) => l.isPublic),
    totalSenders: senders.size,
  });
});

// 5. Send Letter to Mailbox
app.post('/api/mailbox', (req, res) => {
  const { senderName, recipientCharacterId, recipientCharacterName, message, flowerChoice } = req.body || {};

  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    res.status(400).json({
      success: false,
      message: 'Lời nhắn gửi không được để trống.',
    });
    return;
  }

  const newLetter: MailboxLetter = {
    id: 'letter-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
    senderName: (senderName && senderName.trim()) || 'Lữ khách ẩn danh',
    recipientCharacterId: recipientCharacterId || undefined,
    recipientCharacterName: recipientCharacterName || 'Toàn bộ khu vườn',
    message: message.trim(),
    flowerChoice: flowerChoice || 'Hoa Hồng',
    createdAt: new Date().toISOString(),
    isPublic: true,
  };

  const current = readStoredLetters();
  current.unshift(newLetter);
  writeStoredLetters(current);

  const senders = new Set(current.map((l) => l.senderName));

  res.json({
    success: true,
    message: 'Lá thư của bạn đã được trao gửi an yên vào khu vườn!',
    letter: newLetter,
    totalSenders: senders.size,
  });
});

// Serve static files
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  })
);

// Angular SSR catch-all
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next()
    )
    .catch(next);
});

if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 3000;
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

export const reqHandler = createNodeRequestHandler(app);
