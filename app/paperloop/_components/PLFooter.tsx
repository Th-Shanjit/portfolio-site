import Link from 'next/link';
import { Scan } from 'lucide-react';

export default function PLFooter() {
  return (
    <footer className="bg-[#162436] border-t border-white/[0.06] px-[5%] py-7 flex flex-wrap items-center justify-between gap-4">
      <Link href="/paperloop" className="flex items-center gap-2 no-underline" aria-label="PaperLoop home">
        <div className="w-8 h-8 rounded-lg bg-[#CF8610]/15 border border-[#CF8610]/30 flex items-center justify-center">
          <Scan size={15} className="text-[#F0A535]" />
        </div>
        <span className="font-serif font-bold text-[15px] text-[#EDE8DB]">
          Paper<span className="text-[#F0A535]">loop</span>
        </span>
      </Link>

      <div className="flex flex-wrap gap-5">
        <Link
          href="/docs/termspaperloop"
          className="font-sans text-[13px] text-[#EDE8DB]/55 hover:text-[#EDE8DB] transition-colors no-underline"
        >
          Terms
        </Link>
        <Link
          href="/docs/paperloopprivacy"
          className="font-sans text-[13px] text-[#EDE8DB]/55 hover:text-[#EDE8DB] transition-colors no-underline"
        >
          Privacy
        </Link>
        <Link
          href="/paperloop/download"
          className="font-sans text-[13px] text-[#EDE8DB]/55 hover:text-[#EDE8DB] transition-colors no-underline"
        >
          Download
        </Link>
        <Link
          href="/"
          className="font-sans text-[13px] text-[#EDE8DB]/55 hover:text-[#EDE8DB] transition-colors no-underline"
        >
          Made by Shanjit
        </Link>
      </div>

      <span className="font-mono text-[10px] text-[#EDE8DB]/30 tracking-[0.12em] uppercase">
        © {new Date().getFullYear()} PaperLoop
      </span>
    </footer>
  );
}
