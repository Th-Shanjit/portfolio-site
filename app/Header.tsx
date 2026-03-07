'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { t } from '@/lib/design';

export default function Header() {
  const pathname = usePathname();

  if (pathname && pathname.startsWith('/paperloop')) {
    return null;
  }

  return (
    <header style={{ 
      position: 'absolute', top: 0, left: 0, right: 0, zIndex: 50,
      padding: '32px clamp(20px, 5vw, 64px)',
      display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 24,
      fontFamily: t.mono, fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase'
    }}>
      {[
        { name: 'Portfolio', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Data Room', path: '/docs' }
      ].map((link) => {
        const isActive = pathname === link.path || (link.name === 'Data Room' && pathname.startsWith('/docs'));
        return (
          <Link
            key={link.name}
            href={link.path}
            style={{
              color: isActive ? t.ink : t.inkFaint,
              textDecoration: 'none',
              transition: 'color 0.2s'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = t.ink)}
            onMouseLeave={(e) => (e.currentTarget.style.color = isActive ? t.ink : t.inkFaint)}
          >
            {link.name}
          </Link>
        );
      })}
    </header>
  );
}