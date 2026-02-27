import { getPortfolioData } from '@/lib/content';
import { FileText, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function AppDocsPage() {
  const { documents } = getPortfolioData();
  const docs = documents.appDocs;

  return (
    <div className="max-w-5xl mx-auto px-6 py-32 animate-in fade-in duration-1000 min-h-[80vh]">
      <div className="mb-16 max-w-2xl">
        <h1 className="text-5xl font-light tracking-tight text-zinc-900 mb-4">App docs</h1>
        <p className="text-lg font-light text-zinc-500">Privacy policies, terms, and brand assets.</p>
      </div>
      <div className="flex flex-col border-t border-zinc-100">
        {docs.map((doc) => (
          <Link key={doc.id} href={`/docs/${doc.id}`} className="py-5 border-b border-zinc-200/60 flex items-center justify-between group hover-trigger cursor-pointer">
            <div className="flex items-center gap-6">
              <FileText size={20} strokeWidth={1} className="text-zinc-300 group-hover:text-zinc-900 transition-colors" />
              <div>
                <h4 className="font-light text-base text-zinc-900 group-hover:text-zinc-600 transition-colors">{doc.title}</h4>
                <div className="flex items-center gap-3 text-[10px] font-medium text-zinc-400 mt-2 uppercase tracking-widest">
                  <span>{doc.type}</span>
                  <span className="w-1 h-1 rounded-full bg-zinc-200"></span>
                  <span>{doc.readTime}</span>
                  <span className="w-1 h-1 rounded-full bg-zinc-200"></span>
                  <span>{doc.date}</span>
                </div>
              </div>
            </div>
            <ArrowRight size={18} strokeWidth={1.5} className="text-zinc-300 group-hover:text-zinc-900 transition-transform duration-300 group-hover:translate-x-2 p-2" />
          </Link>
        ))}
      </div>
    </div>
  );
}
