import type { Metadata } from "next";
import "./globals.css";
import Navigation from "./Navigation";
import { ArrowRight, MoveUpRight } from "lucide-react";
import data from "@/data/portfolio.json";

export const metadata: Metadata = {
  title: `${data.site.name} | ${data.site.role}`,
  description: "Portfolio and Data Room",
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
        {/* Note: Removed bg-white and border-t so it blends into the glass theme */}
        <footer className="pt-12 pb-24 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
              
              {/* Left Side: Call to Action */}
              <div>
                <h2 className="text-3xl font-light tracking-tight text-zinc-900 mb-6">Let&apos;s build something<br/>meaningful together.</h2>
                <a href={`mailto:${data.site.email}`} className="group inline-flex items-center gap-4 text-sm font-medium uppercase tracking-widest hover:text-zinc-500 transition-colors">
                  Start a conversation 
                  <span className="w-10 h-[1px] bg-zinc-900 group-hover:w-16 group-hover:bg-zinc-400 transition-all duration-500 relative">
                    <ArrowRight size={14} className="absolute right-[-4px] top-[-6px] text-zinc-900 group-hover:text-zinc-400 group-hover:translate-x-2 transition-all duration-500" strokeWidth={1.5} />
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