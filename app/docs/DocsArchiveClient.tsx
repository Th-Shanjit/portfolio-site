'use client';

import Link from 'next/link';
import { ArrowRight, Search, FileText, Clock } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Reveal, Label, DraftBadge } from '@/lib/design';
import Tag from '@/components/ui/Tag';
import type { Doc } from '@/lib/getPortfolio';

const TABS = [
  { id: 'all', label: 'All' },
  { id: 'case-study', label: 'Case studies' },
  { id: 'project', label: 'Projects' },
  { id: 'notes', label: 'Notes' },
] as const;

type TabId = typeof TABS[number]['id'];

const NOTE_TYPES = new Set(['blog', 'doc', 'note']);

const stripHtml = (html: string) => {
  if (!html) return '';
  return html.replace(/<[^>]*>?/gm, '').replace(/&nbsp;/g, ' ');
};

export default function DocsArchiveClient({ docs }: { docs: Doc[] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<TabId>('all');

  const filteredDocs = useMemo(() => {
    return docs.filter((doc) => {
      const matchesSearch =
        !searchTerm ||
        doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (doc.description || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (doc.tag || '').toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTab =
        activeTab === 'all' ||
        (activeTab === 'notes' && NOTE_TYPES.has(doc.type)) ||
        doc.type === activeTab;
      return matchesSearch && matchesTab;
    });
  }, [docs, searchTerm, activeTab]);

  return (
    <main className="bg-[#F7F3EA] min-h-screen text-[#161616] max-w-[1080px] mx-auto px-[clamp(20px,5vw,64px)] pt-[120px] pb-[160px]">
      <div className="mb-16">
        <Reveal>
          <Link
            href="/#notes"
            className="inline-flex items-center gap-1.5 font-sans text-[14px] font-medium text-[#6F6A61] hover:text-[#FF6B35] no-underline transition-colors mb-8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6B35]"
          >
            ← Back to portfolio
          </Link>
          <Label>Archive</Label>
          <h1 className="font-[family-name:var(--font-heading)] font-medium text-[#161616] tracking-[-0.02em] leading-[1.05] mt-4 mb-5 text-[clamp(32px,5vw,48px)]">
            All product notes
          </h1>
          <p className="font-sans text-[16px] md:text-[17px] text-[#6F6A61] max-w-[620px] leading-[1.65] mb-12">
            Long-form case studies and product write-ups. The homepage highlights the strongest notes — this is the full archive.
          </p>

          <div className="relative mb-8">
            <Search
              size={15}
              className="absolute top-1/2 -translate-y-1/2 left-5 text-[#b8b2aa] pointer-events-none"
            />
            <input
              type="text"
              aria-label="Search writing"
              placeholder="Search titles, tags…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-[rgba(22,22,22,0.10)] rounded-2xl font-sans text-[15px] text-[#161616] py-4 pl-12 pr-6 outline-none focus:border-[#FF6B35]/50 transition-colors"
            />
          </div>

          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter writing">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(tab.id)}
                  className={`font-mono text-[10px] tracking-[0.14em] uppercase rounded-full px-5 py-2 border transition-all ${
                    isActive
                      ? 'bg-[#1c1916] text-[#f8f4ef] border-[#1c1916]'
                      : 'bg-white text-[#7a7470] border-[#e6ded4] hover:border-[#1c1916]/40'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </Reveal>
      </div>

      {filteredDocs.length > 0 ? (
        <div className="flex flex-col">
          {filteredDocs.map((doc, index) => (
            <Reveal key={doc.id} delay={index * 50}>
              <Link
                href={doc.link || `/docs/${doc.id}`}
                target={doc.link ? '_blank' : undefined}
                className="group block no-underline py-8 border-b border-[#ede8e1] transition-colors"
              >
                <div className="flex flex-wrap items-center justify-between gap-6">
                  <div className="flex-1 min-w-[280px]">
                    <div className="flex items-center gap-2.5 mb-3 flex-wrap">
                      <Tag tone="neutral" size="sm">
                        {doc.type}
                      </Tag>
                      {doc.tag && (
                        <Tag tone="accent" size="sm">
                          {doc.tag}
                        </Tag>
                      )}
                      {doc.date && (
                        <span className="font-mono text-[9px] text-[#b8b2aa] tracking-[0.12em] uppercase">
                          {doc.date}
                        </span>
                      )}
                    </div>
                    <h2 className="font-serif text-[22px] md:text-[26px] font-medium text-[#1c1916] leading-snug mb-2 group-hover:text-[#c8873c] transition-colors">
                      {doc.title}
                      {doc.status === 'draft' && <DraftBadge />}
                    </h2>
                    <p className="font-sans text-[15px] text-[#7a7470] font-light line-clamp-2">
                      {doc.description ||
                        (Array.isArray(doc.content) && doc.content[0]
                          ? stripHtml(doc.content[0])
                          : 'Read the full write-up.')}
                    </p>
                  </div>
                  <div className="flex items-center gap-5 shrink-0">
                    {doc.readTime && (
                      <div className="flex items-center gap-1.5">
                        <Clock size={12} className="text-[#b8b2aa]" />
                        <span className="font-mono text-[10px] text-[#b8b2aa] tracking-[0.12em] uppercase">
                          {doc.readTime}
                        </span>
                      </div>
                    )}
                    <div className="w-10 h-10 rounded-full bg-white border border-[#e6ded4] flex items-center justify-center group-hover:border-[#c8873c] group-hover:bg-[#c8873c] transition-colors">
                      <ArrowRight
                        size={15}
                        className="text-[#1c1916] group-hover:text-white transition-colors"
                      />
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      ) : (
        <Reveal>
          <div className="text-center py-20 px-6 bg-[#f2ede5] border border-dashed border-[#e6ded4] rounded-3xl">
            <FileText size={28} className="mx-auto mb-4 text-[#b8b2aa]" />
            <h3 className="font-serif text-[20px] text-[#1c1916] mb-2">Nothing here yet</h3>
            <p className="font-sans text-[14px] text-[#7a7470]">
              Try adjusting your search or filter.
            </p>
          </div>
        </Reveal>
      )}
    </main>
  );
}
