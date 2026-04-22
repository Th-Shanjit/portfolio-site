'use client';

import { useReveal } from './useReveal';
import PricingCard from './PricingCard';

const NOTES = [
  { n: '01', label: 'Tokens never expire' },
  { n: '02', label: 'One token = one successful scan' },
  { n: '03', label: 'Refunded automatically on failure' },
];

export default function PricingSection() {
  useReveal();
  return (
    <section id="pricing" className="bg-[#F6F2EB] text-[#0B1825] py-24 md:py-28 px-[5%]">
      <div className="max-w-[1160px] mx-auto grid grid-cols-1 md:grid-cols-[300px_1fr] gap-12 md:gap-16 items-start">
        <div className="pl-reveal">
          <span className="font-mono text-[10px] text-[#CF8610] tracking-[0.2em] uppercase">
            Pricing
          </span>
          <h2 className="font-serif font-bold text-[#0B1825] leading-[1.07] tracking-[-0.02em] mt-3 text-[clamp(30px,4.2vw,46px)]">
            Pay for <em className="italic">successful scans.</em>
          </h2>
          <p className="font-sans text-[14px] text-[#0B1825]/65 leading-[1.7] mt-5 max-w-[280px]">
            No subscriptions. No auto-renewals. Buy tokens, use them when you need them.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

          <div className="col-span-full grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2">
            {NOTES.map((note) => (
              <div
                key={note.n}
                className="bg-white border border-[#DDD7CB] rounded-xl px-4 py-3.5 flex items-start gap-3"
              >
                <span className="font-mono text-[10px] text-[#CF8610] tracking-[0.2em]">{note.n}</span>
                <span className="font-sans text-[13px] text-[#0B1825]/75">{note.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
