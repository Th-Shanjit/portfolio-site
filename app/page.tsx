'use client';
import React, { useState, useEffect } from 'react';
import { ArrowUpRight, ArrowRight, Plus, Circle } from 'lucide-react';
import { cmsData } from './data/content';
import Link from 'next/link';

export default function PortfolioHome() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="animate-in fade-in duration-1000">
      <section className="relative max-w-7xl mx-auto px-6 pt-32 pb-32 overflow-hidden flex flex-col lg:flex-row items-center gap-20 min-h-[85vh]">
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute right-[-10%] top-[-10%] ... transition-transform duration-500 ease-out" style={{ transform: `translateY(${scrollY * 0.1}px)` }} />
        <div 
  className="absolute left-[10%] bottom-[20%] transition-transform duration-500 ease-out" 
  style={{ transform: `translateY(${scrollY * -0.2}px) rotate(${scrollY * 0.02}deg)` }}
>
  <Plus size={120} className="text-zinc-100" strokeWidth={0.5} />
</div>
        </div>
        <div className="relative z-10 w-full lg:w-[50%] flex flex-col items-start">
          <span className="text-zinc-400 text-xs tracking-widest uppercase mb-8 border-b border-zinc-200 pb-2 inline-block">{cmsData.bestProject.tag}</span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-zinc-900 leading-[1.05] mb-8">{cmsData.bestProject.title}</h1>
          <p className="text-lg md:text-xl font-light text-zinc-500 leading-relaxed mb-12 max-w-lg">{cmsData.bestProject.description}</p>
          <div className="flex flex-col gap-3 mb-16">
            {cmsData.bestProject.metrics.map((metric: string, i: number) => (
              <div key={i} className="text-sm font-medium text-zinc-600 flex items-center gap-4">
                <span className="w-6 h-[1px] bg-zinc-300"></span>{metric}
              </div>
            ))}
          </div>
          <Link href={cmsData.bestProject.linkUrl} className="group inline-flex items-center gap-4 text-sm font-medium uppercase tracking-widest hover:text-zinc-500 transition-colors">
            {cmsData.bestProject.linkText} 
            <span className="w-10 h-[1px] bg-zinc-900 group-hover:w-16 group-hover:bg-zinc-400 transition-all duration-500 relative">
              <ArrowRight size={14} className="absolute right-[-4px] top-[-6px] text-zinc-900 group-hover:text-zinc-400 group-hover:translate-x-2 transition-all duration-500" strokeWidth={1.5} />
            </span>
          </Link>
        </div>
        <div className="relative z-10 w-full lg:w-[50%] flex justify-center lg:justify-end">
           <div className="relative w-full max-w-lg aspect-[4/5] group cursor-pointer">
              <div className="absolute inset-0 bg-[#fafafa] border border-zinc-200 flex flex-col items-center justify-center text-center transition-all duration-700 group-hover:border-zinc-300 group-hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] overflow-hidden">
                <svg className="absolute inset-0 w-full h-full text-zinc-100 z-0" xmlns="http://www.w3.org/2000/svg"><line x1="0" y1="100%" x2="100%" y2="0" stroke="currentColor" strokeWidth="1" /></svg>
                <div className="relative z-10 flex flex-col items-center transform transition-transform duration-700 group-hover:scale-105">
                  <Circle size={40} className="text-zinc-300 mb-6 group-hover:text-zinc-900 transition-colors duration-500" strokeWidth={0.5} />
                  <p className="text-zinc-400 tracking-widest text-[10px] uppercase font-medium">Visual Assets Pending</p>
                </div>
              </div>
           </div>
        </div>
      </section>

      <div className="w-full border-y border-zinc-100 bg-white py-6 overflow-hidden relative z-20 flex items-center">
        <div className="animate-marquee opacity-40">
          <span className="text-xs font-light uppercase tracking-[0.2em] mx-8 text-zinc-500">
            Agentic AI <span className="mx-4 font-thin text-zinc-300">/</span> User Research <span className="mx-4 font-thin text-zinc-300">/</span> Product Strategy <span className="mx-4 font-thin text-zinc-300">/</span> Prototypes
          </span>
          <span className="text-xs font-light uppercase tracking-[0.2em] mx-8 text-zinc-500">
            Agentic AI <span className="mx-4 font-thin text-zinc-300">/</span> User Research <span className="mx-4 font-thin text-zinc-300">/</span> Product Strategy <span className="mx-4 font-thin text-zinc-300">/</span> Prototypes
          </span>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-6 pb-40 pt-32 relative z-10">
        <div className="flex items-end justify-between mb-16 border-b border-zinc-900 pb-6">
          <h2 className="text-3xl font-light tracking-tight text-zinc-900">Selected Works</h2>
          <span className="text-xs tracking-widest text-zinc-400 uppercase">[ {cmsData.projects.length} ]</span>
        </div>
        <div className="flex flex-col">
          {cmsData.projects.map((project: any, index: number) => (
            <Link key={project.id} href={project.link} className="group flex flex-col md:flex-row md:items-center py-10 border-b border-zinc-100 hover:border-zinc-300 transition-colors relative">
              <div className="absolute inset-0 bg-zinc-50 scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-500 -z-10"></div>
              <div className="md:w-1/6 mb-4 md:mb-0"><span className="text-xs text-zinc-400 tracking-widest">0{index + 1}</span></div>
              <div className="md:w-2/6 mb-4 md:mb-0 pr-8">
                <h3 className="text-2xl font-light text-zinc-900 group-hover:text-zinc-600 transition-colors">{project.title}</h3>
                <span className="text-[10px] uppercase tracking-widest text-zinc-400 mt-2 block">{project.type} • {project.year}</span>
              </div>
              <div className="md:w-2/6 mb-4 md:mb-0 pr-8">
                <p className="text-sm font-light text-zinc-500 leading-relaxed">{project.description}</p>
              </div>
              <div className="md:w-1/6 flex justify-between items-center md:justify-end gap-4">
                <div className="text-[10px] font-medium text-zinc-500 border border-zinc-200 px-3 py-1.5 rounded-full md:hidden lg:block">{project.metric}</div>
                <div className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center group-hover:bg-zinc-900 group-hover:border-zinc-900 transition-all duration-300 text-zinc-400 group-hover:text-white">
                  <ArrowUpRight size={16} strokeWidth={1.5} className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}