'use client';

import { useReveal } from './useReveal';

const PIVOTS = [
  {
    n: '01',
    title: 'Accuracy over clean UI',
    body: 'Chemistry papers were harder than plain text, so the MVP moved toward cropped/cleaned equation handling instead of relying only on a clean scan-to-output flow.',
  },
  {
    n: '02',
    title: 'No-login MVP',
    body: 'Login was removed from the first-use flow to reduce friction for teachers trying the app.',
  },
  {
    n: '03',
    title: 'Simpler editor and PDF themes',
    body: 'Editor and PDF theme options were consolidated so users could focus on correcting content, not making too many design decisions.',
  },
  {
    n: '04',
    title: 'Fair scan credits',
    body: 'Pricing moved away from subscriptions and annual plans toward simple scan credits, with failed scans not charged.',
  },
];

export default function TestingPivotsSection() {
  useReveal();
  return (
    <section id="pivots" className="py-20 md:py-24 px-[5%] border-t border-white/[0.06]">
      <div className="max-w-[1160px] mx-auto">
        <div className="pl-reveal max-w-[680px] mb-10">
          <span className="font-mono text-[10px] text-[#F0A535] tracking-[0.2em] uppercase">
            Product decisions
          </span>
          <h2 className="font-serif font-bold text-[#EDE8DB] leading-[1.07] tracking-[-0.02em] mt-3 text-[clamp(28px,4vw,42px)]">
            What changed after testing
          </h2>
          <p className="font-sans text-[14px] text-[#EDE8DB]/55 leading-[1.7] mt-4 m-0">
            The biggest lesson from testing real handwritten papers was that AI document workflows
            need trust, control, and clear fallback behavior.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/[0.07] rounded-2xl overflow-hidden border border-white/[0.07]">
          {PIVOTS.map((p) => (
            <div key={p.n} className="pl-reveal bg-[#0B1825] p-6 md:p-7">
              <span className="font-mono text-[10px] text-[#EDE8DB]/40 tracking-[0.2em]">{p.n}</span>
              <h3 className="font-serif font-semibold text-[18px] text-[#EDE8DB] mt-3 mb-2 leading-tight">
                {p.title}
              </h3>
              <p className="font-sans text-[14px] text-[#EDE8DB]/60 leading-[1.65] m-0">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
