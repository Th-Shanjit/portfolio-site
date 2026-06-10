'use client';

import AdminShell from '@/components/admin/AdminShell';
import { usePortfolioAdmin } from '@/components/admin/usePortfolioAdmin';

export default function AdminPage() {
  const { loading, state, handleSave, showPublishedModal, setShowPublishedModal } =
    usePortfolioAdmin();

  if (loading || !state) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F3EA]">
        <p className="font-sans text-[15px] text-[#6F6A61]">Loading command center…</p>
      </div>
    );
  }

  return (
    <AdminShell
      state={state}
      onSave={handleSave}
      showPublishedModal={showPublishedModal}
      onClosePublishedModal={() => setShowPublishedModal(false)}
    />
  );
}
