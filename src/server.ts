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

// In-memory rate limiting map: ip -> timestamps[]
const rateLimitMap = new Map<string, number[]>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000; // 10 minutes
  const maxRequests = 5;

  const timestamps = rateLimitMap.get(ip) || [];
  const recent = timestamps.filter((t) => now - t < windowMs);

  if (recent.length >= maxRequests) {
    return false;
  }

  recent.push(now);
  rateLimitMap.set(ip, recent);
  return true;
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

// 4. Save Mailbox Letters securely to server storage
app.post('/api/mailbox', (req, res) => {
  const ip = req.ip || req.socket.remoteAddress || 'unknown';
  if (!checkRateLimit(ip)) {
    res.status(429).json({
      success: false,
      message: 'Bạn đã gửi nhiều thư trong thời gian ngắn. Vui lòng dừng chân nghỉ ngơi trong vườn một chút nhé.',
    });
    return;
  }

  const {nickname, title, content} = req.body || {};

  if (!title || typeof title !== 'string' || title.trim().length < 2 || title.trim().length > 120) {
    res.status(400).json({
      success: false,
      message: 'Tiêu đề thư cần từ 2 đến 120 ký tự.',
    });
    return;
  }

  if (!content || typeof content !== 'string' || content.trim().length < 5 || content.trim().length > 3000) {
    res.status(400).json({
      success: false,
      message: 'Nội dung thư cần từ 5 đến 3000 ký tự.',
    });
    return;
  }

  const cleanNickname = typeof nickname === 'string' && nickname.trim() ? nickname.trim().slice(0, 50) : 'Người lữ khách vô danh';
  const cleanTitle = title.trim();
  const cleanContent = content.trim();

  const newLetter: MailboxLetter = {
    id: `letter-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    nickname: cleanNickname,
    title: cleanTitle,
    content: cleanContent,
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

    res.json({
      success: true,
      message: 'Lá thư của bạn đã được trao gửi an yên vào hòm thư LOVE HAVE.',
      letterId: newLetter.id,
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
