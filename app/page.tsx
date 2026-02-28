import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import data from '@/data/portfolio.json';

export default function Home() {
  const portfolio = data;

  return (
    <main className="max-w-5xl mx-auto px-6 font-light text-zinc-900 selection:bg-zinc-200 animate-in fade-in duration-1000">
      
      {/* HERO SECTION */}
      <section className="min-h-[80vh] flex flex-col justify-center py-40">
        <span className="text-xs uppercase tracking-[0.3em] text-zinc-400 mb-12 block">
          {portfolio.hero.tag}
        </span>
        <h1 className="text-6xl md:text-8xl tracking-tighter mb-10 leading-[0.9]">
          {portfolio.hero.title}
        </h1>
        <div className="md:w-1/2 ml-auto">
          <p className="text-xl text-zinc-500 mb-12 leading-relaxed">
            {portfolio.hero.description}
          </p>
          <Link 
            href={portfolio.hero.link}
            className="group flex items-center gap-4 text-sm uppercase tracking-widest hover:text-zinc-500 transition-colors"
          >
            {portfolio.hero.linkText}
            <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform duration-500" strokeWidth={1} />
          </Link>
        </div>
      </section>

      {/* HIGHLIGHTED PROJECTS / BREAKDOWNS */}
      <section className="py-40 border-t border-zinc-100">
        <div className="flex flex-col gap-24">
          {portfolio.highlightedProjects.map((project: any, i: number) => {
            
            // THE MAGIC: Find the actual document from your Data Room using the ID
            const realDoc = portfolio.docs.find((d: any) => d.id === project.id);
            
            // If the document exists in your Admin Editor, use its live data. 
            // If not, fall back gracefully to the placeholder data in the JSON.
            const title = realDoc ? realDoc.title : project.title;
            const category = realDoc ? realDoc.type : project.category;
            
            // Extracts just the year from a date string like "Feb 2026"
            const year = realDoc ? realDoc.date.split(' ').pop() : project.year; 
            
            // Forces the link to map cleanly to our dynamic route
            const targetUrl = `/docs/${project.id}`;

            return (
              <Link key={project.id} href={targetUrl} className="group flex flex-col md:flex-row md:items-baseline justify-between">
                <div className="flex flex-col">
                  <span className="text-xs text-zinc-400 mb-4 tracking-widest uppercase">0{i + 1} — {category}</span>
                  <h2 className="text-4xl tracking-tight group-hover:text-zinc-400 transition-colors duration-500">
                    {title}
                  </h2>
                </div>
                <span className="text-sm text-zinc-400 mt-4 md:mt-0">{year}</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="py-40 border-t border-zinc-100 flex flex-col items-center text-center">
        <h2 className="text-4xl tracking-tight mb-8">{portfolio.contact.heading}</h2>
        <a 
          href={`mailto:${portfolio.contact.email}`}
          className="text-lg text-zinc-500 hover:text-zinc-900 border-b border-transparent hover:border-zinc-900 transition-all pb-1"
        >
          {portfolio.contact.email}
        </a>
      </section>
      
    </main>
  );
}