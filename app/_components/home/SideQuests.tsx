'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Reveal, SectionHeading, cardLinkClass, cardArrowClass } from '@/lib/design';
import Tag from '@/components/ui/Tag';
import {
  getRealSideQuests,
  getSectionNumber,
  isValidProjectLink,
  type ProjectItem,
} from '@/data/portfolio-static';

function SideQuestCard({ quest }: { quest: ProjectItem }) {
  const hasLink = isValidProjectLink(quest.link);
  const isExternal = hasLink && quest.link.startsWith('http');

  const inner = (
    <>
      <div className="flex items-start justify-between gap-3 mb-4">
        <h3
          className={`font-[family-name:var(--font-heading)] text-[19px] md:text-[20px] font-medium text-[#161616] leading-tight m-0 ${
            hasLink ? 'group-hover:text-[#FF6B35] transition-colors' : ''
          }`}
        >
          {quest.title}
        </h3>
        {hasLink && <ArrowUpRight size={16} className={cardArrowClass} />}
      </div>
      <p className="font-sans text-[14px] md:text-[15px] text-[#6F6A61] leading-[1.65] m-0 flex-grow">
        {quest.description}
      </p>
      <div className="flex flex-wrap gap-1.5 mt-5">
        <Tag tone="neutral" size="sm">
          {quest.tag}
        </Tag>
      </div>
    </>
  );

  if (!hasLink) {
    return <div className={`${cardLinkClass} text-left w-full cursor-default`}>{inner}</div>;
  }

  if (isExternal) {
    return (
      <a
        href={quest.link}
        target="_blank"
        rel="noopener noreferrer"
        className={`${cardLinkClass} text-left w-full`}
      >
        {inner}
      </a>
    );
  }

  return (
    <Link href={quest.link} className={`${cardLinkClass} text-left w-full`}>
      {inner}
    </Link>
  );
}

export default function SideQuests() {
  const quests = getRealSideQuests();

  if (quests.length === 0) {
    return null;
  }

  return (
    <section
      id="experiments"
      className="max-w-[1080px] mx-auto px-[clamp(20px,5vw,64px)] pb-16 md:pb-20 scroll-mt-28"
    >
      <Reveal>
        <SectionHeading
          number={getSectionNumber('sideQuests')}
          title="Side Quests"
          subtitle="Personal builds and experiments beyond product work."
        />
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {quests.map((quest, i) => (
          <Reveal key={quest.id} delay={i * 60}>
            <SideQuestCard quest={quest} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
