'use client';

import { useReveal } from './useReveal';

const RULES = [
  {
    badge: 'Zero tokens deducted',
    badgeClass: 'bg-[#0B7A70]/15 text-[#0B7A70]',
    rule: 'Rule 1 · Total failure',
    title: 'Blurry page? No charge.',
    body: "If Gemini can't detect any text, the scan aborts instantly. No question found, no token taken. Period.",
    dot: 'bg-[#ef4444]',
  },
  {
    badge: 'You decide — no auto-charge',
    badgeClass: 'bg-[#CF8610]/15 text-[#CF8610]',
    rule: 'Rule 2 · Low yield',
    title: 'Only 1–2 questions? Your call.',
    body: 'Poor lighting? The app pauses and asks: "Keep 2 questions (−1 token) or retry for free?" You choose.',
    dot: 'bg-[#F0A535]',
  },
  {
    badge: 'Non-destructive workflow',
    badgeClass: 'bg-[#0B7A70]/15 text-[#0B7A70]',
    rule: 'Rule 3 · Rescan',
    title: 'Missed a page? Append it.',
    body: 'Rescan on any section lets you add a missed page directly into an existing exam — seamlessly.',
    dot: 'bg-[#0B7A70]',
  },
];

export default function FairnessSection() {
  useReveal();
  return (
    <section id="fairness" className="py-24 md:py-28 px-[5%]">
      <div className="max-w-[1160px] mx-auto">
        <div className="pl-reveal text-center mb-12">
          <span className="font-mono text-[10px] text-[#F0A535] tracking-[0.2em] uppercase">
            Fair by design
          </span>
          <h2 className="font-serif font-bold text-[#EDE8DB] leading-[1.07] tracking-[-0.02em] mt-3 max-w-[720px] mx-auto text-[clamp(30px,4.2vw,46px)]">
            If the scan fails, <em className="italic text-[#F0A535]">you don&apos;t pay.</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.07] border border-white/[0.07] rounded-2xl overflow-hidden">
          {RULES.map((r) => (
            <div key={r.rule} className="pl-reveal bg-[#0B1825] p-7 md:p-8 flex flex-col">
              <span
                className={`inline-flex items-center self-start font-mono text-[10px] tracking-[0.12em] uppercase font-semibold ${r.badgeClass} rounded-full px-2.5 py-1 mb-5`}
              >
                {r.badge}
              </span>
              <span className={`w-2.5 h-2.5 rounded-full ${r.dot} mb-4`} />
              <span className="font-mono text-[10px] text-[#EDE8DB]/50 tracking-[0.14em] uppercase mb-1.5">
                {r.rule}
              </span>
              <h3 className="font-serif font-semibold text-[20px] text-[#EDE8DB] mb-2 leading-tight">
                {r.title}
              </h3>
              <p className="font-sans text-[14px] text-[#EDE8DB]/60 leading-[1.65] m-0">{r.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
