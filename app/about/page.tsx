'use client';

import { MapPin, GraduationCap, Code2, Sparkles, Scale } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import data from '@/data/portfolio.json';

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
      className={`transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] h-full ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function About() {
  // 🚀 Safely load the dynamic about data from your JSON database
  const about = (data as any).about;

  return (
    <main className="w-full pb-40 pt-32 relative z-10 selection:bg-zinc-300">
      
      <div className="max-w-4xl mx-auto px-6 mb-12">
        <ScrollReveal>
          {/* 🚀 DYNAMIC HEADER */}
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-zinc-900 mb-4">{about.heading}</h1>
          <p className="text-zinc-500 font-light text-lg">{about.subheading}</p>
        </ScrollReveal>
      </div>

      {/* THE TIGHTENED BENTO GRID */}
      <div className="max-w-4xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* 1. THE ORIGIN (Spans 2 columns) */}
        <ScrollReveal delay={100} className="md:col-span-2">
          <div className="glass-panel h-full rounded-[2.5rem] p-10 flex flex-col justify-between group hover:shadow-2xl transition-all duration-500 overflow-hidden">
            <div>
              <div className="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center mb-6 shadow-md">
                <Scale size={18} className="text-white" />
              </div>
              {/* 🚀 DYNAMIC ORIGIN TITLE */}
              <h2 className="text-2xl font-semibold text-zinc-900 mb-3 tracking-tight">{about.originTitle}</h2>
              {/* 🚀 DYNAMIC ORIGIN TEXT */}
              <p className="text-zinc-500 font-light leading-relaxed text-sm md:text-base">{about.originText}</p>
            </div>
          </div>
        </ScrollReveal>

        {/* 2. BASE OF OPERATIONS (Square) */}
        <ScrollReveal delay={200} className="md:col-span-1">
          <div className="glass-panel h-full rounded-[2.5rem] p-10 flex flex-col items-center justify-center text-center group hover:shadow-2xl transition-all duration-500 relative overflow-hidden min-h-[250px]">
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-100 to-transparent opacity-50 z-0"></div>
            <div className="relative z-10 flex flex-col items-center">
              <MapPin size={32} className="text-zinc-900 mb-4 group-hover:-translate-y-2 transition-transform duration-500" />
              {/* 🚀 DYNAMIC LOCATION */}
              <h3 className="text-lg font-semibold text-zinc-900 tracking-tight">{about.location}</h3>
              <p className="text-xs text-zinc-400 uppercase tracking-widest mt-2">Current Base</p>
            </div>
          </div>
        </ScrollReveal>

        {/* 3. EDUCATION & ACCELERATION (Square) */}
        <ScrollReveal delay={300} className="md:col-span-1">
          <div className="glass-panel h-full rounded-[2.5rem] p-10 flex flex-col justify-between group hover:shadow-2xl transition-all duration-500 bg-zinc-900 border-none text-white min-h-[250px]">
            <GraduationCap size={24} className="text-zinc-300 mb-4" />
            <div>
              {/* 🚀 DYNAMIC EDUCATION DATA */}
              <h3 className="text-xl font-medium mb-2 leading-tight">{about.educationTitle}</h3>
              <p className="text-zinc-400 text-sm font-light mb-6">{about.educationSubtitle}</p>
              <span className="text-[9px] font-bold text-zinc-900 bg-white px-3 py-1.5 rounded-full uppercase tracking-widest">Alumni</span>
            </div>
          </div>
        </ScrollReveal>

        {/* 4. CURRENT FOCUS / STACK (Spans 2 columns) */}
        <ScrollReveal delay={400} className="md:col-span-2">
          <div className="glass-panel h-full rounded-[2.5rem] p-10 flex flex-col justify-between group hover:shadow-2xl transition-all duration-500 overflow-hidden">
            <div className="flex justify-between items-start mb-6">
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-zinc-100 rounded-2xl flex items-center justify-center shadow-sm border border-zinc-200">
                  <Sparkles size={18} className="text-zinc-700" />
                </div>
                <div className="w-10 h-10 bg-zinc-100 rounded-2xl flex items-center justify-center shadow-sm border border-zinc-200">
                  <Code2 size={18} className="text-zinc-700" />
                </div>
              </div>
              <span className="text-[9px] font-bold text-zinc-500 tracking-widest uppercase bg-white/80 px-3 py-1.5 rounded-full border border-zinc-100">Stack & Focus</span>
            </div>
            
            <div>
              {/* 🚀 DYNAMIC FOCUS TITLE */}
              <h2 className="text-2xl font-semibold text-zinc-900 mb-3 tracking-tight">{about.focusTitle}</h2>
              {/* 🚀 DYNAMIC FOCUS TEXT */}
              <p className="text-zinc-500 font-light leading-relaxed text-sm md:text-base">{about.focusText}</p>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </main>
  );
}