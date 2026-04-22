'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LINKS = [
  { name: 'Work', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Writing', path: '/docs' },
];

export default function Header() {
  const pathname = usePathname();

  if (
    pathname &&
    (pathname.startsWith('/paperloop') ||
      pathname.startsWith('/admin') ||
      pathname.startsWith('/login'))
  ) {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-end gap-6 px-[clamp(20px,5vw,64px)] py-6 bg-[#f8f4ef]/85 backdrop-blur-xl border-b border-[#ede8e1] font-mono text-[10px] tracking-[0.1em] uppercase">
      {LINKS.map((link) => {
        const isActive =
          pathname === link.path ||
          (link.name === 'Writing' && pathname?.startsWith('/docs'));
        return (
          <Link
            key={link.name}
            href={link.path}
            className={`no-underline transition-colors ${
              isActive ? 'text-[#1c1916]' : 'text-[#b8b2aa] hover:text-[#1c1916]'
            }`}
          >
            {link.name}
          </Link>
        );
      })}
    </header>
  );
}
