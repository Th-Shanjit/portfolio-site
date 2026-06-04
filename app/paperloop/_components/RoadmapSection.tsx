'use client';

import { BookOpen, Layers, Star, Wand2 } from 'lucide-react';
import { useReveal } from './useReveal';

const ITEMS = [
  {
    tag: 'Exploring',
    tagClass: 'bg-[#CF8610]/15 text-[#CF8610]',
    icon: <Layers size={20} aria-hidden />,
    title: 'Answered-paper review',
    body: 'Explore scanning answered papers to draft marks, feedback tags, and class-level summaries for teacher review.',
  },
  {
    tag: 'Exploring',
    tagClass: 'bg-[#CF8610]/15 text-[#CF8610]',
    icon: <Wand2 size={20} aria-hidden />,
    title: 'Cleaner visual drafts',
    body: 'Explore converting chemistry diagrams or physics circuits into cleaner editable visual drafts.',
  },
  {
    tag: 'Exploring',
    tagClass: 'bg-white/[0.06] text-[#EDE8DB]/70',
    icon: <BookOpen size={20} aria-hidden />,
    title: 'More paper templates',
    body: 'Explore additional layout templates and institution-branded PDF themes.',
  },
  {
    tag: 'Exploring',
    tagClass: 'bg-[#0B7A70]/15 text-[#0B7A70]',
    icon: <Star size={20} aria-hidden />,
    title: 'Bilingual papers',
    body: 'Explore support for bilingual question papers and mixed-language formatting.',
  },
];

export default function RoadmapSection() {
  useReveal();
  return (
    <section id="roadmap" className="py-14 sm:py-20 md:py-24 lg:py-28">
      <div className="max-w-[1180px] mx-auto w-full px-[clamp(16px,5vw,48px)]">
        <div className="pl-reveal mb-8 md:mb-12 max-w-[42rem]">
          <span className="font-mono text-[11px] sm:text-[12px] text-[#F0A535] tracking-[0.18em] uppercase">
            Roadmap
          </span>
          <h2 className="font-serif font-bold text-[#EDE8DB] leading-[1.08] tracking-[-0.02em] mt-3 text-[clamp(1.75rem,4vw,2.75rem)]">
            What&apos;s next after the MVP
          </h2>
          <p className="font-sans text-[16px] text-[#EDE8DB]/50 leading-[1.7] mt-4 mb-0">
            Ideas under exploration — not committed roadmap promises.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {ITEMS.map((it) => (
            <div
              key={it.title}
              className="pl-reveal bg-white/[0.02] border border-white/[0.07] rounded-2xl p-5 sm:p-6"
            >
              <span
                className={`inline-flex items-center font-mono text-[11px] tracking-[0.1em] uppercase font-semibold ${it.tagClass} rounded-full px-2.5 py-1 mb-4`}
              >
                {it.tag}
              </span>
              <div className="text-[#F0A535] mb-3">{it.icon}</div>
              <h3 className="font-serif font-semibold text-[17px] sm:text-[18px] text-[#EDE8DB] mb-2 leading-tight">
                {it.title}
              </h3>
              <p className="font-sans text-[14px] sm:text-[15px] text-[#EDE8DB]/55 leading-[1.65] m-0">
                {it.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
