'use client';

import { useState } from 'react';

export default function HomeAvatar({ src, alt }: { src: string; alt: string }) {
  const [errored, setErrored] = useState(false);
  const initial = alt.charAt(0).toUpperCase() || 'S';

  if (errored) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#e8d9c8] to-[#d4c4b0]">
        <span className="font-serif text-[36px] text-[#8a7060]">{initial}</span>
      </div>
    );
  }

  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover"
      onError={() => setErrored(true)}
    />
  );
}
