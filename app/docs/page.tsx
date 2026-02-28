'use client';

import Link from 'next/link';
import { ArrowRight, Search, FileText, Calendar, Clock, Hash } from 'lucide-react';
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
      className={`transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function DocsArchive() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All'); // 🚀 NEW: Filter State
  
  // Safely load all documents from the JSON database
  const docs = (data as any).docs || [];

  // 🚀 MAGIC TAGS: Automatically extract every unique category from your database
  const allCategories = ['All', ...Array.from(new Set(docs.map((doc: any) => doc.type))) as string[]];

  // 🚀 DUAL-FILTER LOGIC: Filter by Search Term AND Active Tag
  const filteredDocs = docs.filter((doc: any) => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          doc.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = activeFilter === 'All' || doc.type === activeFilter;

    return matchesSearch && matchesFilter;
  });

  return (
    <main className="w-full pb-40 pt-32 relative z-10 selection:bg-zinc-300 min-h-screen">
      
      <div className="max-w-4xl mx-auto px-6 mb-12">
        <ScrollReveal>
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-zinc-900 mb-4">The Data Room</h1>
          <p className="text-zinc-500 font-light text-lg mb-12">An archive of system architectures, case studies, and technical documentation.</p>
          
          {/* THE LIVE SEARCH BAR */}
          <div className="relative mb-6 group z-20">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <Search size={18} className="text-zinc-400 group-focus-within:text-zinc-900 transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search case studies, domains, or architectures..."
              className="w-full pl-14 pr-6 py-4 bg-white/60 border border-zinc-200 rounded-2xl text-sm focus:outline-none focus:border-zinc-400 transition-all backdrop-blur-xl shadow-sm placeholder:text-zinc-400 text-zinc-900 font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* 🚀 THE DYNAMIC FILTER TAGS */}
          <div className="flex flex-wrap gap-2 mb-16 relative z-20">
            {allCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-5 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 border backdrop-blur-md ${
                  activeFilter === category 
                    ? 'bg-zinc-900 text-white border-zinc-900 shadow-md scale-105' 
                    : 'bg-white/60 text-zinc-500 border-zinc-200 hover:border-zinc-400 hover:text-zinc-900'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* THE DOCUMENT DIRECTORY */}
        <div className="space-y-4 relative z-10">
          {filteredDocs.length > 0 ? (
            filteredDocs.map((doc: any, index: number) => (
              <ScrollReveal key={doc.id} delay={index * 100}>
                <Link 
                  href={`/docs/${doc.id}`} 
                  className="group block bg-white/40 border border-zinc-200 hover:border-zinc-300 rounded-[2rem] p-6 md:p-8 transition-all duration-300 hover:shadow-xl hover:bg-white/70 backdrop-blur-md"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    
                    {/* Left Side: Title & Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4 flex-wrap">
                        <span className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-500 tracking-widest uppercase bg-white px-3 py-1.5 rounded-full border border-zinc-200 shadow-sm">
                          <Hash size={12} /> {doc.type}
                        </span>
                        <span className="flex items-center gap-1.5 text-[10px] font-medium text-zinc-400 tracking-widest uppercase">
                          <Calendar size={12} /> {doc.date}
                        </span>
                      </div>
                      <h2 className="text-2xl font-semibold text-zinc-900 tracking-tight mb-2 group-hover:text-zinc-700 transition-colors">
                        {doc.title}
                      </h2>
                      {/* Smart preview: Grabs the first paragraph and strips out any "###" markdown headers */}
                      <p className="text-sm text-zinc-500 font-light line-clamp-2 md:line-clamp-1 pr-4">
                        {doc.content[0]?.replace(/^### /, '') || "Read the full architectural breakdown."}
                      </p>
                    </div>

                    {/* Right Side: Read Time & Button */}
                    <div className="flex-shrink-0 flex items-center justify-between md:flex-col md:items-end md:justify-center gap-4 border-t border-zinc-100 pt-4 md:border-t-0 md:pt-0 md:border-l md:border-zinc-200 md:pl-8">
                      <span className="flex items-center gap-1.5 text-[10px] font-medium text-zinc-400 tracking-widest uppercase">
                        <Clock size={12} /> {doc.readTime}
                      </span>
                      <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center group-hover:bg-zinc-900 transition-colors duration-300 shadow-sm">
                        <ArrowRight size={18} className="text-zinc-400 group-hover:text-white group-hover:-rotate-45 transition-all duration-300" />
                      </div>
                    </div>

                  </div>
                </Link>
              </ScrollReveal>
            ))
          ) : (
            
            /* EMPTY STATE */
            <ScrollReveal>
              <div className="text-center py-20 bg-white/30 border-2 border-zinc-200 border-dashed rounded-[2.5rem] backdrop-blur-sm">
                <FileText size={32} className="mx-auto text-zinc-300 mb-4" />
                <h3 className="text-lg font-medium text-zinc-900 mb-2">No documents found</h3>
                <p className="text-sm text-zinc-500 font-light">Try adjusting your filters or search terms.</p>
                
                {/* 🚀 Quick Clear Button */}
                {(searchTerm !== '' || activeFilter !== 'All') && (
                  <button 
                    onClick={() => { setSearchTerm(''); setActiveFilter('All'); }}
                    className="mt-6 text-xs font-bold uppercase tracking-widest text-zinc-900 hover:text-zinc-500 transition-colors underline underline-offset-4"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            </ScrollReveal>
          )}
        </div>
      </div>
    </main>
  );
}