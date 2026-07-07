export type EmailType =
  | 'formal-request'
  | 'follow-up'
  | 'apology'
  | 'meeting-invite'
  | 'thank-you'
  | 'cold-outreach'
  | 'resignation'
  | 'complaint'
  | 'introduction';

export type Tone =
  | 'formal'
  | 'casual'
  | 'friendly'
  | 'assertive'
  | 'persuasive'
  | 'empathetic'
  | 'concise';

export interface EmailTypeOption {
  value: EmailType;
  label: string;
}

export interface ToneOption {
  value: Tone;
  label: string;
}

export const EMAIL_TYPE_OPTIONS: readonly EmailTypeOption[] = [
  { value: 'formal-request', label: 'Formal Request' },
  { value: 'follow-up', label: 'Follow-up' },
  { value: 'apology', label: 'Apology' },
  { value: 'meeting-invite', label: 'Meeting Invite' },
  { value: 'thank-you', label: 'Thank You' },
  { value: 'cold-outreach', label: 'Cold Outreach' },
  { value: 'resignation', label: 'Resignation' },
  { value: 'complaint', label: 'Complaint' },
  { value: 'introduction', label: 'Introduction' },
];

export const TONE_OPTIONS: readonly ToneOption[] = [
  { value: 'formal', label: 'Formal' },
  { value: 'casual', label: 'Casual' },
  { value: 'friendly', label: 'Friendly' },
  { value: 'assertive', label: 'Assertive' },
  { value: 'persuasive', label: 'Persuasive' },
  { value: 'empathetic', label: 'Empathetic' },
  { value: 'concise', label: 'Concise' },
];

export interface GenerateEmailRequest {
  prompt: string;
  emailType: EmailType;
  tone: Tone;
}

export interface GeneratedEmail {
  subject: string;
  body: string;
  model: string;
  generatedAt: string;
}

export type ApiErrorCode =
  | 'INVALID_REQUEST'
  | 'RATE_LIMITED'
  | 'OPENAI_ERROR'
  | 'INTERNAL_ERROR';

export interface GenerateEmailErrorBody {
  error: {
    message: string;
    code: ApiErrorCode;
  };
}

export interface GenerationSession {
  request: GenerateEmailRequest;
  versions: GeneratedEmail[];
  currentIndex: number;
}
