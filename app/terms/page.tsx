import { cmsData } from '../data/content';

export default function TermsPage() {
  const data = cmsData.legalPages.terms;
  return (
    <div className="animate-in fade-in duration-1000 max-w-3xl mx-auto px-6 py-32 relative z-10 min-h-[80vh]">
      <div className="mb-16 border-b border-zinc-100 pb-8">
        <h1 className="text-4xl md:text-5xl font-light tracking-tight text-zinc-900 mb-4">{data.title}</h1>
        <p className="text-xs font-medium uppercase tracking-widest text-zinc-400">Last Updated: {data.lastUpdated}</p>
      </div>
      <div className="prose prose-zinc max-w-none">
        {data.paragraphs.map((paragraph: string, i: number) => (
          <p key={i} className="text-zinc-600 font-light leading-loose text-lg mb-8">{paragraph}</p>
        ))}
      </div>
    </div>
  );
}