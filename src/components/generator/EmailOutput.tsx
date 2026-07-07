import { useState } from 'react';
import type { GeneratedEmail } from '../../types/email.ts';
import styles from './EmailOutput.module.css';

interface EmailOutputProps {
  email: GeneratedEmail | null;
  isGenerating: boolean;
  error: string | null;
}

export function EmailOutput({ email, isGenerating, error }: EmailOutputProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    if (!email) return;
    await navigator.clipboard.writeText(`${email.subject}\n\n${email.body}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (error) {
    return <p className={styles.error}>{error}</p>;
  }

  if (isGenerating && !email) {
    return <p className={styles.empty}>Generating your email…</p>;
  }

  if (!email) {
    return <p className={styles.empty}>Your generated email will appear here.</p>;
  }

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.subject}>{email.subject}</h2>
        <button type="button" className={styles.copyButton} onClick={handleCopy}>
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <div className={styles.body}>
        {email.body.split('\n\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}
