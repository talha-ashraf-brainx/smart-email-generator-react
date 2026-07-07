import { EMAIL_TYPE_OPTIONS, TONE_OPTIONS } from '../../types/email.ts';
import type { HistoryEntry } from '../../types/history.ts';
import { Stamp } from '../common/Stamp.tsx';
import styles from './HistoryListItem.module.css';

interface HistoryListItemProps {
  entry: HistoryEntry;
  onDelete: (id: string) => void;
}

export function HistoryListItem({ entry, onDelete }: HistoryListItemProps) {
  const typeLabel = EMAIL_TYPE_OPTIONS.find((option) => option.value === entry.emailType)?.label ?? entry.emailType;
  const toneLabel = TONE_OPTIONS.find((option) => option.value === entry.tone)?.label ?? entry.tone;

  return (
    <li className={styles.item}>
      <div className={styles.top}>
        <h3 className={styles.subject}>{entry.subject}</h3>
        <button
          type="button"
          className={styles.deleteButton}
          onClick={() => onDelete(entry.id)}
          aria-label={`Delete "${entry.subject}"`}
        >
          ×
        </button>
      </div>
      <p className={styles.prompt}>{entry.prompt}</p>
      <div className={styles.footer}>
        <Stamp typeLabel={typeLabel} toneLabel={toneLabel} size="small" />
        <span className={styles.date}>{new Date(entry.createdAt).toLocaleDateString()}</span>
      </div>
    </li>
  );
}
