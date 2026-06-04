'use client';

import Link from 'next/link';
import { useReveal } from './useReveal';
import { PLButtonPrimary, PLButtonSecondary } from './pl-ui';

export default function FinalCTASection() {
  useReveal();
  return (
    <section id="cta" className="py-16 sm:py-24 md:py-28 lg:py-32 relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-60 bg-[radial-gradient(ellipse_at_center,rgba(207,134,16,0.08)_0%,transparent_60%)]"
      />
      <div className="relative max-w-[1180px] mx-auto w-full px-[clamp(16px,5vw,48px)] text-center">
        <div className="pl-reveal inline-flex items-center gap-2 bg-[#CF8610]/10 border border-[#CF8610]/20 rounded-full px-3 py-1.5 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F0A535] motion-safe:animate-[pl-pulse_2s_infinite]" />
          <span className="font-mono text-[11px] sm:text-[12px] text-[#F0A535] tracking-[0.12em] uppercase">
            Android closed beta on Google Play
          </span>
        </div>

        <h2 className="pl-reveal font-serif font-bold text-[#EDE8DB] leading-[1.06] tracking-[-0.02em] mb-5 text-[clamp(1.75rem,4.5vw,3.25rem)] max-w-[16ch] sm:max-w-none mx-auto">
          Try the workflow on real papers.
        </h2>

        <p className="pl-reveal font-sans text-[16px] md:text-[17px] text-[#EDE8DB]/55 leading-[1.7] mb-8 max-w-[36rem] mx-auto">
          PaperLoop is in closed beta for teachers, tutors, and reviewers testing the
          handwritten-to-PDF workflow.
        </p>

        <div className="pl-reveal flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 mb-8">
          <PLButtonPrimary size="lg" />
          <PLButtonSecondary />
        </div>

        <p className="pl-reveal font-sans text-[14px] text-[#EDE8DB]/40 leading-[1.6] m-0">
          Product MVP and case study built by{' '}
          <Link
            href="/"
            className="text-[#EDE8DB]/55 hover:text-[#F0A535] no-underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F0A535] rounded-sm"
          >
            Shanjit Thokchom
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
