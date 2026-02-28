import data from '@/data/portfolio.json';
import Link from 'next/link';

export default function ProjectDocsPage() {
  // Filter only the documents that belong to this category
  const caseStudies = data.docs.filter((doc: any) => doc.type === 'Case Studies');

  return (
    <div className="max-w-5xl mx-auto px-6 py-40 min-h-[80vh] font-light">
      <div className="mb-24">
        <span className="text-xs uppercase tracking-[0.3em] text-zinc-400 mb-8 block">
          Directory
        </span>
        <h1 className="text-5xl tracking-tight text-zinc-900">Case Studies</h1>
      </div>

      <div className="flex flex-col">
        {caseStudies.length === 0 ? (
          <p className="text-zinc-400 italic">No documents uploaded yet.</p>
        ) : (
          caseStudies.map((doc: any) => (
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