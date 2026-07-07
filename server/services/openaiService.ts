import OpenAI from 'openai';
import { EMAIL_TYPE_OPTIONS, TONE_OPTIONS } from '../../src/types/email.ts';
import type { GenerateEmailRequest, GeneratedEmail } from '../../src/types/email.ts';
import { getOpenAiApiKey, getOpenAiModel } from '../lib/env.ts';
import { ApiError } from '../errors.ts';

const SYSTEM_PROMPT = `You are a professional email-writing assistant.
Respond with ONLY a JSON object of the shape {"subject": string, "body": string}.
The subject must be under 78 characters.
The body must use plain text with paragraphs separated by a blank line (\\n\\n), no markdown formatting.
Include an appropriate greeting and sign-off. Use generic bracket placeholders (e.g. [Your Name]) only when the sender's details are genuinely unknown.`;

function buildUserPrompt(request: GenerateEmailRequest): string {
  const typeLabel = EMAIL_TYPE_OPTIONS.find((option) => option.value === request.emailType)?.label ?? request.emailType;
  const toneLabel = TONE_OPTIONS.find((option) => option.value === request.tone)?.label ?? request.tone;
  return `Email type: ${typeLabel}. Tone: ${toneLabel}. Instructions: ${request.prompt}`;
}

let client: OpenAI | undefined;

function getClient(): OpenAI {
  const apiKey = getOpenAiApiKey();
  if (!apiKey) {
    throw new ApiError(500, 'INTERNAL_ERROR', 'Set OPENAI_API_KEY in .env to generate emails.');
  }
  if (!client) {
    client = new OpenAI({ apiKey });
  }
  return client;
}

export async function generateEmailContent(request: GenerateEmailRequest): Promise<GeneratedEmail> {
  const model = getOpenAiModel();

  const openaiClient = getClient();

  let completion;
  try {
    completion = await openaiClient.chat.completions.create({
      model,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: buildUserPrompt(request) },
      ],
    });
  } catch (error) {
    if (error instanceof OpenAI.APIError && error.status === 429) {
      throw new ApiError(429, 'RATE_LIMITED', 'OpenAI rate limit reached. Please try again shortly.');
    }
    throw new ApiError(502, 'OPENAI_ERROR', 'Failed to reach OpenAI.');
  }

  const raw = completion.choices[0]?.message?.content;
  if (!raw) {
    throw new ApiError(500, 'INTERNAL_ERROR', 'OpenAI returned an empty response.');
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new ApiError(500, 'INTERNAL_ERROR', 'Failed to parse the generated email.');
  }

  if (
    typeof parsed !== 'object' ||
    parsed === null ||
    typeof (parsed as { subject?: unknown }).subject !== 'string' ||
    typeof (parsed as { body?: unknown }).body !== 'string'
  ) {
    throw new ApiError(500, 'INTERNAL_ERROR', 'Received an unexpected response shape from OpenAI.');
  }

  const { subject, body } = parsed as { subject: string; body: string };

  return {
    subject,
    body,
    model,
    generatedAt: new Date().toISOString(),
  };
}
