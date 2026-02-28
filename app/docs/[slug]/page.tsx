'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock, Calendar, Hash, FileText, Download } from 'lucide-react';
import data from '@/data/portfolio.json';

// --- MARKDOWN PARSER HELPER ---
const formatText = (text: string) => {
  let formatted = text
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-zinc-900">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="italic text-zinc-800">$1</em>')
    .replace(/`(.*?)`/g, '<code class="bg-zinc-100 text-zinc-800 px-1.5 py-0.5 rounded-md font-mono text-sm border border-zinc-200 shadow-sm">$1</code>');
  return { __html: formatted };
};

export default function DocumentReader({ params }: { params: { slug: string } }) {
  const [progress, setProgress] = useState(0);
  const doc = (data as any).docs.find((d: any) => d.id === params.slug);

  // --- READING PROGRESS TRACKER ---
  useEffect(() => {
    const updateProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        const scrolled = (window.scrollY / scrollHeight) * 100;
        setProgress(scrolled);
      }
    };

    window.addEventListener('scroll', updateProgress);
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  if (!doc) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-[#f5f5f7]">
        <h1 className="text-2xl font-semibold text-zinc-900 mb-4 tracking-tight">Document Not Found</h1>
        <Link href="/docs" className="text-sm text-zinc-500 hover:text-zinc-900 flex items-center gap-2 transition-colors uppercase tracking-widest font-bold">
          <ArrowLeft size={16} /> Return to Archive
        </Link>
      </main>
    );
  }

  return (
    <main className="w-full pb-40 pt-24 relative z-10 selection:bg-zinc-300 min-h-screen">
      
      {/* 🚀 1. TOP READING PROGRESS BAR */}
      <div className="fixed top-0 left-0 w-full h-1.5 z-[100] bg-zinc-100">
        <div 
          className="h-full bg-zinc-900 transition-all duration-150 ease-out" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <article className="max-w-3xl mx-auto px-6">
        
        {/* 2. NAVIGATION & METADATA */}
        <div className="mb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <Link href="/docs" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 hover:text-zinc-900 transition-colors mb-12">
            <ArrowLeft size={14} /> Back to Data Room
          </Link>

          <div className="flex flex-wrap gap-3 mb-8">
            <span className="flex items-center gap-1.5 text-[9px] font-bold text-zinc-500 tracking-widest uppercase bg-white/80 px-3 py-2 rounded-full border border-zinc-100 shadow-sm backdrop-blur-md">
              <Hash size={12} /> {doc.type}
            </span>
            <span className="flex items-center gap-1.5 text-[9px] font-bold text-zinc-500 tracking-widest uppercase bg-white/80 px-3 py-2 rounded-full border border-zinc-100 shadow-sm backdrop-blur-md">
              <Calendar size={12} /> {doc.date}
            </span>
            <span className="flex items-center gap-1.5 text-[9px] font-bold text-zinc-500 tracking-widest uppercase bg-white/80 px-3 py-2 rounded-full border border-zinc-100 shadow-sm backdrop-blur-md">
              <Clock size={12} /> {doc.readTime}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-7xl font-medium tracking-tight text-zinc-900 leading-[1.05] mb-8">
            {doc.title}
          </h1>
        </div>

        {/* 3. HERO ASSETS (IMAGE OR PDF) */}
        {doc.coverImage && (
          <div className="w-full aspect-[21/9] mb-12 rounded-[2.5rem] overflow-hidden border-[8px] border-white shadow-2xl bg-zinc-100 animate-in fade-in slide-in-from-bottom-12 duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]">
            <img src={doc.coverImage} alt={doc.title} className="w-full h-full object-cover" />
          </div>
        )}

        {doc.pdfUrl && (
          <div className="w-full h-[600px] md:h-[850px] mb-16 rounded-[2.5rem] overflow-hidden border-[8px] border-white shadow-2xl bg-zinc-100 relative group animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200 ease-[cubic-bezier(0.16,1,0.3,1)]">
            <iframe 
              src={`${doc.pdfUrl}#toolbar=0`} 
              className="w-full h-full"
              title="Technical Document"
            />
            <div className="absolute inset-0 pointer-events-none border-[1px] border-black/5 rounded-[2.5rem]"></div>
            
            {/* Download Action */}
            <a 
              href={doc.pdfUrl} 
              download 
              className="absolute bottom-8 right-8 pointer-events-auto bg-zinc-900 text-white px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-2 hover:scale-105 active:scale-95"
            >
              <Download size={14} /> Download PDF
            </a>
          </div>
        )}

        {/* 4. CONTENT BODY */}
        <div className="prose prose-zinc prose-lg max-w-none animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300 ease-[cubic-bezier(0.16,1,0.3,1)]">
          {doc.content.map((paragraph: string, index: number) => {
            
            // Render Section Headers
            if (paragraph.startsWith('### ')) {
              return (
                <h3 key={index} className="text-2xl md:text-4xl font-semibold tracking-tight text-zinc-900 mt-20 mb-8 border-t border-zinc-100 pt-12">
                  {paragraph.replace('### ', '')}
                </h3>
              );
            }
            
            // Render Quotes
            if (paragraph.startsWith('> ')) {
              return (
                <blockquote key={index} className="border-l-[4px] border-zinc-900 pl-8 py-2 my-12 text-2xl font-serif italic text-zinc-700 leading-relaxed">
                  <span dangerouslySetInnerHTML={formatText(paragraph.replace('> ', ''))} />
                </blockquote>
              );
            }
            
            // Render Standard Paragraphs
            return (
              <p 
                key={index} 
                className="text-zinc-600 font-light text-lg md:text-xl leading-relaxed mb-8" 
                dangerouslySetInnerHTML={formatText(paragraph)} 
              />
            );
          })}
        </div>

        {/* 5. FOOTER CALL-TO-ACTION */}
        <div className="mt-32 pt-16 border-t border-zinc-200">
          <div className="glass-panel rounded-[3rem] p-10 md:p-16 text-center bg-white/40 border border-white/60 shadow-xl">
            <div className="w-12 h-1 bg-zinc-900 rounded-full mx-auto mb-8"></div>
            <h3 className="text-2xl md:text-3xl font-medium text-zinc-900 mb-4 tracking-tight">Discuss this architecture</h3>
            <p className="text-zinc-500 font-light mb-10 max-w-md mx-auto leading-relaxed">
              Have questions about the logic or implementation? Let's connect and dive deeper into the technical execution.
            </p>
            <a 
              href={`mailto:${(data as any).contact.email}?subject=Feedback: ${doc.title}`}
              className="inline-flex bg-zinc-900 text-white px-10 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-zinc-700 hover:scale-105 transition-all shadow-lg"
            >
              Start a Conversation
            </a>
          </div>
        </div>

      </article>
    </main>
  );
}