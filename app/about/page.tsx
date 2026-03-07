'use client';

import { MapPin, GraduationCap, Code2, Sparkles, Scale, Briefcase } from 'lucide-react';
import data from '@/data/portfolio.json';
import { t, Reveal, Label, RoleTag } from '@/lib/design';

export default function About() {
  const about = (data as any).about;
  const experience = (data as any).experience || [];
  const bio = (data as any).bio || [];

  return (
    <main style={{ background: t.bg, minHeight: '100vh', color: t.ink, padding: '120px clamp(20px, 5vw, 64px) 160px', maxWidth: 1040, margin: '0 auto' }}>
      
      {/* HEADER */}
      <div style={{ marginBottom: 80 }}>
        <Reveal>
          <h1 style={{ fontFamily: t.serif, fontSize: 'clamp(40px, 6vw, 64px)', fontWeight: 400, color: t.ink, marginBottom: 24, lineHeight: 1.1 }}>{about.heading}</h1>
          <p style={{ fontFamily: t.sans, fontSize: 18, color: t.inkMuted, fontWeight: 300, maxWidth: 640, lineHeight: 1.6 }}>{about.subheading}</p>
        </Reveal>
      </div>

      {/* BENTO GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, marginBottom: 96 }}>
        
        <Reveal delay={100} style={{ gridColumn: '1 / -1' }}>
          <div style={{ background: t.bgSurface, border: `1px solid ${t.border}`, borderRadius: 24, padding: 40, display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ width: 40, height: 40, background: t.ink, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
              <Scale size={18} color={t.bg} />
            </div>
            <h2 style={{ fontFamily: t.serif, fontSize: 24, fontWeight: 500, color: t.ink, marginBottom: 12 }}>{about.originTitle}</h2>
            <p style={{ fontFamily: t.sans, fontSize: 15, color: t.inkMuted, lineHeight: 1.7, fontWeight: 300 }}>{about.originText}</p>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div style={{ background: t.bgSurface, border: `1px solid ${t.border}`, borderRadius: 24, padding: 40, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', height: '100%', minHeight: 250 }}>
            <MapPin size={32} color={t.ink} style={{ marginBottom: 16 }} />
            <h3 style={{ fontFamily: t.serif, fontSize: 20, fontWeight: 500, color: t.ink }}>{about.location}</h3>
            <div style={{ marginTop: 8 }}><Label>Current Base</Label></div>
          </div>
        </Reveal>

        <Reveal delay={300}>
          <div style={{ background: t.ink, borderRadius: 24, padding: 40, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', color: t.bg, height: '100%', minHeight: 250 }}>
            <GraduationCap size={24} color={t.borderFaint} style={{ marginBottom: 16 }} />
            <div>
              <h3 style={{ fontFamily: t.serif, fontSize: 20, fontWeight: 500, marginBottom: 8 }}>{about.educationTitle}</h3>
              <p style={{ fontFamily: t.sans, fontSize: 14, color: t.inkFaint, fontWeight: 300, marginBottom: 24 }}>{about.educationSubtitle}</p>
              <RoleTag>Alumni</RoleTag>
            </div>
          </div>
        </Reveal>

        <Reveal delay={400} style={{ gridColumn: '1 / -1' }}>
          <div style={{ background: t.bgSurface, border: `1px solid ${t.border}`, borderRadius: 24, padding: 40, display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
              <div style={{ display: 'flex', gap: 12 }}>
                <div style={{ width: 40, height: 40, background: t.bgMuted, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${t.border}` }}>
                  <Sparkles size={18} color={t.inkMuted} />
                </div>
                <div style={{ width: 40, height: 40, background: t.bgMuted, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${t.border}` }}>
                  <Code2 size={18} color={t.inkMuted} />
                </div>
              </div>
              <Label>Stack & Focus</Label>
            </div>
            <div>
              <h2 style={{ fontFamily: t.serif, fontSize: 24, fontWeight: 500, color: t.ink, marginBottom: 12 }}>{about.focusTitle}</h2>
              <p style={{ fontFamily: t.sans, fontSize: 15, color: t.inkMuted, lineHeight: 1.7, fontWeight: 300 }}>{about.focusText}</p>
            </div>
          </div>
        </Reveal>
      </div>

      {/* NARRATIVE BIO */}
      <div style={{ marginBottom: 96 }}>
        <Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 48, borderTop: `1px solid ${t.border}`, paddingTop: 64 }}>
            <div>
              <Label>Narrative</Label>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
              {bio.map((paragraph: string, i: number) => (
                <p key={i} style={{ fontFamily: t.sans, fontSize: 16, fontWeight: 300, color: t.inkMuted, lineHeight: 1.8, margin: 0 }}>{paragraph}</p>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      {/* EXPERIENCE TIMELINE */}
      <div>
        <Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 48, borderTop: `1px solid ${t.border}`, paddingTop: 64 }}>
            <div>
              <Label>Experience</Label>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
              {experience.map((exp: any, i: number) => (
                <div key={i} style={{ display: 'flex', gap: 24, position: 'relative' }}>
                  <div style={{ width: 40, height: 40, background: t.bgMuted, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${t.border}`, flexShrink: 0, zIndex: 2 }}>
                    <Briefcase size={16} color={t.inkMuted} />
                  </div>
                  {i !== experience.length - 1 && (
                    <div style={{ position: 'absolute', left: 19.5, top: 40, bottom: -32, width: 1, background: t.border, zIndex: 1 }} />
                  )}
                  <div style={{ paddingBottom: 16 }}>
                    <h3 style={{ fontFamily: t.serif, fontSize: 20, fontWeight: 500, color: t.ink, margin: '0 0 8px' }}>{exp.role}</h3>
                    <p style={{ fontFamily: t.sans, fontSize: 15, color: t.inkMuted, margin: '0 0 4px', fontWeight: 300 }}>{exp.company}</p>
                    <Label>{exp.year}</Label>
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