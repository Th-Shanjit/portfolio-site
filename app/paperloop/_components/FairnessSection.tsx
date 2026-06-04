'use client';

import { useReveal } from './useReveal';

const RULES = [
  {
    badge: 'Credit only on success',
    badgeClass: 'bg-[#0B7A70]/15 text-[#0B7A70]',
    rule: 'Rule 1 · Total failure',
    title: 'Blurry page? No charge.',
    body: "If extraction can't detect usable text, the scan stops and no credit is used.",
    dot: 'bg-[#ef4444]',
  },
  {
    badge: 'You decide — no auto-charge',
    badgeClass: 'bg-[#CF8610]/15 text-[#CF8610]',
    rule: 'Rule 2 · Low yield',
    title: 'Only 1–2 questions? Your call.',
    body: 'Poor lighting? The app pauses and asks whether to keep partial results (using a credit) or retry without charging. You choose.',
    dot: 'bg-[#F0A535]',
  },
  {
    badge: 'Non-destructive workflow',
    badgeClass: 'bg-[#0B7A70]/15 text-[#0B7A70]',
    rule: 'Rule 3 · Rescan',
    title: 'Missed a page? Append it.',
    body: 'Rescan on any section lets you add a missed page directly into an existing exam — without starting over.',
    dot: 'bg-[#0B7A70]',
  },
];

export default function FairnessSection() {
  useReveal();
  return (
    <section id="fairness" className="py-14 sm:py-20 md:py-24 lg:py-28">
      <div className="max-w-[1180px] mx-auto w-full px-[clamp(16px,5vw,48px)]">
        <div className="pl-reveal text-center mb-10 md:mb-12 max-w-[40rem] mx-auto">
          <span className="font-mono text-[11px] sm:text-[12px] text-[#F0A535] tracking-[0.18em] uppercase">
            Fair by design
          </span>
          <h2 className="font-serif font-bold text-[#EDE8DB] leading-[1.08] tracking-[-0.02em] mt-3 text-[clamp(1.75rem,4vw,2.75rem)]">
            If the scan fails, <em className="italic text-[#F0A535]">you don&apos;t pay.</em>
          </h2>
          <p className="font-sans text-[16px] text-[#EDE8DB]/55 leading-[1.7] mt-4 mb-0">
            AI extraction will not be perfect every time. PaperLoop&apos;s scan-credit model is designed
            so teachers are not charged for failed scans.
          </p>
          <p className="font-sans text-[14px] text-[#EDE8DB]/45 leading-[1.6] mt-3 mb-0 font-mono tracking-wide">
            1 token = 1 successful page scan
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-px md:bg-white/[0.07] md:border md:border-white/[0.07] md:rounded-2xl md:overflow-hidden">
          {RULES.map((r) => (
            <div
              key={r.rule}
              className="pl-reveal bg-[#0B1825] md:bg-[#0B1825] border border-white/[0.07] md:border-0 rounded-2xl md:rounded-none p-6 sm:p-7 md:p-8 flex flex-col"
            >
              <span
                className={`inline-flex items-center self-start font-mono text-[11px] tracking-[0.1em] uppercase font-semibold ${r.badgeClass} rounded-full px-2.5 py-1 mb-4`}
              >
                {r.badge}
              </span>
              <span className={`w-2.5 h-2.5 rounded-full ${r.dot} mb-3`} aria-hidden />
              <span className="font-mono text-[11px] text-[#EDE8DB]/50 tracking-[0.12em] uppercase mb-1.5">
                {r.rule}
              </span>
              <h3 className="font-serif font-semibold text-[18px] sm:text-[20px] text-[#EDE8DB] mb-2 leading-tight">
                {r.title}
              </h3>
              <p className="font-sans text-[15px] sm:text-[16px] text-[#EDE8DB]/60 leading-[1.65] m-0">{r.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
