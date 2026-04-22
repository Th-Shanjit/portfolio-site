'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useReveal } from './useReveal';

export default function FinalCTASection() {
  useReveal();
  return (
    <section id="cta" className="py-28 md:py-32 px-[5%] relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-60 bg-[radial-gradient(ellipse_at_center,rgba(207,134,16,0.08)_0%,transparent_60%)]"
      />
      <div className="relative max-w-[600px] mx-auto text-center">
        <div className="pl-reveal inline-flex items-center gap-2 bg-[#CF8610]/10 border border-[#CF8610]/20 rounded-full px-3 py-1.5 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F0A535] animate-[pl-pulse_2s_infinite]" />
          <span className="font-mono text-[10px] text-[#F0A535] tracking-[0.15em] uppercase">
            Live on Google Play
          </span>
        </div>
        <h2 className="pl-reveal font-serif font-bold text-[#EDE8DB] leading-[1.04] tracking-[-0.02em] mb-5 text-[clamp(34px,5vw,56px)]">
          Stop retyping. <em className="italic text-[#F0A535]">Start teaching.</em>
        </h2>
        <p className="pl-reveal font-sans text-[15px] text-[#EDE8DB]/55 leading-[1.7] mb-9">
          Download PaperLoop, scan your first exam draft, and see it printed before your tea goes
          cold.
        </p>
        <div className="pl-reveal">
          <Link
            href="/paperloop/download"
            className="inline-flex items-center gap-2 bg-[#CF8610] hover:bg-[#B07610] text-white px-7 py-4 rounded-[6px] font-sans text-[15px] font-medium no-underline transition-all hover:-translate-y-[1px] shadow-[0_4px_16px_rgba(207,134,16,0.35)] hover:shadow-[0_12px_30px_rgba(207,134,16,0.5)]"
          >
            Get PaperLoop <ArrowRight size={16} />
          </Link>
          <p className="mt-6 font-mono text-[10px] text-[#EDE8DB]/30 tracking-[0.14em] uppercase">
            Available now for Android · iOS coming soon
          </p>
        </div>
      </div>
    </section>
  );
}
