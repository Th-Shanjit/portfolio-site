'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-4 duration-1000">
      
      {/* 🚀 FIX: Darkened the border (border-zinc-200) and increased opacity (bg-white/70) for high visibility */}
      <div className="bg-white/70 backdrop-blur-2xl border border-zinc-200 shadow-xl shadow-zinc-200/50 rounded-full px-8 py-3 flex items-center gap-8 transition-all duration-300">
        
      {[
          { name: 'about', path: '/about' },
          { name: 'portfolio', path: '/' },
          { name: 'docs', path: '/docs' }
        ].map((link) => {
          const isActive = pathname === link.path || (link.name === 'docs' && pathname.startsWith('/docs'));
          
          return (
            <Link
              key={link.name}
              href={link.path}
              className={`text-xs tracking-widest uppercase font-semibold transition-all duration-300 relative py-1 ${
                isActive ? 'text-zinc-900' : 'text-zinc-400 hover:text-zinc-900'
              }`}
            >
              {link.name}
              
              <span 
                className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-zinc-900 transition-all duration-300 ${
                  isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                }`}
              ></span>
            </Link>
          );
        })}
        
      </div>
    </nav>
  );
} 