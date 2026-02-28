'use client';

import Link from 'next/link';
import { ArrowRight, ChevronRight } from 'lucide-react';
import data from '@/data/portfolio.json';
import { useEffect, useRef, useState } from 'react';

// --- MAGIC SCROLL REVEAL COMPONENT ---
function ScrollReveal({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      });
    }, { threshold: 0.15 }); 
    
    const current = domRef.current;
    if (current) observer.observe(current);
    return () => { if (current) observer.unobserve(current); };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function Home() {
  const portfolio = data as any; 
  const hotProject = portfolio.hero;

  return (
    <main className="w-full pb-40 pt-12 relative z-10 selection:bg-zinc-300">
      
      {/* 1. HERO: STATIC LAPTOP UI WITH ROTATED DP */}
      <section className="mb-40 flex justify-center px-12 md:px-24 pt-12">
        <ScrollReveal className="w-full max-w-4xl relative">
          
          {/* 🚀 NEW: 3x Larger, edge-to-edge watermark typography */}
          <div className="w-full mb-16 md:mb-20">
            <h1 
              className="text-2xl md:text-4xl lg:text-4xl font-bold uppercase text-zinc-500 flex justify-between w-full select-none"
              aria-label={portfolio.site?.name || "Shanjit Thokchom"}
            >
              {Array.from(portfolio.site?.name || "Shanjit Thokchom").map((char: any, i: number) => (
                char === ' ' ? (
                  // If it's a space between names, create a larger gap
                  <span key={i} className="w-4 md:w-8 lg:w-12"></span>
                ) : (
                  // If it's a letter, render it perfectly justified
                  <span key={i} aria-hidden="true">{char}</span>
                )
              ))}
            </h1>
          </div>

          {/* THE STATIC DP: Layered on top-left, rotated -25 degrees */}
          <div className="absolute top-8 -left-8 md:top-8 md:-left-16 z-50 w-28 h-28 md:w-36 md:h-36 rounded-full border-[6px] border-[#f5f5f7] shadow-xl overflow-hidden bg-zinc-200 flex items-center justify-center rotate-[-25deg]">
            {portfolio.site?.dpUrl ? (
              <img 
                src="/profile.jpg"
                alt="Profile" 
                className="absolute inset-0 w-full h-full object-cover" 
              />
            ) : (
              <span className="text-zinc-400 text-xs md:text-sm font-medium tracking-widest uppercase">DP</span>
            )}
          </div>

          {/* Laptop Screen Bezel */}
          <div className="absolute top-28 left-1/2 -translate-x-1/2 w-32 h-4 bg-zinc-900 rounded-b-xl z-20 flex justify-center items-end pb-1 md:top-[8.5rem] lg:top-[9rem]">
            <div className="w-1.5 h-1.5 rounded-full bg-zinc-700"></div>
          </div>

          {/* Laptop Screen Content */}
          <div className="relative w-full aspect-[16/10] bg-zinc-900 rounded-t-3xl border-[12px] border-zinc-900 shadow-2xl overflow-hidden flex flex-col p-8 md:p-12 items-start justify-end">
            
            {hotProject.coverImage && (
              <div className="absolute inset-0 z-0">
                <img 
                  src={hotProject.coverImage} 
                  alt="Laptop Wallpaper" 
                  className="w-full h-full object-cover opacity-60" 
                />
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50 pointer-events-none z-10"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-zinc-900/30 to-transparent pointer-events-none z-10"></div>
            
            <div className="relative z-20 text-white w-full max-w-2xl">
              <span className="text-[10px] md:text-xs font-mono text-zinc-300 mb-6 block uppercase tracking-widest px-4 py-2 bg-white/10 rounded-full backdrop-blur-md w-max border border-white/10">
                Primary Case Study
              </span>
              <h2 className="text-4xl md:text-6xl font-medium mb-6 tracking-tight leading-[1.1]">{hotProject.title}</h2>
              <p className="text-zinc-400 mb-10 text-base md:text-lg font-light leading-relaxed line-clamp-2">
                {hotProject.description}
              </p>
              <Link href={hotProject.link} className="inline-flex items-center gap-3 bg-white text-zinc-900 px-6 py-3 md:px-8 md:py-4 rounded-full text-xs md:text-sm font-semibold tracking-wide hover:bg-zinc-200 transition-colors">
                {hotProject.linkText} <ArrowRight size={16} />
              </Link>
            </div>
          </div>
          
          {/* Laptop Base */}
          <div className="w-[110%] -ml-[5%] h-5 bg-gradient-to-b from-zinc-300 to-zinc-400 rounded-b-2xl shadow-xl border-t border-zinc-400 relative flex justify-center">
            <div className="w-32 h-2 bg-zinc-400 rounded-b-md absolute top-0"></div>
          </div>
        </ScrollReveal>
      </section>

      {/* 2. CENTERED 2x2 BENTO BOX GRID */}
      <section className="mb-40 max-w-3xl mx-auto px-6">
        <ScrollReveal>
          {/* 🚀 FIX: Centered, larger H2 heading */}
          <div className="flex items-center justify-center mb-12">
            <h2 className="text-3xl font-semibold text-zinc-900 tracking-tight">Architecture & Case Studies</h2>
          </div>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {portfolio.highlightedProjects.map((project: any, index: number) => {
            const realDoc = portfolio.docs.find((d: any) => d.id === project.id);
            const title = realDoc ? realDoc.title : project.title;
            const category = realDoc ? realDoc.type : project.category;
            const targetUrl = `/docs/${project.id}`;
            
            const description = realDoc && realDoc.content[0] 
              ? realDoc.content[0] 
              : "Detailed breakdown of system logic and execution.";

            return (
              <ScrollReveal key={project.id} delay={index * 150}>
                <Link href={targetUrl} className="group relative glass-panel rounded-[2.5rem] hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 flex flex-col p-10 aspect-square justify-between overflow-hidden">
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <span className="text-[9px] font-bold text-zinc-500 tracking-widest uppercase bg-white/80 px-3 py-1.5 rounded-full border border-zinc-100 shadow-sm">{category}</span>
                      <ArrowRight size={18} className="text-zinc-300 group-hover:text-zinc-900 group-hover:-rotate-45 transition-all duration-300" />
                    </div>
                    <h3 className="text-2xl font-semibold text-zinc-900 mb-4 tracking-tight line-clamp-1">{title}</h3>
                    <p className="text-sm text-zinc-500 font-light leading-relaxed line-clamp-3">
                      {description}
                    </p>
                  </div>

                  <div className="flex items-center text-[10px] text-zinc-400 font-medium uppercase tracking-widest group-hover:text-zinc-900 transition-colors">
                    View Breakdown <ChevronRight size={12} className="ml-1" />
                  </div>
                </Link>
              </ScrollReveal>
            );
          })}
          
          {/* Final square slot: Full Archive link */}
          <ScrollReveal delay={450}>
            <Link href="/docs" className="glass-panel rounded-[2.5rem] p-10 group hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 flex flex-col items-center justify-center text-center aspect-square border-dashed border-2 border-zinc-200 bg-transparent">
              <div className="w-12 h-12 bg-zinc-900 rounded-full flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform duration-500">
                <ArrowRight size={20} className="text-white group-hover:translate-x-1 transition-transform" />
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 tracking-tight">Full Archive</h3>
              <p className="text-[10px] text-zinc-400 mt-2 font-light max-w-[140px] leading-relaxed uppercase tracking-widest">Access the complete Data Room</p>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* 3. CONTACT GLASS CARD */}
      <section className="flex justify-center px-6">
        <ScrollReveal>
          <div className="glass-panel rounded-[2.5rem] p-12 md:p-16 text-center max-w-2xl w-full flex flex-col items-center shadow-xl border border-white/60 bg-white/30 backdrop-blur-xl">
            <div className="w-16 h-1 bg-zinc-900 rounded-full mb-8"></div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-6 text-zinc-900">{portfolio.contact.heading}</h2>
            <p className="text-zinc-500 mb-10 text-base md:text-lg font-light max-w-md leading-relaxed">
              Open to collaborating on Agentic AI product development and technical strategy.
            </p>
            <a 
              href={`mailto:${portfolio.contact.email}`}
              className="bg-zinc-900 text-white px-8 py-4 rounded-full text-sm font-medium tracking-wide hover:bg-zinc-700 hover:scale-105 hover:shadow-xl transition-all duration-300"
            >
              {portfolio.contact.email}
            </a>
          </div>
        </ScrollReveal>
      </section>

    </main>
  );
}