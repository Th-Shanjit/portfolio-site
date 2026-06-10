'use client';

import Link from 'next/link';
import { CheckCircle2, ExternalLink } from 'lucide-react';
import AdminTopBar from './AdminTopBar';
import AdminSidebar from './AdminSidebar';
import OverviewEditor from './OverviewEditor';
import SiteEditor from './SiteEditor';
import HeroEditor from './HeroEditor';
import HighlightsEditor from './HighlightsEditor';
import AboutEditor from './AboutEditor';
import ContactEditor from './ContactEditor';
import DocsWorkspace from './DocsWorkspace';
import type { AdminState } from './types';

type Props = {
  state: AdminState;
  onSave: () => void;
  showPublishedModal: boolean;
  onClosePublishedModal: () => void;
};

export default function AdminShell({
  state,
  onSave,
  showPublishedModal,
  onClosePublishedModal,
}: Props) {
  const { selectedSection, selectedDocId } = state;
  const isDocs = selectedSection === 'docs';

  const mainContent = () => {
    switch (selectedSection) {
      case 'overview':
        return <OverviewEditor state={state} />;
      case 'site':
        return <SiteEditor state={state} />;
      case 'hero':
        return <HeroEditor state={state} />;
      case 'highlights':
        return <HighlightsEditor state={state} />;
      case 'docs':
        return <DocsWorkspace state={state} />;
      case 'about':
        return <AboutEditor state={state} />;
      case 'contact':
        return <ContactEditor state={state} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#F7F3EA] text-[#161616] flex flex-col">
      <AdminTopBar state={state} onSave={onSave} />

      <div className="flex flex-1 min-h-0 min-w-0 flex-col min-[1180px]:flex-row overflow-hidden">
        <AdminSidebar state={state} docsMode={isDocs} />

        <main
          className={`flex-1 min-w-0 min-h-0 ${
            isDocs ? 'overflow-hidden' : 'overflow-y-auto p-4 md:p-6 lg:p-8'
          }`}
        >
          {mainContent()}
        </main>
      </div>

      {showPublishedModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-[#161616]/30 backdrop-blur-sm">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="published-title"
            className="w-full max-w-sm rounded-xl border border-[rgba(22,22,22,0.10)] bg-white p-8 text-center shadow-xl"
          >
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 size={28} />
            </div>
            <h2
              id="published-title"
              className="font-[family-name:var(--font-heading)] text-[20px] font-medium m-0 mb-2"
            >
              Changes published
            </h2>
            <p className="font-sans text-[14px] text-[#6F6A61] m-0 mb-6">
              Your portfolio data has been saved.
            </p>
            <div className="flex flex-col gap-2">
              <Link
                href={selectedDocId ? `/docs/${selectedDocId}` : '/'}
                target="_blank"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#161616] text-white font-sans text-[14px] font-medium no-underline hover:bg-[#2a2826] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6B35]"
              >
                <ExternalLink size={15} />
                View live content
              </Link>
              <button
                type="button"
                onClick={onClosePublishedModal}
                className="px-4 py-3 rounded-lg font-sans text-[14px] font-medium text-[#6F6A61] hover:bg-[#F0EBE0] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6B35]"
              >
                Stay in editor
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
