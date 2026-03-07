import type { Metadata } from "next";
import "./globals.css";
import Header from "./Header";
import { ArrowRight, MoveUpRight } from "lucide-react";
import data from "@/data/portfolio.json";
import { Cormorant_Garamond, DM_Sans, DM_Mono } from 'next/font/google';

const serif = Cormorant_Garamond({ subsets: ['latin'], weight: ['300','400','500','600'], style: ['normal','italic'], variable: '--font-serif' });
const sans = DM_Sans({ subsets: ['latin'], weight: ['300','400','500'], variable: '--font-sans' });
const mono = DM_Mono({ subsets: ['latin'], weight: ['300','400','500'], variable: '--font-mono' });

export const metadata: Metadata = {
  // 🚀 SEO UPGRADE: Pulling dynamic values from portfolio.json
  title: `${data.site.name} | ${data.site.role}`,
  description: "Portfolio and Data Room centered on Product Management and Agentic AI workflows.",
  
  // 🚀 SOCIAL PREVIEW: OpenGraph tags for LinkedIn/Facebook
  openGraph: {
    title: `${data.site.name} | Portfolio`,
    description: "Architecting the future of Product & AI through system design and technical strategy.",
    images: ["/profile.jpg"], // Ensure profile.jpg exists in your /public folder
    type: "website",
  },
  
  // 🚀 SOCIAL PREVIEW: Twitter Card tags
  twitter: {
    card: "summary_large_image",
    title: data.site.name,
    description: "Product Management & Agentic AI Portfolio",
    images: ["/profile.jpg"],
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
        
      </body>
    </html>
  );
}