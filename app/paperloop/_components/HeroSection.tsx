'use client';

import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { useReveal } from './useReveal';
import HeroVisual from './HeroVisual';

const TRUST_CHIPS = ['No login needed', 'Works offline', 'Data stays on device', 'Early access'];

export default function HeroSection() {
  useReveal();
  return (
    <section id="hero" className="pt-[120px] md:pt-[140px] pb-20 md:pb-28 px-[5%]">
      <div className="max-w-[1160px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        <div>
          <div className="pl-reveal inline-flex items-center gap-2 bg-[#CF8610]/10 border border-[#CF8610]/20 rounded-full px-3 py-1.5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F0A535] animate-[pl-pulse_2.5s_infinite]" />
            <span className="font-mono text-[10px] text-[#F0A535] tracking-[0.15em] uppercase">
              For Educators · Powered by Gemini Vision
            </span>
          </div>

          <h1 className="pl-reveal font-serif font-bold text-[#EDE8DB] leading-[1.04] tracking-[-0.025em] mb-6 text-[clamp(40px,6.5vw,72px)]">
            Handwritten<br />
            to <em className="not-italic text-[#F0A535] font-bold italic">print-ready</em><br />
            in{' '}
            <span className="relative">
              seconds
              <span className="absolute left-0 right-0 bottom-[6px] h-[6px] bg-[#CF8610]/35 -z-10 rounded-sm" />
            </span>
            .
          </h1>

          <p className="pl-reveal font-sans text-[15px] md:text-[17px] text-[#EDE8DB]/60 leading-[1.7] max-w-[520px] mb-9">
            Scan your handwritten exam draft.{' '}
            <strong className="text-[#EDE8DB]/90 font-medium">
              Gemini reads every question, notation, and section header.
            </strong>{' '}
            A formatted PDF comes out the other side. No laptop. No retyping.
          </p>

          <div className="pl-reveal flex flex-wrap items-center gap-3 mb-7">
            <Link
              href="/paperloop/download"
              className="inline-flex items-center gap-2 bg-[#CF8610] hover:bg-[#B07610] text-white px-6 py-3.5 rounded-[6px] font-sans text-[14px] font-medium no-underline transition-all hover:-translate-y-[1px] shadow-[0_4px_16px_rgba(207,134,16,0.35)] hover:shadow-[0_8px_24px_rgba(207,134,16,0.45)]"
            >
              Get the app <ArrowRight size={15} />
            </Link>
            <a
              href="#how"
              className="inline-flex items-center gap-2 border border-white/15 hover:border-white/30 text-[#EDE8DB]/80 hover:text-[#EDE8DB] px-6 py-3.5 rounded-[6px] font-sans text-[14px] font-medium no-underline transition-colors"
            >
              See how it works <ArrowRight size={15} />
            </a>
          </div>

          <div className="pl-reveal flex flex-wrap items-center gap-x-5 gap-y-2">
            {TRUST_CHIPS.map((item) => (
              <span key={item} className="inline-flex items-center gap-1.5 font-sans text-[12px] text-[#EDE8DB]/55">
                <Check size={12} className="text-[#0B7A70]" strokeWidth={2.5} />
                {item}
              </span>
            ))}
          </div>
        </div>

        <HeroVisual />
      </div>
    </section>
  );
}
