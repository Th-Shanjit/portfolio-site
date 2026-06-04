'use client';

import { PAPERLOOP_DEMO_EMBED_URL, PAPERLOOP_DEMO_WATCH_URL } from '../constants';

const WORKFLOW_LINE =
  'Watch the demo to see the workflow from handwritten draft → scan/upload → AI extraction → review/edit → PDF-ready output.';

const PROOF_LINE =
  'Tested with ~15 real handwritten papers, including chemistry-heavy and mixed-format question papers.';

export default function HeroVisual() {
  return (
    <div id="demo" className="pl-reveal w-full min-w-0">
      <h2 className="font-serif font-semibold text-[#EDE8DB] text-[20px] sm:text-[22px] leading-tight mb-4 tracking-[-0.01em]">
        Watch the PaperLoop workflow
      </h2>

      <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#162436] shadow-[0_20px_56px_rgba(0,0,0,0.45)] w-full">
        <div className="bg-white/[0.04] border-b border-white/[0.07] px-3 sm:px-4 py-2.5 flex items-center justify-between gap-2">
          <div className="flex gap-1.5 shrink-0" aria-hidden>
            <span className="w-[9px] h-[9px] rounded-full bg-[#ff5f56]/70" />
            <span className="w-[9px] h-[9px] rounded-full bg-[#ffbd2e]/70" />
            <span className="w-[9px] h-[9px] rounded-full bg-[#27c93f]/70" />
          </div>
          <span className="font-mono text-[10px] sm:text-[11px] text-[#EDE8DB]/45 tracking-[0.08em] truncate">
            Product demo
          </span>
          <a
            href={PAPERLOOP_DEMO_WATCH_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[10px] sm:text-[11px] text-[#F0A535] hover:text-[#EDE8DB] no-underline transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F0A535] rounded-sm"
          >
            YouTube ↗
          </a>
        </div>

        <div className="aspect-video w-full bg-[#0B1825]">
          <iframe
            title="PaperLoop product demo showing handwritten draft to editable question paper workflow"
            src={PAPERLOOP_DEMO_EMBED_URL}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full border-0"
            loading="lazy"
          />
        </div>
      </div>

      <p className="mt-4 font-sans text-[14px] sm:text-[15px] text-[#EDE8DB]/55 leading-[1.65] m-0">
        {WORKFLOW_LINE}
      </p>
      <p className="mt-2 font-sans text-[13px] sm:text-[14px] text-[#EDE8DB]/45 leading-[1.6] m-0">
        {PROOF_LINE}
      </p>
    </div>
  );
}
