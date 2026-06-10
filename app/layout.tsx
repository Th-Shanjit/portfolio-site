import type { Metadata } from 'next';
import './globals.css';
import Header from './Header';
import data from '@/data/portfolio.json';
import { Geist, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';

const sans = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const heading = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-heading',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://shanjitthokchom.xyz';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${data.site.name} — ${data.site.role}`,
    template: `%s — ${data.site.name}`,
  },
  description:
    'Product manager focused on agentic AI, workflow automation, and practical AI tools. Building PaperLoop and shipping user-tested products.',
  openGraph: {
    title: `${data.site.name} — Product · Agentic AI`,
    description:
      'Product manager shipping agentic AI products. PaperLoop — handwritten exams to print-ready PDFs.',
    type: 'website',
    siteName: data.site.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: data.site.name,
    description: 'Product · Agentic AI. Building tools where users stay in control.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`h-full ${sans.variable} ${heading.variable} ${mono.variable}`}
    >
      <body className="h-full min-h-screen font-sans selection:bg-[#FF6B35]/20 flex flex-col overflow-x-hidden relative bg-[#F7F3EA] text-[#161616]">
        <Header />
        <main className="flex-grow relative z-10 w-full p-0 m-0">{children}</main>
        <Analytics />
      </body>
    </html>
  );
}
