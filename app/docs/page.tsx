'use client';

import Link from 'next/link';
import { ArrowRight, Search, FileText, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';
import { t, Reveal, Label, RoleTag, DraftBadge } from '@/lib/design';

export default function DocsArchive() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All'); 
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch('/api/content?t=' + Date.now(), { cache: 'no-store' })
      .then(res => res.json())
      .then(json => setData(json))
      .catch(err => console.error("Failed to fetch Data Room contents:", err));
  }, []);

  if (!data) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: t.bg, color: t.inkMuted, textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: 11, fontFamily: t.mono }}>
      Loading Data Room...
    </div>
  );

  const allDocs = data.docs || [];
  const publishedDocs = allDocs.filter((doc: any) => doc.published !== false);
  const categories = Array.from(new Set(publishedDocs.map((doc: any) => doc.type))) as string[];
  const allCategories = ['All', ...categories];

  const stripHtml = (html: string) => {
    if (!html) return '';
    return html.replace(/<[^>]*>?/gm, '').replace(/&nbsp;/g, ' ');
  };

  const filteredDocs = publishedDocs.filter((doc: any) => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) || doc.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'All' || doc.type === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <main style={{ background: t.bg, minHeight: '100vh', color: t.ink, padding: '120px clamp(20px, 5vw, 64px) 160px', maxWidth: 1040, margin: '0 auto' }}>
      
      <div style={{ marginBottom: 64 }}>
        <Reveal>
          <h1 style={{ fontFamily: t.serif, fontSize: 'clamp(40px, 6vw, 64px)', fontWeight: 400, color: t.ink, marginBottom: 16, lineHeight: 1.1 }}>The Data Room</h1>
          <p style={{ fontFamily: t.sans, fontSize: 18, color: t.inkMuted, fontWeight: 300, maxWidth: 640, lineHeight: 1.6, marginBottom: 48 }}>An archive of system architectures, case studies, and technical documentation.</p>
          
          <div style={{ position: 'relative', marginBottom: 32 }}>
            <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: 20, display: 'flex', alignItems: 'center', pointerEvents: 'none' }}>
              <Search size={16} color={t.inkFaint} />
            </div>
            <input 
              type="text" 
              placeholder="Search case studies, domains..." 
              style={{ width: '100%', padding: '16px 24px 16px 48px', background: t.bgSurface, border: `1px solid ${t.border}`, borderRadius: 16, fontSize: 15, fontFamily: t.sans, color: t.ink, outline: 'none' }} 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
            />
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {allCategories.map((category) => (
              <button 
                key={category} 
                onClick={() => setActiveFilter(category)} 
                style={{ 
                  padding: '8px 20px', borderRadius: 99, fontSize: 10, fontFamily: t.mono, letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.2s',
                  background: activeFilter === category ? t.ink : t.bgSurface,
                  color: activeFilter === category ? t.bg : t.inkMuted,
                  border: `1px solid ${activeFilter === category ? t.ink : t.border}`
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </Reveal>
      </div>

      <div>
        {filteredDocs.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {filteredDocs.map((doc: any, index: number) => (
              <Reveal key={doc.id} delay={index * 60}>
                <Link 
                  href={doc.link || `/docs/${doc.id}`} 
                  target={doc.link ? "_blank" : undefined}
                  style={{ display: 'block', textDecoration: 'none', padding: '32px 0', borderBottom: `1px solid ${t.borderFaint}`, transition: 'all 0.2s' }}
                  onMouseEnter={(e) => (e.currentTarget.querySelector('.doc-title') as HTMLElement).style.color = t.accent}
                  onMouseLeave={(e) => (e.currentTarget.querySelector('.doc-title') as HTMLElement).style.color = t.ink}
                >
                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
                    <div style={{ flex: 1, minWidth: 280 }}>
                      <div style={{ marginBottom: 12 }}>
                        <RoleTag>{doc.type}</RoleTag>
                      </div>
                      <h2 className="doc-title" style={{ fontFamily: t.serif, fontSize: 24, fontWeight: 500, color: t.ink, marginBottom: 8, transition: 'color 0.2s' }}>
                        {doc.title}
                        {doc.status === 'draft' && <DraftBadge />}
                      </h2>
                      <p style={{ fontFamily: t.sans, fontSize: 15, color: t.inkMuted, fontWeight: 300, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {(Array.isArray(doc.content) && doc.content[0]) ? stripHtml(doc.content[0]) : "Read the full architectural breakdown."}
                      </p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <Clock size={12} color={t.inkFaint} />
                        <Label>{doc.readTime || '5 min read'}</Label>
                      </div>
                      <div style={{ width: 40, height: 40, borderRadius: '50%', background: t.bgSurface, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${t.border}` }}>
                        <ArrowRight size={16} color={t.ink} />
                      </div>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal>
            <div style={{ textAlign: 'center', padding: '80px 24px', background: t.bgMuted, border: `1px dashed ${t.border}`, borderRadius: 24 }}>
              <FileText size={32} color={t.inkFaint} style={{ margin: '0 auto 16px' }} />
              <h3 style={{ fontFamily: t.serif, fontSize: 20, color: t.ink, marginBottom: 8 }}>No documents found</h3>
              <p style={{ fontFamily: t.sans, fontSize: 14, color: t.inkMuted }}>Try adjusting your search or filters.</p>
            </div>
          </Reveal>
        )}
      </div>
    </main>
  );
}