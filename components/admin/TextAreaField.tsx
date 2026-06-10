import Field, { inputClass } from './Field';

type Props = {
  label: string;
  id?: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
  rows?: number;
  placeholder?: string;
  className?: string;
};

export default function TextAreaField({
  label,
  id,
  value,
  onChange,
  hint,
  rows = 4,
  placeholder,
  className = '',
}: Props) {
  const fieldId = id || label.toLowerCase().replace(/\s+/g, '-');
  return (
    <Field label={label} htmlFor={fieldId} hint={hint} className={className}>
      <textarea
        id={fieldId}
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${inputClass} resize-y min-h-[80px]`}
      />
    </Field>
  );
}
