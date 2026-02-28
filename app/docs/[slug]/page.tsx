import Link from 'next/link';
import { ArrowLeft, Clock, Calendar, Hash } from 'lucide-react';
import data from '@/data/portfolio.json';

// Ensure Next.js can generate these pages
export function generateStaticParams() {
  return data.docs.map((doc: any) => ({
    slug: doc.id,
  }));
}

// 🚀 THE PARSER: Translates Markdown tags into styled HTML
const formatText = (text: string) => {
  let formatted = text
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-zinc-900">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="italic text-zinc-800">$1</em>')
    .replace(/`(.*?)`/g, '<code class="bg-zinc-100 text-zinc-800 px-1.5 py-0.5 rounded-md font-mono text-sm border border-zinc-200 shadow-sm">$1</code>');
  return { __html: formatted };
};

export default function DocumentReader({ params }: { params: { slug: string } }) {
  const doc = data.docs.find((d: any) => d.id === params.slug);

  if (!doc) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-[#f5f5f7] selection:bg-zinc-300">
        <h1 className="text-2xl font-semibold text-zinc-900 mb-4">Document Not Found</h1>
        <Link href="/docs" className="text-sm text-zinc-500 hover:text-zinc-900 flex items-center gap-2 transition-colors">
          <ArrowLeft size={16} /> Return to Data Room
        </Link>
      </main>
    );
  }

  return (
    <main className="w-full pb-40 pt-24 relative z-10 selection:bg-zinc-300 min-h-screen">
      
      <article className="max-w-3xl mx-auto px-6">
        
        {/* 1. BACK BUTTON & METADATA */}
        <div className="mb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]">
          <Link href="/docs" className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-zinc-400 hover:text-zinc-900 transition-colors mb-12">
            <ArrowLeft size={14} /> Back to Data Room
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

        {/* 🚀 4. NEW: OPTIONAL PDF EMBED */}
        {doc.pdfUrl && (
          <div className="w-full h-[600px] md:h-[800px] mb-16 rounded-[2rem] overflow-hidden border-[6px] border-white shadow-xl bg-zinc-100 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200 fill-mode-both ease-[cubic-bezier(0.16,1,0.3,1)] relative group">
            <iframe 
              src={`${doc.pdfUrl}#toolbar=0`} 
              className="w-full h-full"
              title={`${doc.title} PDF Document`}
            />
            {/* Download Button Overlay */}
            <a href={doc.pdfUrl} download className="absolute bottom-6 right-6 bg-zinc-900/90 backdrop-blur-md text-white px-6 py-3 rounded-full text-xs font-semibold tracking-wide shadow-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
              Download PDF
            </a>
          </div>
        )}

        {/* 5. THE EDITORIAL CONTENT (WITH MARKDOWN PARSER) */}
        <div className="prose prose-zinc prose-lg max-w-none prose-p:font-light prose-p:leading-relaxed prose-p:text-zinc-600 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300 fill-mode-both ease-[cubic-bezier(0.16,1,0.3,1)]">
          {doc.content.map((paragraph: string, index: number) => {
            
            // Renders H3 Headings
            if (paragraph.startsWith('### ')) {
              return (
                <h3 key={index} className="text-2xl md:text-3xl font-medium tracking-tight text-zinc-900 mt-16 mb-6">
                  {paragraph.replace('### ', '')}
                </h3>
              );
            }
            
            // Renders Blockquotes (like Medium)
            if (paragraph.startsWith('> ')) {
              return (
                <blockquote key={index} className="border-l-[3px] border-zinc-900 pl-6 py-1 my-10 text-xl font-serif italic text-zinc-700">
                  <span dangerouslySetInnerHTML={formatText(paragraph.replace('> ', ''))} />
                </blockquote>
              );
            }
            
            // Renders Standard Paragraphs with inline bold/italic/code
            return (
              <p key={index} className="mb-8" dangerouslySetInnerHTML={formatText(paragraph)} />
            );
          })}
        </div>

        {/* 6. FOOTER CALL TO ACTION */}
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