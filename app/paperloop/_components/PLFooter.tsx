import Link from 'next/link';
import { Scan } from 'lucide-react';

const linkClass =
  'font-sans text-[14px] text-[#EDE8DB]/55 hover:text-[#EDE8DB] transition-colors no-underline min-h-[44px] inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F0A535] rounded-sm';

export default function PLFooter() {
  return (
    <footer className="bg-[#162436] border-t border-white/[0.06]">
      <div className="max-w-[1180px] mx-auto w-full px-[clamp(16px,5vw,48px)] py-8 flex flex-col sm:flex-row flex-wrap items-start sm:items-center justify-between gap-6">
        <Link href="/paperloop" className="flex items-center gap-2 no-underline" aria-label="PaperLoop home">
          <div className="w-8 h-8 rounded-lg bg-[#CF8610]/15 border border-[#CF8610]/30 flex items-center justify-center">
            <Scan size={15} className="text-[#F0A535]" aria-hidden />
          </div>
          <span className="font-serif font-bold text-[15px] text-[#EDE8DB]">
            Paper<span className="text-[#F0A535]">loop</span>
          </span>
        </Link>

        <nav className="flex flex-col sm:flex-row flex-wrap gap-1 sm:gap-5" aria-label="Footer">
          <Link href="/docs/termspaperloop" className={linkClass}>
            Terms
          </Link>
          <Link href="/docs/paperloopprivacy" className={linkClass}>
            Privacy
          </Link>
          <Link href="/paperloop/download" className={linkClass}>
            Closed beta
          </Link>
          <Link href="/" className={linkClass}>
            View portfolio
          </Link>
          <a href="mailto:contact@shanjitthokchom.xyz" className={linkClass}>
            Contact Shanjit
          </a>
        </nav>

        <span className="font-mono text-[11px] sm:text-[12px] text-[#EDE8DB]/35 tracking-[0.1em] uppercase">
          © {new Date().getFullYear()} PaperLoop
        </span>
      </div>
    </footer>
  );
}
