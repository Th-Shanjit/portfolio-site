'use client';

import { motion } from 'framer-motion';
import { FiLinkedin } from 'react-icons/fi';
import Button from '@/components/ui/Button';
import ResumeButton from '../ResumeButton';
import { easeOut, useReducedMotion } from '@/lib/motion';

type Props = {
  name: string;
  role: string;
  headline: string;
  subhead: string;
  availability: string;
  location: string;
  linkedinUrl: string;
  resumeUrl: string;
};

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } },
};

export default function HeroSection({
  name,
  role,
  headline,
  subhead,
  availability,
  location,
  linkedinUrl,
  resumeUrl,
}: Props) {
  const reduced = useReducedMotion();

  const Wrapper = reduced ? 'div' : motion.div;
  const Item = reduced ? 'div' : motion.div;

  const wrapperProps = reduced
    ? {}
    : { variants: container, initial: 'hidden' as const, animate: 'show' as const };

  const itemProps = reduced ? {} : { variants: item };

  return (
    <section className="max-w-[1080px] mx-auto px-[clamp(20px,5vw,64px)] pt-[100px] pb-12 md:pt-[128px] md:pb-16">
      <Wrapper {...wrapperProps}>
        <Item
          {...itemProps}
          className="inline-flex items-center gap-2 mb-8 md:mb-10 px-3.5 py-2 rounded-full border border-[rgba(22,22,22,0.10)] bg-white/60 backdrop-blur-sm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] shrink-0" aria-hidden />
          <span className="font-sans text-[13px] text-[#6F6A61]">
            {availability} · {location} · Remote-friendly
          </span>
        </Item>

        <div className="max-w-[720px]">
          <Item {...itemProps}>
            <h1 className="font-[family-name:var(--font-heading)] font-medium text-[#161616] tracking-[-0.03em] leading-[1.02] m-0 text-[clamp(40px,7vw,76px)]">
              {name}
            </h1>
          </Item>

          <Item {...itemProps}>
            <p className="mt-5 font-[family-name:var(--font-heading)] text-[clamp(20px,2.8vw,28px)] font-medium text-[#161616] tracking-[-0.02em] leading-[1.3] m-0">
              {role}
            </p>
          </Item>

          <Item {...itemProps}>
            <p className="mt-4 font-[family-name:var(--font-heading)] text-[clamp(18px,2.4vw,24px)] text-[#161616] tracking-[-0.01em] leading-[1.35] m-0">
              {headline}
            </p>
          </Item>

          <Item {...itemProps}>
            <p className="mt-4 font-sans text-[16px] md:text-[17px] text-[#6F6A61] leading-[1.7] m-0">
              {subhead}
            </p>
          </Item>

          <Item {...itemProps} className="mt-9 flex flex-wrap gap-3">
            <Button href="/paperloop" variant="accent" size="md">
              View PaperLoop
            </Button>
            <Button href="/docs/paperloop-problem-space" variant="primary" size="md">
              Read case notes
            </Button>
            <ResumeButton href={resumeUrl} label="Resume" source="home_hero" />
            <Button
              href={linkedinUrl}
              external
              variant="ghost"
              size="md"
              icon={<FiLinkedin size={15} />}
              trailingIcon={false}
            >
              LinkedIn
            </Button>
          </Item>
        </div>
      </Wrapper>
    </section>
  );
}
