'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock, Calendar, Hash, Download } from 'lucide-react';
import { t, Reveal, RoleTag } from '@/lib/design';

export default function DocumentReader({ params }: { params: Promise<{ slug: string }> }) {
  const [progress, setProgress] = useState(0);
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const resolvedParams = use(params);

  useEffect(() => {
    setIsLoading(true); 
    fetch('/api/content?t=' + Date.now(), { cache: 'no-store' })
      .then(res => res.json())
      .then(json => {
        setData(json);
        setIsLoading(false);
      })
      .catch(err => {
        setIsLoading(false);
      });

    fetch(`/api/views/${resolvedParams.slug}`, { method: 'POST' }).catch(() => {});
    
    const updateProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) setProgress((window.scrollY / scrollHeight) * 100);
    };

    window.addEventListener('scroll', updateProgress);
    return () => window.removeEventListener('scroll', updateProgress);
  }, [resolvedParams.slug]);

  if (isLoading || !data) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: t.bg, color: t.inkMuted, textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: 11, fontFamily: t.mono }}>
        Loading Document...
      </div>
    );
  }

  const doc = data.docs?.find((d: any) => d.id === resolvedParams.slug);

  if (!doc) {
    return (
      <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: t.bg, color: t.ink }}>
        <h1 style={{ fontFamily: t.serif, fontSize: 32, marginBottom: 8 }}>Document Unavailable</h1>
        <p style={{ fontFamily: t.sans, fontSize: 15, color: t.inkMuted, marginBottom: 32 }}>The requested architecture might be private or deleted.</p>
        <Link href="/docs" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 10, fontFamily: t.mono, color: t.inkMuted, textTransform: 'uppercase', textDecoration: 'none', letterSpacing: '0.1em' }}>
          <ArrowLeft size={14} /> Return to Archive
        </Link>
      </main>
    );
  }

  return (
    <main style={{ background: t.bg, minHeight: '100vh', color: t.ink, padding: '120px clamp(20px, 5vw, 64px) 160px', maxWidth: 800, margin: '0 auto' }}>
      
      {/* Scroll Progress Bar */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: 3, zIndex: 100, background: 'transparent' }}>
        <div style={{ height: '100%', background: t.accent, width: `${progress}%`, transition: 'width 0.1s ease-out' }}></div>
      </div>

      <article>
        <Reveal>
          <div style={{ marginBottom: 48 }}>
            <Link href="/docs" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 10, fontFamily: t.mono, color: t.inkFaint, textTransform: 'uppercase', textDecoration: 'none', letterSpacing: '0.1em', marginBottom: 48 }}>
              <ArrowLeft size={14} /> Back to Data Room
            </Link>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 32 }}>
              <RoleTag><Hash size={10} style={{ display: 'inline', marginRight: 4, verticalAlign: 'text-bottom' }} />{doc.type}</RoleTag>
              {doc.date && <RoleTag><Calendar size={10} style={{ display: 'inline', marginRight: 4, verticalAlign: 'text-bottom' }} />{doc.date}</RoleTag>}
              {doc.readTime && <RoleTag><Clock size={10} style={{ display: 'inline', marginRight: 4, verticalAlign: 'text-bottom' }} />{doc.readTime}</RoleTag>}
            </div>

            <h1 style={{ fontFamily: t.serif, fontSize: 'clamp(40px, 6vw, 64px)', fontWeight: 400, color: t.ink, lineHeight: 1.05, marginBottom: 32 }}>
              {doc.title}
            </h1>
          </div>

          {doc.coverImage && (
            <div style={{ width: '100%', height: 400, marginBottom: 64, borderRadius: 24, overflow: 'hidden', border: `1px solid ${t.border}` }}>
              <img src={doc.coverImage} alt={doc.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          )}
        </Reveal>

        {/* Content Body */}
        <Reveal delay={100}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            <div 
              className="rich-text-content"
              style={{ fontFamily: t.sans, fontSize: 18, color: t.inkMuted, fontWeight: 300, lineHeight: 1.8 }}
              dangerouslySetInnerHTML={{ __html: Array.isArray(doc.content) ? doc.content.join('\n\n') : doc.content }}
            />

            {doc.pdfUrl && (
              <div style={{ marginTop: 64, background: t.bgSurface, borderRadius: 24, border: `1px solid ${t.border}`, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <div style={{ padding: '24px 32px', borderBottom: `1px solid ${t.borderFaint}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontFamily: t.serif, fontSize: 'clamp(18px, 4vw, 24px)', color: t.ink, marginBottom: 4 }}>Architecture Diagram</h3>
                    <p style={{ fontFamily: t.sans, fontSize: 13, color: t.inkMuted, margin: 0 }}>PDF Viewer</p>
                  </div>
                  <a href={doc.pdfUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', background: t.bgMuted, color: t.ink, border: `1px solid ${t.border}`, borderRadius: 99, fontFamily: t.sans, fontSize: 13, textDecoration: 'none', transition: 'background 0.2s', whiteSpace: 'nowrap' }} onMouseEnter={e => e.currentTarget.style.background = t.borderFaint} onMouseLeave={e => e.currentTarget.style.background = t.bgMuted}>
                    <Download size={14} /> Open External
                  </a>
                </div>
                <div style={{ width: '100%', height: 'calc(100vh - 120px)', minHeight: '500px', maxHeight: '1000px', background: '#f8f9fa', position: 'relative' }}>
                  <iframe 
                    src={`${doc.pdfUrl}#view=FitH&toolbar=1`} 
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                    title="PDF Viewer"
                  />
                </div>
              </div>
            )}
          </div>
        </Reveal>
      </article>
    </main>
  );
}