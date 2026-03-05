import type { Metadata } from "next";
import "./globals.css";
import Navigation from "./Navigation";
import { ArrowRight, MoveUpRight } from "lucide-react";
import data from "@/data/portfolio.json";

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
    <html lang="en">
      <body className="min-h-screen font-sans selection:bg-zinc-300 flex flex-col overflow-x-hidden relative">
        
        {/* Global Navigation */}
        <Navigation />
        
        {/* Page Content Injection */}
        <main className="flex-grow relative z-10">
          {children}
        </main>
        
      </body>
    </html>
  );
}