'use client';

import DocInspectorContent from './DocInspectorContent';
import type { AdminState } from './types';

type Props = { state: AdminState };

/** Permanent right column — only rendered at 2xl+ in DocsWorkspace */
export default function DocInspector({ state }: Props) {
  return (
    <aside className="flex flex-col h-full min-h-0 min-w-0 overflow-hidden border-l border-[rgba(22,22,22,0.08)] bg-white">
      <div className="px-4 py-3 border-b border-[rgba(22,22,22,0.08)] shrink-0">
        <h3 className="font-sans text-[13px] font-medium text-[#161616] m-0">Document settings</h3>
      </div>
      <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden">
        <DocInspectorContent state={state} />
      </div>
    </aside>
  );
}
