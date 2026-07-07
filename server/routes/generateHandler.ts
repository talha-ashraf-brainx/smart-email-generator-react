import type { Request, Response, NextFunction } from 'express';
import { EMAIL_TYPE_OPTIONS, TONE_OPTIONS } from '../../src/types/email.ts';
import type { GenerateEmailRequest } from '../../src/types/email.ts';
import { generateEmailContent } from '../services/openaiService.ts';
import { ApiError } from '../errors.ts';

const VALID_EMAIL_TYPES = new Set(EMAIL_TYPE_OPTIONS.map((option) => option.value));
const VALID_TONES = new Set(TONE_OPTIONS.map((option) => option.value));

function parseRequestBody(body: unknown): GenerateEmailRequest {
  if (typeof body !== 'object' || body === null) {
    throw new ApiError(400, 'INVALID_REQUEST', 'Request body must be a JSON object.');
  }

  const { prompt, emailType, tone } = body as Record<string, unknown>;

  if (typeof prompt !== 'string' || prompt.trim().length === 0 || prompt.length > 4000) {
    throw new ApiError(400, 'INVALID_REQUEST', 'prompt must be a non-empty string of at most 4000 characters.');
  }
  if (typeof emailType !== 'string' || !VALID_EMAIL_TYPES.has(emailType as GenerateEmailRequest['emailType'])) {
    throw new ApiError(400, 'INVALID_REQUEST', 'emailType must be one of the supported email types.');
  }
  if (typeof tone !== 'string' || !VALID_TONES.has(tone as GenerateEmailRequest['tone'])) {
    throw new ApiError(400, 'INVALID_REQUEST', 'tone must be one of the supported tones.');
  }

  return {
    prompt: prompt.trim(),
    emailType: emailType as GenerateEmailRequest['emailType'],
    tone: tone as GenerateEmailRequest['tone'],
  };
}

export async function generateHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const request = parseRequestBody(req.body);
    const email = await generateEmailContent(request);
    res.json(email);
  } catch (error) {
    next(error);
  }
}
