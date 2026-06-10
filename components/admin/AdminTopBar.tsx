'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ExternalLink, MoreHorizontal, Save } from 'lucide-react';
import type { AdminState } from './types';

type Props = {
  state: AdminState;
  onSave: () => void;
};

function saveStatusLabel(state: AdminState) {
  if (state.saving) return 'Publishing…';
  if (state.hasUnsavedChanges) return 'Unsaved changes';
  if (state.lastPublishedAt) return 'Published';
  return 'Saved';
}

export default function AdminTopBar({ state, onSave }: Props) {
  const { selectedDoc, saving, hasUnsavedChanges } = state;
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between gap-3 px-4 md:px-6 h-14 border-b border-[rgba(22,22,22,0.08)] bg-[#F7F3EA]/90 backdrop-blur-md shrink-0 min-w-0">
      <div className="min-w-0 flex-1">
        <h1 className="font-[family-name:var(--font-heading)] text-[15px] font-medium text-[#161616] m-0 truncate">
          Portfolio Command Center
        </h1>
        <p
          className={`font-sans text-[12px] m-0 truncate ${
            hasUnsavedChanges ? 'text-[#FF6B35]' : 'text-[#9A9489]'
          }`}
          role="status"
        >
          {saveStatusLabel(state)}
        </p>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <Link
          href="/"
          target="_blank"
          className="hidden xl:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg font-sans text-[13px] font-medium text-[#6F6A61] hover:text-[#161616] hover:bg-white/60 no-underline transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6B35]"
        >
          <ExternalLink size={14} />
          View site
        </Link>
        {selectedDoc && (
          <Link
            href={`/docs/${selectedDoc.id}`}
            target="_blank"
            className="hidden xl:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg font-sans text-[13px] font-medium text-[#6F6A61] hover:text-[#161616] hover:bg-white/60 no-underline transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6B35]"
          >
            Preview doc
          </Link>
        )}

        <div className="relative xl:hidden" ref={menuRef}>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="inline-flex items-center justify-center p-2 rounded-lg text-[#6F6A61] hover:text-[#161616] hover:bg-white/60 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6B35]"
            aria-expanded={menuOpen}
            aria-label="More actions"
          >
            <MoreHorizontal size={18} />
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-full mt-1 w-44 py-1 rounded-lg border border-[rgba(22,22,22,0.10)] bg-white shadow-lg z-50">
              <Link
                href="/"
                target="_blank"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 font-sans text-[13px] text-[#161616] no-underline hover:bg-[#F0EBE0]"
              >
                <ExternalLink size={14} />
                View site
              </Link>
              {selectedDoc && (
                <Link
                  href={`/docs/${selectedDoc.id}`}
                  target="_blank"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 font-sans text-[13px] text-[#161616] no-underline hover:bg-[#F0EBE0]"
                >
                  <ExternalLink size={14} />
                  Preview doc
                </Link>
              )}
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={onSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-sans text-[14px] font-medium text-white bg-[#FF6B35] hover:bg-[#E85A28] disabled:opacity-50 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6B35]"
        >
          <Save size={15} />
          <span className="hidden sm:inline">Publish changes</span>
          <span className="sm:hidden">Publish</span>
        </button>
      </div>
    </header>
  );
}
