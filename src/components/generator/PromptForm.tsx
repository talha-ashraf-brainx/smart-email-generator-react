import { useId, useState } from 'react';
import type { FormEvent } from 'react';
import type { EmailType, GenerateEmailRequest, Tone } from '../../types/email.ts';
import { EmailTypeSelect } from './EmailTypeSelect.tsx';
import { ToneSelect } from './ToneSelect.tsx';
import { VoiceInputButton } from './VoiceInputButton.tsx';
import styles from './PromptForm.module.css';

interface PromptFormProps {
  onSubmit: (request: GenerateEmailRequest) => void;
  isSubmitting: boolean;
}

export function PromptForm({ onSubmit, isSubmitting }: PromptFormProps) {
  const [prompt, setPrompt] = useState('');
  const [emailType, setEmailType] = useState<EmailType>('follow-up');
  const [tone, setTone] = useState<Tone>('friendly');
  const promptId = useId();
  const typeId = useId();
  const toneId = useId();

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!prompt.trim()) return;
    onSubmit({ prompt: prompt.trim(), emailType, tone });
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label className={styles.label} htmlFor={promptId}>
          What should this email say?
        </label>
        <textarea
          id={promptId}
          className={styles.textarea}
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          placeholder="e.g. Ask my manager for feedback on last week's project deliverable"
          maxLength={4000}
        />
        <div className={styles.voiceRow}>
          <VoiceInputButton onFinalResult={(text) => setPrompt((current) => (current ? `${current} ${text}` : text))} />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor={typeId}>
            Email type
          </label>
          <EmailTypeSelect id={typeId} value={emailType} onChange={setEmailType} />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor={toneId}>
            Tone
          </label>
          <ToneSelect id={toneId} value={tone} onChange={setTone} />
        </div>
      </div>

      <button type="submit" className={styles.submit} disabled={isSubmitting || !prompt.trim()}>
        {isSubmitting ? 'Generating…' : 'Generate email'}
      </button>
    </form>
  );
}
