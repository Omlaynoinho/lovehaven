import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import {join} from 'node:path';
import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {CHARACTERS_DATA, DEFAULT_SITE_CONFIG} from './data/characters.data';
import {MailboxLetter, PublicCharacter} from './app/models/character.model';

const browserDistFolder = join(import.meta.dirname, '../browser');
const dataDir = join(process.cwd(), 'data');
const lettersFilePath = join(dataDir, 'letters.json');

// Ensure data directory exists
if (!existsSync(dataDir)) {
  try {
    mkdirSync(dataDir, {recursive: true});
  } catch {
    // Ignore error if already created
  }
}

function normalizeText(text: string): string {
  return (text || '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/\s+/g, ' ');
}

const app = express();
const angularApp = new AngularNodeAppEngine();

// Parse JSON request bodies for /api routes
app.use(express.json());

/**
 * REST API Endpoints for LOVE HAVE
 */

// 1. Get Site Configuration (YouTube URL, garden name, greetings)
app.get('/api/config', (_req, res) => {
  res.json(DEFAULT_SITE_CONFIG);
});

// 2. Get Public Character List (Masks plot & googleStudioUrl for locked characters)
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

// 3. Verify Character Quiz & Unlock securely
app.post('/api/characters/verify-unlock', (req, res) => {
  const {characterId, answer} = req.body || {};

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
    // Already unlocked character
    res.json({
      success: true,
      plot: char.plot,
      googleStudioUrl: char.googleStudioUrl,
      unlockExplanation: char.unlockExplanation || 'Nhân vật này luôn mở rộng vòng tay chào đón bạn.',
    });
    return;
  }

  const normalizedInput = normalizeText(answer);
  const rawInput = answer.trim().toLowerCase();

  const isCorrect = (char.acceptedAnswers || []).some((accepted) => {
    const rawAcc = accepted.trim().toLowerCase();
    const normAcc = normalizeText(accepted);
    return (
      rawInput === rawAcc ||
      normalizedInput === normAcc ||
      rawInput.includes(rawAcc) ||
      normalizedInput.includes(normAcc)
    );
  });

  if (isCorrect) {
    res.json({
      success: true,
      plot: char.plot,
      googleStudioUrl: char.googleStudioUrl,
      unlockExplanation: char.unlockExplanation,
    });
  } else {
    res.json({
      success: false,
      message: 'Hình như chiếc chìa khóa này chưa đúng rồi, thử lại nhé!',
    });
  }
});

// 4. Get Public Mailbox Letters and Total Senders count
app.get('/api/mailbox', (_req, res) => {
  try {
    let letters: MailboxLetter[] = [];
    if (existsSync(lettersFilePath)) {
      try {
        const raw = readFileSync(lettersFilePath, 'utf8');
        letters = JSON.parse(raw);
      } catch {
        letters = [];
      }
    }

    const publicLetters = letters.map((l) => ({
      id: l.id,
      nickname: l.nickname,
      title: l.title,
      content: l.content,
      createdAt: l.createdAt,
    })).reverse();

    res.json({
      letters: publicLetters,
      totalSenders: letters.length,
    });
  } catch (err) {
    console.error('Lỗi khi đọc hòm thư:', err);
    res.status(500).json({
      letters: [],
      totalSenders: 0,
      message: 'Không thể đọc danh sách thư từ khu vườn.',
    });
  }
});

// 5. Save Public Mailbox Letters securely to server storage
app.post('/api/mailbox', (req, res) => {
  const ip = req.ip || req.socket.remoteAddress || 'unknown';
  const {nickname, title, content} = req.body || {};

  const cleanContent = typeof content === 'string' ? content.trim() : '';
  if (!cleanContent) {
    res.status(400).json({
      success: false,
      message: 'Vui lòng nhập nội dung thư.',
    });
    return;
  }

  const cleanNickname = typeof nickname === 'string' && nickname.trim()
    ? nickname.trim().slice(0, 50)
    : 'Người lữ khách vô danh';

  const cleanTitle = typeof title === 'string' && title.trim()
    ? title.trim().slice(0, 120)
    : (cleanContent.length > 25 ? cleanContent.slice(0, 25) + '...' : 'Thư gửi khu vườn');

  const newLetter: MailboxLetter = {
    id: `letter-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    nickname: cleanNickname,
    title: cleanTitle,
    content: cleanContent.slice(0, 5000),
    createdAt: new Date().toISOString(),
    ip,
  };

  try {
    let letters: MailboxLetter[] = [];
    if (existsSync(lettersFilePath)) {
      try {
        const raw = readFileSync(lettersFilePath, 'utf8');
        letters = JSON.parse(raw);
      } catch {
        letters = [];
      }
    }
    letters.push(newLetter);
    writeFileSync(lettersFilePath, JSON.stringify(letters, null, 2), 'utf8');

    const cleanPublicLetter = {
      id: newLetter.id,
      nickname: newLetter.nickname,
      title: newLetter.title,
      content: newLetter.content,
      createdAt: newLetter.createdAt,
    };

    res.json({
      success: true,
      message: 'Lá thư của bạn đã được trao gửi công khai vào hòm thư LOVE HAVE.',
      letter: cleanPublicLetter,
      totalSenders: letters.length,
    });
  } catch (err) {
    console.error('Lỗi khi lưu thư:', err);
    res.status(500).json({
      success: false,
      message: 'Máy chủ tạm thời không thể tiếp nhận thư. Bạn vui lòng thử lại sau nhé.',
    });
  }
});


/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point, or it is ran via PM2.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
