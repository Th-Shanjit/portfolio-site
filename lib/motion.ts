'use client';

import { useEffect, useState } from 'react';

export const easeOut = [0.16, 1, 0.3, 1] as const;

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return reduced;
}

export function motionDuration(reduced: boolean, ms: number): number {
  return reduced ? 0 : ms / 1000;
}
