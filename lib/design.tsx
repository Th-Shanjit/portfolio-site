'use client';

import React, { useEffect, useRef, useState } from 'react';

// ─── Calm Product System tokens ─────────────────────────────────────────────

export const t = {
  bg: '#F7F3EA',
  bgSurface: '#FFFFFF',
  bgMuted: '#F0EBE0',
  ink: '#161616',
  inkMuted: '#6F6A61',
  inkFaint: '#9A9489',
  accent: '#FF6B35',
  accentFg: '#FFFFFF',
  border: 'rgba(22, 22, 22, 0.10)',
  borderFaint: 'rgba(22, 22, 22, 0.06)',
  dark: '#1D1915',
  darkSurface: 'rgba(255, 255, 255, 0.04)',
  darkBorder: 'rgba(255, 255, 255, 0.08)',
  heading: 'var(--font-heading), var(--font-sans), system-ui, sans-serif',
  serif: 'var(--font-heading), var(--font-sans), system-ui, sans-serif',
  sans: 'var(--font-sans), system-ui, sans-serif',
  mono: 'var(--font-mono), ui-monospace, monospace',
};

export const td = {
  bg: '#0B1825',
  bgSurface: '#162436',
  bgMuted: '#1F3248',
  ink: '#EDE8DB',
  inkMuted: 'rgba(237,232,219,0.70)',
  inkFaint: 'rgba(237,232,219,0.42)',
  accent: '#CF8610',
  accentHi: '#F0A535',
  accentFg: '#ffffff',
  border: 'rgba(255,255,255,0.10)',
  borderFaint: 'rgba(255,255,255,0.05)',
};

/** Shared interactive card surface for light sections */
export const cardLinkClass =
  'group flex flex-col h-full p-6 rounded-xl border border-[rgba(22,22,22,0.10)] bg-white no-underline transition-[transform,box-shadow,border-color] duration-300 motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-[0_12px_32px_rgba(22,22,22,0.06)] hover:border-[rgba(22,22,22,0.16)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6B35]';

export const cardArrowClass =
  'shrink-0 text-[#9A9489] motion-safe:group-hover:translate-x-1 motion-safe:group-hover:-translate-y-1 transition-transform duration-200';

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return reduced;
}

export function Reveal({
  children,
  delay = 0,
  y = 16,
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  style?: React.CSSProperties;
}) {
  const [on, setOn] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) {
      setOn(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setOn(true);
      },
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.unobserve(el);
  }, [reduced]);

  return (
    <div
      ref={ref}
      style={{
        ...style,
        opacity: on ? 1 : 0,
        transform: on ? 'none' : reduced ? 'none' : `translateY(${y}px)`,
        transition: reduced
          ? 'none'
          : `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export function timeAgo(ts: number): string {
  const s = Math.floor((Date.now() - ts) / 1000);
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h`;
  const d = Math.floor(h / 24);
  return `${d}d`;
}

export function Label({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`font-mono text-[11px] text-[#9A9489] tracking-[0.06em] ${className}`}
    >
      {children}
    </span>
  );
}

export function SectionHeading({
  number,
  title,
  subtitle,
  className = '',
}: {
  number: string;
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div className={`mb-10 md:mb-12 ${className}`}>
      <div className="flex items-baseline gap-3 mb-3">
        <Label className="tabular-nums">{number}</Label>
        <div className="w-6 h-px bg-[rgba(22,22,22,0.10)] self-center" aria-hidden />
        <h2 className="font-[family-name:var(--font-heading)] text-[clamp(22px,3vw,30px)] font-medium text-[#161616] tracking-[-0.02em] leading-tight m-0">
          {title}
        </h2>
      </div>
      {subtitle && (
        <p className="font-sans text-[15px] md:text-[16px] text-[#6F6A61] leading-[1.65] max-w-[560px] m-0">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export function RoleTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex font-sans text-[13px] text-[#6F6A61] bg-[#F0EBE0] border border-[rgba(22,22,22,0.06)] px-2.5 py-1 rounded-full">
      {children}
    </span>
  );
}

export function DraftBadge() {
  return (
    <span className="inline-flex font-mono text-[10px] text-[#b45309] tracking-[0.06em] uppercase bg-[#fef3c7] border border-[#fde68a] px-1.5 py-0.5 rounded ml-1.5 align-middle">
      Draft
    </span>
  );
}
