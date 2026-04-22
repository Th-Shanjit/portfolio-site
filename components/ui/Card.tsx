'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

type Props = {
  href: string;
  external?: boolean;
  eyebrow?: string;
  title: string;
  description?: string;
  thumbnail?: string;
  thumbnailAlt?: string;
  index?: number;
  className?: string;
};

export default function Card({
  href,
  external,
  eyebrow,
  title,
  description,
  thumbnail,
  thumbnailAlt,
  index,
  className = '',
}: Props) {
  const isExternal = external ?? /^https?:/.test(href);
  const inner = (
    <>
      {thumbnail && (
        <div className="relative w-full aspect-[16/10] overflow-hidden rounded-[10px] bg-[#f2ede5] border border-[#ede8e1]">
          <img
            src={thumbnail}
            alt={thumbnailAlt || title}
            className="w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
          />
          {typeof index === 'number' && (
            <div className="absolute top-3 left-3 font-mono text-[9px] text-white/80 bg-black/35 backdrop-blur-sm px-2 py-[3px] rounded tracking-[0.1em]">
              {String(index + 1).padStart(2, '0')}
            </div>
          )}
        </div>
      )}
      <div className="pt-4 flex flex-col gap-1.5">
        {eyebrow && (
          <span className="font-mono text-[9px] text-[#b8b2aa] tracking-[0.14em] uppercase">
            {eyebrow}
          </span>
        )}
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-serif text-[20px] font-medium leading-tight text-[#1c1916] group-hover:text-[#c8873c] transition-colors truncate">
            {title}
          </h3>
          <ArrowUpRight
            size={14}
            className="shrink-0 text-[#b8b2aa] group-hover:text-[#c8873c] transition-colors"
          />
        </div>
        {description && (
          <p className="font-sans text-[13px] text-[#7a7470] leading-[1.55] line-clamp-2">
            {description}
          </p>
        )}
      </div>
    </>
  );

  const common = `group flex flex-col flex-shrink-0 no-underline ${className}`;
  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={common}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={common}>
      {inner}
    </Link>
  );
}
