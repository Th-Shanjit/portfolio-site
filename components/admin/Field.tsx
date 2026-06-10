import React from 'react';

type Props = {
  label: string;
  htmlFor?: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
};

export default function Field({ label, htmlFor, hint, error, children, className = '' }: Props) {
  return (
    <div className={className}>
      <label
        htmlFor={htmlFor}
        className="block font-sans text-[13px] font-medium text-[#161616] mb-1.5"
      >
        {label}
      </label>
      {children}
      {hint && !error && (
        <p className="mt-1.5 font-sans text-[12px] text-[#9A9489] m-0">{hint}</p>
      )}
      {error && <p className="mt-1.5 font-sans text-[12px] text-red-600 m-0">{error}</p>}
    </div>
  );
}

export const inputClass =
  'w-full px-3 py-2.5 bg-[#F0EBE0] border border-[rgba(22,22,22,0.10)] rounded-lg font-sans text-[14px] text-[#161616] outline-none focus:border-[#FF6B35]/50 focus:ring-2 focus:ring-[#FF6B35]/15 transition-colors';
