import { HistoryList } from '../components/history/HistoryList.tsx';
import { useEmailHistory } from '../hooks/useEmailHistory.ts';
import styles from './HistoryPage.module.css';

export function HistoryPage() {
  const { entries, isLoading, deleteEntry, clearAll } = useEmailHistory();

  return (
    <div className={styles.page}>
      <h2 className={styles.heading}>History</h2>
      <p className={styles.subheading}>Every email you've drafted, kept on this device.</p>
      {isLoading ? (
        <p className={styles.loading}>Loading history…</p>
      ) : (
        <HistoryList entries={entries} onDelete={deleteEntry} onClearAll={clearAll} />
      )}
    </div>
  );
}
