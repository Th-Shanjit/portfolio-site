'use client';

import Image from 'next/image';
import { MOOD_BOARD_BRAND_LOGOS } from '@/data/portfolio-static';

export default function ProofStrip() {
  const logos = [...MOOD_BOARD_BRAND_LOGOS, ...MOOD_BOARD_BRAND_LOGOS];

  return (
    <section
      aria-label="Tools and platforms"
      className="max-w-[1080px] mx-auto px-[clamp(20px,5vw,64px)] pb-14 md:pb-16 overflow-hidden"
    >
      <div className="border-y border-[rgba(22,22,22,0.08)] py-5 md:py-6">
        <div className="relative flex overflow-hidden">
          <div className="flex animate-marquee gap-12 md:gap-16 items-center whitespace-nowrap">
            {logos.map((logo, i) => (
              <div
                key={`${logo.name}-${i}`}
                className="flex items-center gap-3 shrink-0 opacity-70 hover:opacity-100 transition-opacity"
              >
                <Image
                  src={logo.iconPath}
                  alt=""
                  width={24}
                  height={24}
                  className="dark:invert"
                  aria-hidden
                />
                <span className="font-sans text-[14px] md:text-[15px] text-[#6F6A61] font-medium">
                  {logo.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
