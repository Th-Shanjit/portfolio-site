'use client';

import { useState } from 'react';
import { Files, Settings2 } from 'lucide-react';
import DocList from './DocList';
import DocEditor from './DocEditor';
import DocInspector from './DocInspector';
import DocInspectorContent from './DocInspectorContent';
import SlideDrawer from './SlideDrawer';
import type { AdminState } from './types';

type Props = { state: AdminState };

export default function DocsWorkspace({ state }: Props) {
  const [inspectorOpen, setInspectorOpen] = useState(false);
  const [docListOpen, setDocListOpen] = useState(false);
  const hasDoc = state.selectedDocIndex >= 0;

  const closeDocList = () => setDocListOpen(false);

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)] min-h-0 min-w-0 overflow-hidden">
      {/* Mobile / narrow toolbar */}
      <div className="flex items-center justify-between gap-3 px-4 py-2.5 border-b border-[rgba(22,22,22,0.08)] bg-[#F7F3EA] shrink-0 min-[1180px]:hidden">
        <button
          type="button"
          onClick={() => setDocListOpen(true)}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-[rgba(22,22,22,0.10)] bg-white font-sans text-[13px] font-medium text-[#161616] hover:border-[rgba(22,22,22,0.18)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6B35]"
        >
          <Files size={15} />
          Documents
        </button>
        {hasDoc && (
          <button
            type="button"
            onClick={() => setInspectorOpen(true)}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-[rgba(22,22,22,0.10)] bg-white font-sans text-[13px] font-medium text-[#161616] hover:border-[rgba(22,22,22,0.18)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6B35]"
          >
            <Settings2 size={15} />
            Settings
          </button>
        )}
      </div>

      <div
        className="flex-1 min-h-0 min-w-0 grid overflow-hidden
          grid-cols-1
          min-[1180px]:grid-cols-[300px_minmax(0,1fr)]
          min-[1536px]:grid-cols-[300px_minmax(680px,1fr)_340px]"
      >
        {/* Document list — desktop column */}
        <div className="hidden min-[1180px]:flex min-h-0 min-w-0 w-[300px] shrink-0 overflow-hidden">
          <DocList state={state} className="w-full" />
        </div>

        {/* Editor — primary workspace */}
        <div className="min-h-0 min-w-0 flex flex-col overflow-hidden bg-[#F7F3EA]">
          <DocEditor
            state={state}
            onOpenSettings={() => setInspectorOpen(true)}
            showSettingsButton={hasDoc}
          />
        </div>

        {/* Inspector — large desktop only */}
        <div className="hidden min-[1536px]:flex min-h-0 min-w-0 w-[340px] shrink-0 overflow-hidden">
          <DocInspector state={state} />
        </div>
      </div>

      {/* Document list drawer — below 1180px */}
      <SlideDrawer
        open={docListOpen}
        onClose={closeDocList}
        title="Documents"
        widthClass="w-full max-w-[320px]"
      >
        <DocList state={state} onDocSelect={closeDocList} className="border-0 max-w-none h-full" />
      </SlideDrawer>

      {/* Settings drawer — below 1536px */}
      <SlideDrawer
        open={inspectorOpen}
        onClose={() => setInspectorOpen(false)}
        title="Document settings"
        widthClass="w-full max-w-[360px]"
      >
        <DocInspectorContent state={state} onClose={() => setInspectorOpen(false)} />
      </SlideDrawer>
    </div>
  );
}
