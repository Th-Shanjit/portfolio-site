'use client';

import { PAPERLOOP_DEMO_EMBED_URL, PAPERLOOP_DEMO_WATCH_URL } from '../constants';

const WORKFLOW_LINE =
  'Watch the demo to see the workflow from handwritten draft → scan/upload → AI extraction → review/edit → PDF-ready output.';

export default function HeroVisual() {
  return (
    <div id="demo" className="pl-reveal relative mt-4 md:mt-0">
      <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#162436] shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
        <div className="bg-white/[0.04] border-b border-white/[0.07] px-4 py-2.5 flex items-center justify-between">
          <div className="flex gap-1.5">
            <span className="w-[9px] h-[9px] rounded-full bg-[#ff5f56]/70" />
            <span className="w-[9px] h-[9px] rounded-full bg-[#ffbd2e]/70" />
            <span className="w-[9px] h-[9px] rounded-full bg-[#27c93f]/70" />
          </div>
          <span className="font-mono text-[10px] text-[#EDE8DB]/40 tracking-[0.1em]">
            paperloop · product demo
          </span>
          <a
            href={PAPERLOOP_DEMO_WATCH_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[10px] text-[#F0A535] hover:text-[#EDE8DB] no-underline transition-colors"
          >
            YouTube ↗
          </a>
        </div>

        <div className="aspect-video w-full bg-[#0B1825]">
          <iframe
            title="PaperLoop product demo"
            src={PAPERLOOP_DEMO_EMBED_URL}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full border-0"
          />
        </div>
      </div>

      <p className="mt-4 font-sans text-[13px] text-[#EDE8DB]/50 leading-[1.65] m-0">
        {WORKFLOW_LINE}
      </p>
    </div>
  );
}
