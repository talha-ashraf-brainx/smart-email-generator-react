import { HistoryList } from '../components/history/HistoryList.tsx';
import { useEmailHistory } from '../hooks/useEmailHistory.ts';
import styles from './HistoryPage.module.css';

export function HistoryPage() {
  const { entries, isLoading, deleteEntry, clearAll } = useEmailHistory();

  return (
    <div className={styles.page}>
      {isLoading ? <p>Loading history…</p> : <HistoryList entries={entries} onDelete={deleteEntry} onClearAll={clearAll} />}
    </div>
  );
}
