import { EMAIL_TYPE_OPTIONS, TONE_OPTIONS } from '../../types/email.ts';
import type { HistoryEntry } from '../../types/history.ts';
import { Stamp } from '../common/Stamp.tsx';
import styles from './HistoryListItem.module.css';

interface HistoryListItemProps {
  entry: HistoryEntry;
  onDelete: (id: string) => void;
  onSelect: (entry: HistoryEntry) => void;
}

export function HistoryListItem({ entry, onDelete, onSelect }: HistoryListItemProps) {
  const typeLabel = EMAIL_TYPE_OPTIONS.find((option) => option.value === entry.emailType)?.label ?? entry.emailType;
  const toneLabel = TONE_OPTIONS.find((option) => option.value === entry.tone)?.label ?? entry.tone;

  return (
    <li className={styles.item}>
      <button
        type="button"
        className={styles.selectArea}
        onClick={() => onSelect(entry)}
        aria-label={`Load "${entry.subject}" in the generator`}
      >
        <h3 className={styles.subject}>{entry.subject}</h3>
        <p className={styles.prompt}>{entry.prompt}</p>
        <div className={styles.footer}>
          <Stamp typeLabel={typeLabel} toneLabel={toneLabel} size="small" />
          <span className={styles.date}>{new Date(entry.createdAt).toLocaleDateString()}</span>
        </div>
      </button>
      <button
        type="button"
        className={styles.deleteButton}
        onClick={() => onDelete(entry.id)}
        aria-label={`Delete "${entry.subject}"`}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2m2 0-.8 12.14A2 2 0 0114.21 21H9.8a2 2 0 01-2-1.86L7 7" />
          <path strokeLinecap="round" d="M10 11v6M14 11v6" />
        </svg>
      </button>
    </li>
  );
}
