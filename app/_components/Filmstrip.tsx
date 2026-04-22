'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';

type Doc = {
  id: string;
  title: string;
  type: string;
  thumbnail?: string;
  link?: string;
  tag?: string;
};

export default function Filmstrip({ items }: { items: Doc[] }) {
  const rail = useRef<HTMLDivElement>(null);
  const [canL, setL] = useState(false);
  const [canR, setR] = useState(false);

  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    const sync = () => {
      setL(el.scrollLeft > 10);
      setR(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
    };
    el.addEventListener('scroll', sync, { passive: true });
    const t = setTimeout(sync, 120);
    return () => {
      el.removeEventListener('scroll', sync);
      clearTimeout(t);
    };
  }, [items]);

  const scroll = (dir: 1 | -1) =>
    rail.current?.scrollBy({ left: dir * 320, behavior: 'smooth' });

  return (
    <div className="relative">
      {canL && (
        <div
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 bottom-[18px] w-20 z-[3] bg-gradient-to-r from-[#f8f4ef] to-transparent"
        />
      )}
      {canR && (
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-0 bottom-[18px] w-24 z-[3] bg-gradient-to-l from-[#f8f4ef] to-transparent"
        />
      )}

      {canL && (
        <button
          type="button"
          aria-label="Scroll work left"
          onClick={() => scroll(-1)}
          className="hidden sm:flex absolute left-[-14px] top-[76px] z-[4] w-8 h-8 rounded-full bg-white border border-[#e6ded4] items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:border-[#1c1916]/40 transition-colors"
        >
          <ChevronLeft size={13} className="text-[#7a7470]" />
        </button>
      )}
      {canR && (
        <button
          type="button"
          aria-label="Scroll work right"
          onClick={() => scroll(1)}
          className="hidden sm:flex absolute right-[-14px] top-[76px] z-[4] w-8 h-8 rounded-full bg-white border border-[#e6ded4] items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:border-[#1c1916]/40 transition-colors"
        >
          <ChevronRight size={13} className="text-[#7a7470]" />
        </button>
      )}

      <div
        ref={rail}
        className="flex gap-5 overflow-x-auto pb-2 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((doc, i) => (
          <FilmCard key={doc.id} doc={doc} i={i} />
        ))}
        {items.length > 0 && items.length < 4 && <MoreSoonCard />}
      </div>
    </div>
  );
}

function FilmCard({ doc, i }: { doc: Doc; i: number }) {
  const href = doc.link || `/docs/${doc.id}`;
  const external = !!doc.link;
  const inner = (
    <>
      <div className="relative w-full h-[160px] overflow-hidden rounded-[10px] bg-[#f2ede5] border border-[#ede8e1]">
        {doc.thumbnail ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={doc.thumbnail}
            alt={doc.title}
            className="w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-mono text-[9px] text-[#b8b2aa] tracking-[0.15em]">NO PREVIEW</span>
          </div>
        )}
        <div className="absolute top-2.5 left-2.5 font-mono text-[9px] text-white/80 bg-black/35 backdrop-blur-sm px-[7px] py-[3px] rounded tracking-[0.1em]">
          {String(i + 1).padStart(2, '0')}
        </div>
      </div>
      <div className="pt-2.5 flex flex-col gap-1">
        <div className="flex items-baseline justify-between gap-2">
          <span className="font-serif text-[17px] font-medium leading-tight text-[#1c1916] group-hover:text-[#c8873c] transition-colors truncate">
            {doc.title}
          </span>
          <ArrowUpRight
            size={13}
            className="shrink-0 text-[#b8b2aa] group-hover:text-[#c8873c] transition-colors"
          />
        </div>
        <span className="font-mono text-[9px] text-[#b8b2aa] tracking-[0.12em] uppercase">
          {doc.tag || doc.type}
        </span>
      </div>
    </>
  );

  const cls = 'group flex flex-col flex-shrink-0 w-[260px] snap-start no-underline';
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

function MoreSoonCard() {
  return (
    <Link
      href="/docs"
      className="group flex flex-col flex-shrink-0 w-[260px] snap-start no-underline"
    >
      <div className="w-full h-[160px] rounded-[10px] border border-dashed border-[#e6ded4] bg-transparent flex items-center justify-center group-hover:border-[#c8873c]/60 transition-colors">
        <span className="font-mono text-[10px] text-[#b8b2aa] tracking-[0.15em] uppercase group-hover:text-[#c8873c] transition-colors">
          More in progress →
        </span>
      </div>
      <div className="pt-2.5 flex flex-col gap-1">
        <span className="font-serif text-[17px] font-medium text-[#1c1916]/70">Browse all work</span>
        <span className="font-mono text-[9px] text-[#b8b2aa] tracking-[0.12em] uppercase">
          Writing · Case studies
        </span>
      </div>
    </Link>
  );
}
