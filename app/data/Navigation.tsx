'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cmsData } from './content';

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-zinc-100 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="font-medium text-sm tracking-wide flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-zinc-900 rounded-full"></span>
          {cmsData.site.name} <span className="text-zinc-400 hidden sm:inline ml-2">— {cmsData.site.role}</span>
        </Link>
        <div className="flex items-center gap-6">
          {[
            { name: 'portfolio', path: '/' },
            { name: 'about', path: '/about' },
            { name: 'docs', path: '/docs' }
          ].map((link) => {
            const isActive = pathname === link.path || (link.name === 'docs' && pathname.startsWith('/docs'));
            return (
              <Link
                key={link.name}
                href={link.path}
                className={`text-sm tracking-wide capitalize transition-all duration-300 relative py-2 ${
                  isActive ? 'text-zinc-900' : 'text-zinc-400 hover:text-zinc-900'
                }`}
              >
                {link.name}
                <span className={`absolute bottom-0 left-0 w-full h-[1px] bg-zinc-900 transform origin-left transition-transform duration-300 ${isActive ? 'scale-x-100' : 'scale-x-0'}`}></span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}