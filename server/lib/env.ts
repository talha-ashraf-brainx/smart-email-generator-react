import dotenv from 'dotenv';

dotenv.config();

let warnedMissingApiKey = false;

export function getOpenAiApiKey(): string | undefined {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey && !warnedMissingApiKey) {
    warnedMissingApiKey = true;
    console.warn(
      '[server] OPENAI_API_KEY is not set. Copy .env.example to .env and add your key.',
    );
  }
  return apiKey;
}

export function getOpenAiModel(): string {
  return process.env.OPENAI_MODEL || 'gpt-4o-mini';
}

export function getServerPort(): number {
  return Number(process.env.PORT) || 3000;
}
