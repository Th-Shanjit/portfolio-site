'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import ResumeButton from '../ResumeButton';
import { HERO_CONTENT, hasResume } from '@/data/portfolio-static';
import { easeOut, useReducedMotion } from '@/lib/motion';
import { scrollToSection } from '@/lib/scroll-to-section';

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

export default function HeroSection() {
  const reduced = useReducedMotion();

  const Wrapper = reduced ? 'div' : motion.div;
  const Item = reduced ? 'div' : motion.div;

  const wrapperProps = reduced
    ? {}
    : { variants: container, initial: 'hidden' as const, animate: 'show' as const };

  const itemProps = reduced ? {} : { variants: item };

  const goToWork = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollToSection('work');
  };

  const goToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollToSection('contact');
  };

  return (
    <section className="max-w-[1080px] mx-auto px-[clamp(20px,5vw,64px)] pt-[100px] pb-12 md:pt-[128px] md:pb-16">
      <Wrapper {...wrapperProps}>
        <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-12">
          <Item {...itemProps} className="shrink-0">
            <div className="relative w-[88px] h-[88px] md:w-[104px] md:h-[104px] rounded-2xl overflow-hidden border border-[rgba(22,22,22,0.10)] bg-white">
              <Image
                src={HERO_CONTENT.avatarUrl}
                alt={HERO_CONTENT.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </Item>

          <div className="max-w-[720px]">
            <Item {...itemProps}>
              <h1 className="font-[family-name:var(--font-heading)] font-medium text-[#161616] tracking-[-0.03em] leading-[1.02] m-0 text-[clamp(40px,7vw,76px)]">
                {HERO_CONTENT.title}
              </h1>
            </Item>

            <Item {...itemProps}>
              <p className="mt-5 font-[family-name:var(--font-heading)] text-[clamp(20px,2.8vw,28px)] font-medium text-[#161616] tracking-[-0.02em] leading-[1.3] m-0">
                {HERO_CONTENT.subtitle}
              </p>
            </Item>

            <Item {...itemProps}>
              <p className="mt-4 font-sans text-[16px] md:text-[17px] text-[#6F6A61] leading-[1.7] m-0">
                {HERO_CONTENT.description}
              </p>
            </Item>

            <Item {...itemProps} className="mt-9 flex flex-wrap gap-3">
              <Button href="/#work" variant="accent" size="md" onClick={goToWork}>
                {HERO_CONTENT.primaryCtaText}
              </Button>
              <Button href="/#contact" variant="primary" size="md" onClick={goToContact}>
                {HERO_CONTENT.secondaryCtaText}
              </Button>
              {hasResume() && (
                <ResumeButton href={HERO_CONTENT.resumeUrl} label="Resume" source="home_hero" />
              )}
            </Item>
          </div>
        </div>
      </Wrapper>
    </section>
  );
}
