'use client';

import { motion } from 'framer-motion';
import { easeOut, useReducedMotion } from '@/lib/motion';

export default function Template({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: reduced ? 0 : 0.45,
        ease: easeOut,
      }}
    >
      {children}
    </motion.div>
  );
}
