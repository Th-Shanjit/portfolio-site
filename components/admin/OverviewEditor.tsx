'use client';

import Link from 'next/link';
import { FileText, ImageIcon, ExternalLink, Plus } from 'lucide-react';
import type { AdminState } from './types';

type Props = { state: AdminState };

export default function OverviewEditor({ state }: Props) {
  const { data, publishedDocs, draftDocs, actions, setSelectedSection } = state;
  const highlights = data.highlightedProjects?.length ?? 0;

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h2 className="font-[family-name:var(--font-heading)] text-[24px] font-medium text-[#161616] m-0 mb-1">
          Overview
        </h2>
        <p className="font-sans text-[15px] text-[#6F6A61] m-0">
          Quick snapshot of your portfolio content.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-[rgba(22,22,22,0.10)] bg-white p-5">
          <p className="font-sans text-[13px] text-[#9A9489] m-0 mb-1">Published docs</p>
          <p className="font-[family-name:var(--font-heading)] text-[32px] font-medium text-[#161616] m-0">
            {publishedDocs.length}
          </p>
        </div>
        <div className="rounded-xl border border-[rgba(22,22,22,0.10)] bg-white p-5">
          <p className="font-sans text-[13px] text-[#9A9489] m-0 mb-1">Drafts</p>
          <p className="font-[family-name:var(--font-heading)] text-[32px] font-medium text-[#161616] m-0">
            {draftDocs.length}
          </p>
        </div>
        <div className="rounded-xl border border-[rgba(22,22,22,0.10)] bg-white p-5">
          <p className="font-sans text-[13px] text-[#9A9489] m-0 mb-1">Highlighted work</p>
          <p className="font-[family-name:var(--font-heading)] text-[32px] font-medium text-[#161616] m-0">
            {highlights}
          </p>
        </div>
      </div>

      {state.lastPublishedAt && (
        <p className="font-sans text-[13px] text-[#6F6A61] m-0">
          Last published: {state.lastPublishedAt.toLocaleString()}
        </p>
      )}

      <div>
        <h3 className="font-sans text-[14px] font-medium text-[#161616] mb-3">Quick actions</h3>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => actions.addDoc()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#161616] text-white font-sans text-[14px] font-medium hover:bg-[#2a2826] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6B35]"
          >
            <Plus size={15} />
            Create new doc
          </button>
          <button
            type="button"
            onClick={() => setSelectedSection('hero')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[rgba(22,22,22,0.10)] bg-white font-sans text-[14px] font-medium text-[#161616] hover:border-[rgba(22,22,22,0.20)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6B35]"
          >
            <ImageIcon size={15} />
            Edit hero
          </button>
          <button
            type="button"
            onClick={() => {
              setSelectedSection('docs');
              const paperloop = data.docs.find((d) => d.id.includes('paperloop'));
              if (paperloop) state.setSelectedDocId(paperloop.id);
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[rgba(22,22,22,0.10)] bg-white font-sans text-[14px] font-medium text-[#161616] hover:border-[rgba(22,22,22,0.20)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6B35]"
          >
            <FileText size={15} />
            Edit PaperLoop notes
          </button>
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[rgba(22,22,22,0.10)] bg-white font-sans text-[14px] font-medium text-[#161616] hover:border-[rgba(22,22,22,0.20)] no-underline transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6B35]"
          >
            <ExternalLink size={15} />
            View live site
          </Link>
        </div>
      </div>
    </div>
  );
}
