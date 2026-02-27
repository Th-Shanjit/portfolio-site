import data from '@/data/portfolio.json';
import type { PortfolioData } from '@/lib/content';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default async function DocPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const portfolio = data as PortfolioData;
  const docData = portfolio.docs.find((d) => d.id === slug);

  if (!docData) return <div className="p-32 text-center text-xl font-light">Document Not Found</div>;

  return (
    <div className="max-w-3xl mx-auto px-6 py-32 animate-in fade-in duration-1000 min-h-[80vh]">
      <Link href="/docs" className="group flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-zinc-400 hover:text-zinc-900 transition-colors mb-12">
        <ArrowRight size={14} className="rotate-180 transform group-hover:-translate-x-1 transition-transform duration-300" strokeWidth={1.5} />
        Back to Data Room
      </Link>

      <div className="flex items-center gap-3 text-[10px] font-medium text-zinc-400 mb-8 uppercase tracking-widest">
        <span>{docData.type}</span>
        <span className="w-1 h-1 rounded-full bg-zinc-200"></span>
        <span>{docData.readTime}</span>
        <span className="w-1 h-1 rounded-full bg-zinc-200"></span>
        <span>{docData.date}</span>
      </div>

      <h1 className="text-4xl md:text-5xl font-light tracking-tight text-zinc-900 mb-16">{docData.title}</h1>

      <div className="flex flex-col gap-6 text-zinc-600 font-light leading-loose text-lg">
        {docData.content.map((paragraph: string, index: number) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}