'use client';

import { Settings2 } from 'lucide-react';
import RichTextEditor from '@/components/RichTextEditor';
import type { AdminState } from './types';

type Props = {
  state: AdminState;
  onOpenSettings?: () => void;
  showSettingsButton?: boolean;
};

export default function DocEditor({ state, onOpenSettings, showSettingsButton }: Props) {
  const { selectedDoc, selectedDocIndex, actions } = state;

  if (!selectedDoc || selectedDocIndex < 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[320px] p-8 text-center">
        <p className="font-[family-name:var(--font-heading)] text-[18px] font-medium text-[#161616] m-0 mb-2">
          Select a document
        </p>
        <p className="font-sans text-[14px] text-[#6F6A61] m-0 max-w-sm">
          Choose a doc from the list or create a new one to start writing.
        </p>
      </div>
    );
  }

  const content = Array.isArray(selectedDoc.content)
    ? selectedDoc.content.join('\n\n')
    : selectedDoc.content || '';

  return (
    <div className="flex flex-col h-full min-h-0 min-w-0 overflow-y-auto overflow-x-hidden">
      <div className="w-full max-w-[800px] mx-auto px-4 md:px-8 py-5 md:py-6 min-w-0">
        <div className="flex items-start justify-between gap-4 mb-4 min-w-0">
          <div className="flex-1 min-w-0">
            <input
              aria-label="Document title"
              value={selectedDoc.title}
              onChange={(e) => actions.updateDocByIndex(selectedDocIndex, 'title', e.target.value)}
              placeholder="Untitled note"
              className="w-full min-w-0 font-[family-name:var(--font-heading)] text-[clamp(24px,2.5vw,32px)] font-medium text-[#161616] bg-transparent border-0 outline-none placeholder:text-[#9A9489] mb-2"
            />
            <input
              aria-label="Short description"
              value={selectedDoc.description || ''}
              onChange={(e) =>
                actions.updateDocByIndex(selectedDocIndex, 'description', e.target.value)
              }
              placeholder="Brief description for cards and previews…"
              className="w-full min-w-0 font-sans text-[15px] text-[#6F6A61] bg-transparent border-0 outline-none placeholder:text-[#9A9489]"
            />
          </div>
          {showSettingsButton && onOpenSettings && (
            <button
              type="button"
              onClick={onOpenSettings}
              className="hidden min-[1180px]:inline-flex min-[1536px]:hidden shrink-0 items-center gap-2 px-3 py-2 rounded-lg border border-[rgba(22,22,22,0.10)] bg-white font-sans text-[13px] font-medium text-[#161616] hover:border-[rgba(22,22,22,0.18)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6B35]"
            >
              <Settings2 size={15} />
              Settings
            </button>
          )}
        </div>

        <div className="min-w-0">
          <RichTextEditor
            content={content}
            onChange={(html) => actions.updateDocByIndex(selectedDocIndex, 'content', html)}
          />
        </div>
      </div>
    </div>
  );
}
