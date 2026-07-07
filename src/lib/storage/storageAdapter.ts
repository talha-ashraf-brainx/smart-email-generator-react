import type { HistoryEntry } from '../../types/history.ts';

export interface HistoryStorageAdapter {
  list(): Promise<HistoryEntry[]>;
  get(id: string): Promise<HistoryEntry | undefined>;
  save(entry: HistoryEntry): Promise<void>;
  remove(id: string): Promise<void>;
  clear(): Promise<void>;
}
