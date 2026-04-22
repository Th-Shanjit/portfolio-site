'use client';

import { useEffect, useState } from 'react';

export default function DocReaderClient({ slug }: { slug: string }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    fetch(`/api/views/${slug}`, { method: 'POST' }).catch(() => {});
  }, [slug]);

  useEffect(() => {
    const update = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) setProgress((window.scrollY / scrollHeight) * 100);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[3px] z-[100] pointer-events-none">
      <div
        className="h-full bg-[#c8873c] transition-[width] duration-100"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
