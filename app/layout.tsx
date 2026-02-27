import type { Metadata } from "next";
import "./globals.css";
import Navigation from "./Navigation";
import { ArrowRight, MoveUpRight } from "lucide-react";
import Link from "next/link";
import data from "@/data/portfolio.json";

export const metadata: Metadata = {
  title: `${data.site.name} | ${data.site.role}`,
  description: "Portfolio and Data Room",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-zinc-900 selection:text-white flex flex-col overflow-x-hidden relative">
        {/* ... styles and Navigation ... */}
        
        {/* Global Footer */}
        <footer className="border-t border-zinc-100 bg-white pt-20 pb-12 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-20">
              <div>
                <h2 className="text-3xl font-light tracking-tight text-zinc-900 mb-6">Let&apos;s build something<br/>meaningful together.</h2>
                <a href={`mailto:${data.site.email}`} className="group inline-flex items-center gap-4 text-sm font-medium uppercase tracking-widest hover:text-zinc-500 transition-colors">
                  Start a conversation 
                  {/* ... arrow svg ... */}
                </a>
              </div>
              
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
            
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-zinc-100">
              <p className="text-zinc-400 text-[10px] tracking-[0.2em] uppercase">© {new Date().getFullYear()} {data.site.name}</p>
              
              <div className="flex gap-6 text-[10px] tracking-[0.2em] uppercase text-zinc-400">
                <Link href="/docs/privacy" className="hover:text-zinc-900 transition-colors">Privacy Policy</Link>
                <Link href="/docs/terms" className="hover:text-zinc-900 transition-colors">Terms of Service</Link>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}