import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getPortfolioData } from '@/lib/content';

export default async function Home() {
  const data = await getPortfolioData();

  return (
    <main className="max-w-5xl mx-auto px-6 font-light text-zinc-900 selection:bg-zinc-200">
      
      {/* HERO SECTION */}
      <section className="min-h-[80vh] flex flex-col justify-center py-40">
        <span className="text-xs uppercase tracking-[0.3em] text-zinc-400 mb-12 block">
          {data.hero.tag}
        </span>
        <h1 className="text-6xl md:text-8xl tracking-tighter mb-10 leading-[0.9]">
          {data.hero.title}
        </h1>
        <div className="md:w-1/2 ml-auto">
          <p className="text-xl text-zinc-500 mb-12 leading-relaxed">
            {data.hero.description}
          </p>
          <Link 
            href={data.hero.link}
            className="group flex items-center gap-4 text-sm uppercase tracking-widest hover:text-zinc-500 transition-colors"
          >
            {data.hero.linkText}
            <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform duration-500" strokeWidth={1} />
          </Link>
        </div>
      </section>

      {/* HIGHLIGHTED PROJECTS / BREAKDOWNS */}
      <section className="py-40 border-t border-zinc-100">
        <div className="flex flex-col gap-24">
          {data.highlightedProjects.map((project: any, i: number) => (
            <Link key={project.id} href={project.slug} className="group flex flex-col md:flex-row md:items-baseline justify-between">
              <div className="flex flex-col">
                <span className="text-xs text-zinc-400 mb-4 tracking-widest uppercase">0{i + 1} — {project.category}</span>
                <h2 className="text-4xl tracking-tight group-hover:text-zinc-400 transition-colors duration-500">
                  {project.title}
                </h2>
              </div>
              <span className="text-sm text-zinc-400 mt-4 md:mt-0">{project.year}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="py-40 border-t border-zinc-100 flex flex-col items-center text-center">
        <h2 className="text-4xl tracking-tight mb-8">{data.contact.heading}</h2>
        <a 
          href={`mailto:${data.contact.email}`}
          className="text-lg text-zinc-500 hover:text-zinc-900 border-b border-transparent hover:border-zinc-900 transition-all pb-1"
        >
          {data.contact.email}
        </a>
      </section>
      
    </main>
  );
}