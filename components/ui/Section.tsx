import React from 'react';

type Props = {
  id?: string;
  eyebrow?: string;
  eyebrowNumber?: string;
  title?: string;
  trailing?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

export default function Section({ id, eyebrow, eyebrowNumber, title, trailing, children, className = '' }: Props) {
  return (
    <section id={id} className={`w-full max-w-[1040px] mx-auto px-[clamp(20px,5vw,64px)] pb-24 ${className}`}>
      {(eyebrow || title || trailing) && (
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div className="flex items-center gap-4">
            {eyebrowNumber && (
              <span className="font-mono text-[10px] text-[#b8b2aa] tracking-[0.2em] uppercase">
                {eyebrowNumber}
              </span>
            )}
            {eyebrowNumber && <div className="w-10 h-px bg-[#e6ded4]" />}
            {eyebrow && (
              <span className="font-mono text-[10px] text-[#b8b2aa] tracking-[0.2em] uppercase">
                {eyebrow}
              </span>
            )}
          </div>
          {trailing}
        </div>
      )}
      {title && (
        <h2 className="font-serif text-[clamp(32px,5vw,52px)] text-[#1c1916] leading-[1.05] tracking-[-0.02em] font-normal mb-10">
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}
