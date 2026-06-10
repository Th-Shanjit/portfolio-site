'use client';

import { ChevronDown, ChevronUp, Plus, Trash2 } from 'lucide-react';
import StatusBadge from './StatusBadge';
import type { AdminState } from './types';

type Props = { state: AdminState };

export default function HighlightsEditor({ state }: Props) {
  const { data, actions } = state;
  const highlights = data.highlightedProjects || [];

  const resolveDoc = (id: string) => data.docs.find((d) => d.id === id);

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h2 className="font-[family-name:var(--font-heading)] text-[24px] font-medium text-[#161616] m-0 mb-1">
          Work highlights
        </h2>
        <p className="font-sans text-[15px] text-[#6F6A61] m-0">
          These docs appear as highlighted work on the homepage filmstrip. Each entry references a document by slug.
        </p>
      </div>

      <section className="rounded-xl border border-[rgba(22,22,22,0.10)] bg-white p-5 md:p-6 space-y-4">
        {highlights.length === 0 && (
          <p className="font-sans text-[14px] text-[#9A9489] m-0">No highlights yet.</p>
        )}

        {highlights.map((item, i) => {
          const doc = item.id ? resolveDoc(item.id) : undefined;
          return (
            <div
              key={i}
              className="flex flex-col sm:flex-row gap-3 p-4 rounded-lg bg-[#F0EBE0] border border-[rgba(22,22,22,0.06)]"
            >
              <div className="flex-1 min-w-0 space-y-2">
                <select
                  value={item.id}
                  onChange={(e) => actions.updateHighlight(i, e.target.value)}
                  className="w-full px-3 py-2.5 bg-white border border-[rgba(22,22,22,0.10)] rounded-lg font-sans text-[14px] text-[#161616] outline-none focus:border-[#FF6B35]/50"
                  aria-label={`Highlight ${i + 1} document`}
                >
                  <option value="">Select a document…</option>
                  {data.docs.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.title} ({d.id})
                    </option>
                  ))}
                </select>
                {doc ? (
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-sans text-[13px] text-[#6F6A61]">{doc.type}</span>
                    <StatusBadge published={doc.published} />
                  </div>
                ) : item.id ? (
                  <p className="font-sans text-[13px] text-amber-700 m-0">
                    No document found for slug &ldquo;{item.id}&rdquo;
                  </p>
                ) : null}
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  disabled={i === 0}
                  onClick={() => actions.moveHighlight(i, -1)}
                  className="p-2 rounded-md hover:bg-white disabled:opacity-30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6B35]"
                  aria-label="Move up"
                >
                  <ChevronUp size={16} />
                </button>
                <button
                  type="button"
                  disabled={i === highlights.length - 1}
                  onClick={() => actions.moveHighlight(i, 1)}
                  className="p-2 rounded-md hover:bg-white disabled:opacity-30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6B35]"
                  aria-label="Move down"
                >
                  <ChevronDown size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => actions.removeHighlight(i)}
                  className="p-2 rounded-md text-red-600 hover:bg-red-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400"
                  aria-label="Remove highlight"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          );
        })}

        <button
          type="button"
          onClick={() => actions.addHighlight()}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-dashed border-[rgba(22,22,22,0.15)] font-sans text-[14px] font-medium text-[#6F6A61] hover:text-[#161616] hover:border-[rgba(22,22,22,0.25)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6B35]"
        >
          <Plus size={15} />
          Add highlight
        </button>
      </section>
    </div>
  );
}
