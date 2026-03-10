import React from 'react';
import Link from 'next/link';

export default function DownloadPage() {
  return (
    <div className="min-h-screen bg-[#0B1825] text-[#EDE8DB] font-sans selection:bg-[#CF8610] selection:text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <main className="max-w-3xl mx-auto px-6 py-20 md:py-32">
        <div className="mb-12">
          <Link href="/paperloop" className="inline-flex items-center gap-2 text-[#EDE8DB]/50 hover:text-[#EDE8DB] transition-colors text-sm font-medium tracking-wide">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            Back to PaperLoop
          </Link>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-6 leading-[1.1]" style={{ fontFamily: "'Fraunces', serif" }}>
          Get PaperLoop
        </h1>
        <p className="text-[#EDE8DB]/60 text-lg md:text-xl mb-16 max-w-xl leading-relaxed">
          Choose your platform to start scanning handwritten exams to digital formats in seconds.
        </p>

        <div className="space-y-6">
          {/* Android Card */}
          <div className="bg-[#162436] border border-white/10 rounded-2xl p-6 md:p-8 hover:border-white/20 transition-all duration-300">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-[#CF8610]/10 rounded-xl flex items-center justify-center text-[#CF8610]">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 16h14"/><path d="M5 8h14"/><path d="m9 12-4-4-4 4"/><path d="m15 12 4-4 4 4"/></svg>
                  </div>
                  <h2 className="text-2xl font-serif text-white" style={{ fontFamily: "'Fraunces', serif" }}>Android</h2>
                </div>
                <p className="text-[#EDE8DB]/60 mb-6">Available now on the Google Play Store for Android devices.</p>
                
                <div className="bg-black/20 rounded-xl p-5 border border-white/5 space-y-4">
                  <h3 className="text-sm font-mono tracking-wider text-[#CF8610] uppercase">Installation Instructions</h3>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#CF8610] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">1</div>
                    <div>
                      <p className="text-[#EDE8DB] mb-2">Join our testing group for access</p>
                      <a href="https://groups.google.com/g/paperloopmvp" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-between w-full md:w-auto md:min-w-[200px] px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-medium transition-colors">
                        Join Google Group
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 pt-2">
                    <div className="w-6 h-6 rounded-full bg-[#CF8610] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</div>
                    <div>
                      <p className="text-[#EDE8DB] mb-2">Download from the Play Store</p>
                      <a href="https://play.google.com/store/apps/details?id=com.paperloop.official" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-between w-full md:w-auto md:min-w-[200px] px-4 py-2.5 bg-[#CF8610] hover:bg-[#B07610] text-white rounded-lg text-sm font-medium transition-colors shadow-[0_4px_14px_rgba(207,134,16,0.3)] hover:shadow-[0_6px_20px_rgba(207,134,16,0.4)] hover:-translate-y-0.5 transform">
                        <span className="flex items-center gap-2">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                          Get it on Google Play
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* iOS Card */}
          <div className="bg-[#162436]/50 border border-white/5 rounded-2xl p-6 md:p-8 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none"></div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-white/40">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z"/><path d="M10 2c1 .5 2 2 2 5"/></svg>
                </div>
                <div>
                  <h2 className="text-2xl font-serif text-white/50" style={{ fontFamily: "'Fraunces', serif" }}>iOS</h2>
                  <p className="text-[#EDE8DB]/40">For iPhone and iPad</p>
                </div>
              </div>
              <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-[#CF8610]/10 border border-[#CF8610]/20 text-[#CF8610] text-xs font-mono tracking-wider uppercase">
                In the works
              </div>
            </div>
          </div>

          {/* Web Card */}
          <div className="bg-[#162436]/50 border border-white/5 rounded-2xl p-6 md:p-8 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none"></div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-white/40">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
                </div>
                <div>
                  <h2 className="text-2xl font-serif text-white/50" style={{ fontFamily: "'Fraunces', serif" }}>Web App</h2>
                  <p className="text-[#EDE8DB]/40">Access from any desktop browser</p>
                </div>
              </div>
              <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-[#CF8610]/10 border border-[#CF8610]/20 text-[#CF8610] text-xs font-mono tracking-wider uppercase">
                Coming soon
              </div>
            </div>
          </div>
        </div>

        {/* Need Help Section */}
        <div className="mt-20 pt-10 border-t border-white/10 text-center">
          <h2 className="text-2xl font-serif text-white mb-3" style={{ fontFamily: "'Fraunces', serif" }}>Need Help?</h2>
          <p className="text-[#EDE8DB]/60 mb-6 max-w-md mx-auto">
            Having trouble accessing the app or experiencing issues? We're here to help.
          </p>
          <a href="mailto:th.shanjit@gmail.com" className="inline-flex items-center gap-2 text-[#CF8610] hover:text-[#B07610] transition-colors font-medium">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            th.shanjit@gmail.com
          </a>
        </div>
      </main>
    </div>
  );
}
