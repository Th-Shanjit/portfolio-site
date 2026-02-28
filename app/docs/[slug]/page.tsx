import data from '@/data/portfolio.json';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default async function DocPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // 🚀 FIX: Added ": any" here so TypeScript stops strictly checking the JSON structure
  const docData: any = data.docs.find((d: any) => d.id === slug);

  if (!docData) return <div className="p-32 text-center text-xl font-light">Document Not Found</div>;

  return (
    <article className="max-w-4xl mx-auto px-6 py-32 animate-in fade-in duration-1000 min-h-[80vh]">
      
      {/* Back Button */}
      <Link href="/docs" className="group inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-zinc-400 hover:text-zinc-900 transition-colors mb-16">
        <ArrowRight size={14} className="rotate-180 transform group-hover:-translate-x-1 transition-transform duration-300" strokeWidth={1.5} />
        Back to Directory
      </Link>

      {/* Meta Data */}
      <div className="flex items-center gap-3 text-[10px] font-medium text-zinc-400 mb-8 uppercase tracking-widest">
        <span>{docData.type}</span>
        <span className="w-1 h-1 rounded-full bg-zinc-200"></span>
        <span>{docData.readTime}</span>
        <span className="w-1 h-1 rounded-full bg-zinc-200"></span>
        <span>{docData.date}</span>
      </div>

      {/* Title */}
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-zinc-900 mb-16 leading-[1.1]">
        {docData.title}
      </h1>

      {/* OPTIONAL COVER IMAGE */}
      {docData.coverImage && (
        <div className="w-full aspect-[16/9] md:aspect-[21/9] mb-20 bg-zinc-50 border border-zinc-100 overflow-hidden group">
          <img 
            src={docData.coverImage} 
            alt={docData.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
          />
        </div>
      )}

      {/* Content */}
      <div className="max-w-3xl flex flex-col gap-8 text-zinc-600 font-light leading-loose text-lg">
        {docData.content.map((paragraph: string, index: number) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}