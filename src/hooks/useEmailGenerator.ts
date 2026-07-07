import { useCallback, useState } from 'react';
import type { GenerateEmailRequest, GeneratedEmail, GenerationSession } from '../types/email.ts';
import { postGenerateEmail } from '../lib/api/generateEmail.ts';

export interface UseEmailGeneratorResult {
  currentEmail: GeneratedEmail | null;
  currentRequest: GenerateEmailRequest | null;
  isGenerating: boolean;
  error: string | null;
  versionLabel: { index: number; total: number };
  canGoPrev: boolean;
  canGoNext: boolean;
  generate: (request: GenerateEmailRequest) => Promise<void>;
  regenerate: () => Promise<void>;
  goPrev: () => void;
  goNext: () => void;
}

export function useEmailGenerator(
  onVersionProduced?: (email: GeneratedEmail, request: GenerateEmailRequest) => void,
): UseEmailGeneratorResult {
  const [session, setSession] = useState<GenerationSession | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runGeneration = useCallback(
    async (request: GenerateEmailRequest, existingVersions: GeneratedEmail[]) => {
      setIsGenerating(true);
      setError(null);
      try {
        const email = await postGenerateEmail(request);
        setSession({
          request,
          versions: [...existingVersions, email],
          currentIndex: existingVersions.length,
        });
        onVersionProduced?.(email, request);
      } catch (caught) {
        setError(caught instanceof Error ? caught.message : 'Failed to generate email.');
      } finally {
        setIsGenerating(false);
      }
    },
    [onVersionProduced],
  );

  const generate = useCallback(
    (request: GenerateEmailRequest) => runGeneration(request, []),
    [runGeneration],
  );

  const regenerate = useCallback(async () => {
    if (!session) return;
    await runGeneration(session.request, session.versions);
  }, [session, runGeneration]);

  const goPrev = useCallback(() => {
    setSession((current) =>
      current && current.currentIndex > 0
        ? { ...current, currentIndex: current.currentIndex - 1 }
        : current,
    );
  }, []);

  const goNext = useCallback(() => {
    setSession((current) =>
      current && current.currentIndex < current.versions.length - 1
        ? { ...current, currentIndex: current.currentIndex + 1 }
        : current,
    );
  }, []);

  return {
    currentEmail: session ? session.versions[session.currentIndex] : null,
    currentRequest: session?.request ?? null,
    isGenerating,
    error,
    versionLabel: { index: (session?.currentIndex ?? 0) + 1, total: session?.versions.length ?? 0 },
    canGoPrev: (session?.currentIndex ?? 0) > 0,
    canGoNext: !!session && session.currentIndex < session.versions.length - 1,
    generate,
    regenerate,
    goPrev,
    goNext,
  };
}
