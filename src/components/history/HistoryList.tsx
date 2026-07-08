import type { HistoryEntry } from '../../types/history.ts';
import { HistoryListItem } from './HistoryListItem.tsx';
import styles from './HistoryList.module.css';

interface HistoryListProps {
  entries: HistoryEntry[];
  onDelete: (id: string) => void;
  onClearAll: () => void;
  onSelect: (entry: HistoryEntry) => void;
}

export function HistoryList({ entries, onDelete, onClearAll, onSelect }: HistoryListProps) {
  if (entries.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No emails yet — head to Generator to compose your first one.</p>
      </div>
    );
  }

  return (
    <div>
      <div className={styles.clearRow}>
        <button type="button" className={styles.clearButton} onClick={onClearAll}>
          <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2m2 0-.8 12.14A2 2 0 0114.21 21H9.8a2 2 0 01-2-1.86L7 7" />
            <path strokeLinecap="round" d="M10 11v6M14 11v6" />
          </svg>
          Clear all
        </button>
      </div>
      <ul className={styles.list}>
        {entries.map((entry) => (
          <HistoryListItem key={entry.id} entry={entry} onDelete={onDelete} onSelect={onSelect} />
        ))}
      </ul>
    </div>
  );
}
