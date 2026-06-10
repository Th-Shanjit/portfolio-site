'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { scrollToSectionFromHash } from '@/lib/scroll-to-section';

export default function HashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== '/') return;
    scrollToSectionFromHash();
  }, [pathname]);

  useEffect(() => {
    if (pathname !== '/') return;

    const onHashChange = () => scrollToSectionFromHash();
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, [pathname]);

  return null;
}
