import { useEffect, useState } from 'react';
import { PromptForm } from '../components/generator/PromptForm.tsx';
import { EmailOutput } from '../components/generator/EmailOutput.tsx';
import { VersionControls } from '../components/generator/VersionControls.tsx';
import { useEmailGenerator } from '../hooks/useEmailGenerator.ts';
import { useEmailHistory } from '../hooks/useEmailHistory.ts';
import type { HistoryEntry } from '../types/history.ts';
import styles from './GeneratorPage.module.css';

interface GeneratorPageProps {
  entryToLoad?: HistoryEntry | null;
  onEntryLoaded?: () => void;
}

export function GeneratorPage({ entryToLoad = null, onEntryLoaded }: GeneratorPageProps) {
  // Captured once at mount so the prefilled form survives the parent clearing entryToLoad.
  const [initialEntry] = useState(entryToLoad);
  const { saveEntry } = useEmailHistory();
  const {
    currentEmail,
    currentRequest,
    isGenerating,
    error,
    versionLabel,
    canGoPrev,
    canGoNext,
    generate,
    regenerate,
    goPrev,
    goNext,
    loadEntry,
  } = useEmailGenerator(saveEntry);

  useEffect(() => {
    if (initialEntry) {
      loadEntry(initialEntry);
      onEntryLoaded?.();
    }
    // Runs once on mount to load the entry the user selected from History.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.column}>
        <span className={styles.eyebrow}>Compose</span>
        <PromptForm
          onSubmit={generate}
          isSubmitting={isGenerating}
          initialPrompt={initialEntry?.prompt}
          initialEmailType={initialEntry?.emailType}
          initialTone={initialEntry?.tone}
        />
      </div>
      <div className={`${styles.column} ${styles.outputColumn}`}>
        <span className={styles.eyebrow}>Your email</span>
        <EmailOutput
          email={currentEmail}
          emailType={currentRequest?.emailType}
          tone={currentRequest?.tone}
          isGenerating={isGenerating}
          error={error}
        />
        <VersionControls
          versionLabel={versionLabel}
          canGoPrev={canGoPrev}
          canGoNext={canGoNext}
          isGenerating={isGenerating}
          onPrev={goPrev}
          onNext={goNext}
          onRegenerate={regenerate}
        />
      </div>
    </div>
  );
}
