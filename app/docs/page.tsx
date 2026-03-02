'use client';

import Link from 'next/link';
import { ArrowRight, Search, FileText, Calendar, Clock, Hash } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

function ScrollReveal({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) setVisible(true); });
    }, { threshold: 0.15 }); 
    const current = domRef.current;
    if (current) observer.observe(current);
    return () => { if (current) observer.unobserve(current); };
  }, []);

  return (
    <div ref={domRef} className={`transition-all duration-[1000ms] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export default function DocsArchive() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All'); 
  const [data, setData] = useState<any>(null); // 🚀 FIX: Live Fetching State

  useEffect(() => {
    fetch('/api/content')
      .then(res => res.json())
      .then(json => setData(json))
      .catch(err => console.error(err));
  }, []);

  if (!data) return <div className="min-h-screen flex items-center justify-center bg-[#f5f5f7] text-zinc-400 uppercase tracking-widest text-xs">Loading Data Room...</div>;

  const allDocs = data.docs || [];
  const publishedDocs = allDocs.filter((doc: any) => doc.published !== false);
  const categories = Array.from(new Set(publishedDocs.map((doc: any) => doc.type))) as string[];
  const allCategories = ['All', ...categories];

  const filteredDocs = publishedDocs.filter((doc: any) => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) || doc.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'All' || doc.type === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <main className="w-full pb-40 pt-32 relative z-10 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 mb-12">
        <ScrollReveal>
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-zinc-900 mb-4">The Data Room</h1>
          <p className="text-zinc-500 font-light text-lg mb-12">An archive of system architectures, case studies, and technical documentation.</p>
          
          <div className="relative mb-6 group z-20">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none"><Search size={18} className="text-zinc-400" /></div>
            <input type="text" placeholder="Search case studies, domains..." className="w-full pl-14 pr-6 py-4 bg-white/60 border border-zinc-200 rounded-2xl text-sm focus:outline-none" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>

          <div className="flex flex-wrap gap-2 mb-16 relative z-20">
            {allCategories.map((category) => (
              <button key={category} onClick={() => setActiveFilter(category)} className={`px-5 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-all ${activeFilter === category ? 'bg-zinc-900 text-white' : 'bg-white/60 text-zinc-500 border border-zinc-200 hover:text-zinc-900'}`}>{category}</button>
            ))}
          </div>
        </ScrollReveal>

        <div className="space-y-4 relative z-10">
          {filteredDocs.length > 0 ? (
            filteredDocs.map((doc: any, index: number) => (
              <ScrollReveal key={doc.id} delay={index * 100}>
                <Link href={`/docs/${doc.id}`} className="group block bg-white/40 border border-zinc-200 rounded-[2rem] p-6 md:p-8 hover:shadow-xl transition-all">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4 flex-wrap">
                        <span className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-500 tracking-widest uppercase bg-white px-3 py-1.5 rounded-full border border-zinc-200"><Hash size={12} /> {doc.type}</span>
                      </div>
                      <h2 className="text-2xl font-semibold text-zinc-900 mb-2">{doc.title}</h2>
                      <p className="text-sm text-zinc-500 line-clamp-2">{doc.content[0]?.replace(/^### /, '') || "Read the full architectural breakdown."}</p>
                    </div>
                    <div className="flex-shrink-0 flex items-center md:flex-col md:items-end gap-4">
                      <span className="flex items-center gap-1.5 text-[10px] font-medium text-zinc-400 tracking-widest uppercase"><Clock size={12} /> {doc.readTime}</span>
                      <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center group-hover:bg-zinc-900 transition-colors"><ArrowRight size={18} className="text-zinc-400 group-hover:text-white" /></div>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))
          ) : (
            <ScrollReveal>
              <div className="text-center py-20 bg-white/30 border-2 border-zinc-200 border-dashed rounded-[2.5rem]">
                <FileText size={32} className="mx-auto text-zinc-300 mb-4" />
                <h3 className="text-lg font-medium text-zinc-900 mb-2">No documents found</h3>
              </div>
            </ScrollReveal>
          )}
        </div>
      </div>
    </main>
  );
} 