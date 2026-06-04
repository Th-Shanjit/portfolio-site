'use client';

import { Play } from 'lucide-react';
import { useReveal } from './useReveal';
import { PAPERLOOP_DEMO_VIDEO_ID, PAPERLOOP_DEMO_WATCH_URL } from '../constants';

const WORKFLOW_LINE =
  'Watch the demo to see the workflow from handwritten draft → scan/upload → AI extraction → review/edit → PDF-ready output.';

export default function DemoSection() {
  useReveal();
  const hasEmbed = Boolean(PAPERLOOP_DEMO_VIDEO_ID);

  return (
    <section id="demo" className="py-20 md:py-24 px-[5%] border-t border-white/[0.06]">
      <div className="max-w-[1160px] mx-auto">
        <div className="pl-reveal max-w-[720px] mb-8">
          <span className="font-mono text-[10px] text-[#F0A535] tracking-[0.2em] uppercase">
            Product demo
          </span>
          <h2 className="font-serif font-bold text-[#EDE8DB] leading-[1.07] tracking-[-0.02em] mt-3 text-[clamp(28px,4vw,42px)]">
            See the full workflow <em className="italic text-[#F0A535]">end to end.</em>
          </h2>
          <p className="font-sans text-[14px] md:text-[15px] text-[#EDE8DB]/55 leading-[1.7] mt-4 m-0">
            {WORKFLOW_LINE}
          </p>
        </div>

        <div className="pl-reveal relative rounded-2xl overflow-hidden border border-white/10 bg-[#162436] shadow-[0_24px_64px_rgba(0,0,0,0.45)]">
          {hasEmbed ? (
            <div className="aspect-video w-full">
              <iframe
                title="PaperLoop product demo"
                src={`https://www.youtube.com/embed/${PAPERLOOP_DEMO_VIDEO_ID}?rel=0`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>
          ) : (
            <div className="aspect-video w-full flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-[#1F3248] to-[#162436]">
              <div className="w-16 h-16 rounded-full bg-[#CF8610] flex items-center justify-center shadow-[0_0_0_12px_rgba(207,134,16,0.12),0_6px_24px_rgba(207,134,16,0.35)]">
                <Play size={26} className="text-white ml-1" fill="white" />
              </div>
              <span className="font-mono text-[10px] text-[#EDE8DB]/45 tracking-[0.14em] uppercase">
                Product walkthrough
              </span>
              {PAPERLOOP_DEMO_WATCH_URL ? (
                <a
                  href={PAPERLOOP_DEMO_WATCH_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-[13px] text-[#F0A535] hover:text-[#EDE8DB] no-underline transition-colors"
                >
                  Watch on YouTube
                </a>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
