import type { Metadata } from 'next';
import { MapPin, Briefcase, Sparkles } from 'lucide-react';
import { Reveal, Label } from '@/lib/design';
import { getPortfolio } from '@/lib/getPortfolio';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'About — Shanjit Thokchom',
  description:
    'Product manager focused on agentic AI. Law, narrative, product — the three threads behind how I build.',
};

type AboutData = {
  heading?: string;
  subheading?: string;
  originTitle?: string;
  originText?: string;
  location?: string;
  educationTitle?: string;
  educationSubtitle?: string;
  focusTitle?: string;
  focusText?: string;
  bio?: string[];
  tools?: string[];
  experience?: { role: string; company: string; year: string }[];
};

export default async function About() {
  const data = await getPortfolio();
  const about: AboutData = (data.about as AboutData) || {};
  const experience = about.experience || [];
  const bio = about.bio || [];
  const tools = about.tools || [];

  return (
    <main className="bg-[#f8f4ef] min-h-screen text-[#1c1916] max-w-[1040px] mx-auto px-[clamp(20px,5vw,64px)] pt-[120px] pb-[160px] overflow-hidden">

      <div className="mb-24">
        <Reveal>
          <Label>About</Label>
        </Reveal>
        <Reveal delay={40}>
          <h1 className="font-serif font-normal text-[#1c1916] tracking-[-0.02em] leading-[0.98] mt-5 mb-10 text-[clamp(44px,8vw,80px)]">
            {about.heading || 'Law, narrative, product.'}
          </h1>
        </Reveal>

        <div className="grid gap-10 md:gap-16 items-start grid-cols-[repeat(auto-fit,minmax(280px,1fr))]">
          <Reveal delay={100}>
            <p className="font-sans font-light text-[#1c1916] leading-[1.5] m-0 text-[clamp(18px,2.2vw,22px)]">
              {about.subheading ||
                'I build products at the seam between regulatory logic, clear storytelling, and machine reasoning.'}
            </p>
          </Reveal>
          <Reveal delay={160}>
            <div className="flex flex-col gap-5">
              {bio.map((paragraph, i) => (
                <p
                  key={i}
                  className="font-sans font-light text-[15px] md:text-[16px] text-[#7a7470] leading-[1.75] m-0"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mb-24">
        <div className="col-span-full">
          <Reveal delay={60}>
            <div className="bg-white border border-[#e6ded4] rounded-3xl p-8 md:p-14">
              <Label>01 · Origin</Label>
              <h2 className="font-serif font-normal text-[#1c1916] mt-5 mb-4 text-[clamp(26px,4vw,38px)]">
                {about.originTitle || 'The non-linear path'}
              </h2>
              <p className="font-sans font-light text-[15px] md:text-[16px] text-[#7a7470] leading-[1.75] max-w-[620px] m-0">
                {about.originText}
              </p>
            </div>
          </Reveal>
        </div>

        <div className="md:col-span-5">
          <Reveal delay={120}>
            <div className="bg-white border border-[#e6ded4] rounded-3xl p-8 md:p-10 h-full min-h-[260px] flex flex-col justify-between">
              <Label>02 · Base</Label>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <MapPin size={22} className="text-[#1c1916]" />
                  <h3 className="font-serif font-normal text-[22px] text-[#1c1916] m-0">
                    {about.location || 'Shillong, India'}
                  </h3>
                </div>
                <p className="font-mono text-[10px] text-[#b8b2aa] tracking-[0.15em] uppercase m-0">
                  Remote-friendly · Worldwide
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="md:col-span-7">
          <Reveal delay={180}>
            <div className="bg-[#1c1916] text-[#f8f4ef] rounded-3xl p-8 md:p-12 h-full min-h-[260px] flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                    <Sparkles size={18} className="text-[#f8f4ef]" />
                  </div>
                </div>
                <span className="font-mono text-[9px] text-white/40 tracking-[0.22em] uppercase">
                  03 · Focus
                </span>
              </div>
              <div>
                <h2 className="font-serif font-normal mb-3 text-[clamp(22px,3vw,30px)]">
                  {about.focusTitle || 'Agentic AI & Systems'}
                </h2>
                <p className="font-sans font-light text-[15px] text-white/70 leading-[1.75] max-w-[480px] m-0">
                  {about.focusText}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {tools.length > 0 && (
        <div className="mb-24 border-t border-[#e6ded4] pt-16">
          <Reveal>
            <div className="grid gap-12 grid-cols-[repeat(auto-fit,minmax(260px,1fr))]">
              <div>
                <Label>Tools I actually use</Label>
                <p className="font-sans font-light text-[14px] text-[#7a7470] leading-[1.7] mt-4 max-w-[280px]">
                  Not a &ldquo;skills&rdquo; dump — only things I reach for every week.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {tools.map((tool) => (
                  <span
                    key={tool}
                    className="font-mono text-[11px] text-[#1c1916] bg-[#f2ede5] border border-[#ede8e1] rounded-full px-3.5 py-1.5 tracking-[0.04em]"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      )}

      <div className="border-t border-[#e6ded4] pt-16">
        <Reveal>
          <div className="grid gap-10 grid-cols-[repeat(auto-fit,minmax(260px,1fr))]">
            <div>
              <Label>Experience</Label>
            </div>
            <div className="flex flex-col">
              {experience.map((exp, i) => {
                const isLast = i === experience.length - 1;
                return (
                  <div key={i} className={`flex gap-6 relative ${isLast ? '' : 'pb-9'}`}>
                    <div className="flex flex-col items-center">
                      <div className="w-11 h-11 rounded-full bg-white border border-[#e6ded4] flex items-center justify-center shrink-0 shadow-[0_4px_12px_rgba(28,25,22,0.04)] z-[2]">
                        <Briefcase size={16} className="text-[#1c1916]" />
                      </div>
                      {!isLast && (
                        <div className="w-px flex-grow mt-3 -mb-9 bg-gradient-to-b from-[#e6ded4] to-transparent" />
                      )}
                    </div>
                    <div className="pt-1.5 min-w-0">
                      <div className="flex items-baseline gap-3 mb-1.5 flex-wrap">
                        <h3 className="font-serif font-normal text-[22px] text-[#1c1916] leading-tight m-0">
                          {exp.role}
                        </h3>
                        <span className="font-mono text-[10px] text-[#b8b2aa] tracking-[0.1em]">
                          {exp.year}
                        </span>
                      </div>
                      <p className="font-sans text-[15px] text-[#7a7470] font-light m-0">
                        {exp.company}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>

    </main>
  );
}
