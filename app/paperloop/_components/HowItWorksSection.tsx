'use client';

import { Camera, Download, Sparkles } from 'lucide-react';
import { useReveal } from './useReveal';

const STEPS = [
  {
    n: '01',
    icon: <Camera size={26} aria-hidden />,
    iconBg: 'bg-white/[0.05]',
    title: 'Scan your draft',
    body: 'Point your camera at a handwritten page. PaperLoop is designed to handle messy corrections, arrows, and crossed-out words, then lets you review the extraction before export.',
  },
  {
    n: '02',
    icon: <Sparkles size={26} aria-hidden />,
    iconBg: 'bg-[#0B7A70]/15',
    title: 'Review extraction',
    body: 'AI drafts questions, MCQs, section headers, chemistry notation, and equations. You check and edit before export.',
  },
  {
    n: '03',
    icon: <Download size={26} aria-hidden />,
    iconBg: 'bg-[#CF8610]/15',
    title: 'Export your PDF',
    body: 'When you are satisfied with the content, export a formatted, PDF-ready paper. Multi-column layouts supported.',
  },
];

export default function HowItWorksSection() {
  useReveal();
  return (
    <section id="how" className="py-14 sm:py-20 md:py-24 lg:py-28">
      <div className="max-w-[1180px] mx-auto w-full px-[clamp(16px,5vw,48px)]">
        <div className="pl-reveal text-center mb-10 md:mb-14 max-w-[40rem] mx-auto">
          <span className="font-mono text-[11px] sm:text-[12px] text-[#F0A535] tracking-[0.18em] uppercase">
            How it works
          </span>
          <h2 className="font-serif font-bold text-[#EDE8DB] leading-[1.08] tracking-[-0.02em] mt-3 text-[clamp(1.75rem,4vw,2.75rem)]">
            Three steps. <em className="italic text-[#F0A535]">Scan, review, export.</em>
          </h2>
          <p className="font-sans text-[16px] text-[#EDE8DB]/55 leading-[1.7] mt-4 mb-0">
            Scan a handwritten draft, review the extracted questions, and export a clean PDF question
            paper.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-0 md:divide-x md:divide-white/[0.07] border border-white/[0.07] rounded-2xl overflow-hidden bg-white/[0.015]">
          {STEPS.map((s) => (
            <div key={s.n} className="pl-reveal p-6 sm:p-8 md:p-10 flex flex-col items-start gap-4">
              <span className="font-mono text-[11px] text-[#EDE8DB]/45 tracking-[0.18em]">{s.n}</span>
              <div
                className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl ${s.iconBg} flex items-center justify-center text-[#EDE8DB]`}
              >
                {s.icon}
              </div>
              <h3 className="font-serif font-semibold text-[18px] sm:text-[20px] md:text-[22px] text-[#EDE8DB] leading-tight">
                {s.title}
              </h3>
              <p className="font-sans text-[15px] sm:text-[16px] text-[#EDE8DB]/60 leading-[1.7] m-0">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
