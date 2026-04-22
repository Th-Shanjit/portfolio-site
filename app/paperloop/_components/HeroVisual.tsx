'use client';

import { Check } from 'lucide-react';

export default function HeroVisual() {
  return (
    <div className="pl-reveal relative mt-4 md:mt-0">
      <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#162436] shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
        <div className="bg-white/[0.04] border-b border-white/[0.07] px-4 py-2.5 flex items-center justify-between">
          <div className="flex gap-1.5">
            <span className="w-[9px] h-[9px] rounded-full bg-[#ff5f56]/70" />
            <span className="w-[9px] h-[9px] rounded-full bg-[#ffbd2e]/70" />
            <span className="w-[9px] h-[9px] rounded-full bg-[#27c93f]/70" />
          </div>
          <span className="font-mono text-[10px] text-[#EDE8DB]/40 tracking-[0.1em]">
            paperloop · live demo
          </span>
          <span className="font-mono text-[10px] text-[#0B7A70]">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#0B7A70] mr-1 animate-[pl-pulse_2s_infinite]" />
            recording
          </span>
        </div>

        <div className="aspect-[16/10] bg-gradient-to-br from-[#1F3248] to-[#162436] relative flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-[#CF8610] flex items-center justify-center shadow-[0_0_0_14px_rgba(207,134,16,0.12),0_8px_32px_rgba(207,134,16,0.4)] animate-[pl-float_3s_ease-in-out_infinite]">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="white" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <span className="absolute bottom-4 font-mono text-[10px] text-[#EDE8DB]/40 tracking-[0.15em] uppercase">
            Watch a 40-second walkthrough
          </span>
        </div>

        <div className="bg-white/[0.04] border-t border-white/[0.07] px-4 py-2.5 flex items-center justify-between">
          <span className="font-mono text-[10px] text-[#EDE8DB]/50">1 draft → 1 PDF</span>
          <span className="inline-flex items-center gap-1 font-mono text-[10px] text-[#0B7A70] font-medium">
            <Check size={11} strokeWidth={2.5} /> No retyping
          </span>
        </div>
      </div>
    </div>
  );
}
