import React, { useEffect, useRef, useState } from 'react';

// ─── design tokens ─────────────────────────────────────────────────────────
export const t = {
  bg:        '#f8f4ef',
  bgSurface: '#ffffff',
  bgMuted:   '#f2ede5',
  ink:       '#1c1916',
  inkMuted:  '#7a7470',
  inkFaint:  '#b8b2aa',
  accent:    '#c8873c',
  accentFg:  '#ffffff',
  border:    '#e6ded4',
  borderFaint: '#ede8e1',
  serif:     'var(--font-serif), Cormorant Garamond, Georgia, serif',
  sans:      'var(--font-sans), DM Sans, system-ui, sans-serif',
  mono:      'var(--font-mono), DM Mono, monospace',
};

// ─── scroll reveal ──────────────────────────────────────────────────────────
export function Reveal({ children, delay = 0, y = 16, style }: { children: React.ReactNode; delay?: number; y?: number; style?: React.CSSProperties }) {
  const [on, setOn] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const el = ref.current; 
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setOn(true); }, { threshold: 0.05 });
    obs.observe(el);
    return () => obs.unobserve(el);
  }, []);
  
  return (
    <div ref={ref} style={{
      ...style,
      opacity: on ? 1 : 0,
      transform: on ? 'none' : `translateY(${y}px)`,
      transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

// ─── time ago helper ───────────────────────────────────────────────────────
export function timeAgo(ts: number): string {
  const s = Math.floor((Date.now() - ts) / 1000);
  const m = Math.floor(s / 60); if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60); if (h < 24) return `${h}h`;
  const d = Math.floor(h / 24); return `${d}d`;
}

// ─── section label ─────────────────────────────────────────────────────────
export function Label({ children }: { children: React.ReactNode }) {
  return (
    <span style={{
      fontFamily: t.mono, fontSize: 9, color: t.inkFaint,
      letterSpacing: '0.2em', textTransform: 'uppercase',
    }}>
      {children}
    </span>
  );
}

// ─── role tag ──────────────────────────────────────────────────────────────
export function RoleTag({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ fontFamily:t.mono, fontSize:9, color:t.inkMuted, letterSpacing:'0.12em', textTransform:'uppercase', background:t.bgMuted, border:`1px solid ${t.borderFaint}`, padding:'4px 10px', borderRadius:99 }}>
      {children}
    </span>
  );
}

// ─── draft badge ───────────────────────────────────────────────────────────
export function DraftBadge() {
  return (
    <span style={{ fontFamily:t.mono, fontSize:8, color:'#d97706', letterSpacing:'0.12em', textTransform:'uppercase', background:'#fef3c7', border:`1px solid #fde68a`, padding:'2px 6px', borderRadius:4, marginLeft:6, verticalAlign:'middle' }}>
      DRAFT
    </span>
  );
}
