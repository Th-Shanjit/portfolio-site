'use client';

import { motion } from 'framer-motion';
import { PROOF_POINTS } from '@/data/portfolio-static';
import { easeOut, useReducedMotion } from '@/lib/motion';

export default function ProofStrip() {
  const reduced = useReducedMotion();

  if (PROOF_POINTS.length === 0) {
    return null;
  }

  return (
    <section
      aria-label="Proof points"
      className="max-w-[1080px] mx-auto px-[clamp(20px,5vw,64px)] pb-12 md:pb-14"
    >
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.25, ease: easeOut }}
        className="border-y border-[rgba(22,22,22,0.08)] py-4 md:py-5"
      >
        <ul className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 sm:gap-x-0 m-0 p-0 list-none">
          {PROOF_POINTS.map((point, i) => (
            <li key={point} className="flex items-center sm:contents">
              <span className="font-sans text-[14px] md:text-[15px] text-[#6F6A61] leading-snug">
                {point}
              </span>
              {i < PROOF_POINTS.length - 1 && (
                <span
                  className="hidden sm:inline mx-4 md:mx-5 font-sans text-[14px] text-[#C8C2B8] select-none"
                  aria-hidden
                >
                  ·
                </span>
              )}
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
