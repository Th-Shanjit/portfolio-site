'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock, Calendar, Hash, Download } from 'lucide-react';
import { t, Reveal, Label, RoleTag } from '@/lib/design';

const formatText = (text: string) => {
  let formatted = text
    .replace(/\*\*(.*?)\*\*/g, '<strong style="font-weight: 500; color: var(--ink)">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em style="font-style: italic; color: var(--ink)">$1</em>')
    .replace(/`(.*?)`/g, '<code style="background: var(--bgMuted); color: var(--ink); padding: 2px 6px; border-radius: 4px; font-family: var(--font-mono); font-size: 13px; border: 1px solid var(--borderFaint)">$1</code>');
  return { __html: formatted };
};

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
            {doc.content?.map((paragraph: string, index: number) => {
              if (paragraph.startsWith('###')) {
                return (
                  <h3 key={index} style={{ fontFamily: t.serif, fontSize: 28, fontWeight: 500, color: t.ink, marginTop: 32, marginBottom: 8, lineHeight: 1.2 }}>
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              }
              return (
                <p key={index} style={{ fontFamily: t.sans, fontSize: 18, color: t.inkMuted, fontWeight: 300, lineHeight: 1.8, margin: 0 }} dangerouslySetInnerHTML={formatText(paragraph)} />
              );
            })}

            {doc.pdfUrl && (
              <div style={{ marginTop: 64, padding: 32, background: t.bgSurface, borderRadius: 24, border: `1px solid ${t.border}`, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h3 style={{ fontFamily: t.serif, fontSize: 24, color: t.ink, marginBottom: 12 }}>Architecture Diagram</h3>
                <p style={{ fontFamily: t.sans, fontSize: 15, color: t.inkMuted, marginBottom: 24 }}>High-resolution PDF export</p>
                <a href={doc.pdfUrl} download style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', background: t.ink, color: t.bg, borderRadius: 99, fontFamily: t.sans, fontSize: 14, textDecoration: 'none', transition: 'transform 0.2s' }}>
                  <Download size={16} /> Download PDF
                </a>
              </div>
            )}
          </div>
        </Reveal>
      </article>
    </main>
  );
}