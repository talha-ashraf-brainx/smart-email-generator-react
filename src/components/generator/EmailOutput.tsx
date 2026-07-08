import { useState } from 'react';
import type { GeneratedEmail } from '../../types/email.ts';
import { EMAIL_TYPE_OPTIONS, TONE_OPTIONS } from '../../types/email.ts';
import { Stamp } from '../common/Stamp.tsx';
import styles from './EmailOutput.module.css';

interface EmailOutputProps {
  email: GeneratedEmail | null;
  emailType?: string;
  tone?: string;
  isGenerating: boolean;
  error: string | null;
}

export function EmailOutput({ email, emailType, tone, isGenerating, error }: EmailOutputProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    if (!email) return;
    await navigator.clipboard.writeText(`${email.subject}\n\n${email.body}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (error) {
    return <p className={styles.error}>Couldn't generate your email: {error}</p>;
  }

  if (isGenerating && !email) {
    return (
      <div className={`${styles.emptyCard} ${styles.drafting}`}>
        <span className={styles.draftingDot} aria-hidden="true" />
        <p>Drafting your email…</p>
      </div>
    );
  }

  if (!email) {
    return (
      <div className={styles.emptyCard}>
        <p>Nothing drafted yet — describe what you need and it'll appear here.</p>
      </div>
    );
  }

  const typeLabel = EMAIL_TYPE_OPTIONS.find((option) => option.value === emailType)?.label ?? emailType ?? '';
  const toneLabel = TONE_OPTIONS.find((option) => option.value === tone)?.label ?? tone ?? '';

  return (
    <div className={styles.card} key={`${email.generatedAt}-${email.subject}`}>
      <div className={styles.header}>
        <h2 className={styles.subject}>{email.subject}</h2>
        {typeLabel && toneLabel && <Stamp typeLabel={typeLabel} toneLabel={toneLabel} animate />}
      </div>
      <div className={styles.body}>
        {email.body.split('\n\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
      <button type="button" className={styles.copyButton} onClick={handleCopy}>
        {copied ? (
          <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <rect x="9" y="9" width="11" height="11" rx="2" strokeLinejoin="round" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15V6a2 2 0 012-2h9" />
          </svg>
        )}
        {copied ? 'Copied!' : 'Copy to clipboard'}
      </button>
    </div>
  );
}
