'use client';

import React, { useEffect, useId, useRef } from 'react';
import { X } from 'lucide-react';

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  returnFocusRef?: React.RefObject<HTMLElement | null>;
};

export default function Modal({ open, onClose, title, children, returnFocusRef }: Props) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const storedFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    storedFocusRef.current =
      returnFocusRef?.current ?? (document.activeElement as HTMLElement | null);

    const panel = panelRef.current;
    if (!panel) return;

    const focusable = panel.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    first?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab' || focusable.length === 0) return;

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else if (document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
      storedFocusRef.current?.focus();
    };
  }, [open, onClose, returnFocusRef]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 sm:p-6">
      <button
        type="button"
        className="absolute inset-0 bg-[#161616]/40 backdrop-blur-[2px]"
        aria-label="Close dialog"
        onClick={onClose}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative w-full max-w-lg max-h-[min(88vh,640px)] overflow-y-auto rounded-xl border border-[rgba(22,22,22,0.10)] bg-[#F7F3EA] shadow-[0_24px_64px_rgba(22,22,22,0.16)]"
      >
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 px-6 py-5 border-b border-[rgba(22,22,22,0.08)] bg-[#F7F3EA]/95 backdrop-blur-sm">
          <h2
            id={titleId}
            className="font-[family-name:var(--font-heading)] text-[20px] md:text-[22px] font-medium text-[#161616] tracking-[-0.02em] leading-snug m-0 pr-2"
          >
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 p-1.5 rounded-lg text-[#6F6A61] hover:text-[#161616] hover:bg-[rgba(22,22,22,0.05)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6B35]"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
}
