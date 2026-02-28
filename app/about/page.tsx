'use client';

import { MapPin, GraduationCap, Code2, Sparkles, Scale, Briefcase, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import data from '@/data/portfolio.json';

function ScrollReveal({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setVisible(true);
      });
    }, { threshold: 0.15 }); 
    
    const current = domRef.current;
    if (current) observer.observe(current);
    return () => { if (current) observer.unobserve(current); };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function About() {
  const about = (data as any).about;
  const experience = (data as any).experience || [];
  const bio = (data as any).bio || [];

  return (
    <main className="w-full pb-40 pt-24 relative z-10 selection:bg-zinc-300">
      
      {/* HEADER */}
      <div className="max-w-4xl mx-auto px-6 mb-16">
        <ScrollReveal>
          <h1 className="text-4xl md:text-6xl font-medium tracking-tight text-zinc-900 mb-6">{about.heading}</h1>
          <p className="text-zinc-500 font-light text-xl max-w-2xl leading-relaxed">{about.subheading}</p>
        </ScrollReveal>
      </div>

      {/* BENTO GRID */}
      <div className="max-w-4xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
        
        <ScrollReveal delay={100} className="md:col-span-2">
          <div className="glass-panel h-full rounded-[2.5rem] p-10 flex flex-col justify-between group hover:shadow-2xl transition-all duration-500">
            <div>
              <div className="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center mb-6">
                <Scale size={18} className="text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-zinc-900 mb-3 tracking-tight">{about.originTitle}</h2>
              <p className="text-zinc-500 font-light leading-relaxed">{about.originText}</p>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200} className="md:col-span-1">
          <div className="glass-panel h-full rounded-[2.5rem] p-10 flex flex-col items-center justify-center text-center group hover:shadow-2xl transition-all duration-500 min-h-[250px]">
            <MapPin size={32} className="text-zinc-900 mb-4 group-hover:-translate-y-2 transition-transform duration-500" />
            <h3 className="text-lg font-semibold text-zinc-900 tracking-tight">{about.location}</h3>
            <p className="text-xs text-zinc-400 uppercase tracking-widest mt-2">Current Base</p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={300} className="md:col-span-1">
          <div className="glass-panel h-full rounded-[2.5rem] p-10 flex flex-col justify-between group hover:shadow-2xl transition-all duration-500 bg-zinc-900 border-none text-white min-h-[250px]">
            <GraduationCap size={24} className="text-zinc-300 mb-4" />
            <div>
              <h3 className="text-xl font-medium mb-2 leading-tight">{about.educationTitle}</h3>
              <p className="text-zinc-400 text-sm font-light mb-6">{about.educationSubtitle}</p>
              <span className="text-[9px] font-bold text-zinc-900 bg-white px-3 py-1.5 rounded-full uppercase tracking-widest">Alumni</span>
            </div>
          </div>
        </ScrollReveal>

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
              <h2 className="text-2xl font-semibold text-zinc-900 mb-3 tracking-tight">{about.focusTitle}</h2>
              <p className="text-zinc-500 font-light leading-relaxed">{about.focusText}</p>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* 🚀 NEW SECTION: THE NARRATIVE BIO */}
      <div className="max-w-4xl mx-auto px-6 mb-24">
        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-zinc-200 pt-16">
            <div className="md:col-span-1">
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">Narrative</h2>
            </div>
            <div className="md:col-span-2 space-y-8">
              {bio.map((paragraph: string, i: number) => (
                <p key={i} className="text-lg font-light text-zinc-600 leading-relaxed">{paragraph}</p>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* 🚀 NEW SECTION: THE TIMELINE */}
      <div className="max-w-4xl mx-auto px-6">
        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-zinc-200 pt-16">
            <div className="md:col-span-1">
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">Experience</h2>
            </div>
            <div className="md:col-span-2 space-y-4">
              {experience.map((exp: any, i: number) => (
                <div key={i} className="group flex items-center justify-between p-6 bg-white/30 border border-zinc-100 rounded-[1.5rem] hover:bg-white/60 transition-all duration-300">
                  <div className="flex items-center gap-6">
                    <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400 group-hover:bg-zinc-900 group-hover:text-white transition-all duration-500">
                      <Briefcase size={18} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-zinc-900">{exp.role}</h4>
                      <p className="text-sm text-zinc-400">{exp.company}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold tracking-widest uppercase text-zinc-400">{exp.year}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>

    </main>
  );
}