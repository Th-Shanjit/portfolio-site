'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Scan } from 'lucide-react';

const LINKS = [
  { href: '#how', label: 'How it works' },
  { href: '#features', label: 'Features' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#roadmap', label: 'Roadmap' },
];

export default function PLNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 h-[62px] flex items-center justify-between px-[5%] transition-all duration-300 ${
        scrolled
          ? 'bg-[#0B1825]/92 backdrop-blur-xl border-b border-white/[0.07] shadow-[0_4px_24px_rgba(0,0,0,0.25)]'
          : ''
      }`}
    >
      <Link href="/paperloop" className="flex items-center gap-2.5 no-underline" aria-label="PaperLoop home">
        <div className="w-9 h-9 rounded-lg bg-[#CF8610]/15 border border-[#CF8610]/30 flex items-center justify-center">
          <Scan size={18} className="text-[#F0A535]" />
        </div>
        <span className="font-serif font-bold text-[18px] text-[#EDE8DB] tracking-[-0.01em]">
          Paper<span className="text-[#F0A535]">loop</span>
        </span>
      </Link>

      <div className="hidden md:flex items-center gap-8">
        {LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="font-sans text-[13px] text-[#EDE8DB]/55 hover:text-[#EDE8DB] transition-colors no-underline"
          >
            {l.label}
          </a>
        ))}
      </div>

      <Link
        href="/paperloop/download"
        className="inline-flex items-center gap-1.5 bg-[#CF8610] hover:bg-[#B07610] text-white px-4 py-2 rounded-[6px] font-sans text-[13px] font-medium no-underline transition-all hover:-translate-y-[1px] shadow-[0_4px_14px_rgba(207,134,16,0.3)]"
      >
        Get the app <ArrowRight size={13} />
      </Link>
    </nav>
  );
}
