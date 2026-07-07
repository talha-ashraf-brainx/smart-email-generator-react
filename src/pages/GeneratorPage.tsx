import { PromptForm } from '../components/generator/PromptForm.tsx';
import { EmailOutput } from '../components/generator/EmailOutput.tsx';
import { VersionControls } from '../components/generator/VersionControls.tsx';
import { useEmailGenerator } from '../hooks/useEmailGenerator.ts';
import { useEmailHistory } from '../hooks/useEmailHistory.ts';
import styles from './GeneratorPage.module.css';

export function GeneratorPage() {
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
  } = useEmailGenerator(saveEntry);

  return (
    <div className={styles.page}>
      <div className={styles.column}>
        <span className={styles.eyebrow}>Compose</span>
        <PromptForm onSubmit={generate} isSubmitting={isGenerating} />
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
