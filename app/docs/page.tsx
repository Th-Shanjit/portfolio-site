import { cmsData } from '../data/content';
import { FileText, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function DocsIndexPage() {
  const data = cmsData.documents;
  return (
    <div className="max-w-5xl mx-auto px-6 py-32 animate-in fade-in duration-1000 relative z-10 min-h-[80vh]">
      <div className="mb-24 max-w-2xl">
        <h1 className="text-5xl font-light tracking-tight text-zinc-900 mb-8">Data Room</h1>
        <p className="text-lg font-light text-zinc-500 leading-relaxed">
          A centralized repository for marketing assets, brand guidelines, and product documentation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
        <div>
          <h2 className="text-xs font-medium uppercase tracking-widest mb-8 text-zinc-400 border-b border-zinc-100 pb-4">I. Marketing & Brand</h2>
          <div className="flex flex-col border-t border-zinc-100">
            {data.marketing.map((doc: any) => <DocRow key={doc.id} doc={doc} />)}
          </div>
        </div>
        <div>
          <h2 className="text-xs font-medium uppercase tracking-widest mb-8 text-zinc-400 border-b border-zinc-100 pb-4">II. Legal & Compliance</h2>
          <div className="flex flex-col border-t border-zinc-100">
            {data.legal.map((doc: any) => <DocRow key={doc.id} doc={doc} />)}
          </div>
        </div>
      </div>

      <div className="border border-zinc-200 bg-zinc-50/50 rounded-2xl p-8 md:p-12 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-96 h-96 bg-zinc-200 rounded-full blur-3xl opacity-20 -mr-32 -mt-32 transition-opacity duration-700 group-hover:opacity-40"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <span className="w-2 h-2 bg-zinc-900 rounded-full"></span>
            <h2 className="text-2xl font-light text-zinc-900">Paperloop Application</h2>
          </div>
          <p className="text-sm font-light text-zinc-500 mb-10 max-w-xl leading-relaxed">
            Official documentation, product requirement documents, and user research assets related to Paperloop.
          </p>
          <div className="flex flex-col border-t border-zinc-200/60">
            {data.paperloop.map((doc: any) => <DocRow key={doc.id} doc={doc} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

function DocRow({ doc }: { doc: any }) {
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