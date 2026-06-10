'use client';

import { useEffect } from 'react';

export default function RedirectToSection({ section }: { section: string }) {
  useEffect(() => {
    window.location.replace(`/#${section}`);
  }, [section]);

  return (
    <div className="min-h-screen bg-[#F7F3EA] flex items-center justify-center px-6">
      <p className="font-sans text-[15px] text-[#6F6A61] m-0">Taking you to the portfolio…</p>
    </div>
  );
}
