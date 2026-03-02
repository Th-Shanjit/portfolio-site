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
        
        {/* Global Footer (Socials & Contact Only) */}
        <footer className="pt-12 pb-24 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
              
             {/* Left Side: Call to Action */}
              <div>
                <h2 className="text-3xl font-light tracking-tight text-zinc-900 mb-6">Let&apos;s build something<br/>meaningful together.</h2>
                <a 
                  href={data.site.linkedinUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group inline-flex items-center gap-4 text-sm font-medium uppercase tracking-widest text-[#0a66c2] hover:text-blue-800 transition-colors"
                >
                  Drop me a DM on LinkedIn 
                  <span className="w-10 h-[1px] bg-[#0a66c2] group-hover:w-16 group-hover:bg-blue-800 transition-all duration-500 relative">
                    <ArrowRight size={14} className="absolute right-[-4px] top-[-6px] text-[#0a66c2] group-hover:text-blue-800 group-hover:translate-x-2 transition-all duration-500" strokeWidth={1.5} />
                  </span>
                </a>
              </div>
              
              {/* Right Side: Social Links */}
              <div className="flex flex-col gap-4">
                <span className="text-xs tracking-widest uppercase text-zinc-400 mb-2">Connect</span>
                {data.socials.map((social: any, index: number) => (
                  <a key={index} href={social.url} className="text-sm font-light text-zinc-600 hover:text-zinc-900 transition-colors hover-trigger flex items-center gap-2 group">
                    {social.name}
                    <MoveUpRight size={12} className="text-zinc-300 group-hover:text-zinc-900 transition-colors hover-target" strokeWidth={1.5} />
                  </a>
                ))}
              </div>
              
            </div>
          </div>
        </footer>

      </body>
    </html>
  );
}