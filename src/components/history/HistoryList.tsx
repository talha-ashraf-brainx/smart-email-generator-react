import type { HistoryEntry } from '../../types/history.ts';
import { HistoryListItem } from './HistoryListItem.tsx';
import styles from './HistoryList.module.css';

interface HistoryListProps {
  entries: HistoryEntry[];
  onDelete: (id: string) => void;
  onClearAll: () => void;
}

export function HistoryList({ entries, onDelete, onClearAll }: HistoryListProps) {
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
          Clear all
        </button>
      </div>
      <ul className={styles.list}>
        {entries.map((entry) => (
          <HistoryListItem key={entry.id} entry={entry} onDelete={onDelete} />
        ))}
      </ul>
    </div>
  );
}
