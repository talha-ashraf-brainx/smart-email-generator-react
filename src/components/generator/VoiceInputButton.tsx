import { useSpeechRecognition } from '../../hooks/useSpeechRecognition.ts';
import styles from './VoiceInputButton.module.css';

interface VoiceInputButtonProps {
  onFinalResult: (text: string) => void;
}

export function VoiceInputButton({ onFinalResult }: VoiceInputButtonProps) {
  const { isSupported, isListening, interimTranscript, start, stop, error } = useSpeechRecognition(onFinalResult);

  if (!isSupported) {
    return null;
  }

  return (
    <div className={styles.wrap}>
      <button
        type="button"
        className={`${styles.button} ${isListening ? styles.listening : ''}`}
        onClick={isListening ? stop : start}
        aria-pressed={isListening}
        aria-label={isListening ? 'Stop voice input' : 'Start voice input'}
      >
        <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <rect x="9" y="2" width="6" height="12" rx="3" />
          <path strokeLinecap="round" d="M5 11a7 7 0 0014 0M12 18v3" />
        </svg>
        {isListening ? 'Listening…' : 'Speak'}
        {isListening && <span className={styles.dot} aria-hidden="true" />}
      </button>
      {isListening && interimTranscript && <p className={styles.interim}>{interimTranscript}</p>}
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
