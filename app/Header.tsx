'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { t } from '@/lib/design';

export default function Header() {
  const pathname = usePathname();

  if (pathname && (pathname.startsWith('/paperloop') || pathname.startsWith('/admin') || pathname.startsWith('/login'))) {
    return null;
  }

  return (
    <header style={{ 
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      padding: '24px clamp(20px, 5vw, 64px)',
      display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 24,
      fontFamily: t.mono, fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase',
      background: 'rgba(248, 244, 239, 0.85)',
      backdropFilter: 'blur(12px)',
      borderBottom: `1px solid ${t.borderFaint}`
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