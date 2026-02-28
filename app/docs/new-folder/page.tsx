import data from '@/data/portfolio.json';
import Link from 'next/link';

export default function NewAppDocsPage() {
  // 1. Change the filter to match your new category name
  const appDocs = data.docs.filter((doc: any) => doc.type === 'New App Docs');

  return (
    <div className="max-w-5xl mx-auto px-6 py-40 min-h-[80vh] font-light">
      <div className="mb-24">
        <span className="text-xs uppercase tracking-[0.3em] text-zinc-400 mb-8 block">
          Directory
        </span>
        {/* 2. Change the Title */}
        <h1 className="text-5xl tracking-tight text-zinc-900">New App Documentation</h1>
      </div>

      <div className="flex flex-col">
        {appDocs.length === 0 ? (
          <p className="text-zinc-400 italic">No documents uploaded yet.</p>
        ) : (
          appDocs.map((doc: any) => (
            <Link 
              key={doc.id} 
              href={`/docs/${doc.id}`}
              className="group flex flex-col sm:flex-row sm:items-center justify-between py-8 border-b border-zinc-100 hover:border-zinc-400 transition-colors"
            >
              <div>
                <h2 className="text-2xl text-zinc-900 group-hover:text-zinc-500 transition-colors">{doc.title}</h2>
                <div className="flex gap-3 text-xs text-zinc-400 mt-2 tracking-widest uppercase">
                  <span>{doc.date}</span>
                  <span>•</span>
                  <span>{doc.readTime}</span>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}