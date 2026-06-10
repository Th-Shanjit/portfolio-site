'use client';

import { useMemo, useState } from 'react';
import { Plus, Search, Eye } from 'lucide-react';
import StatusBadge from './StatusBadge';
import type { AdminState, DocFilter } from './types';

type Props = {
  state: AdminState;
  onDocSelect?: () => void;
  className?: string;
};

export default function DocList({ state, onDocSelect, className = '' }: Props) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<DocFilter>('all');
  const { data, selectedDocId, setSelectedDocId, actions } = state;

  const filtered = useMemo(() => {
    return data.docs.filter((doc) => {
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        doc.title.toLowerCase().includes(q) ||
        doc.id.toLowerCase().includes(q) ||
        (doc.type || '').toLowerCase().includes(q) ||
        (doc.tag || '').toLowerCase().includes(q);
      const matchesFilter =
        filter === 'all' ||
        (filter === 'published' && doc.published) ||
        (filter === 'draft' && !doc.published);
      return matchesSearch && matchesFilter;
    });
  }, [data.docs, search, filter]);

  const filters: { id: DocFilter; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'published', label: 'Published' },
    { id: 'draft', label: 'Draft' },
  ];

  const selectDoc = (id: string) => {
    setSelectedDocId(id);
    onDocSelect?.();
  };

  return (
    <div
      className={`flex flex-col h-full min-h-0 min-w-0 w-full max-w-[300px] shrink-0 border-r border-[rgba(22,22,22,0.08)] bg-[#F0EBE0]/30 overflow-hidden ${className}`}
    >
      <div className="p-3 space-y-3 border-b border-[rgba(22,22,22,0.08)] shrink-0 min-w-0">
        <button
          type="button"
          onClick={() => actions.addDoc()}
          className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-[#161616] text-white font-sans text-[14px] font-medium hover:bg-[#2a2826] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6B35]"
        >
          <Plus size={15} />
          New document
        </button>
        <div className="relative min-w-0">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9A9489]" />
          <input
            type="search"
            placeholder="Search docs…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search documents"
            className="w-full min-w-0 pl-9 pr-3 py-2 bg-white border border-[rgba(22,22,22,0.10)] rounded-lg font-sans text-[14px] outline-none focus:border-[#FF6B35]/50"
          />
        </div>
        <div className="flex gap-1 min-w-0" role="tablist" aria-label="Filter documents">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={`flex-1 min-w-0 px-2 py-1.5 rounded-md font-sans text-[12px] font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6B35] ${
                filter === f.id
                  ? 'bg-white text-[#161616] shadow-sm'
                  : 'text-[#6F6A61] hover:text-[#161616]'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <ul className="flex-1 overflow-y-auto overflow-x-hidden p-2 space-y-1 list-none m-0 min-w-0">
        {filtered.map((doc) => {
          const selected = selectedDocId === doc.id;
          return (
            <li key={doc.id} className="min-w-0">
              <button
                type="button"
                onClick={() => selectDoc(doc.id)}
                className={`w-full min-w-0 text-left p-3 rounded-lg transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6B35] ${
                  selected
                    ? 'bg-white border border-[rgba(22,22,22,0.10)] shadow-sm'
                    : 'hover:bg-white/70 border border-transparent'
                }`}
              >
                <p className="font-sans text-[14px] font-medium text-[#161616] m-0 mb-1 line-clamp-2 break-words">
                  {doc.title}
                </p>
                <p className="font-mono text-[11px] text-[#9A9489] m-0 mb-2 truncate">{doc.id}</p>
                <div className="flex flex-wrap items-center gap-2 min-w-0">
                  <StatusBadge published={doc.published} />
                  {doc.type && (
                    <span className="font-sans text-[11px] text-[#6F6A61] truncate max-w-[100px]">
                      {doc.type}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1 font-sans text-[11px] text-[#9A9489] ml-auto shrink-0">
                    <Eye size={11} />
                    {doc.views ?? 0}
                  </span>
                </div>
                {doc.readTime && (
                  <p className="font-sans text-[11px] text-[#9A9489] m-0 mt-1 truncate">{doc.readTime}</p>
                )}
              </button>
            </li>
          );
        })}
        {filtered.length === 0 && (
          <li className="p-4 text-center font-sans text-[13px] text-[#9A9489]">No documents match.</li>
        )}
      </ul>
    </div>
  );
}
