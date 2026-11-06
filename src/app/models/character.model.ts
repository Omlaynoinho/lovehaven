export type ActiveTab = 'home' | 'characters' | 'tags' | 'commission' | 'about';

export interface Character {
  id: string;
  name: string;
  tags: string[];
  summary: string;
  plot: string;
  googleStudioUrl: string;
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

export type PublicCharacter = Omit<Character, 'acceptedAnswers' | 'plot' | 'googleStudioUrl'> & {
  plot?: string;
  googleStudioUrl?: string;
};

export interface SiteConfig {
  youtubeMusicUrl: string;
  siteName: string;
  tagline: string;
  welcomeGreeting: string;
}

export interface MailboxLetter {
  id: string;
  title?: string;
  senderName: string;
  recipientCharacterId?: string;
  recipientCharacterName?: string;
  message: string;
  flowerChoice: string;
  createdAt: string;
  isPublic: boolean;
}

export type PublicMailboxLetter = MailboxLetter;

export interface MailboxResponseData {
  letters: PublicMailboxLetter[];
  totalSenders: number;
}
