'use client';

import { Camera, FileText, Layers, Wand2 } from 'lucide-react';
import { useReveal } from './useReveal';

const PAINS = [
  {
    n: '01',
    icon: <FileText size={22} />,
    title: 'Draft → Retype → Repeat',
    body: 'Write it by hand, then type the entire thing again. 5–10 hours a week lost to pure duplication.',
  },
  {
    n: '02',
    icon: <Layers size={22} />,
    title: 'Formatting is a nightmare',
    body: "Chemistry subscripts, MCQ grids, two-column layouts — Word wasn't built for exam papers.",
  },
  {
    n: '03',
    icon: <Camera size={22} />,
    title: 'Scanners just take photos',
    body: 'CamScanner gives a flat image. Nothing is extracted. You still retype everything, just with a photo open.',
  },
  {
    n: '04',
    icon: <Wand2 size={22} />,
    title: 'OCR fails on exam content',
    body: 'Generic OCR chokes on H₂SO₄, MCQ blocks, section headers. It was never trained for this format.',
  },
];

export default function PainSection() {
  useReveal();
  return (
    <section id="pain" className="bg-[#F6F2EB] text-[#0B1825] py-24 md:py-28 px-[5%]">
      <div className="max-w-[1160px] mx-auto grid grid-cols-1 md:grid-cols-[300px_1fr] gap-12 md:gap-16 items-start">
        <div className="pl-reveal">
          <span className="font-mono text-[10px] text-[#CF8610] tracking-[0.2em] uppercase">
            The problem
          </span>
          <h2 className="font-serif font-bold text-[#0B1825] leading-[1.07] tracking-[-0.02em] mt-3 text-[clamp(30px,4.2vw,46px)]">
            The old way
            <br />
            <em className="italic text-[#0B1825]">costs hours</em>
            <br />
            you don&apos;t have.
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#DDD7CB] rounded-2xl overflow-hidden border border-[#DDD7CB]">
          {PAINS.map((p) => (
            <div key={p.n} className="pl-reveal bg-[#F6F2EB] p-6 md:p-7">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[10px] text-[#0B1825]/40 tracking-[0.2em]">{p.n}</span>
                <div className="text-[#CF8610]">{p.icon}</div>
              </div>
              <h3 className="font-serif font-semibold text-[20px] text-[#0B1825] mb-2 leading-tight">
                {p.title}
              </h3>
              <p className="font-sans text-[14px] text-[#0B1825]/65 leading-[1.65] m-0">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
