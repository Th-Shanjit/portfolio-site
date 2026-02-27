import { cmsData } from '../data/content';

export default function AboutPage() {
  const data = cmsData.about;
  return (
    <div className="animate-in fade-in duration-1000 max-w-7xl mx-auto px-6 py-32 relative z-10 min-h-[80vh]">
      <div className="flex flex-col lg:flex-row gap-20 items-start">
        <div className="lg:w-1/2">
          <h1 className="text-5xl font-light tracking-tight text-zinc-900 mb-12">{data.title}</h1>
          <div className="relative pt-2 mb-16">
            <span className="absolute -top-12 -left-6 text-8xl font-serif text-zinc-100 opacity-50 z-0 select-none">"</span>
            <p className="text-zinc-600 font-light leading-loose text-xl relative z-10">{data.content}</p>
          </div>
          <div className="flex flex-col gap-4 border-t border-zinc-100 pt-8">
            <span className="text-xs font-medium uppercase tracking-widest text-zinc-400 mb-2">Core Competencies</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data.skills.map((skill: string, i: number) => (
                <div key={i} className="flex items-center gap-3 group">
                  <span className="w-4 h-[1px] bg-zinc-200 group-hover:w-8 group-hover:bg-zinc-400 transition-all duration-500"></span>
                  <span className="text-sm font-light text-zinc-600 group-hover:text-zinc-900 transition-colors">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:w-1/2 w-full lg:pl-12 lg:border-l border-zinc-100">
          <span className="text-xs font-medium uppercase tracking-widest text-zinc-400 mb-12 block">Background & Education</span>
          <div className="flex flex-col">
            {data.experience.map((item: any) => (
              <div key={item.id} className="group relative pb-12 pl-8 border-l border-zinc-100 last:border-transparent last:pb-0">
                <div className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full bg-white border border-zinc-300 group-hover:border-zinc-900 group-hover:bg-zinc-900 transition-all duration-300"></div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest text-zinc-400 mb-2">{item.year} • {item.type}</span>
                  <h3 className="text-lg font-light text-zinc-900 group-hover:text-zinc-600 transition-colors mb-1">{item.role}</h3>
                  <span className="text-sm font-light text-zinc-500">{item.company}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}