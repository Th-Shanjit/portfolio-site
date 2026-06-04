'use client';

import { Camera, FileText, Layers, Wand2 } from 'lucide-react';
import { useReveal } from './useReveal';

const PAINS = [
  {
    n: '01',
    icon: <FileText size={22} aria-hidden />,
    title: 'Draft → Retype → Repeat',
    body: 'Write it by hand, then type the entire thing again — hours each week lost to pure duplication.',
  },
  {
    n: '02',
    icon: <Layers size={22} aria-hidden />,
    title: 'Formatting is a nightmare',
    body: "Chemistry subscripts, MCQ grids, two-column layouts — Word wasn't built for exam papers.",
  },
  {
    n: '03',
    icon: <Camera size={22} aria-hidden />,
    title: 'Scanners just take photos',
    body: 'CamScanner gives a flat image. Nothing is extracted. You still retype everything, just with a photo open.',
  },
  {
    n: '04',
    icon: <Wand2 size={22} aria-hidden />,
    title: 'OCR fails on exam content',
    body: 'Generic OCR struggles with chemistry notation, MCQ blocks, section headers, and marks formatting because it is not designed around exam-paper workflows.',
  },
];

export default function PainSection() {
  useReveal();
  return (
    <section id="pain" className="bg-[#F6F2EB] text-[#0B1825] py-14 sm:py-20 md:py-24 lg:py-28">
      <div className="max-w-[1180px] mx-auto w-full px-[clamp(16px,5vw,48px)] grid grid-cols-1 md:grid-cols-[minmax(0,260px)_1fr] gap-8 md:gap-12 lg:gap-16 items-start">
        <div className="pl-reveal min-w-0">
          <span className="font-mono text-[11px] sm:text-[12px] text-[#CF8610] tracking-[0.18em] uppercase">
            The problem
          </span>
          <h2 className="font-serif font-bold text-[#0B1825] leading-[1.08] tracking-[-0.02em] mt-3 text-[clamp(1.75rem,4vw,2.75rem)]">
            The old way
            <br />
            <em className="italic text-[#0B1825]">costs hours</em>
            <br />
            you don&apos;t have.
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#DDD7CB] rounded-2xl overflow-hidden border border-[#DDD7CB] min-w-0">
          {PAINS.map((p) => (
            <div key={p.n} className="pl-reveal bg-[#F6F2EB] p-5 sm:p-6 md:p-7">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[11px] text-[#0B1825]/45 tracking-[0.18em]">{p.n}</span>
                <div className="text-[#CF8610]">{p.icon}</div>
              </div>
              <h3 className="font-serif font-semibold text-[18px] sm:text-[20px] text-[#0B1825] mb-2 leading-tight">
                {p.title}
              </h3>
              <p className="font-sans text-[15px] sm:text-[16px] text-[#0B1825]/65 leading-[1.65] m-0">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
