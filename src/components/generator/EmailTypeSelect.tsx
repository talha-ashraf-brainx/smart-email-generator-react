import { EMAIL_TYPE_OPTIONS } from '../../types/email.ts';
import type { EmailType } from '../../types/email.ts';

interface EmailTypeSelectProps {
  value: EmailType;
  onChange: (value: EmailType) => void;
  id: string;
}

export function EmailTypeSelect({ value, onChange, id }: EmailTypeSelectProps) {
  return (
    <select id={id} value={value} onChange={(event) => onChange(event.target.value as EmailType)}>
      {EMAIL_TYPE_OPTIONS.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
