'use client';

/*
  layout.tsx fonts (next/font/google):
  ─ Cormorant_Garamond  weights: 300,400,500,600  styles: normal,italic
  ─ DM_Sans             weights: 300,400,500
*/

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  ArrowUpRight, Heart, MessageCircle, Linkedin,
  FolderOpen, BookOpen, FileText, LayoutGrid,
  ChevronRight, Clock, HardDrive, ChevronLeft,
  MapPin, Briefcase,
} from 'lucide-react';
import { t, Reveal, timeAgo, Label, RoleTag } from '@/lib/design';

// ─── types ─────────────────────────────────────────────────────────────────
type Doc = {
  id: string; title: string; type: string; published?: boolean;
  thumbnail?: string; coverImage?: string; link?: string;
  description?: string; tag?: string; content?: string[];
};
type Portfolio = {
  site: { name: string; dpUrl?: string; linkedinUrl?: string };
  hero: { description: string; link: string; linkText: string };
  highlightedProjects: { id: string }[];
  docs: Doc[];
  contact: { heading: string };
};
type Post = {
  id: string; postUrl: string; text?: string;
  thumbnail?: string; likes: number; comments: number; createdAt?: number;
};

// ─── placeholder data ───────────────────────────────────────────────────────
const PLACEHOLDER_PROJECTS: Doc[] = [
  { id: 'p1', title: 'AgentFlow', type: 'case-study', tag: 'Agentic AI', published: true, thumbnail: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80', description: 'End-to-end agentic workflow platform' },
  { id: 'p2', title: 'Memoria', type: 'project', tag: 'LLM Infra', published: true, thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80', description: 'LLM-powered knowledge management' },
  { id: 'p3', title: 'Threadcraft', type: 'case-study', tag: 'Product', published: true, thumbnail: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80', description: 'AI content strategy & scheduling' },
  { id: 'p4', title: 'Cortex', type: 'project', tag: 'Evaluation', published: true, thumbnail: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=600&q=80', description: 'Enterprise AI evaluation framework' },
  { id: 'p5', title: 'Nexus', type: 'case-study', tag: 'Multi-agent', published: true, thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80', description: 'Multi-agent orchestration OS' },
];

const PLACEHOLDER_POSTS: Post[] = [
  { id: 'li1', postUrl: '#', likes: 847, comments: 63, createdAt: Date.now() - 1000 * 60 * 60 * 18, text: "After 6 months building agentic systems in production, here's what nobody tells you:\n\nAgents don't fail because the LLM is bad. They fail because the scaffolding is fragile.\n\nThree patterns that changed how we build:" },
  { id: 'li2', postUrl: '#', likes: 1204, comments: 91, createdAt: Date.now() - 1000 * 60 * 60 * 42, text: "The best product insight I've had all year:\n\nUsers don't want AI that's impressive. They want AI that's invisible.\n\nThe moment your AI makes someone feel smart — that's product-market fit." },
  { id: 'li3', postUrl: '#', likes: 532, comments: 44, createdAt: Date.now() - 1000 * 60 * 60 * 72, text: "We benchmarked 7 LLM providers for a production agentic workflow. Cost, latency, reliability.\n\nThe results surprised us. Thread below 👇" },
  { id: 'li4', postUrl: '#', likes: 2140, comments: 178, createdAt: Date.now() - 1000 * 60 * 60 * 120, text: "Hot take: RAG is a band-aid.\n\nMost teams reach for retrieval when the real problem is context architecture.\n\nHere's a better mental model for when RAG actually makes sense — and when it doesn't." },
];

const PLACEHOLDER_DOCS: Doc[] = [
  { id: 'd1', title: 'Building Production-Grade Agentic Systems', type: 'case-study', published: true },
  { id: 'd2', title: 'Context Window Management at Scale', type: 'case-study', published: true },
  { id: 'd3', title: 'Multi-Agent Coordination Patterns', type: 'case-study', published: true },
  { id: 'd4', title: 'AgentFlow Technical Architecture', type: 'project', published: true },
  { id: 'd5', title: 'Memoria: Knowledge Graph Design', type: 'project', published: true },
  { id: 'd6', title: 'Evaluating LLMs for Agentic Tasks', type: 'doc', published: true },
  { id: 'd7', title: 'The State of AI in 2025', type: 'blog', published: true },
  { id: 'd8', title: 'Why Most AI Products Fail', type: 'blog', published: true },
];


// ─── project filmstrip ─────────────────────────────────────────────────────
function Filmstrip({ items }: { items: Doc[] }) {
  const rail = useRef<HTMLDivElement>(null);
  const [canL, setL] = useState(false);
  const [canR, setR] = useState(false);

  const sync = () => {
    const el = rail.current; if (!el) return;
    setL(el.scrollLeft > 10);
    setR(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };
  useEffect(() => {
    const el = rail.current; if (!el) return;
    el.addEventListener('scroll', sync, { passive: true });
    setTimeout(sync, 120);
    return () => el.removeEventListener('scroll', sync);
  }, [items]);

  const scroll = (dir: 1 | -1) =>
    rail.current?.scrollBy({ left: dir * 300, behavior: 'smooth' });

  return (
    <div style={{ position: 'relative' }}>
      {/* fade edges */}
      {canL && <div style={{ position:'absolute', left:0, top:0, bottom:18, width:80, background:`linear-gradient(to right, ${t.bg}, transparent)`, zIndex:3, pointerEvents:'none' }} />}
      {canR && <div style={{ position:'absolute', right:0, top:0, bottom:18, width:100, background:`linear-gradient(to left, ${t.bg}, transparent)`, zIndex:3, pointerEvents:'none' }} />}

      {/* nav buttons */}
      {canL && (
        <button className="hidden sm:flex" onClick={() => scroll(-1)} style={{ position:'absolute', left:-14, top:70, zIndex:4, width:32, height:32, borderRadius:'50%', background:t.bgSurface, border:`1px solid ${t.border}`, cursor:'pointer', alignItems:'center', justifyContent:'center', boxShadow:'0 2px 8px rgba(0,0,0,0.08)' }}>
          <ChevronLeft size={13} color={t.inkMuted} />
        </button>
      )}
      {canR && (
        <button className="hidden sm:flex" onClick={() => scroll(1)} style={{ position:'absolute', right:-14, top:70, zIndex:4, width:32, height:32, borderRadius:'50%', background:t.bgSurface, border:`1px solid ${t.border}`, cursor:'pointer', alignItems:'center', justifyContent:'center', boxShadow:'0 2px 8px rgba(0,0,0,0.08)' }}>
          <ChevronRight size={13} color={t.inkMuted} />
        </button>
      )}

      {/* rail */}
      <div ref={rail} style={{ display:'flex', gap:20, overflowX:'auto', paddingBottom:6, scrollSnapType:'x mandatory', scrollbarWidth:'none' }}>
        {items.map((doc, i) => <FilmCard key={doc.id} doc={doc} i={i} />)}
      </div>
    </div>
  );
}

function FilmCard({ doc, i }: { doc: Doc; i: number }) {
  const [hov, setHov] = useState(false);
  return (
    <a
      href={doc.link || `/docs/${doc.id}`}
      target={doc.link ? '_blank' : undefined}
      rel="noopener noreferrer"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ display:'flex', flexDirection:'column', flexShrink:0, width:248, scrollSnapAlign:'start', textDecoration:'none' }}
    >
      {/* image */}
      <div style={{ position:'relative', width:'100%', height:152, overflow:'hidden', background:t.bgMuted, borderRadius:8, border:`1px solid ${t.borderFaint}` }}>
        {doc.thumbnail ? (
          <img src={doc.thumbnail} alt={doc.title} style={{ width:'100%', height:'100%', objectFit:'cover', transform: hov ? 'scale(1.05)' : 'scale(1)', transition:'transform 0.6s cubic-bezier(0.16,1,0.3,1)' }} />
        ) : (
          <div style={{ width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <span style={{ fontFamily:t.mono, fontSize:9, color:t.inkFaint, letterSpacing:'0.15em' }}>NO PREVIEW</span>
          </div>
        )}
        {/* index badge */}
        <div style={{ position:'absolute', top:10, left:10, fontFamily:t.mono, fontSize:9, color:'rgba(255,255,255,0.7)', background:'rgba(0,0,0,0.35)', backdropFilter:'blur(6px)', padding:'3px 7px', borderRadius:3, letterSpacing:'0.1em' }}>
          {String(i + 1).padStart(2, '0')}
        </div>
      </div>

      {/* caption */}
      <div style={{ paddingTop:10, display:'flex', flexDirection:'column', gap:3 }}>
        <div style={{ display:'flex', alignItems:'baseline', justifyContent:'space-between', gap:8 }}>
          <span style={{ fontFamily:t.serif, fontSize:16, fontWeight:500, color: hov ? t.ink : '#5a5450', transition:'color 0.2s', lineHeight:1.2, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
            {doc.title}
          </span>
          <ArrowUpRight size={12} color={hov ? t.accent : t.borderFaint} style={{ flexShrink:0, transition:'color 0.2s' }} />
        </div>
        <span style={{ fontFamily:t.mono, fontSize:9, color:t.inkFaint, letterSpacing:'0.12em', textTransform:'uppercase' }}>
          {doc.tag || doc.type}
        </span>
      </div>
    </a>
  );
}

// ─── browser / data room ───────────────────────────────────────────────────
const DEFAULT_ICONS: Record<string, any> = {
  'case-study': LayoutGrid,
  'project': FolderOpen,
  'blog': BookOpen,
  'doc': FileText,
};

const DEFAULT_LABELS: Record<string, string> = {
  'case-study': 'Case Studies',
  'project': 'Projects',
  'blog': 'Blog',
  'doc': 'Docs',
};

function DataRoom({ docs }: { docs: Doc[] }) {
  const allDocs = docs.length > 0 ? docs : PLACEHOLDER_DOCS;
  
  const uniqueTypes = Array.from(new Set(allDocs.map(d => d.type))).filter(Boolean) as string[];
  
  const folders = uniqueTypes.map(type => ({
    id: type,
    label: DEFAULT_LABELS[type] || (type.charAt(0).toUpperCase() + type.slice(1)),
    icon: DEFAULT_ICONS[type] || FileText,
    count: allDocs.filter(d => d.type === type).length
  }));

  const [active, setActive] = useState(folders.length > 0 ? folders[0].id : 'case-study');
  const [hRow, setHRow] = useState<string | null>(null);
  const [hFold, setHFold] = useState<string | null>(null);

  // If active type is deleted, fallback to the first available
  useEffect(() => {
    if (folders.length > 0 && !folders.find(f => f.id === active)) {
      setActive(folders[0].id);
    }
  }, [folders, active]);

  const rows = allDocs.filter(d => d.type === active).slice(0, 7);
  const af = folders.find(f => f.id === active) || { label: 'Unknown', icon: FileText };

  return (
    <div className="flex flex-col sm:flex-row min-h-[380px]" style={{ fontFamily:t.mono }}>
      {/* sidebar */}
      <div className="flex flex-row sm:flex-col overflow-x-auto no-scrollbar shrink-0 w-full sm:w-[192px] border-b sm:border-b-0 sm:border-r" style={{ borderColor:t.borderFaint, background:'#fcfaf7' }}>
        
        <div className="hidden sm:block" style={{ padding:'18px 14px 10px' }}>
          <span style={{ fontSize:9, color:t.inkFaint, letterSpacing:'0.18em', textTransform:'uppercase' }}>Locations</span>
        </div>

        <div className="flex flex-row sm:flex-col w-max sm:w-full">
          {folders.map(f => {
            const isA = f.id === active;
            return (
              <button key={f.id} onClick={() => setActive(f.id)}
                onMouseEnter={() => setHFold(f.id)} onMouseLeave={() => setHFold(null)}
                className="flex items-center justify-between sm:justify-start gap-2 px-4 py-3 sm:py-2 border-b-2 sm:border-b-0 sm:border-l-2 transition-colors cursor-pointer"
                style={{ 
                  background: isA ? t.bgSurface : hFold===f.id ? 'rgba(0,0,0,0.02)' : 'transparent', 
                  borderColor: isA ? t.accent : 'transparent' 
                }}
              >
                <div className="flex items-center gap-2">
                  <f.icon size={11} color={isA ? t.accent : t.inkFaint} />
                  <span style={{ fontSize:11, color: isA ? t.ink : t.inkMuted }}>{f.label}</span>
                </div>
                <span className="hidden sm:block ml-auto" style={{ fontSize:9, color:t.inkFaint, background: isA ? t.bgMuted : 'transparent', padding:'1px 6px', borderRadius:3 }}>{f.count}</span>
              </button>
            );
          })}

          <div className="hidden sm:block mx-3.5 my-3.5 h-px" style={{ background:t.borderFaint }} />
          
          <Link href="/docs" className="flex items-center gap-2 px-4 py-3 sm:py-2 border-b-2 sm:border-b-0 sm:border-l-2 border-transparent transition-colors" style={{ textDecoration:'none' }}>
            <ChevronRight size={10} color={t.inkFaint} />
            <span style={{ fontSize:11, color:t.inkFaint }}>Browse All</span>
          </Link>
        </div>
      </div>

      {/* main pane */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* breadcrumb */}
        <div className="flex items-center gap-1.5 px-4 py-2 border-b whitespace-nowrap overflow-hidden" style={{ textOverflow: 'ellipsis', borderColor:t.borderFaint, background:'#fdfcf9' }}>
          <HardDrive size={9} color={t.inkFaint} className="shrink-0" />
          <ChevronRight size={8} color={t.borderFaint} className="shrink-0" />
          <span style={{ fontSize:9, color:t.inkFaint }}>portfolio</span>
          <ChevronRight size={8} color={t.borderFaint} className="shrink-0" />
          <span style={{ fontSize:9, color:t.accent }}>{af.label}</span>
        </div>

        {/* header row */}
        <div className="grid grid-cols-[1fr_70px] sm:grid-cols-[1fr_90px_70px] px-4 py-1.5 border-b" style={{ borderColor:t.borderFaint, background:'#fdfcf9' }}>
          <span style={{ fontSize:9, color:t.inkFaint, textTransform:'uppercase', letterSpacing:'0.15em' }}>Name</span>
          <span className="hidden sm:block" style={{ fontSize:9, color:t.inkFaint, textTransform:'uppercase', letterSpacing:'0.15em' }}>Type</span>
          <span style={{ fontSize:9, color:t.inkFaint, textTransform:'uppercase', letterSpacing:'0.15em' }}>Modified</span>
        </div>

        {/* rows */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          {rows.length === 0 ? (
            <div style={{ padding:'48px 16px', textAlign:'center', color:t.inkFaint, fontSize:10 }}>No items</div>
          ) : rows.map((doc, i) => (
            <Link key={doc.id} href={`/docs/${doc.id}`}
              onMouseEnter={() => setHRow(doc.id)} onMouseLeave={() => setHRow(null)}
              className="grid grid-cols-[1fr_70px] sm:grid-cols-[1fr_90px_70px] px-4 py-2.5 items-center border-b transition-colors"
              style={{ textDecoration: 'none', background: hRow===doc.id ? '#fdf7f0' : i%2 ? '#fdfcf9' : t.bgSurface, borderColor:t.borderFaint }}
            >
              <div className="flex items-center gap-2.5 overflow-hidden">
                <af.icon size={10} color={hRow===doc.id ? t.accent : t.inkFaint} className="shrink-0" />
                <span className="truncate transition-colors" style={{ fontSize:11, color: hRow===doc.id ? t.ink : t.inkMuted }}>{doc.title}</span>
              </div>
              <span className="hidden sm:block" style={{ fontSize:9, color:t.inkFaint, textTransform:'uppercase', letterSpacing:'0.07em' }}>{doc.type}</span>
              <div className="flex items-center gap-1 shrink-0">
                <Clock size={8} color={t.borderFaint} />
                <span style={{ fontSize:9, color:t.borderFaint }}>—</span>
              </div>
            </Link>
          ))}
        </div>

        {/* status */}
        <div className="flex items-center justify-between px-4 py-1.5 border-t mt-auto" style={{ borderColor:t.borderFaint, background:'#fdfcf9' }}>
          <span style={{ fontSize:9, color:t.inkFaint }}>{rows.length} item{rows.length !== 1 ? 's' : ''}</span>
          <Link href="/docs" className="flex items-center gap-1" style={{ textDecoration: 'none', fontSize:9, color:t.accent }}>
            View all <ChevronRight size={8} />
          </Link>
        </div>
      </div>
    </div>
  );
}

function Browser({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl overflow-hidden border" style={{ borderColor:t.border, boxShadow:`0 8px 40px rgba(28,25,22,0.08), 0 1px 0 ${t.borderFaint}` }}>
      {/* chrome */}
      <div className="flex items-center px-4 py-2.5 gap-3 border-b" style={{ background:'#f0ebe2', borderColor:t.border }}>
        <div className="hidden sm:flex gap-1.5">
          {['#ff5f56','#ffbd2e','#27c93f'].map(c => <div key={c} style={{ width:10, height:10, borderRadius:'50%', background:c, opacity:0.7 }} />)}
        </div>
        {/* tab */}
        <div className="flex items-center gap-1.5 px-3.5 py-1.5 mb-[-11px] mt-[-2px] border-t border-x rounded-t-[7px] relative z-10" style={{ background:t.bgSurface, borderColor:t.border, borderBottomColor:t.bgSurface }}>
          <HardDrive size={9} color={t.accent} />
          <span style={{ fontFamily:t.mono, fontSize:10, color:t.inkMuted }}>Data Room</span>
        </div>
        <div className="flex-1" />
        {/* address */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 border rounded-[5px] min-w-[210px]" style={{ background:'#e8e2d8', borderColor:t.border }}>
          <div style={{ width:5, height:5, borderRadius:'50%', background:'#27c93f', opacity:0.8 }} />
          <span style={{ fontFamily:t.mono, fontSize:9, color:t.inkFaint }}>portfolio.local / data-room</span>
        </div>
      </div>
      <div style={{ background:t.bgSurface }}>{children}</div>
    </div>
  );
}

// ─── linkedin post ─────────────────────────────────────────────────────────
function Post({ post, i, dpUrl, name }: { post: Post; i: number; dpUrl?: string; name?: string }) {
  const [exp, setExp] = useState(false);
  const [hov, setHov] = useState(false);
  const long = (post.text?.length ?? 0) > 200;
  const text = !exp && long ? post.text!.slice(0, 200) + '…' : post.text;

  return (
    <Reveal delay={i * 80}>
      <a href={post.postUrl} target="_blank" rel="noopener noreferrer"
        onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
        onClick={e => { if (long && !exp) { e.preventDefault(); setExp(true); } }}
        style={{ display:'block', textDecoration:'none', paddingBottom:32, marginBottom:32, borderBottom:`1px solid ${t.borderFaint}` }}
      >
        {/* author */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:14 }}>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <div style={{ width:30, height:30, borderRadius:'50%', overflow:'hidden', border:`1px solid ${t.borderFaint}`, flexShrink:0 }}>
              {dpUrl
                ? <img src={dpUrl} alt={name} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                : <div style={{ width:'100%', height:'100%', background:'#0a66c2', display:'flex', alignItems:'center', justifyContent:'center' }}><Linkedin size={11} color="white" /></div>
              }
            </div>
            <div>
              <p style={{ fontFamily:t.serif, fontSize:14, fontWeight:500, color:t.ink, margin:0, lineHeight:1 }}>{name || 'Author'}</p>
              {post.createdAt && <p style={{ fontFamily:t.mono, fontSize:9, color:t.inkFaint, margin:'3px 0 0' }}>{timeAgo(post.createdAt)} ago</p>}
            </div>
          </div>
          <ArrowUpRight size={12} color={hov ? t.accent : t.borderFaint} style={{ transition:'color 0.2s' }} />
        </div>

        {text && (
          <p style={{ fontFamily:t.sans, fontSize:13, color: hov ? '#4a4440' : t.inkMuted, lineHeight:1.75, margin:'0 0 12px', whiteSpace:'pre-line', fontWeight:300 }}>
            {text}
            {long && !exp && <span style={{ color:t.accent, cursor:'pointer', marginLeft:4, fontWeight:400 }} onClick={e => { e.preventDefault(); setExp(true); }}>see more</span>}
          </p>
        )}

        <div style={{ display:'flex', gap:16 }}>
          {[{Icon:Heart,v:post.likes},{Icon:MessageCircle,v:post.comments}].map(({Icon,v},j)=>(
            <div key={j} style={{ display:'flex', alignItems:'center', gap:5 }}>
              <Icon size={10} color={t.borderFaint} />
              <span style={{ fontFamily:t.mono, fontSize:10, color:t.inkFaint }}>{v?.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </a>
    </Reveal>
  );
}

// ─── skeleton ──────────────────────────────────────────────────────────────
function Skel() {
  return (
    <div style={{ paddingBottom:32, marginBottom:32, borderBottom:`1px solid ${t.borderFaint}` }}>
      {[50,85,70,40].map((w,i)=>(
        <div key={i} style={{ height:9, width:`${w}%`, background:t.borderFaint, borderRadius:3, marginBottom:9, animation:'pulse 1.4s ease-in-out infinite' }} />
      ))}
    </div>
  );
}


// ═══════════════════════════════════════════════════════════════════════════
// PAGE
// ═══════════════════════════════════════════════════════════════════════════
export default function Home() {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [liLoading, setLiLoading] = useState(true);
  const [liError, setLiError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/content?t=' + Date.now(), { cache:'no-store' })
      .then(r => r.json())
      .then(data => {
        // Only set portfolio if we actually got valid data, otherwise keep null to show placeholders
        if (data && typeof data === 'object') {
          setPortfolio(data);
        }
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    fetch('/api/linkedin')
      .then(r => r.json())
      .then(d => { if (d.error) setLiError(d.error); else setPosts(d.posts || []); })
      .catch(() => setLiError('Could not load posts.'))
      .finally(() => setLiLoading(false));
  }, []);

  // use real data if available, fall back to placeholders
  const name        = portfolio?.site?.name || 'Shanjit';
  const dpUrl       = portfolio?.site?.dpUrl;
  const linkedinUrl = portfolio?.site?.linkedinUrl || '#';
  const bio         = portfolio?.hero?.description || 'Building agentic AI products at the intersection of LLMs, product strategy, and systems design. Currently focused on multi-agent orchestration.';
  const ctaLink     = portfolio?.hero?.link || '/docs';
  const ctaText     = portfolio?.hero?.linkText || 'View Work';
  const contactH    = portfolio?.contact?.heading || "Let's build something together";

  // Use placeholders only if portfolio is literally null (not loaded yet)
  // Otherwise use whatever is in portfolio, even if it's empty arrays.
  const rawProjects = portfolio
    ? (portfolio.highlightedProjects || []).map(p => portfolio.docs?.find(d => d.id === p.id)).filter((d): d is Doc => !!d && d.published !== false)
    : PLACEHOLDER_PROJECTS;
  const projects = rawProjects;

  const allDocs  = portfolio ? (portfolio.docs || []).filter(d => d.published !== false) : PLACEHOLDER_DOCS;
  const livePosts = posts.length > 0 ? posts : PLACEHOLDER_POSTS;

  const MAX = 1040;
  const PX = 'clamp(20px, 5vw, 64px)';

  return (
    <>
      <style>{`
        @keyframes pulse{0%,100%{opacity:.4}50%{opacity:.9}}
        *{box-sizing:border-box}
        ::-webkit-scrollbar{display:none}
        a{-webkit-tap-highlight-color:transparent}
        button{outline:none}
      `}</style>

      <main style={{ background:t.bg, minHeight:'100vh', color:t.ink }}>

        {/* ╔══════════════════════════════╗
            ║          HERO               ║
            ╚══════════════════════════════╝ */}
        <section style={{ maxWidth:MAX, margin:'0 auto', padding:`72px ${PX} 96px` }}>

          {/* top bar: status left, location + role right */}
          <Reveal>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 mb-[40px] sm:mb-[64px]">
              <div style={{ display:'flex', alignItems:'center', gap:9 }}>
                <div style={{ width:7, height:7, borderRadius:'50%', background:'#4ade80', boxShadow:'0 0 8px rgba(74,222,128,0.5)' }} />
                <Label>Available for collaboration</Label>
              </div>
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-4 sm:gap-16">
                <div style={{ display:'flex', alignItems:'center', gap:5 }}>
                  <MapPin size={9} color={t.inkFaint} />
                  <Label>Remote / Worldwide</Label>
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:5 }}>
                  <Briefcase size={9} color={t.inkFaint} />
                  <Label>AI Product</Label>
                </div>
              </div>
            </div>
          </Reveal>

          {/* name + avatar */}
          <div className="flex flex-col-reverse sm:flex-row items-start sm:items-end justify-between gap-8 sm:gap-[32px]">
            <Reveal delay={60}>
              <h1 style={{
                fontFamily: t.serif,
                fontSize: 'clamp(56px, 12vw, 114px)',
                fontWeight: 400,
                lineHeight: 0.88,
                letterSpacing: '-0.02em',
                color: t.ink,
                margin: 0,
              }}>
                {name}
              </h1>
            </Reveal>

            <Reveal delay={120}>
              <div className="flex flex-row sm:flex-col items-center sm:items-end gap-4 sm:gap-3 pb-0 sm:pb-2 shrink-0">
                <div style={{ width:78, height:78, borderRadius:8, overflow:'hidden', border:`1px solid ${t.border}`, boxShadow:`0 4px 20px rgba(28,25,22,0.1)` }}>
                  {dpUrl
                    ? <img src={dpUrl} alt={name} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                    : (
                      /* placeholder avatar with initials */
                      <div style={{ width:'100%', height:'100%', background:'linear-gradient(135deg,#e8d9c8,#d4c4b0)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                        <span style={{ fontFamily:t.serif, fontSize:28, color:'#8a7060', fontWeight:400 }}>
                          {name[0]}
                        </span>
                      </div>
                    )
                  }
                </div>
                <div style={{ display:'flex', gap:6 }}>
                  <RoleTag>AI Product</RoleTag>
                  <RoleTag>Systems</RoleTag>
                </div>
              </div>
            </Reveal>
          </div>

          {/* rule + bio + cta */}
          <Reveal delay={180}>
            <div className="mt-8 pt-8 sm:mt-[44px] sm:pt-[36px] border-t grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-[40px] items-start" style={{ borderColor: t.border }}>
              <p style={{ fontFamily:t.sans, fontSize:14, color:t.inkMuted, lineHeight:1.8, margin:0, fontWeight:300, maxWidth:340 }}>
                {bio}
              </p>
              <div className="flex flex-col items-start sm:items-end gap-5">
                <div className="flex gap-2.5 flex-wrap justify-start sm:justify-end">
                  <Link href={ctaLink} style={{ fontFamily:t.mono, fontSize:9, color:t.accentFg, background:t.accent, padding:'13px 22px', textDecoration:'none', letterSpacing:'0.14em', textTransform:'uppercase', display:'inline-flex', alignItems:'center', gap:7, borderRadius:3 }}>
                    {ctaText} <ArrowUpRight size={11} />
                  </Link>
                  <a href={linkedinUrl} target="_blank" rel="noopener noreferrer"
                    style={{ fontFamily:t.mono, fontSize:9, color:t.inkMuted, border:`1px solid ${t.border}`, padding:'12px 18px', textDecoration:'none', letterSpacing:'0.14em', textTransform:'uppercase', display:'inline-flex', alignItems:'center', gap:7, borderRadius:3 }}>
                    <Linkedin size={10} /> LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ╔══════════════════════════════╗
            ║        PROJECTS             ║
            ╚══════════════════════════════╝ */}
        <section style={{ maxWidth:MAX, margin:'0 auto', padding:`0 ${PX} 96px` }}>
          <Reveal>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:32 }}>
              <div style={{ display:'flex', alignItems:'center', gap:16 }}>
                <Label>01</Label>
                <div style={{ width:40, height:'1px', background:t.border }} />
                <Label>Selected Work</Label>
              </div>
              <Link href="/docs" style={{ fontFamily:t.mono, fontSize:9, color:t.inkFaint, textDecoration:'none', letterSpacing:'0.12em', textTransform:'uppercase', display:'flex', alignItems:'center', gap:5 }}>
                All work <ArrowUpRight size={9} />
              </Link>
            </div>
          </Reveal>
          <Filmstrip items={projects} />
        </section>

        {/* ╔══════════════════════════════╗
            ║        DATA ROOM            ║
            ╚══════════════════════════════╝ */}
        <section style={{ maxWidth:MAX, margin:'0 auto', padding:`0 ${PX} 96px` }}>
          <Reveal>
            <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:32 }}>
              <Label>02</Label>
              <div style={{ width:40, height:'1px', background:t.border }} />
              <Label>Data Room</Label>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <Browser>
              <DataRoom docs={allDocs} />
            </Browser>
          </Reveal>
        </section>

        {/* ╔══════════════════════════════╗
            ║        LINKEDIN             ║
            ╚══════════════════════════════╝ */}
        <section style={{ maxWidth:MAX, margin:'0 auto', padding:`0 ${PX} 96px` }}>
          <Reveal>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:48 }}>
              <div style={{ display:'flex', alignItems:'center', gap:16 }}>
                <Label>03</Label>
                <div style={{ width:40, height:'1px', background:t.border }} />
                <Label>Thinking in Public</Label>
              </div>
              <a href={linkedinUrl} target="_blank" rel="noopener noreferrer"
                style={{ fontFamily:t.mono, fontSize:9, color:t.inkFaint, textDecoration:'none', letterSpacing:'0.12em', textTransform:'uppercase', display:'flex', alignItems:'center', gap:5 }}>
                <Linkedin size={9} /> View profile <ArrowUpRight size={9} />
              </a>
            </div>
          </Reveal>

          {liError ? (
            <p style={{ fontFamily:t.mono, fontSize:11, color:t.inkFaint }}>{liError}</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-0 sm:gap-x-[52px]">
              {(liLoading && posts.length === 0)
                ? Array.from({length:4}).map((_,i)=><Skel key={i}/>)
                : livePosts.map((p,i)=>(
                    <Post key={p.id} post={p} i={i} dpUrl={dpUrl} name={name} />
                  ))
              }
            </div>
          )}
        </section>

        {/* ╔══════════════════════════════╗
            ║         CONTACT             ║
            ╚══════════════════════════════╝ */}
        <section style={{ maxWidth:MAX, margin:'0 auto', padding:`0 ${PX} 96px` }}>
          <Reveal>
            <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:56 }}>
              <Label>04</Label>
              <div style={{ width:40, height:'1px', background:t.border }} />
              <Label>Contact</Label>
            </div>
          </Reveal>

          <Reveal delay={60}>
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-8 sm:gap-10 items-start sm:items-end pb-[52px] border-b" style={{ borderColor:t.border }}>
              <div>
                <h2 style={{ fontFamily:t.serif, fontSize:'clamp(36px, 5vw, 64px)', fontWeight:400, lineHeight:1, letterSpacing:'-0.02em', color:t.ink, margin:'0 0 20px' }}>
                  {contactH}
                </h2>
                <p style={{ fontFamily:t.sans, fontSize:13, color:t.inkMuted, lineHeight:1.8, maxWidth:340, margin:0, fontWeight:300 }}>
                  Whether you're building an AI product, exploring agentic architectures, or just want to exchange ideas — my inbox is open.
                </p>
              </div>
              <a href={linkedinUrl} target="_blank" rel="noopener noreferrer"
                style={{ fontFamily:t.mono, fontSize:9, color:t.accentFg, background:t.accent, padding:'14px 24px', textDecoration:'none', letterSpacing:'0.14em', textTransform:'uppercase', whiteSpace:'nowrap', display:'inline-flex', alignItems:'center', gap:7, borderRadius:3 }}>
                Drop a DM <ArrowUpRight size={11} />
              </a>
            </div>

            {/* footer */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 pt-7">
              <span style={{ fontFamily:t.mono, fontSize:9, color:t.inkFaint, letterSpacing:'0.12em' }}>
                {name.toUpperCase()} © {new Date().getFullYear()}
              </span>
              <span style={{ fontFamily:t.mono, fontSize:9, color:t.borderFaint, letterSpacing:'0.08em' }}>
                Built with Next.js
              </span>
            </div>
          </Reveal>
        </section>

      </main>
    </>
  );
}