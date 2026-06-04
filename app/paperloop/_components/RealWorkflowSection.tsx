'use client';

import { ClipboardCheck, FlaskConical, Sparkles, Users } from 'lucide-react';
import { useReveal } from './useReveal';

const PROOF_ITEMS = [
  {
    icon: <Users size={20} />,
    title: '5 teachers/tutors gave input',
    body: 'Input came from chemistry, high school, tuition, and test-prep contexts.',
  },
  {
    icon: <ClipboardCheck size={20} />,
    title: '~15 handwritten papers tested',
    body: 'Testing included real handwritten question papers across plain text, chemistry-heavy, and mixed-format drafts.',
  },
  {
    icon: <FlaskConical size={20} />,
    title: 'Chemistry exposed the hard cases',
    body: 'Equations, non-linear expressions, symbols, diagrams, section headers, and marks formatting showed where generic OCR workflows struggled.',
  },
  {
    icon: <Sparkles size={20} />,
    title: 'Review mattered more than magic',
    body: 'Early testing showed that teachers needed editability, predictable formatting, and control before export.',
  },
];

export default function RealWorkflowSection() {
  useReveal();
  return (
    <section id="proof" className="bg-[#F6F2EB] text-[#0B1825] py-20 md:py-24 px-[5%]">
      <div className="max-w-[1160px] mx-auto">
        <div className="pl-reveal max-w-[720px] mb-10">
          <span className="font-mono text-[10px] text-[#CF8610] tracking-[0.2em] uppercase">
            Early MVP learning
          </span>
          <h2 className="font-serif font-bold text-[#0B1825] leading-[1.07] tracking-[-0.02em] mt-3 text-[clamp(28px,4vw,42px)]">
            Built from real teacher workflows
          </h2>
          <p className="font-sans text-[14px] text-[#0B1825]/65 leading-[1.7] mt-4 m-0">
            PaperLoop&apos;s early MVP direction was shaped through input from 5 teachers/tutors and
            testing against roughly 15 real handwritten papers, especially chemistry-heavy and
            mixed-format exam drafts. This reflects early product learning — not market-wide
            validation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PROOF_ITEMS.map((item) => (
            <div
              key={item.title}
              className="pl-reveal bg-white border border-[#DDD7CB] rounded-2xl p-6 md:p-7"
            >
              <div className="text-[#CF8610] mb-4">{item.icon}</div>
              <h3 className="font-serif font-semibold text-[17px] text-[#0B1825] mb-2 leading-tight">
                {item.title}
              </h3>
              <p className="font-sans text-[14px] text-[#0B1825]/65 leading-[1.65] m-0">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
