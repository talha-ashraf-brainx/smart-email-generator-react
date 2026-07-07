import styles from './VersionControls.module.css';

interface VersionControlsProps {
  versionLabel: { index: number; total: number };
  canGoPrev: boolean;
  canGoNext: boolean;
  isGenerating: boolean;
  onPrev: () => void;
  onNext: () => void;
  onRegenerate: () => void;
}

export function VersionControls({
  versionLabel,
  canGoPrev,
  canGoNext,
  isGenerating,
  onPrev,
  onNext,
  onRegenerate,
}: VersionControlsProps) {
  if (versionLabel.total === 0) {
    return null;
  }

  return (
    <div className={styles.controls}>
      <button type="button" onClick={onPrev} disabled={!canGoPrev}>
        <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 6l-6 6 6 6" />
        </svg>
        Prev
      </button>
      <span className={styles.versionLabel}>
        v{versionLabel.index}/{versionLabel.total}
      </span>
      <button type="button" onClick={onNext} disabled={!canGoNext}>
        Next
        <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
        </svg>
      </button>
      <button type="button" className={styles.regenerate} onClick={onRegenerate} disabled={isGenerating}>
        <svg
          className={`${styles.icon} ${isGenerating ? styles.spin : ''}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 11A8 8 0 006.34 6.34L4 8.68M4 13a8 8 0 0013.66 4.66L20 15.32" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v4.68h4.68M20 20v-4.68h-4.68" />
        </svg>
        {isGenerating ? 'Regenerating…' : 'Regenerate'}
      </button>
    </div>
  );
}
