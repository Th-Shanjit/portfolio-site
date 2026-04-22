'use client';

import { Camera, Download, Sparkles } from 'lucide-react';
import { useReveal } from './useReveal';

const STEPS = [
  {
    n: '01',
    icon: <Camera size={26} />,
    iconBg: 'bg-white/[0.05]',
    title: 'Scan your draft',
    body: 'Point your camera at any handwritten page. Messy corrections, arrows, crossed-out words — all fine.',
  },
  {
    n: '02',
    icon: <Sparkles size={26} />,
    iconBg: 'bg-[#0B7A70]/15',
    title: 'Gemini reads it',
    body: 'Vision AI identifies questions, MCQs, section headers, chemistry notation, superscripts, equations — all of it.',
  },
  {
    n: '03',
    icon: <Download size={26} />,
    iconBg: 'bg-[#CF8610]/15',
    title: 'Export your PDF',
    body: 'A professionally formatted, print-ready PDF is generated instantly. Multi-column, your logo, done.',
  },
];

export default function HowItWorksSection() {
  useReveal();
  return (
    <section id="how" className="py-24 md:py-28 px-[5%]">
      <div className="max-w-[1160px] mx-auto">
        <div className="pl-reveal text-center mb-14">
          <span className="font-mono text-[10px] text-[#F0A535] tracking-[0.2em] uppercase">
            How it works
          </span>
          <h2 className="font-serif font-bold text-[#EDE8DB] leading-[1.07] tracking-[-0.02em] mt-3 max-w-[620px] mx-auto text-[clamp(30px,4.2vw,46px)]">
            Three steps. <em className="italic text-[#F0A535]">Under a minute.</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0 md:divide-x md:divide-white/[0.07] border border-white/[0.07] rounded-2xl overflow-hidden bg-white/[0.015]">
          {STEPS.map((s) => (
            <div key={s.n} className="pl-reveal p-8 md:p-10 flex flex-col items-start gap-4">
              <span className="font-mono text-[10px] text-[#EDE8DB]/40 tracking-[0.2em]">{s.n}</span>
              <div
                className={`w-14 h-14 rounded-xl ${s.iconBg} flex items-center justify-center text-[#EDE8DB]`}
              >
                {s.icon}
              </div>
              <h3 className="font-serif font-semibold text-[22px] text-[#EDE8DB] leading-tight">
                {s.title}
              </h3>
              <p className="font-sans text-[14px] text-[#EDE8DB]/60 leading-[1.7] m-0">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
