'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/ui/Button';
import { Label } from '@/lib/design';
const PAPERLOOP_TABS = [
  {
    id: 'problem',
    label: 'Problem',
    content:
      'Teachers write question drafts by hand, then retype and format them manually in Word.',
  },
  {
    id: 'testing',
    label: 'Testing',
    content:
      'Input from 5 teachers/tutors and roughly 15 handwritten papers, including chemistry-heavy and mixed-format question papers.',
  },
  {
    id: 'decisions',
    label: 'Product Decisions',
    content:
      'No-login MVP, review-before-export, fair scan credits, simpler editor/PDF themes, chemistry-specific handling.',
  },
  {
    id: 'outcome',
    label: 'Outcome',
    content:
      'Closed beta direction shaped through real teacher workflow testing and public demo.',
  },
] as const;
import { PAPERLOOP_DEMO_WATCH_URL } from '@/app/paperloop/constants';
import { easeOut, useReducedMotion } from '@/lib/motion';

type TabId = (typeof PAPERLOOP_TABS)[number]['id'];

export default function FeaturedWorkCard() {
  const [active, setActive] = useState<TabId>('problem');
  const reduced = useReducedMotion();
  const activeTab = PAPERLOOP_TABS.find((tab) => tab.id === active)!;

  return (
    <article className="group rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#1D1915] text-[#F7F3EA] overflow-hidden shadow-[0_12px_40px_rgba(29,25,21,0.14)] transition-[transform,box-shadow] duration-300 motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-[0_20px_48px_rgba(29,25,21,0.20)]">
      <div className="p-8 md:p-10 lg:p-12">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-10">
          <div className="max-w-[640px]">
            <Label className="text-[#FF6B35] mb-3 block">Featured project</Label>
            <h3 className="font-[family-name:var(--font-heading)] text-[clamp(28px,4vw,40px)] font-medium tracking-[-0.02em] leading-[1.1] m-0">
              PaperLoop
            </h3>
            <p className="mt-3 font-[family-name:var(--font-heading)] text-[18px] md:text-[20px] text-white/85 leading-[1.35] m-0">
              Handwritten exam drafts → editable, PDF-ready papers
            </p>
            <p className="mt-4 font-sans text-[15px] md:text-[16px] text-white/60 leading-[1.7] m-0">
              Built after observing teachers spend hours retyping handwritten question papers.
              Tested with real handwritten papers, including chemistry-heavy formats.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5 lg:justify-end shrink-0">
            <Button href="/docs/paperloop-problem-space" variant="ghostLight" size="sm">
              View full case study
            </Button>
            <Button href="/paperloop" variant="ghostLight" size="sm">
              View landing page
            </Button>
            <Button href={PAPERLOOP_DEMO_WATCH_URL} external variant="accent" size="sm">
              Watch demo
            </Button>
          </div>
        </div>

        <div className="rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] p-5 md:p-6">
          <div
            role="tablist"
            aria-label="PaperLoop project details"
            className="flex flex-wrap gap-2 mb-5"
          >
            {PAPERLOOP_TABS.map((tab) => {
              const selected = active === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  id={`tab-${tab.id}`}
                  aria-selected={selected}
                  aria-controls={`panel-${tab.id}`}
                  onClick={() => setActive(tab.id)}
                  className={`font-sans text-[13px] md:text-[14px] font-medium px-3.5 py-2 rounded-lg border transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6B35] ${
                    selected
                      ? 'bg-[#FF6B35] text-white border-[#FF6B35]'
                      : 'bg-transparent text-white/65 border-[rgba(255,255,255,0.12)] hover:text-white/90 hover:border-[rgba(255,255,255,0.22)]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div
            role="tabpanel"
            id={`panel-${active}`}
            aria-labelledby={`tab-${active}`}
            className="min-h-[72px]"
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={active}
                initial={reduced ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: -6 }}
                transition={{ duration: reduced ? 0 : 0.28, ease: easeOut }}
                className="font-sans text-[15px] md:text-[16px] text-white/70 leading-[1.75] m-0 max-w-[680px]"
              >
                {activeTab.content}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </article>
  );
}
