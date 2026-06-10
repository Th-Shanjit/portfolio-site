'use client';

import type { ComponentType } from 'react';
import {
  LayoutDashboard,
  Settings,
  ImageIcon,
  LayoutGrid,
  FileText,
  User,
  Mail,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';
import type { AdminSection, AdminState } from './types';

const NAV: { id: AdminSection; label: string; icon: ComponentType<{ size?: number }> }[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'site', label: 'Site', icon: Settings },
  { id: 'hero', label: 'Hero', icon: ImageIcon },
  { id: 'highlights', label: 'Work highlights', icon: LayoutGrid },
  { id: 'docs', label: 'Docs', icon: FileText },
  { id: 'about', label: 'About', icon: User },
  { id: 'contact', label: 'Contact', icon: Mail },
];

type Props = {
  state: AdminState;
  docsMode?: boolean;
};

function NavButtons({
  state,
  onSelect,
  vertical,
  compact,
}: {
  state: AdminState;
  onSelect?: () => void;
  vertical?: boolean;
  compact?: boolean;
}) {
  return (
    <nav
      aria-label="Admin sections"
      className={vertical ? 'flex flex-col gap-1 p-2' : 'flex gap-1 overflow-x-auto pb-1 scrollbar-none'}
    >
      {NAV.map(({ id, label, icon: Icon }) => {
        const active = state.selectedSection === id;
        return (
          <button
            key={id}
            type="button"
            title={compact ? label : undefined}
            onClick={() => {
              state.setSelectedSection(id);
              onSelect?.();
            }}
            className={`flex items-center rounded-lg font-sans text-[14px] font-medium whitespace-nowrap transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6B35] ${
              compact
                ? `justify-center p-2.5 ${vertical ? 'w-full' : ''}`
                : `gap-2.5 px-3 py-2 ${vertical ? '' : ''}`
            } ${
              active
                ? 'bg-white text-[#161616] shadow-sm border border-[rgba(22,22,22,0.08)]'
                : 'text-[#6F6A61] hover:text-[#161616] hover:bg-white/50'
            }`}
          >
            <Icon size={16} />
            {!compact && <span>{label}</span>}
          </button>
        );
      })}
    </nav>
  );
}

export default function AdminSidebar({ state, docsMode = false }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);

  if (docsMode) {
    return (
      <>
        {/* Compact icon rail — docs mode, 1180px+ */}
        <aside className="hidden min-[1180px]:flex flex-col w-[72px] shrink-0 border-r border-[rgba(22,22,22,0.08)] bg-[#F0EBE0]/50 py-2">
          <NavButtons state={state} vertical compact />
        </aside>

        {/* Top tabs — docs mode, below 1180px */}
        <div className="min-[1180px]:hidden border-b border-[rgba(22,22,22,0.08)] bg-[#F0EBE0]/40 px-3 pt-2 shrink-0">
          <div className="flex items-center justify-between mb-2">
            <span className="font-sans text-[12px] font-medium text-[#9A9489]">Sections</span>
            <button
              type="button"
              className="p-1.5 rounded-md text-[#161616] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6B35]"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
          {mobileOpen ? (
            <div className="pb-2">
              <NavButtons state={state} vertical onSelect={() => setMobileOpen(false)} />
            </div>
          ) : (
            <NavButtons state={state} />
          )}
        </div>
      </>
    );
  }

  return (
    <>
      <aside className="hidden lg:flex flex-col w-56 shrink-0 border-r border-[rgba(22,22,22,0.08)] bg-[#F0EBE0]/50">
        <NavButtons state={state} vertical />
      </aside>

      <div className="lg:hidden border-b border-[rgba(22,22,22,0.08)] bg-[#F0EBE0]/40 px-3 pt-2 shrink-0">
        <div className="flex items-center justify-between mb-2">
          <span className="font-sans text-[12px] font-medium text-[#9A9489]">Sections</span>
          <button
            type="button"
            className="p-1.5 rounded-md text-[#161616] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6B35]"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
        {mobileOpen ? (
          <div className="pb-2">
            <NavButtons state={state} vertical onSelect={() => setMobileOpen(false)} />
          </div>
        ) : (
          <NavButtons state={state} />
        )}
      </div>
    </>
  );
}
