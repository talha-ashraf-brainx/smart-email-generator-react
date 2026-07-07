import { useCallback, useEffect, useState } from 'react';
import type { GenerateEmailRequest, GeneratedEmail } from '../types/email.ts';
import type { HistoryEntry } from '../types/history.ts';
import { historyStorage } from '../lib/storage/getHistoryStorage.ts';

export interface UseEmailHistoryResult {
  entries: HistoryEntry[];
  isLoading: boolean;
  refresh: () => Promise<void>;
  saveEntry: (email: GeneratedEmail, request: GenerateEmailRequest) => Promise<HistoryEntry>;
  deleteEntry: (id: string) => Promise<void>;
  clearAll: () => Promise<void>;
}

export function useEmailHistory(): UseEmailHistoryResult {
  const [entries, setEntries] = useState<HistoryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setEntries(await historyStorage.list());
    setIsLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const saveEntry = useCallback(
    async (email: GeneratedEmail, request: GenerateEmailRequest): Promise<HistoryEntry> => {
      const entry: HistoryEntry = {
        id: crypto.randomUUID(),
        prompt: request.prompt,
        emailType: request.emailType,
        tone: request.tone,
        subject: email.subject,
        body: email.body,
        model: email.model,
        createdAt: email.generatedAt,
      };
      await historyStorage.save(entry);
      await refresh();
      return entry;
    },
    [refresh],
  );

  const deleteEntry = useCallback(
    async (id: string) => {
      await historyStorage.remove(id);
      await refresh();
    },
    [refresh],
  );

  const clearAll = useCallback(async () => {
    await historyStorage.clear();
    await refresh();
  }, [refresh]);

  return { entries, isLoading, refresh, saveEntry, deleteEntry, clearAll };
}
