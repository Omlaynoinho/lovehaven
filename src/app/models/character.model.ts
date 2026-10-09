export interface Character {
  id: string;
  name: string;
  tags: string[];
  summary: string;
  plot?: string; // Full plot, revealed when unlocked or unlocked by default
  googleStudioUrl?: string; // AI Studio Chatbot URL, revealed when unlocked
  locked: boolean;
  lockQuestion?: string;
  lockHint?: string;
  acceptedAnswers?: string[];
  unlockExplanation?: string;
  displayOrder: number;
  flowerTheme: string;
  flowerColor: string;
  flowerSymbol: string;
  accentQuote?: string;
}

export interface PublicCharacter {
  id: string;
  name: string;
  tags: string[];
  summary: string;
  locked: boolean;
  lockQuestion?: string;
  lockHint?: string;
  unlockExplanation?: string;
  displayOrder: number;
  flowerTheme: string;
  flowerColor: string;
  flowerSymbol: string;
  accentQuote?: string;
  plot?: string; // Only present if initially unlocked
  googleStudioUrl?: string; // Only present if initially unlocked
}

export interface MailboxLetter {
  id: string;
  nickname: string;
  title: string;
  content: string;
  createdAt: string;
  ip?: string;
}

export interface SiteConfig {
  youtubeMusicUrl: string;
  siteName: string;
  tagline: string;
  welcomeGreeting: string;
}
