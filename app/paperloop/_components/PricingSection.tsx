'use client';

import { useReveal } from './useReveal';
import PricingCard from './PricingCard';
import { PLButtonPrimary, PLButtonSecondary } from './pl-ui';

const NOTES = [
  { n: '01', label: '1 token = 1 successful page scan' },
  { n: '02', label: 'Failed scans do not consume credits' },
  { n: '03', label: 'Tokens never expire' },
];

export default function PricingSection() {
  useReveal();
  return (
    <section id="pricing" className="bg-[#F6F2EB] text-[#0B1825] py-14 sm:py-20 md:py-24 lg:py-28">
      <div className="max-w-[1180px] mx-auto w-full px-[clamp(16px,5vw,48px)]">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,280px)_1fr] gap-10 lg:gap-14 items-start">
          <div className="pl-reveal min-w-0">
            <span className="font-mono text-[11px] sm:text-[12px] text-[#CF8610] tracking-[0.18em] uppercase">
              Pricing & beta
            </span>
            <h2 className="font-serif font-bold text-[#0B1825] leading-[1.08] tracking-[-0.02em] mt-3 text-[clamp(1.75rem,4vw,2.75rem)]">
              Pay for <em className="italic">successful scans.</em>
            </h2>
            <p className="font-sans text-[16px] text-[#0B1825]/70 leading-[1.7] mt-5 max-w-[22rem]">
              Simple scan credits for the Android closed beta. Free trial credits to start; paid packs
              when you need more. Failed scans should not consume credits.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3">
              <PLButtonPrimary className="w-full sm:w-auto" />
              <PLButtonSecondary onLight className="w-full sm:w-auto" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 min-w-0">
            <PricingCard
              name="Starter Pack"
              tokens="10"
              unit="scan tokens"
              price="₹99"
              strike="₹149"
              perScan="₹9.90 per scan"
              save="Save ₹50"
            />
            <PricingCard
              name="Power Pack"
              tokens="50"
              unit="scan tokens"
              price="₹399"
              strike="₹499"
              perScan="₹7.98 per scan"
              save="Save ₹100"
              featured
            />

            <div className="col-span-full grid grid-cols-1 sm:grid-cols-3 gap-3 mt-1">
              {NOTES.map((note) => (
                <div
                  key={note.n}
                  className="bg-white border border-[#DDD7CB] rounded-xl px-4 py-4 flex items-start gap-3"
                >
                  <span className="font-mono text-[11px] text-[#CF8610] tracking-[0.16em] shrink-0">
                    {note.n}
                  </span>
                  <span className="font-sans text-[14px] sm:text-[15px] text-[#0B1825]/75 leading-snug">
                    {note.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
