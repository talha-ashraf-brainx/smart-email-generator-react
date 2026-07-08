import { HistoryList } from '../components/history/HistoryList.tsx';
import { useEmailHistory } from '../hooks/useEmailHistory.ts';
import type { HistoryEntry } from '../types/history.ts';
import styles from './HistoryPage.module.css';

interface HistoryPageProps {
  onSelectEntry: (entry: HistoryEntry) => void;
}

export function HistoryPage({ onSelectEntry }: HistoryPageProps) {
  const { entries, isLoading, deleteEntry, clearAll } = useEmailHistory();

  return (
    <div className={styles.page}>
      <h2 className={styles.heading}>History</h2>
      <p className={styles.subheading}>Every email you've drafted, kept on this device.</p>
      {isLoading ? (
        <div className={styles.skeletonGrid} aria-hidden="true">
          {Array.from({ length: 6 }, (_, index) => (
            <div key={index} className={styles.skeletonCard} />
          ))}
        </div>
      ) : (
        <HistoryList entries={entries} onDelete={deleteEntry} onClearAll={clearAll} onSelect={onSelectEntry} />
      )}
    </div>
  );
}
