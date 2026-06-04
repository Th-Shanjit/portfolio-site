'use client';

import { BookOpen, Layers, ShieldCheck, Wand2 } from 'lucide-react';
import { useReveal } from './useReveal';
import FeatureCard from './FeatureCard';

const ACCURACY_TAGS = [
  'H₂SO₄',
  'MCQ (a)(b)(c)(d)',
  '§ Section A',
  'Two-column',
  '∫f(x)dx',
  'Marks [5]',
  'Diagrams',
  'Comprehension',
];

export default function FeaturesSection() {
  useReveal();
  return (
    <section id="features" className="bg-[#F6F2EB] text-[#0B1825] py-24 md:py-28 px-[5%]">
      <div className="max-w-[1160px] mx-auto">
        <div className="pl-reveal max-w-[680px] mb-12">
          <span className="font-mono text-[10px] text-[#CF8610] tracking-[0.2em] uppercase">
            What it does
          </span>
          <h2 className="font-serif font-bold text-[#0B1825] leading-[1.07] tracking-[-0.02em] mt-3 text-[clamp(30px,4.2vw,46px)]">
            Built for the way <em className="italic">teachers actually work.</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FeatureCard
            icon={<BookOpen size={20} />}
            iconBg="bg-[#CF8610]/12 text-[#CF8610]"
            title="Built for exam formats"
            body="Chemistry subscripts, MCQ grids, section headers, and marks formatting — tested against real teacher-written papers and tuned around exam-paper formats."
            tag="Education-native"
          />
          <FeatureCard
            icon={<ShieldCheck size={20} />}
            iconBg="bg-[#0B7A70]/12 text-[#0B7A70]"
            title="Review-first privacy"
            body="Drafts are kept local-first where possible, while AI extraction requires Gemini Vision processing. PaperLoop is designed to avoid storing scans on our own servers unless the user explicitly saves or shares them."
            tag="Teacher in control"
          />
          <FeatureCard
            icon={<Layers size={20} />}
            iconBg="bg-[#CF8610]/12 text-[#CF8610]"
            title="Multi-column, multi-page"
            body="Stitch multiple pages into one exam. Add your school logo. Export as A4 or Letter when you are satisfied with the content."
            tag="Layout engine"
          />
          <FeatureCard
            icon={<Wand2 size={20} />}
            iconBg="bg-[#0B7A70]/12 text-[#0B7A70]"
            title="Edit before export"
            body="AI extracts the structure, while teachers review and edit before export. Tap any question to tweak text, numbering, or marks inline."
            tag="Human-in-the-loop"
          />

          <div className="col-span-full bg-[#0B1825] text-[#EDE8DB] rounded-2xl p-8 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center border border-transparent">
            <div>
              <span className="font-mono text-[10px] text-[#F0A535] tracking-[0.2em] uppercase">
                Extraction approach
              </span>
              <h3 className="font-serif font-bold text-[26px] md:text-[30px] leading-tight mt-3 mb-3">
                Gemini Vision workflow. Not <em className="italic">blind OCR.</em>
              </h3>
              <p className="font-sans text-[14px] text-[#EDE8DB]/60 leading-[1.7] max-w-[440px]">
                PaperLoop helps extract questions, sections, and formatting so teachers can review,
                correct, and export faster. AI handles the first draft of the structure; the teacher
                stays in control before the PDF is generated.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {ACCURACY_TAGS.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[12px] text-[#EDE8DB] bg-white/[0.06] border border-white/[0.08] rounded-full px-3 py-1.5"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
