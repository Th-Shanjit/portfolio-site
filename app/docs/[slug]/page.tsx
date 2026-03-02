'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock, Calendar, Hash, FileText, Download } from 'lucide-react';

const formatText = (text: string) => {
  let formatted = text
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-zinc-900">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="italic text-zinc-800">$1</em>')
    .replace(/`(.*?)`/g, '<code class="bg-zinc-100 text-zinc-800 px-1.5 py-0.5 rounded-md font-mono text-sm border border-zinc-200 shadow-sm">$1</code>');
  return { __html: formatted };
};

export default function DocumentReader({ params }: { params: Promise<{ slug: string }> }) {
  const [progress, setProgress] = useState(0);
  const [data, setData] = useState<any>(null); // 🚀 NEW: State to hold our live cloud data
  const [isLoading, setIsLoading] = useState(true); // 🚀 NEW: Loading state

  const resolvedParams = use(params);

  useEffect(() => {
    // 🚀 NEW: Fetch the live data from Upstash instead of the static file
    fetch('/api/content')
      .then(res => res.json())
      .then(json => {
        setData(json);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch document", err);
        setIsLoading(false);
      });

    // Fire the view tracker
    fetch(`/api/views/${resolvedParams.slug}`, { method: 'POST' }).catch(() => {});
    
    // Scroll progress tracker
    const updateProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) setProgress((window.scrollY / scrollHeight) * 100);
    };

    window.addEventListener('scroll', updateProgress);
    return () => window.removeEventListener('scroll', updateProgress);
  }, [resolvedParams.slug]);

  // 🚀 NEW: Show a loading screen while fetching from the cloud
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-[#f5f5f7] text-zinc-400 uppercase tracking-widest text-xs">Loading Architecture...</div>;
  }

  // 🚀 NEW: Safely find the document once data has loaded
  const doc = data?.docs?.find((d: any) => d.id === resolvedParams.slug);

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
      <div className="fixed top-0 left-0 w-full h-1.5 z-[100] bg-zinc-100">
        <div className="h-full bg-zinc-900 transition-all duration-150 ease-out" style={{ width: `${progress}%` }}></div>
      </div>

      <article className="max-w-3xl mx-auto px-6">
        <div className="mb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <Link href="/docs" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 hover:text-zinc-900 transition-colors mb-12">
            <ArrowLeft size={14} /> Back to Data Room
          </Link>
          <div className="flex flex-wrap gap-3 mb-8">
            <span className="flex items-center gap-1.5 text-[9px] font-bold text-zinc-500 tracking-widest uppercase bg-white/80 px-3 py-2 rounded-full border border-zinc-100 shadow-sm backdrop-blur-md"><Hash size={12} /> {doc.type}</span>
            <span className="flex items-center gap-1.5 text-[9px] font-bold text-zinc-500 tracking-widest uppercase bg-white/80 px-3 py-2 rounded-full border border-zinc-100 shadow-sm backdrop-blur-md"><Calendar size={12} /> {doc.date}</span>
            <span className="flex items-center gap-1.5 text-[9px] font-bold text-zinc-500 tracking-widest uppercase bg-white/80 px-3 py-2 rounded-full border border-zinc-100 shadow-sm backdrop-blur-md"><Clock size={12} /> {doc.readTime}</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-medium tracking-tight text-zinc-900 leading-[1.05] mb-8">{doc.title}</h1>
        </div>

        {doc.coverImage && (
          <div className="w-full aspect-[21/9] mb-12 rounded-[2.5rem] overflow-hidden border-[8px] border-white shadow-2xl bg-zinc-100"><img src={doc.coverImage} alt={doc.title} className="w-full h-full object-cover" /></div>
        )}

        {doc.pdfUrl && (
          <div className="w-full h-[600px] md:h-[850px] mb-16 rounded-[2.5rem] overflow-hidden border-[8px] border-white shadow-2xl bg-zinc-100 relative group">
            <iframe src={`${doc.pdfUrl}#toolbar=0`} className="w-full h-full" title="Technical Document"/>
            <a href={doc.pdfUrl} download className="absolute bottom-8 right-8 bg-zinc-900 text-white px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-xl flex items-center gap-2"><Download size={14} /> Download PDF</a>
          </div>
        )}

        <div className="prose prose-zinc prose-lg max-w-none">
          {doc.content.map((paragraph: string, index: number) => {
            if (paragraph.startsWith('### ')) return <h3 key={index} className="text-2xl md:text-4xl font-semibold tracking-tight text-zinc-900 mt-20 mb-8 border-t border-zinc-100 pt-12">{paragraph.replace('### ', '')}</h3>;
            if (paragraph.startsWith('> ')) return <blockquote key={index} className="border-l-[4px] border-zinc-900 pl-8 py-2 my-12 text-2xl font-serif italic text-zinc-700"><span dangerouslySetInnerHTML={formatText(paragraph.replace('> ', ''))} /></blockquote>;
            return <p key={index} className="text-zinc-600 font-light text-lg md:text-xl leading-relaxed mb-8" dangerouslySetInnerHTML={formatText(paragraph)} />;
          })}
        </div>

        <div className="mt-32 pt-16 border-t border-zinc-200">
          <div className="glass-panel rounded-[3rem] p-10 md:p-16 text-center bg-white/40 border border-white/60 shadow-xl">
            <div className="w-12 h-1 bg-[#0a66c2] rounded-full mx-auto mb-8"></div>
            <h3 className="text-2xl md:text-3xl font-medium text-zinc-900 mb-4 tracking-tight">Discuss this architecture</h3>
            <a href={(data as any)?.site?.linkedinUrl || '#'} target="_blank" className="inline-flex bg-[#0a66c2] text-white px-10 py-4 rounded-full text-xs font-bold uppercase tracking-widest mt-6">Discuss on LinkedIn</a>
          </div>
        </div>
      </article>
    </main>
  );
}