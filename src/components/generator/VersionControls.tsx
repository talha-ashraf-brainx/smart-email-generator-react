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
        ← Prev
      </button>
      <span>
        Version {versionLabel.index} of {versionLabel.total}
      </span>
      <button type="button" onClick={onNext} disabled={!canGoNext}>
        Next →
      </button>
      <button type="button" onClick={onRegenerate} disabled={isGenerating}>
        {isGenerating ? 'Regenerating…' : 'Regenerate'}
      </button>
    </div>
  );
}
