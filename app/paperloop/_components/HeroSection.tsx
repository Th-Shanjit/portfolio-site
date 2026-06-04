'use client';

import { useReveal } from './useReveal';
import HeroVisual from './HeroVisual';
import { PLButtonPrimary, PLButtonSecondary } from './pl-ui';

const PROOF_CHIPS = [
  'Built by Shanjit Thokchom',
  'Android MVP',
  '5 teachers/tutors',
  '~15 handwritten papers',
  'Demo available',
];

export default function HeroSection() {
  useReveal();
  return (
    <section id="hero" className="pt-[104px] sm:pt-[120px] md:pt-[132px] pb-14 md:pb-24 lg:pb-28">
      <div className="max-w-[1180px] mx-auto w-full px-[clamp(16px,5vw,48px)]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 xl:gap-16 items-start">
          <div className="flex flex-col min-w-0 order-1">
            <div className="pl-reveal inline-flex items-center gap-2 bg-[#CF8610]/10 border border-[#CF8610]/20 rounded-full px-3 py-1.5 mb-5 w-fit max-w-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F0A535] shrink-0 motion-safe:animate-[pl-pulse_2.5s_infinite]" />
              <span className="font-mono text-[11px] sm:text-[12px] text-[#F0A535] tracking-[0.12em] uppercase leading-snug">
                Android closed beta on Google Play
              </span>
            </div>

            <h1 className="pl-reveal font-serif font-bold text-[#EDE8DB] leading-[1.08] tracking-[-0.025em] mb-5 text-[clamp(2.25rem,5.5vw,4rem)] max-w-[18ch] sm:max-w-none">
              Turn handwritten exam drafts into editable, PDF-ready papers
            </h1>

            <p className="pl-reveal font-sans text-[16px] md:text-[17px] text-[#EDE8DB]/65 leading-[1.7] max-w-[36rem] mb-7">
              PaperLoop helps teachers scan handwritten exam drafts, review AI-extracted questions,
              fix formatting, and export clean question papers without retyping everything from scratch.
            </p>

            <div className="pl-reveal flex flex-col sm:flex-row flex-wrap gap-3 mb-4">
              <PLButtonPrimary className="w-full sm:w-auto" />
              <PLButtonSecondary className="w-full sm:w-auto" />
            </div>

            <p className="pl-reveal font-sans text-[13px] md:text-[14px] text-[#EDE8DB]/45 leading-[1.6] mb-6 max-w-[32rem]">
              Closed beta for early testers. Demo available for recruiters and reviewers.
            </p>

            <div className="pl-reveal flex flex-wrap gap-2 mb-0 lg:mb-2" role="list" aria-label="Product proof">
              {PROOF_CHIPS.map((chip) => (
                <span
                  key={chip}
                  role="listitem"
                  className="inline-flex items-center font-sans text-[12px] sm:text-[13px] text-[#EDE8DB]/70 bg-white/[0.05] border border-white/[0.08] rounded-full px-3 py-1.5 leading-none"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>

          <div className="order-2 lg:order-2 min-w-0 w-full">
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
