import type { Metadata } from "next";
import "./globals.css";
import Header from "./Header";
import data from "@/data/portfolio.json";
import { Fraunces, Inter, JetBrains_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';

const serif = Fraunces({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

const sans = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-sans',
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
    "Product manager shipping agentic AI products. Currently: PaperLoop, a Gemini-powered scanner for educators, live on the Play Store.",
  openGraph: {
    title: `${data.site.name} — Product · Agentic AI`,
    description:
      "Product manager shipping agentic AI products. Currently: PaperLoop, live on the Play Store.",
    type: "website",
    siteName: data.site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: data.site.name,
    description: "Product · Agentic AI. PaperLoop is live on the Play Store.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en" className={`h-full ${serif.variable} ${sans.variable} ${mono.variable}`}>
      <body className="h-full min-h-screen font-sans selection:bg-[#e6ded4] flex flex-col overflow-x-hidden relative bg-[#f8f4ef] text-[#1c1916]">
        
        {/* Global Navigation */}
        <Header />
        
        {/* Page Content Injection */}
        <main className="flex-grow relative z-10 w-full p-0 m-0">
          {children}
        </main>
        <Analytics />
      </body>
    </html>
  );
}