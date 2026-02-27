import data from '@/data/portfolio.json';
import type { PortfolioData, Doc } from '@/lib/content';
import { FileText, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function DocsIndexPage() {
  const portfolio = data as PortfolioData;
  const docs = portfolio.docs;

  return (
    <div className="max-w-5xl mx-auto px-6 py-32 animate-in fade-in duration-1000 relative z-10 min-h-[80vh]">
      <div className="mb-24 max-w-2xl">
        <h1 className="text-5xl font-light tracking-tight text-zinc-900 mb-8">Data Room</h1>
        <p className="text-lg font-light text-zinc-500 leading-relaxed">
          A centralized repository for marketing assets, brand guidelines, and product documentation.
        </p>
      </div>

      <div>
        <h2 className="text-xs font-medium uppercase tracking-widest mb-8 text-zinc-400 border-b border-zinc-100 pb-4">
          <Link href="/docs/app-docs" className="hover:text-zinc-900 transition-colors">App docs (privacy, terms)</Link>
        </h2>
        <div className="flex flex-col border-t border-zinc-100">
          {docs.map((doc) => (
            <DocRow key={doc.id} doc={doc} />
          ))}
        </div>
      </div>
    </div>
  );
}

function DocRow({ doc }: { doc: Doc }) {
  return (
    <Link href={`/docs/${doc.id}`} className="py-5 border-b border-zinc-200/60 flex items-center justify-between group hover-trigger cursor-pointer">
      <div className="flex items-center gap-6">
        <div className="text-zinc-300 group-hover:text-zinc-900 transition-colors">
          <FileText size={20} strokeWidth={1} />
        </div>
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
      <div className="text-zinc-300 group-hover:text-zinc-900 transition-transform duration-300 transform group-hover:translate-x-2 p-2">
        <ArrowRight size={18} strokeWidth={1.5} />
      </div>
    </Link>
  );
}
