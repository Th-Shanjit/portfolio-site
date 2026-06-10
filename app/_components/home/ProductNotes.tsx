'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Reveal, SectionHeading, cardLinkClass, cardArrowClass, Label } from '@/lib/design';
import Tag from '@/components/ui/Tag';
import { PRODUCT_NOTES_FRAMING } from '@/lib/home-content';

export type NoteDoc = {
  id: string;
  title: string;
  type: string;
  tag?: string;
  description?: string;
  date?: string;
  readTime?: string;
  link?: string;
};

function NoteMeta({ doc }: { doc: NoteDoc }) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <Tag tone="accent" size="sm">
        {doc.tag || doc.type}
      </Tag>
      {doc.readTime && <Label>{doc.readTime}</Label>}
      {doc.date && <Label>· {doc.date}</Label>}
    </div>
  );
}

function NoteCard({
  doc,
  featured = false,
}: {
  doc: NoteDoc;
  featured?: boolean;
}) {
  const href = doc.link || `/docs/${doc.id}`;
  const external = !!doc.link;

  const cls = featured ? `${cardLinkClass} md:p-8` : cardLinkClass;

  const inner = (
    <>
      <NoteMeta doc={doc} />
      <h3
        className={`mt-3 font-[family-name:var(--font-heading)] font-medium text-[#161616] leading-snug m-0 group-hover:text-[#FF6B35] transition-colors ${
          featured ? 'text-[22px] md:text-[24px]' : 'text-[18px] md:text-[19px]'
        }`}
      >
        {doc.title}
      </h3>
      {doc.description && (
        <p
          className={`mt-2.5 font-sans text-[#6F6A61] leading-[1.65] m-0 ${
            featured ? 'text-[15px] md:text-[16px] line-clamp-3' : 'text-[14px] md:text-[15px] line-clamp-2'
          }`}
        >
          {doc.description}
        </p>
      )}
      <div className="mt-auto pt-5 flex items-center gap-1.5 font-sans text-[14px] text-[#9A9489] group-hover:text-[#FF6B35] transition-colors">
        <span>Read note</span>
        <ArrowUpRight size={15} className={cardArrowClass} />
      </div>
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

export default function ProductNotes({ docs }: { docs: NoteDoc[] }) {
  const visible = docs.slice(0, 3);
  const [featured, ...rest] = visible;

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
            subtitle={PRODUCT_NOTES_FRAMING}
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

      {visible.length > 0 ? (
        <div className="flex flex-col gap-4">
          <Reveal delay={40}>
            <NoteCard doc={featured} featured />
          </Reveal>

          {rest.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {rest.map((doc, i) => (
                <Reveal key={doc.id} delay={80 + i * 60}>
                  <NoteCard doc={doc} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      ) : (
        <Reveal delay={40}>
          <div className="rounded-xl border border-[rgba(22,22,22,0.10)] bg-white p-8 md:p-10">
            <p className="font-sans text-[15px] text-[#6F6A61] leading-[1.65] m-0 max-w-[480px]">
              Case studies and product write-ups are on the way. Check the archive for anything published so far.
            </p>
            <Link
              href="/docs"
              className="group inline-flex items-center gap-1.5 mt-5 font-sans text-[14px] font-medium text-[#FF6B35] no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6B35]"
            >
              View notes archive
              <ArrowUpRight size={15} className={cardArrowClass} />
            </Link>
          </div>
        </Reveal>
      )}
    </section>
  );
}
