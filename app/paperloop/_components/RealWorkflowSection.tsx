'use client';

import { ClipboardCheck, FlaskConical, Users } from 'lucide-react';
import { useReveal } from './useReveal';

const PROOF_ITEMS = [
  {
    icon: <Users size={20} />,
    title: '5 teachers & tutors',
    body: 'Input across chemistry, high school, tuition, and test-prep contexts.',
  },
  {
    icon: <ClipboardCheck size={20} />,
    title: '~15 real papers',
    body: 'Tested on handwritten question papers — not synthetic samples.',
  },
  {
    icon: <FlaskConical size={20} />,
    title: 'Hard exam formats',
    body: 'Chemistry equations, non-linear expressions, MCQs, fill-in-the-blanks, reasoning, comprehension, descriptive sections, and diagrams.',
  },
];

const INSIGHT =
  'Early testing showed that accuracy, editability, and predictable formatting mattered more than a fully automated “magic” flow.';

export default function RealWorkflowSection() {
  useReveal();
  return (
    <section id="proof" className="bg-[#F6F2EB] text-[#0B1825] py-20 md:py-24 px-[5%]">
      <div className="max-w-[1160px] mx-auto">
        <div className="pl-reveal max-w-[640px] mb-10">
          <span className="font-mono text-[10px] text-[#CF8610] tracking-[0.2em] uppercase">
            Built with educators
          </span>
          <h2 className="font-serif font-bold text-[#0B1825] leading-[1.07] tracking-[-0.02em] mt-3 text-[clamp(28px,4vw,42px)]">
            Built from real teacher workflows
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {PROOF_ITEMS.map((item) => (
            <div
              key={item.title}
              className="pl-reveal bg-white border border-[#DDD7CB] rounded-2xl p-6 md:p-7"
            >
              <div className="text-[#CF8610] mb-4">{item.icon}</div>
              <h3 className="font-serif font-semibold text-[18px] text-[#0B1825] mb-2 leading-tight">
                {item.title}
              </h3>
              <p className="font-sans text-[14px] text-[#0B1825]/65 leading-[1.65] m-0">{item.body}</p>
            </div>
          ))}
        </div>

        <p className="pl-reveal font-sans text-[14px] text-[#0B1825]/70 leading-[1.7] max-w-[720px] m-0 border-l-2 border-[#CF8610]/40 pl-5">
          {INSIGHT}
        </p>
      </div>
    </section>
  );
}
