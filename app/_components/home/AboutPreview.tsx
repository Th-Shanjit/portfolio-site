'use client';

import Link from 'next/link';
import { Reveal, SectionHeading } from '@/lib/design';
import Button from '@/components/ui/Button';
import {
  ABOUT_PREVIEW_COPY,
  ABOUT_TIMELINE,
  ABOUT_HOW_I_WORK,
  ABOUT_CURRENT_FOCUS,
} from '@/lib/home-content';
import HomeAvatar from '../HomeAvatar';
import { scrollToSection } from '@/lib/scroll-to-section';

type Props = {
  name: string;
  dpUrl: string;
  resumeUrl: string;
};

export default function AboutPreview({ name, dpUrl, resumeUrl }: Props) {
  const goToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollToSection('contact');
  };

  return (
    <section
      id="about"
      className="max-w-[1080px] mx-auto px-[clamp(20px,5vw,64px)] pb-20 md:pb-24 scroll-mt-28"
    >
      <Reveal>
        <SectionHeading number="04" title="About" />
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-14 items-start">
        <Reveal delay={40}>
          <div>
            <h3 className="font-[family-name:var(--font-heading)] text-[clamp(20px,2.5vw,26px)] font-medium text-[#161616] tracking-[-0.02em] leading-snug m-0 mb-5">
              How I got here.
            </h3>
            <p className="font-sans text-[15px] md:text-[16px] text-[#6F6A61] leading-[1.7] m-0 max-w-[520px]">
              {ABOUT_PREVIEW_COPY}
            </p>

            <h3 className="font-[family-name:var(--font-heading)] text-[18px] font-medium text-[#161616] tracking-[-0.02em] leading-snug m-0 mt-8 mb-3">
              How I work.
            </h3>
            <p className="font-sans text-[15px] md:text-[16px] text-[#6F6A61] leading-[1.7] m-0 max-w-[520px]">
              {ABOUT_HOW_I_WORK}
            </p>

            <h3 className="font-[family-name:var(--font-heading)] text-[18px] font-medium text-[#161616] tracking-[-0.02em] leading-snug m-0 mt-8 mb-3">
              Current focus.
            </h3>
            <p className="font-sans text-[15px] md:text-[16px] text-[#6F6A61] leading-[1.7] m-0 max-w-[520px]">
              {ABOUT_CURRENT_FOCUS}
            </p>

            <figure className="mt-8 flex items-center gap-4 m-0">
              <div className="relative w-[72px] h-[72px] rounded-xl overflow-hidden border border-[rgba(22,22,22,0.10)] bg-white shrink-0">
                <HomeAvatar src={dpUrl} alt={name} />
              </div>
              <figcaption className="font-sans text-[14px] text-[#6F6A61] leading-snug">
                <span className="block font-medium text-[#161616]">{name}</span>
                Product · Agentic AI
              </figcaption>
            </figure>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={resumeUrl} external variant="primary" size="sm">
                Resume
              </Button>
              <Link
                href="/#contact"
                onClick={goToContact}
                className="inline-flex items-center justify-center gap-2 font-sans font-medium text-[14px] px-5 py-2.5 rounded-lg border border-[rgba(22,22,22,0.10)] text-[#161616] hover:border-[rgba(22,22,22,0.22)] hover:bg-[rgba(22,22,22,0.03)] no-underline transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6B35]"
              >
                Get in touch
              </Link>
            </div>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="rounded-xl border border-[rgba(22,22,22,0.10)] bg-white/70 p-6 md:p-8">
            <ol className="list-none m-0 p-0 flex flex-col gap-0">
              {ABOUT_TIMELINE.map((step, i) => (
                <li
                  key={step.label}
                  className={`flex gap-4 py-4 ${
                    i < ABOUT_TIMELINE.length - 1
                      ? 'border-b border-[rgba(22,22,22,0.06)]'
                      : ''
                  }`}
                >
                  <span
                    className="font-mono text-[11px] text-[#9A9489] tabular-nums pt-0.5 shrink-0 w-5"
                    aria-hidden
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <p className="font-[family-name:var(--font-heading)] text-[15px] md:text-[16px] font-medium text-[#161616] leading-snug m-0">
                      {step.label}
                    </p>
                    <p className="mt-1 font-sans text-[14px] text-[#6F6A61] leading-[1.55] m-0">
                      {step.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
