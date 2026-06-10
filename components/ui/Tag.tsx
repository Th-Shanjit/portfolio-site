import React from 'react';

type Props = {
  children: React.ReactNode;
  tone?: 'neutral' | 'accent' | 'dark';
  size?: 'sm' | 'md';
  className?: string;
};

const tones = {
  neutral: 'bg-[#F0EBE0] text-[#6F6A61] border-[rgba(22,22,22,0.06)]',
  accent: 'bg-[#FF6B35]/10 text-[#FF6B35] border-[#FF6B35]/20',
  dark: 'bg-white/10 text-white/80 border-white/10',
};

const sizes = {
  sm: 'text-[11px] px-2.5 py-0.5',
  md: 'text-[12px] px-3 py-1',
};

export default function Tag({ children, tone = 'neutral', size = 'md', className = '' }: Props) {
  return (
    <span
      className={`inline-flex items-center font-mono tracking-[0.04em] rounded-full border ${tones[tone]} ${sizes[size]} ${className}`}
    >
      {children}
    </span>
  );
}
