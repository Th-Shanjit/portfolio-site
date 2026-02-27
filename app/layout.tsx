import type { Metadata } from "next";
import "./globals.css";
import Navigation from "./Navigation";
import { ArrowRight, MoveUpRight } from "lucide-react";
import Link from "next/link";
import { cmsData } from "./data/content";

export const metadata: Metadata = {
  title: "Shanjit Thokchom | AI Product Manager",
  description: "Portfolio and Data Room",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-zinc-900 selection:text-white flex flex-col overflow-x-hidden relative">
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes marquee { 0% { transform: translateX(0%); } 100% { transform: translateX(-50%); } }
          .animate-marquee { display: inline-block; white-space: nowrap; animation: marquee 30s linear infinite; }
          .hover-trigger .hover-target { transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1); }
          .hover-trigger:hover .hover-target { transform: translateX(4px) translateY(-4px); }
        `}} />
        
        <Navigation />
        
        <main className="flex-grow relative z-10 pt-20">
          {children}
        </main>
        
        {/* Global Footer */}
        <footer className="border-t border-zinc-100 bg-white pt-20 pb-12 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-20">
              <div>
                <h2 className="text-3xl font-light tracking-tight text-zinc-900 mb-6">Let's build something<br/>meaningful together.</h2>
                <a href={`mailto:${cmsData.site.email}`} className="group inline-flex items-center gap-4 text-sm font-medium uppercase tracking-widest hover:text-zinc-500 transition-colors">
                  Start a conversation 
                  <span className="w-10 h-[1px] bg-zinc-900 group-hover:w-16 group-hover:bg-zinc-400 transition-all duration-500 relative">
                    <ArrowRight size={14} className="absolute right-[-4px] top-[-6px] text-zinc-900 group-hover:text-zinc-400 group-hover:translate-x-2 transition-all duration-500" strokeWidth={1.5} />
                  </span>
                </a>
              </div>
              
              <div className="flex flex-col gap-4">
                <span className="text-xs tracking-widest uppercase text-zinc-400 mb-2">Connect</span>
                {cmsData.socials.map((social, index) => (
                  <a key={index} href={social.url} className="text-sm font-light text-zinc-600 hover:text-zinc-900 transition-colors hover-trigger flex items-center gap-2 group">
                    {social.name}
                    <MoveUpRight size={12} className="text-zinc-300 group-hover:text-zinc-900 transition-colors hover-target" strokeWidth={1.5} />
                  </a>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-zinc-100">
              <p className="text-zinc-400 text-[10px] tracking-[0.2em] uppercase">© {new Date().getFullYear()} {cmsData.site.name}</p>
              
              <div className="flex gap-6 text-[10px] tracking-[0.2em] uppercase text-zinc-400">
                <Link href="/privacy" className="hover:text-zinc-900 transition-colors">Privacy Policy</Link>
                <Link href="/terms" className="hover:text-zinc-900 transition-colors">Terms of Service</Link>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}