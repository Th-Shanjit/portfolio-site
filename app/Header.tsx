'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ResumeButton from './_components/ResumeButton';
import { HERO_CONTENT } from '@/data/portfolio-static';
import { scrollToSection } from '@/lib/scroll-to-section';

const SECTIONS = [
  { name: 'Work', id: 'work' },
  { name: 'Notes', id: 'notes' },
  { name: 'About', id: 'about' },
  { name: 'Contact', id: 'contact' },
] as const;

const HIDDEN_PREFIXES = ['/paperloop'];

function SectionNavLink({
  id,
  name,
  active,
}: {
  id: string;
  name: string;
  active: boolean;
}) {
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === '/') {
      e.preventDefault();
      scrollToSection(id);
    }
  };

  return (
    <Link
      href={`/#${id}`}
      onClick={handleClick}
      className={`no-underline transition-colors text-[14px] font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF6B35] ${
        active ? 'text-[#161616]' : 'text-[#9A9489] hover:text-[#161616]'
      }`}
    >
      {name}
    </Link>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const isHome = pathname === '/';
  const hidden = pathname ? HIDDEN_PREFIXES.some((p) => pathname.startsWith(p)) : false;

  useEffect(() => {
    if (!isHome || hidden) return;

    const ids = SECTIONS.map((s) => s.id);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isHome, hidden]);

  useEffect(() => {
    if (!isHome || hidden) return;

    const onScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(scrollHeight > 0 ? (window.scrollY / scrollHeight) * 100 : 0);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHome, hidden]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  if (hidden) {
    return null;
  }

  const isActive = (sectionId: string) => isHome && activeSection === sectionId;

  const mobileLinkClass = (sectionId: string) =>
    `no-underline transition-colors text-[14px] font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF6B35] ${
      isActive(sectionId) ? 'text-[#161616]' : 'text-[#9A9489] hover:text-[#161616]'
    }`;

  const handleMobileNav = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (pathname === '/') {
      e.preventDefault();
      scrollToSection(id);
      setMobileOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#F7F3EA]/88 backdrop-blur-md border-b border-[rgba(22,22,22,0.08)]">
      <div className="max-w-[1080px] mx-auto px-[clamp(20px,5vw,64px)] h-14 md:h-16 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="font-[family-name:var(--font-heading)] text-[15px] font-medium text-[#161616] no-underline tracking-[-0.02em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF6B35]"
        >
          ST
        </Link>

        <nav
          aria-label="Main navigation"
          className="hidden md:flex items-center gap-8 font-sans"
        >
          {SECTIONS.map((link) => (
            <SectionNavLink
              key={link.name}
              id={link.id}
              name={link.name}
              active={isActive(link.id)}
            />
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <ResumeButton href={HERO_CONTENT.resumeUrl} label="Resume" source="header" />
          </div>

          <button
            type="button"
            className="md:hidden font-sans text-[14px] font-medium text-[#161616] px-2 py-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6B35]"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>

      {isHome && (
        <div
          className="absolute bottom-0 left-0 h-[2px] bg-[#FF6B35] motion-safe:transition-[width] motion-safe:duration-150"
          style={{ width: `${scrollProgress}%` }}
          aria-hidden
        />
      )}

      {mobileOpen && (
        <nav
          id="mobile-nav"
          aria-label="Mobile navigation"
          className="md:hidden border-t border-[rgba(22,22,22,0.08)] bg-[#F7F3EA] px-[clamp(20px,5vw,64px)] py-4 flex flex-col gap-4 font-sans text-[14px] font-medium"
        >
          {SECTIONS.map((link) => (
            <Link
              key={link.name}
              href={`/#${link.id}`}
              className={mobileLinkClass(link.id)}
              onClick={(e) => handleMobileNav(e, link.id)}
            >
              {link.name}
            </Link>
          ))}
          <ResumeButton href={HERO_CONTENT.resumeUrl} label="Resume" source="header_mobile" />
        </nav>
      )}
    </header>
  );
}
