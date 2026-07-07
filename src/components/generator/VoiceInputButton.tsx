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
    <div>
      <button
        type="button"
        className={`${styles.button} ${isListening ? styles.listening : ''}`}
        onClick={isListening ? stop : start}
        aria-pressed={isListening}
        aria-label={isListening ? 'Stop voice input' : 'Start voice input'}
      >
        <span className={styles.dot} aria-hidden="true" />
        {isListening ? 'Listening…' : 'Speak'}
      </button>
      {isListening && interimTranscript && <p>{interimTranscript}</p>}
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
