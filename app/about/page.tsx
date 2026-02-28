import data from '@/data/portfolio.json';
import type { PortfolioData, Experience } from '@/lib/content';
import React from 'react';

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-40 min-h-[80vh] font-light text-zinc-900">
      <span className="text-xs uppercase tracking-[0.3em] text-zinc-400 mb-12 block">
        About Me
      </span>
      
      <h1 className="text-5xl md:text-7xl tracking-tighter mb-24 leading-[1]">
        {data.about.heading}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
        <div className="flex flex-col gap-6 text-xl text-zinc-500 leading-relaxed">
          {data.about.bio.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-zinc-400 mb-8 block">
            Experience & Education
          </span>
          <div className="flex flex-col gap-8 border-t border-zinc-100 pt-8">
            {data.about.experience.map((exp: any, i: number) => (
              <div key={i} className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <div>
                  <h3 className="text-lg text-zinc-900">{exp.role}</h3>
                  <p className="text-sm text-zinc-500">{exp.company}</p>
                </div>
                <span className="text-xs text-zinc-400 font-mono">{exp.year}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}