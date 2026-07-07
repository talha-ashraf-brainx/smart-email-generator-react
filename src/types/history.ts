import type { EmailType, Tone } from './email.ts';

export interface HistoryEntry {
  id: string;
  prompt: string;
  emailType: EmailType;
  tone: Tone;
  subject: string;
  body: string;
  model: string;
  createdAt: string;
}
