'use client';

import { motion } from 'framer-motion';
import { PROOF_STRIP } from '@/lib/home-content';
import { easeOut, useReducedMotion } from '@/lib/motion';

export default function ProofStrip() {
  const reduced = useReducedMotion();

  return (
    <section
      aria-label="Proof points"
      className="max-w-[1080px] mx-auto px-[clamp(20px,5vw,64px)] pb-14 md:pb-16"
    >
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.35, ease: easeOut }}
        className="border-y border-[rgba(22,22,22,0.08)] py-4 md:py-5"
      >
        <p className="font-sans text-[14px] md:text-[15px] text-[#6F6A61] leading-[1.65] m-0">
          {PROOF_STRIP.join(' · ')}
        </p>
      </motion.div>
    </section>
  );
}
