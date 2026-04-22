import React from 'react';

type Props = {
  children: React.ReactNode;
  tone?: 'neutral' | 'accent' | 'dark';
  size?: 'sm' | 'md';
  className?: string;
};

const tones = {
  neutral: 'bg-[#f2ede5] text-[#7a7470] border-[#ede8e1]',
  accent: 'bg-[#c8873c]/10 text-[#c8873c] border-[#c8873c]/20',
  dark: 'bg-[#1c1916]/5 text-[#1c1916] border-[#e6ded4]',
};

const sizes = {
  sm: 'text-[9px] px-2 py-[2px]',
  md: 'text-[10px] px-3 py-[4px]',
};

export default function Tag({ children, tone = 'neutral', size = 'md', className = '' }: Props) {
  return (
    <span
      className={`inline-flex items-center font-mono uppercase tracking-[0.14em] rounded-full border ${tones[tone]} ${sizes[size]} ${className}`}
    >
      {children}
    </span>
  );
}
