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
  initialPrompt?: string;
  initialEmailType?: EmailType;
  initialTone?: Tone;
}

interface Example {
  label: string;
  prompt: string;
  emailType: EmailType;
  tone: Tone;
}

const EXAMPLES: Example[] = [
  {
    label: 'Follow up on a project',
    prompt: 'Follow up with my manager about the status of the Q3 report I submitted last week.',
    emailType: 'follow-up',
    tone: 'friendly',
  },
  {
    label: 'Apologize for a delay',
    prompt: "Apologize to a client for a delayed delivery and let them know we're fixing it.",
    emailType: 'apology',
    tone: 'formal',
  },
  {
    label: 'Say thank you',
    prompt: 'Thank a colleague for covering my shift on short notice.',
    emailType: 'thank-you',
    tone: 'friendly',
  },
];

export function PromptForm({
  onSubmit,
  isSubmitting,
  initialPrompt = '',
  initialEmailType = 'follow-up',
  initialTone = 'friendly',
}: PromptFormProps) {
  const [prompt, setPrompt] = useState(initialPrompt);
  const [emailType, setEmailType] = useState<EmailType>(initialEmailType);
  const [tone, setTone] = useState<Tone>(initialTone);
  const promptId = useId();
  const typeId = useId();
  const toneId = useId();

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!prompt.trim()) return;
    onSubmit({ prompt: prompt.trim(), emailType, tone });
  }

  function applyExample(example: Example) {
    setPrompt(example.prompt);
    setEmailType(example.emailType);
    setTone(example.tone);
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

      <div className={styles.examples}>
        <span className={styles.examplesLabel}>Not sure where to start?</span>
        <div className={styles.exampleChips}>
          {EXAMPLES.map((example) => (
            <button
              key={example.label}
              type="button"
              className={styles.exampleChip}
              onClick={() => applyExample(example)}
            >
              {example.label}
            </button>
          ))}
        </div>
      </div>
    </form>
  );
}
