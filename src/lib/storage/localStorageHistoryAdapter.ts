import type { HistoryEntry } from '../../types/history.ts';
import type { HistoryStorageAdapter } from './storageAdapter.ts';

export function createLocalStorageHistoryAdapter(
  storageKey = 'smart-email-generator:history',
  maxEntries = 100,
): HistoryStorageAdapter {
  function readAll(): HistoryEntry[] {
    try {
      const raw = localStorage.getItem(storageKey);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.warn('Failed to read email history from localStorage', error);
      return [];
    }
  }

  function writeAll(entries: HistoryEntry[]): void {
    try {
      localStorage.setItem(storageKey, JSON.stringify(entries.slice(0, maxEntries)));
    } catch (error) {
      console.warn('Failed to write email history to localStorage', error);
    }
  }

  return {
    async list() {
      return readAll().sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    },

    async get(id) {
      return readAll().find((entry) => entry.id === id);
    },

    async save(entry) {
      const entries = readAll().filter((existing) => existing.id !== entry.id);
      entries.unshift(entry);
      writeAll(entries);
    },

    async remove(id) {
      writeAll(readAll().filter((entry) => entry.id !== id));
    },

    async clear() {
      writeAll([]);
    },
  };
}
