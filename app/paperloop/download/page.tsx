'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Check, ChevronRight, Mail, Scan, Smartphone } from 'lucide-react';
import { track } from '@/lib/track';

export default function DownloadPage() {
  return (
    <div className="min-h-screen bg-[#0B1825] text-[#EDE8DB] antialiased">
      <style jsx global>{`
        body { background: #0B1825; }
      `}</style>

      <main className="max-w-[720px] mx-auto px-6 pt-20 pb-24 md:pt-28 md:pb-32">

        {/* back link */}
        <div className="mb-10">
          <Link href="/paperloop"
            className="inline-flex items-center gap-2 font-sans text-[13px] text-[#EDE8DB]/50 hover:text-[#EDE8DB] transition-colors no-underline tracking-[0.01em]">
            <ArrowLeft size={15} /> Back to PaperLoop
          </Link>
        </div>

        {/* brand mark */}
        <div className="flex items-center gap-2.5 mb-8">
          <div className="w-10 h-10 rounded-lg bg-[#CF8610]/15 border border-[#CF8610]/30 flex items-center justify-center">
            <Scan size={18} className="text-[#F0A535]" />
          </div>
          <span className="font-serif font-bold text-[18px] text-[#EDE8DB] tracking-[-0.01em]">
            Paper<span className="text-[#F0A535]">loop</span>
          </span>
        </div>

        {/* heading */}
        <h1 className="font-serif font-bold text-white leading-[1.05] tracking-[-0.02em] mb-5 text-[clamp(36px,6vw,58px)]">
          Get PaperLoop.
        </h1>
        <p className="font-sans text-[16px] md:text-[17px] text-[#EDE8DB]/60 leading-[1.65] max-w-[520px] mb-14">
          Scan handwritten exam drafts into print-ready PDFs in seconds.
          Currently in closed beta — we reply to access requests within 24 hours.
        </p>

        {/* ─── Android card (primary) ───────────────────────────────── */}
        <section className="bg-[#162436] border border-white/10 rounded-2xl p-7 md:p-9 mb-5 hover:border-white/20 transition-colors">
          <div className="flex items-start justify-between gap-4 mb-5">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-[#CF8610]/10 border border-[#CF8610]/20 flex items-center justify-center text-[#CF8610]">
                <Smartphone size={20} />
              </div>
              <div>
                <h2 className="font-serif font-semibold text-[22px] text-white leading-none mb-1.5">Android</h2>
                <span className="font-mono text-[10px] text-[#0B7A70] tracking-[0.14em] uppercase">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#0B7A70] mr-1.5 align-middle" />
                  Live on Google Play
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center gap-4 pt-5 border-t border-white/[0.06]">
            <a href="https://play.google.com/store/apps/details?id=com.paperloop.official"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#CF8610] hover:bg-[#B07610] text-white px-6 py-3.5 rounded-[6px] font-sans text-[14px] font-medium no-underline transition-all hover:-translate-y-[1px] shadow-[0_4px_16px_rgba(207,134,16,0.35)] hover:shadow-[0_8px_24px_rgba(207,134,16,0.5)]">
              Get it on Google Play <ArrowRight size={15} />
            </a>
            <RequestAccessForm />
          </div>

          <p className="mt-5 font-sans text-[13px] text-[#EDE8DB]/45 leading-[1.6]">
            Closed beta — only registered users can access the app after install.
            <span className="text-[#EDE8DB]/35"> We reply within 24 hours.</span>
          </p>
        </section>

        {/* ─── Roadmap line (replaces ghost cards) ──────────────────── */}
        <div className="flex items-center justify-between gap-4 px-5 py-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
          <div className="flex items-center gap-3 min-w-0">
            <span className="font-mono text-[10px] text-[#F0A535] tracking-[0.14em] uppercase whitespace-nowrap">
              On the roadmap
            </span>
            <span className="font-sans text-[13px] text-[#EDE8DB]/55 truncate">
              iOS · Web dashboard · Team workspaces
            </span>
          </div>
          <a href="#request"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('request-access-input')?.focus();
            }}
            className="inline-flex items-center gap-1 font-mono text-[10px] text-[#F0A535] hover:text-[#EDE8DB] tracking-[0.14em] uppercase no-underline whitespace-nowrap transition-colors">
            Join the list <ChevronRight size={11} />
          </a>
        </div>

        {/* ─── What you get ─────────────────────────────────────────── */}
        <section className="mt-14">
          <span className="font-mono text-[10px] text-[#EDE8DB]/45 tracking-[0.2em] uppercase">
            What you get in the beta
          </span>
          <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              'Unlimited scans during beta',
              'Gemini Vision parsing of handwritten exams',
              'Multi-column, print-ready PDF export',
              'Direct line to me for feature requests',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-[13.5px] text-[#EDE8DB]/75 font-sans leading-[1.55]">
                <Check size={15} className="text-[#0B7A70] mt-[2px] shrink-0" strokeWidth={2.5} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ─── Support ──────────────────────────────────────────────── */}
        <section className="mt-20 pt-10 border-t border-white/10 text-center">
          <h2 className="font-serif text-[22px] md:text-[24px] text-white mb-3">Need help?</h2>
          <p className="font-sans text-[14px] text-[#EDE8DB]/55 mb-5 max-w-[420px] mx-auto">
            Having trouble with access or the app? Email support — a human replies.
          </p>
          <a href="mailto:contact@shanjitthokchom.xyz?subject=PaperLoop%20support"
            className="inline-flex items-center gap-2 font-sans text-[14px] text-[#F0A535] hover:text-[#EDE8DB] transition-colors no-underline font-medium">
            <Mail size={16} /> contact@shanjitthokchom.xyz
          </a>
        </section>
      </main>
    </div>
  );
}

// Request Access form — posts to /api/waitlist with a mailto fallback.
function RequestAccessForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'sent' | 'mailto' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const mailtoFallback = (addr: string) => {
    const subject = encodeURIComponent('PaperLoop access request');
    const body = encodeURIComponent(
      `Hi Shanjit,\n\nI'd like access to the PaperLoop closed beta.\n\nMy email: ${addr}\n\nThanks!`
    );
    window.location.href = `mailto:contact@shanjitthokchom.xyz?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setStatus('error');
      setErrorMsg('Please enter a valid email.');
      return;
    }

    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'paperloop-download' }),
      });
      if (!res.ok) throw new Error(`status ${res.status}`);
      track('waitlist_submit', { source: 'paperloop-download', result: 'api' });
      setStatus('sent');
    } catch {
      track('waitlist_submit', { source: 'paperloop-download', result: 'mailto' });
      mailtoFallback(email);
      setStatus('mailto');
    }
  };

  if (status === 'sent') {
    return (
      <div className="inline-flex items-center gap-2 font-mono text-[11px] text-[#0B7A70] tracking-[0.12em] uppercase">
        <Check size={13} strokeWidth={2.5} /> You&apos;re on the list — reply within 24h
      </div>
    );
  }

  if (status === 'mailto') {
    return (
      <div className="inline-flex items-center gap-2 font-mono text-[11px] text-[#0B7A70] tracking-[0.12em] uppercase">
        <Check size={13} strokeWidth={2.5} /> Request drafted — finish in your mail app
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-w-0">
      <div className="flex items-stretch gap-0">
        <input
          id="request-access-input"
          type="email"
          required
          aria-label="Email for waitlist"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === 'error') setStatus('idle');
          }}
          disabled={status === 'loading'}
          className="flex-1 min-w-0 bg-white/[0.04] border border-white/10 rounded-l-[6px] px-4 py-3.5 font-sans text-[13px] text-[#EDE8DB] placeholder:text-[#EDE8DB]/30 outline-none focus:border-[#CF8610]/60 transition-colors disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="inline-flex items-center gap-1.5 bg-white/[0.08] hover:bg-white/[0.15] border border-white/10 border-l-0 rounded-r-[6px] px-4 py-3.5 font-sans text-[13px] font-medium text-[#EDE8DB] transition-colors whitespace-nowrap disabled:opacity-60"
        >
          {status === 'loading' ? 'Sending…' : 'Request access'}
          {status !== 'loading' && <ArrowRight size={13} />}
        </button>
      </div>
      {errorMsg && (
        <span className="mt-2 font-sans text-[12px] text-[#F0A535]" role="alert">
          {errorMsg}
        </span>
      )}
    </form>
  );
}
