'use client';

import { MapPin, GraduationCap, Code2, Sparkles, Scale, Briefcase } from 'lucide-react';
import data from '@/data/portfolio.json';
import { t, Reveal, Label, RoleTag } from '@/lib/design';

export default function About() {
  const about = (data as any).about;
  const experience = (data as any).experience || [];
  const bio = (data as any).bio || [];

  return (
    <main style={{ background: t.bg, minHeight: '100vh', color: t.ink, padding: '120px clamp(20px, 5vw, 64px) 160px', maxWidth: 1040, margin: '0 auto', overflow: 'hidden' }}>
      
      {/* HEADER & NARRATIVE BIO */}
      <div style={{ marginBottom: 120 }}>
        <Reveal>
          <h1 style={{ fontFamily: t.serif, fontSize: 'clamp(56px, 10vw, 96px)', fontWeight: 400, color: t.ink, marginBottom: 40, lineHeight: 0.95, letterSpacing: '-0.02em' }}>
            {about.heading}
          </h1>
        </Reveal>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(40px, 8vw, 80px)', alignItems: 'flex-start' }}>
          <Reveal delay={100}>
            <p style={{ fontFamily: t.sans, fontSize: 'clamp(18px, 2.5vw, 24px)', color: t.ink, fontWeight: 300, lineHeight: 1.5, margin: 0 }}>
              {about.subheading}
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {bio.map((paragraph: string, i: number) => (
                <p key={i} style={{ fontFamily: t.sans, fontSize: 16, fontWeight: 300, color: t.inkMuted, lineHeight: 1.8, margin: 0 }}>
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      {/* STAGGERED BENTO GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 24, marginBottom: 120 }}>
        
        <Reveal delay={100} style={{ gridColumn: '1 / -1', marginBottom: 24 }}>
          <div style={{ background: t.bgSurface, border: `1px solid ${t.border}`, borderRadius: 24, padding: 'clamp(32px, 6vw, 64px)', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', right: -50, top: -50, width: 300, height: 300, background: 'radial-gradient(circle, rgba(200,135,60,0.08) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
            <div style={{ width: 48, height: 48, background: t.ink, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 32, position: 'relative', zIndex: 1 }}>
              <Scale size={20} color={t.bg} />
            </div>
            <h2 style={{ fontFamily: t.serif, fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 400, color: t.ink, marginBottom: 16, position: 'relative', zIndex: 1 }}>{about.originTitle}</h2>
            <p style={{ fontFamily: t.sans, fontSize: 16, color: t.inkMuted, lineHeight: 1.8, fontWeight: 300, maxWidth: 600, position: 'relative', zIndex: 1 }}>{about.originText}</p>
          </div>
        </Reveal>

        <Reveal delay={200} style={{ gridColumn: '1 / span 5' }}>
          <div style={{ background: t.bgSurface, border: `1px solid ${t.border}`, borderRadius: 24, padding: 40, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', height: '100%', minHeight: 320 }}>
            <div className="relative mb-6">
              <MapPin size={40} color={t.ink} style={{ position: 'relative', zIndex: 2 }} />
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 60, height: 60, borderRadius: '50%', background: 'rgba(200,135,60,0.1)', animation: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite', zIndex: 1 }} />
            </div>
            <h3 style={{ fontFamily: t.serif, fontSize: 24, fontWeight: 400, color: t.ink }}>{about.location}</h3>
            <div style={{ marginTop: 12 }}><Label>Current Base</Label></div>
          </div>
        </Reveal>

        <Reveal delay={300} style={{ gridColumn: 'span 7 / -1' }}>
          <div style={{ background: t.ink, borderRadius: 24, padding: 'clamp(32px, 4vw, 48px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', color: t.bg, height: '100%', minHeight: 320, position: 'relative', overflow: 'hidden' }}>
            {/* Spinning geometric mesh */}
            <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: '70%', height: '140%', opacity: 0.15, pointerEvents: 'none', animation: 'spinSlow 40s linear infinite', backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-rule='evenodd'/%3E%3C/svg%3E")` }} />
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32, position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', gap: 12 }}>
                <div style={{ width: 48, height: 48, background: 'rgba(255,255,255,0.1)', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}>
                  <Sparkles size={20} color={t.bg} />
                </div>
                <div style={{ width: 48, height: 48, background: 'rgba(255,255,255,0.1)', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}>
                  <Code2 size={20} color={t.bg} />
                </div>
              </div>
              <span style={{ fontFamily: t.mono, fontSize: 9, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Stack & Focus</span>
            </div>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h2 style={{ fontFamily: t.serif, fontSize: 'clamp(24px, 3vw, 32px)', fontWeight: 400, color: t.bg, marginBottom: 16 }}>{about.focusTitle}</h2>
              <p style={{ fontFamily: t.sans, fontSize: 16, color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, fontWeight: 300, maxWidth: 500 }}>{about.focusText}</p>
            </div>
          </div>
        </Reveal>
      </div>

      {/* EXPERIENCE TIMELINE */}
      <div style={{ marginTop: 64 }}>
        <Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 48, borderTop: `1px solid ${t.border}`, paddingTop: 64 }}>
            <div>
              <Label>Experience</Label>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {experience.map((exp: any, i: number) => (
                <div key={i} style={{ display: 'flex', gap: 32, position: 'relative', paddingBottom: i !== experience.length - 1 ? 48 : 0 }}>
                  {/* Timeline track */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ width: 48, height: 48, background: t.bgSurface, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${t.border}`, flexShrink: 0, zIndex: 2, boxShadow: '0 4px 12px rgba(28,25,22,0.03)' }}>
                      <Briefcase size={18} color={t.ink} />
                    </div>
                    {i !== experience.length - 1 && (
                      <div style={{ width: 1, flexGrow: 1, background: `linear-gradient(to bottom, ${t.border}, transparent)`, marginTop: 12, marginBottom: -48 }} />
                    )}
                  </div>
                  
                  {/* Content */}
                  <div style={{ paddingTop: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 8, flexWrap: 'wrap' }}>
                      <h3 style={{ fontFamily: t.serif, fontSize: 24, fontWeight: 400, color: t.ink, margin: 0, lineHeight: 1.2 }}>{exp.role}</h3>
                      <span style={{ fontFamily: t.mono, fontSize: 10, color: t.inkFaint, letterSpacing: '0.1em' }}>{exp.year}</span>
                    </div>
                    <p style={{ fontFamily: t.sans, fontSize: 16, color: t.inkMuted, margin: 0, fontWeight: 300 }}>{exp.company}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

    </main>
  );
}