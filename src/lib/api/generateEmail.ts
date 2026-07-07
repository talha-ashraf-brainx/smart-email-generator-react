import type { GenerateEmailRequest, GeneratedEmail, GenerateEmailErrorBody } from '../../types/email.ts';

export async function postGenerateEmail(request: GenerateEmailRequest): Promise<GeneratedEmail> {
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as GenerateEmailErrorBody | null;
    throw new Error(body?.error.message ?? 'Failed to generate email.');
  }

  return response.json() as Promise<GeneratedEmail>;
}
