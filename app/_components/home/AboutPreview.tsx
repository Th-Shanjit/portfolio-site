'use client';

import Link from 'next/link';
import { Reveal, SectionHeading } from '@/lib/design';
import { HERO_CONTENT, OVERVIEW_TEXT } from '@/data/portfolio-static';
import HomeAvatar from '../HomeAvatar';
import ResumeButton from '../ResumeButton';
import { scrollToSection } from '@/lib/scroll-to-section';

export default function AboutPreview() {
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

      <Reveal delay={40}>
        <div className="max-w-[640px]">
          <p className="font-sans text-[15px] md:text-[16px] text-[#6F6A61] leading-[1.7] m-0">
            {OVERVIEW_TEXT.bio}
          </p>

          <figure className="mt-8 flex items-center gap-4 m-0">
            <div className="relative w-[72px] h-[72px] rounded-xl overflow-hidden border border-[rgba(22,22,22,0.10)] bg-white shrink-0">
              <HomeAvatar src={HERO_CONTENT.avatarUrl} alt={HERO_CONTENT.title} />
            </div>
            <figcaption className="font-sans text-[14px] text-[#6F6A61] leading-snug">
              <span className="block font-medium text-[#161616]">{HERO_CONTENT.title}</span>
              {HERO_CONTENT.subtitle}
            </figcaption>
          </figure>

          <div className="mt-8 flex flex-wrap gap-3">
            <ResumeButton href={HERO_CONTENT.resumeUrl} label="Resume" source="home_about" />
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
    </section>
  );
}
