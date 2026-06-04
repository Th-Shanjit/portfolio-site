'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Scan } from 'lucide-react';
import { PL_BETA_HREF, PL_CTA_PRIMARY } from './pl-ui';

const LINKS = [
  { href: '#demo', label: 'Demo' },
  { href: '#proof', label: 'Testing' },
  { href: '#pivots', label: 'Pivots' },
  { href: '#how', label: 'Workflow' },
  { href: '#fairness', label: 'Fairness' },
  { href: '#pricing', label: 'Pricing' },
];

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F0A535] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1825]';

export default function PLNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0B1825]/94 backdrop-blur-xl border-b border-white/[0.07] shadow-[0_4px_24px_rgba(0,0,0,0.25)]'
          : 'bg-[#0B1825]/80 backdrop-blur-sm md:bg-transparent md:backdrop-blur-none'
      }`}
    >
      <nav
        className="h-[60px] sm:h-[62px] flex items-center justify-between gap-3 max-w-[1180px] mx-auto w-full px-[clamp(16px,5vw,48px)]"
        aria-label="PaperLoop"
      >
        <Link
          href="/paperloop"
          className={`flex items-center gap-2 sm:gap-2.5 no-underline shrink-0 ${focusRing} rounded-md`}
          aria-label="PaperLoop home"
        >
          <div className="w-9 h-9 rounded-lg bg-[#CF8610]/15 border border-[#CF8610]/30 flex items-center justify-center">
            <Scan size={18} className="text-[#F0A535]" aria-hidden />
          </div>
          <span className="font-serif font-bold text-[17px] sm:text-[18px] text-[#EDE8DB] tracking-[-0.01em]">
            Paper<span className="text-[#F0A535]">loop</span>
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-7">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`font-sans text-[13px] text-[#EDE8DB]/55 hover:text-[#EDE8DB] transition-colors no-underline ${focusRing} rounded-sm`}
            >
              {l.label}
            </a>
          ))}
        </div>

        <Link
          href={PL_BETA_HREF}
          className={`inline-flex items-center justify-center gap-1.5 min-h-[44px] bg-[#CF8610] hover:bg-[#B07610] text-white px-3.5 sm:px-4 py-2 rounded-[6px] font-sans text-[12px] sm:text-[13px] font-medium no-underline transition-colors shadow-[0_4px_14px_rgba(207,134,16,0.28)] shrink-0 ${focusRing}`}
        >
          <span className="hidden sm:inline">{PL_CTA_PRIMARY}</span>
          <span className="sm:hidden">Join Beta</span>
          <ArrowRight size={13} aria-hidden className="hidden sm:block" />
        </Link>
      </nav>
    </header>
  );
}
