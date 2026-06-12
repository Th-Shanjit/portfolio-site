'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Reveal, SectionHeading, cardLinkClass, cardArrowClass } from '@/lib/design';
import Tag from '@/components/ui/Tag';
import { HIGHLIGHTS, type ProjectItem } from '@/data/portfolio-static';

function NoteCard({ item }: { item: ProjectItem }) {
  const isExternal = item.link.startsWith('http');
  const style = {
    borderColor: item.borderColor,
    backgroundColor: item.backgroundColor,
  };

  const inner = (
    <>
      <Tag tone="accent" size="sm">
        {item.tag}
      </Tag>
      <h3 className="mt-3 font-[family-name:var(--font-heading)] font-medium text-[18px] md:text-[19px] text-[#161616] leading-snug m-0 group-hover:text-[#FF6B35] transition-colors">
        {item.title}
      </h3>
      <p className="mt-2.5 font-sans text-[14px] md:text-[15px] text-[#6F6A61] leading-[1.65] m-0 line-clamp-3">
        {item.description}
      </p>
      <div className="mt-auto pt-5 flex items-center gap-1.5 font-sans text-[14px] text-[#9A9489] group-hover:text-[#FF6B35] transition-colors">
        <span>View project</span>
        <ArrowUpRight size={15} className={cardArrowClass} />
      </div>
    </>
  );

  const cls = `${cardLinkClass} border-2`;

  if (isExternal) {
    return (
      <a
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        className={cls}
        style={style}
      >
        {inner}
      </a>
    );
  }

  return (
    <Link href={item.link} className={cls} style={style}>
      {inner}
    </Link>
  );
}

export default function ProductNotes() {
  return (
    <section
      id="notes"
      className="max-w-[1080px] mx-auto px-[clamp(20px,5vw,64px)] pb-16 md:pb-20 scroll-mt-28"
    >
      <Reveal>
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-10 md:mb-12">
          <SectionHeading
            number="03"
            title="Product Notes"
            subtitle="Selected builds and product explorations."
            className="mb-0"
          />
          <Link
            href="/docs"
            className="group inline-flex items-center gap-1.5 font-sans text-[14px] font-medium text-[#6F6A61] hover:text-[#FF6B35] transition-colors shrink-0 no-underline sm:mt-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6B35]"
          >
            Browse all notes
            <ArrowUpRight size={15} className={cardArrowClass} />
          </Link>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {HIGHLIGHTS.productNotes.map((item, i) => (
          <Reveal key={item.id} delay={40 + i * 60}>
            <NoteCard item={item} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
