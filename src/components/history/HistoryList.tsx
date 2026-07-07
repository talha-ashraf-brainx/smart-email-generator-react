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
    return <p className={styles.empty}>No emails generated yet. Head to Generator to create one.</p>;
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
