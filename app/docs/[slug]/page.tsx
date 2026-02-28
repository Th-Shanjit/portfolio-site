import Link from 'next/link';
import { ArrowLeft, Clock, Calendar, Hash } from 'lucide-react';
import data from '@/data/portfolio.json';

// Ensure Next.js can generate these pages if needed
export function generateStaticParams() {
  return data.docs.map((doc: any) => ({
    slug: doc.id,
  }));
}

export default function DocumentReader({ params }: { params: { slug: string } }) {
  // Find the exact document from your database
  const doc = data.docs.find((d: any) => d.id === params.slug);

  // If someone types a wrong URL, show a clean 404
  if (!doc) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-[#f5f5f7] selection:bg-zinc-300">
        <h1 className="text-2xl font-semibold text-zinc-900 mb-4">Document Not Found</h1>
        <Link href="/" className="text-sm text-zinc-500 hover:text-zinc-900 flex items-center gap-2 transition-colors">
          <ArrowLeft size={16} /> Return to Portfolio
        </Link>
      </main>
    );
  }

  return (
    <main className="w-full pb-40 pt-24 relative z-10 selection:bg-zinc-300">
      
      <article className="max-w-3xl mx-auto px-6">
        
        {/* 1. BACK BUTTON & METADATA */}
        <div className="mb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-zinc-400 hover:text-zinc-900 transition-colors mb-12">
            <ArrowLeft size={14} /> Back to Architecture
          </Link>

          <div className="flex flex-wrap gap-3 mb-8">
            <span className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-500 tracking-widest uppercase bg-white/60 px-3 py-1.5 rounded-full border border-zinc-200 shadow-sm backdrop-blur-md">
              <Hash size={12} /> {doc.type}
            </span>
            <span className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-500 tracking-widest uppercase bg-white/60 px-3 py-1.5 rounded-full border border-zinc-200 shadow-sm backdrop-blur-md">
              <Calendar size={12} /> {doc.date}
            </span>
            <span className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-500 tracking-widest uppercase bg-white/60 px-3 py-1.5 rounded-full border border-zinc-200 shadow-sm backdrop-blur-md">
              <Clock size={12} /> {doc.readTime}
            </span>
          </div>

          {/* 2. THE TITLE */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-zinc-900 leading-[1.1] mb-8">
            {doc.title}
          </h1>
        </div>

        {/* 3. OPTIONAL HERO IMAGE */}
        {doc.coverImage && (
          <div className="w-full aspect-[21/9] mb-16 rounded-[2rem] overflow-hidden border-[6px] border-white shadow-xl bg-zinc-100 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-150 fill-mode-both ease-[cubic-bezier(0.16,1,0.3,1)]">
            <img 
              src={doc.coverImage} 
              alt={doc.title} 
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* 4. THE EDITORIAL CONTENT */}
        <div className="prose prose-zinc prose-lg max-w-none prose-p:font-light prose-p:leading-relaxed prose-p:text-zinc-600 prose-headings:font-medium prose-headings:tracking-tight animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300 fill-mode-both ease-[cubic-bezier(0.16,1,0.3,1)]">
          {doc.content.map((paragraph: string, index: number) => {
            
            // Magic formatting: If a paragraph starts with "###", turn it into an H3 heading automatically!
            if (paragraph.startsWith('### ')) {
              return <h3 key={index} className="text-2xl text-zinc-900 mt-12 mb-4">{paragraph.replace('### ', '')}</h3>;
            }
            
            // Standard paragraph
            return (
              <p key={index} className="mb-8">
                {paragraph}
              </p>
            );
          })}
        </div>

        {/* 5. FOOTER CALL TO ACTION */}
        <div className="mt-24 pt-12 border-t border-zinc-200 animate-in fade-in duration-1000 delay-500 fill-mode-both">
          <div className="glass-panel rounded-[2rem] p-8 md:p-12 text-center bg-white/40">
            <h3 className="text-xl font-medium text-zinc-900 mb-3">Discuss this architecture</h3>
            <p className="text-sm text-zinc-500 font-light mb-6 max-w-md mx-auto">
              Interested in the specific agentic workflows or development economics behind this project?
            </p>
            <a 
              href={`mailto:${data.contact.email}?subject=Regarding your case study on ${doc.title}`}
              className="inline-flex bg-zinc-900 text-white px-8 py-3.5 rounded-full text-xs font-medium tracking-wide hover:bg-zinc-700 hover:scale-105 transition-all shadow-md"
            >
              Start a Conversation
            </a>
          </div>
        </div>

      </article>
    </main>
  );
}