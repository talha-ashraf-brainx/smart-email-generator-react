import styles from './Stamp.module.css';

interface StampProps {
  typeLabel: string;
  toneLabel: string;
  size?: 'default' | 'small';
  animate?: boolean;
}

export function Stamp({ typeLabel, toneLabel, size = 'default', animate = false }: StampProps) {
  return (
    <div
      className={`${styles.stamp} ${size === 'small' ? styles.small : ''} ${animate ? styles.animate : ''}`}
      role="group"
      aria-label={`Email type: ${typeLabel}. Tone: ${toneLabel}.`}
    >
      <span className={styles.line} aria-hidden="true">
        {typeLabel}
      </span>
      <span className={styles.line} aria-hidden="true">
        {toneLabel}
      </span>
    </div>
  );
}
