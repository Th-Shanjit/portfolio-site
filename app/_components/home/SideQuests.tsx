'use client';

import { useRef, useState, type ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Reveal, SectionHeading, cardLinkClass, cardArrowClass, Label } from '@/lib/design';
import Tag from '@/components/ui/Tag';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import { SIDE_QUESTS, type SideQuest } from '@/lib/home-content';

function SnapshotField({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <Label className="block mb-1.5">{label}</Label>
      <p className="font-sans text-[14px] md:text-[15px] text-[#6F6A61] leading-[1.65] m-0">
        {children}
      </p>
    </div>
  );
}

export default function SideQuests() {
  const [activeQuest, setActiveQuest] = useState<SideQuest | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const openQuest = (quest: SideQuest, el: HTMLButtonElement) => {
    triggerRef.current = el;
    setActiveQuest(quest);
  };

  const closeQuest = () => setActiveQuest(null);

  return (
    <section
      id="experiments"
      className="max-w-[1080px] mx-auto px-[clamp(20px,5vw,64px)] pb-16 md:pb-20 scroll-mt-28"
    >
      <Reveal>
        <SectionHeading
          number="02"
          title="Side Quests"
          subtitle="Small tools and experiments exploring AI workflows, time, job search, and product thinking."
        />
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {SIDE_QUESTS.map((quest, i) => (
          <Reveal key={quest.title} delay={i * 60}>
            <button
              type="button"
              onClick={(e) => openQuest(quest, e.currentTarget)}
              className={`${cardLinkClass} text-left w-full cursor-pointer`}
            >
              <div className="flex items-start justify-between gap-3 mb-4">
                <h3 className="font-[family-name:var(--font-heading)] text-[19px] md:text-[20px] font-medium text-[#161616] leading-tight m-0 group-hover:text-[#FF6B35] transition-colors">
                  {quest.title}
                </h3>
                <ArrowUpRight size={16} className={cardArrowClass} />
              </div>
              <p className="font-sans text-[14px] md:text-[15px] text-[#6F6A61] leading-[1.65] m-0 flex-grow">
                {quest.description}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-5">
                {quest.tags.map((tag) => (
                  <Tag key={tag} tone="neutral" size="sm">
                    {tag}
                  </Tag>
                ))}
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      <Modal
        open={!!activeQuest}
        onClose={closeQuest}
        title={activeQuest?.title ?? ''}
        returnFocusRef={triggerRef}
      >
        {activeQuest && (
          <div className="flex flex-col gap-5">
            <div className="flex flex-wrap gap-1.5">
              {activeQuest.tags.map((tag) => (
                <Tag key={tag} tone="neutral" size="sm">
                  {tag}
                </Tag>
              ))}
              <Tag tone="accent" size="sm">
                {activeQuest.status}
              </Tag>
            </div>

            <SnapshotField label="What it is">{activeQuest.whatItIs}</SnapshotField>
            <SnapshotField label="Why I built it">{activeQuest.whyBuilt}</SnapshotField>
            <SnapshotField label="What I learned">{activeQuest.learned}</SnapshotField>

            {activeQuest.href && (
              <div className="pt-2">
                {activeQuest.external ? (
                  <Button href={activeQuest.href} external variant="primary" size="sm">
                    Open link
                  </Button>
                ) : (
                  <Button href={activeQuest.href} variant="primary" size="sm">
                    Browse notes archive
                  </Button>
                )}
              </div>
            )}
          </div>
        )}
      </Modal>
    </section>
  );
}
