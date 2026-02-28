'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

// Default to 1 (the middle 'Portfolio' page)
let previousIndex = 1; 
const routeOrder = ['/about', '/', '/docs'];

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  const currentBase = pathname.startsWith('/docs') ? '/docs' : pathname;
  const currentIndex = routeOrder.indexOf(currentBase) !== -1 ? routeOrder.indexOf(currentBase) : 1;
  
  const isGoingRight = currentIndex >= previousIndex;
  const slideClass = isGoingRight ? 'slide-in-from-right-16' : 'slide-in-from-left-16';

  // 🚀 FIX 1: We update the tracker inside a useEffect so it ONLY runs on the client 
  // AFTER the render is completely finished. This prevents the Server from getting confused.
  useEffect(() => {
    previousIndex = currentIndex;
  }, [currentIndex]);

  return (
    // 🚀 FIX 2: suppressHydrationWarning tells Next.js to ignore the initial server/client class mismatch
    <div 
      suppressHydrationWarning
      className={`animate-in fade-in ${slideClass} duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)]`}
    >
      {children}
    </div>
  );
}