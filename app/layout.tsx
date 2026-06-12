import type { Metadata } from 'next';
import './globals.css';
import Header from './Header';
import { HERO_CONTENT } from '@/data/portfolio-static';
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
    default: `${HERO_CONTENT.title} — ${HERO_CONTENT.subtitle}`,
    template: `%s — ${HERO_CONTENT.title}`,
  },
  description: HERO_CONTENT.description,
  openGraph: {
    title: `${HERO_CONTENT.title} — ${HERO_CONTENT.subtitle}`,
    description: HERO_CONTENT.description,
    type: 'website',
    siteName: HERO_CONTENT.title,
  },
  twitter: {
    card: 'summary_large_image',
    title: HERO_CONTENT.title,
    description: HERO_CONTENT.description,
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
