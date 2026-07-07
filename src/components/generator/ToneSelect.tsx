import { TONE_OPTIONS } from '../../types/email.ts';
import type { Tone } from '../../types/email.ts';

interface ToneSelectProps {
  value: Tone;
  onChange: (value: Tone) => void;
  id: string;
}

export function ToneSelect({ value, onChange, id }: ToneSelectProps) {
  return (
    <select id={id} value={value} onChange={(event) => onChange(event.target.value as Tone)}>
      {TONE_OPTIONS.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
