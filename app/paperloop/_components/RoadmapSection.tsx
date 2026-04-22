'use client';

import { BookOpen, Layers, Star, Wand2 } from 'lucide-react';
import { useReveal } from './useReveal';

const ITEMS = [
  {
    tag: 'Coming soon',
    tagClass: 'bg-[#CF8610]/15 text-[#CF8610]',
    icon: <Layers size={20} />,
    title: 'AI Grading Scanner',
    body: 'Scan a stack of answered papers and get instant marks, feedback tags, and a class-wide score report in seconds.',
  },
  {
    tag: 'Coming soon',
    tagClass: 'bg-[#CF8610]/15 text-[#CF8610]',
    icon: <Wand2 size={20} />,
    title: 'Vector Formula Generation',
    body: 'Sketch a chemistry diagram or physics circuit and get a perfectly scaled, editable vector — no more raster crops.',
  },
  {
    tag: 'V2',
    tagClass: 'bg-white/[0.06] text-[#EDE8DB]/70',
    icon: <BookOpen size={20} />,
    title: 'Multiple Paper Templates',
    body: "Classic serif, modern sans, bilingual, and institution-branded layouts. Your school's look, built in.",
  },
  {
    tag: 'V2 · Pro',
    tagClass: 'bg-[#0B7A70]/15 text-[#0B7A70]',
    icon: <Star size={20} />,
    title: 'Pro Account',
    body: 'Unlimited scans, team workspaces, school-branded PDFs, and priority Gemini queue for exam season.',
  },
];

export default function RoadmapSection() {
  useReveal();
  return (
    <section id="roadmap" className="py-24 md:py-28 px-[5%]">
      <div className="max-w-[1160px] mx-auto">
        <div className="pl-reveal mb-12">
          <span className="font-mono text-[10px] text-[#F0A535] tracking-[0.2em] uppercase">
            What&apos;s next
          </span>
          <h2 className="font-serif font-bold text-[#EDE8DB] leading-[1.07] tracking-[-0.02em] mt-3 text-[clamp(30px,4.2vw,46px)]">
            The roadmap is <em className="italic text-[#F0A535]">ambitious.</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ITEMS.map((it) => (
            <div
              key={it.title}
              className="pl-reveal bg-white/[0.02] border border-white/[0.07] rounded-2xl p-6"
            >
              <span
                className={`inline-flex items-center font-mono text-[10px] tracking-[0.12em] uppercase font-semibold ${it.tagClass} rounded-full px-2.5 py-1 mb-4`}
              >
                {it.tag}
              </span>
              <div className="text-[#F0A535] mb-3">{it.icon}</div>
              <h3 className="font-serif font-semibold text-[18px] text-[#EDE8DB] mb-2 leading-tight">
                {it.title}
              </h3>
              <p className="font-sans text-[13px] text-[#EDE8DB]/55 leading-[1.65] m-0">{it.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
