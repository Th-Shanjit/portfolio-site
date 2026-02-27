'use client';
import React, { useState, useEffect } from 'react';
import { ArrowUpRight, FileText, Download, ArrowRight, Plus, Circle, MoveUpRight } from 'lucide-react';

// ==========================================
// 🗄️ YOUR CONTENT DATA (EDIT THIS ANYTIME)
// ==========================================
const cmsData = {
  site: {
    name: "Shanjit Thokchom",
    role: "Product Manager",
    email: "th.shanjit@gmail.com"
  },
  bestProject: {
    tag: "01 — Featured Capstone",
    title: "Project Nexus: Enterprise AI Orchestration",
    description: "A comprehensive platform enabling cross-functional teams to deploy, monitor, and iterate on multi-agent workflows. Built with a focus on observability and human-in-the-loop fallback mechanisms.",
    metrics: ["Increased automation by 65%", "Zero critical failures in beta", "Adopted by 3 enterprise clients"],
    linkText: "Read Case Study",
    linkUrl: "#"
  },
  about: {
    title: "Profile",
    content: "I'm a product manager with a specialized focus on Agentic AI. My background spans both technical execution and user-centric design, giving me a unique perspective on how to build intelligent systems that truly serve human needs. I believe the best AI products augment human capabilities rather than replace them, which requires rigorous attention to UX, safety, and observability.",
    skills: ["Product Strategy", "LLM Integration", "Prompt Engineering", "User Research", "Agile Methodologies", "Stakeholder Management"],
    experience: [
      { id: "exp1", role: "Diploma in Product Management with Agentic AI", company: "Product Academy", year: "2024", type: "Education" },
      { id: "exp2", role: "Senior Product Manager", company: "TechNexus Inc.", year: "2021 — 2023", type: "Experience" },
      { id: "exp3", role: "Product Owner", company: "DataFlow Systems", year: "2019 — 2021", type: "Experience" }
    ]
  },
  socials: [
    { name: "LinkedIn", url: "#" },
    { name: "GitHub", url: "#" },
    { name: "Resume (PDF)", url: "#" }
  ],
  projects: [
    { id: "p1", title: "Agent Orchestrator", type: "Capstone Project", year: "2024", description: "Comprehensive product lifecycle management for an AI agent orchestration tool. Includes market research, user personas, and technical requirements.", metric: "Validated with 15 beta testers", link: "#" },
    { id: "p2", title: "Smart Triage Assistant", type: "Side Project & Prototype", year: "2024", description: "An interactive prototype demonstrating an AI-driven ticket routing system for customer support teams. Built to validate UX hypotheses.", metric: "Simulated 30% reduction in resolution time", link: "#" },
    { id: "p3", title: "Context-Aware Search", type: "PRD", year: "2023", description: "A detailed Product Requirements Document for implementing RAG (Retrieval-Augmented Generation) based search in an existing enterprise SaaS.", metric: "Targeted 50% increase in search success", link: "#" },
    { id: "p4", title: "Automated Data Extraction", type: "PRD", year: "2023", description: "Technical PRD outlining the integration of LLMs to parse and structure unstructured invoice data, including edge-case handling and feedback loops.", metric: "Designed for 99.9% extraction accuracy", link: "#" }
  ],
  documents: {
    marketing: [
      { id: "m1", title: "Personal Brand Guidelines", type: "Brand Strategy", readTime: "4 min read", date: "Oct 2024", content: ["My personal brand focuses on the intersection of technical AI execution and human-centric design.", "Core pillars include: Clarity in complex systems, Empathy for the end-user, and Scalability in architectural decisions.", "All visual materials should reflect a minimalist, functional aesthetic, prioritizing whitespace and structured typography."] },
      { id: "m2", title: "Media Kit & Bio", type: "Press", readTime: "2 min read", date: "Sep 2024", content: ["Short Bio: [Your Name] is an AI Product Manager specializing in Agentic workflows and enterprise orchestration.", "Long Bio: With a background spanning technical execution and UX design, [Your Name] builds intelligent systems that augment human capabilities. I believe the best AI products require rigorous attention to UX, safety, and observability.", "Approved photos and speaking materials are available upon direct request."] },
    ],
    legal: [
      { id: "l1", title: "Standard NDA", type: "Legal", readTime: "5 min read", date: "Jan 2024", content: ["This Mutual Non-Disclosure Agreement defines the boundaries of confidential information shared between parties.", "Confidential Information includes, but is not limited to, product roadmaps, proprietary algorithms, user research data, and business strategies.", "Both parties agree to hold the information in strict confidence and use it solely for the purpose of evaluating a potential business relationship."] },
      { id: "l2", title: "Consulting Agreement Template", type: "Legal", readTime: "6 min read", date: "Feb 2024", content: ["This Consulting Agreement outlines the standard terms for advisory engagements regarding AI product strategy.", "Services include: Product architecture review, LLM integration strategy, and prompt engineering workshops.", "Deliverables will be agreed upon in a separate Statement of Work (SOW) attached to this main agreement."] },
    ],
    paperloop: [
      { id: "pl1", title: "Paperloop Product Requirements Document", type: "PRD", readTime: "12 min read", date: "Jan 2024", content: ["Executive Summary: Paperloop is a document intelligence platform designed to automate data extraction from unstructured forms.", "Problem Statement: Manual data entry costs enterprise teams an average of 15 hours per week. Existing OCR solutions fail on complex, nested document layouts.", "Proposed Solution: An agentic AI workflow that uses vision-language models to semantically understand document structure, routing edge cases to human reviewers.", "Key Metrics: 95% straight-through processing rate, <2s latency per page."] },
      { id: "pl2", title: "User Research Insights & Personas", type: "Research", readTime: "8 min read", date: "Feb 2024", content: ["Methodology: We conducted 25 semi-structured interviews with compliance officers and data entry clerks across 5 enterprise organizations.", "Key Insight 1: Users trust the AI more when they can easily trace its extraction source. Observability is a critical feature, not a nice-to-have.", "Key Insight 2: The primary fear is not job replacement, but liability for the AI's mistakes. The human-in-the-loop fallback must feel seamless.", "Primary Persona - 'The Validator': Highly detail-oriented, skeptical of black-box AI, values speed but prioritizes absolute accuracy."] },
      { id: "pl3", title: "Paperloop Pitch Deck Summary", type: "Strategy", readTime: "5 min read", date: "Mar 2024", content: ["The Market: The intelligent document processing (IDP) market is growing at a 30% CAGR, but legacy players are weighed down by rigid template-based OCR.", "Our Wedge: Paperloop uses flexible, agentic LLM routing that requires zero template setup, allowing us to onboard customers 10x faster than incumbents.", "Traction: 3 enterprise pilots launched, demonstrating a 40% reduction in manual processing time within the first two weeks.", "The Ask: Seeking seed funding to scale the engineering team and expand our integration marketplace."] }
    ]
  },
  legalPages: {
    privacy: {
      title: "Privacy Policy for PaperLoop",
      lastUpdated: "27-02-2026",
      paragraphs: [
        "1. Introduction: Welcome to PaperLoop ('we,' 'our,' or 'us'). [cite_start]We are committed to protecting your personal information and your right to privacy[cite: 3]. [cite_start]This Privacy Policy explains how we collect, use, and safeguard your information when you use the PaperLoop mobile application (the 'App')[cite: 4].",
        "2. [cite_start]Information We Collect and How We Use It: PaperLoop is designed to be a local-first application, meaning we do not require you to create an account, and your saved exams remain on your device[cite: 5]. [cite_start]However, to provide our core features, we interact with specific data[cite: 6].",
        [cite_start]"• Camera and Photo Library: We request access to your device's camera and photo gallery to scan handwritten papers[cite: 8]. [cite_start]This is the core functionality of the App[cite: 9].",
        [cite_start]"• Al Processing Data: When you scan a paper or a formula, the image is securely transmitted to our third-party Al provider (Google Gemini API) to convert the handwriting into digital text[cite: 10]. [cite_start]These images are processed for text extraction and are not used by us to identify you personally[cite: 11].",
        [cite_start]"• Local Storage: Your generated exams, settings, and school logos are saved securely within your device's local file system[cite: 12]. [cite_start]We do not sync this data to an external database[cite: 13].",
        [cite_start]"• Purchase History: If you purchase Scan Tokens, the transaction is processed securely through Google Play and managed via RevenueCat[cite: 14]. [cite_start]We do not collect or store your credit card information[cite: 15]. [cite_start]We only receive an anonymous identifier to credit your device with the purchased tokens[cite: 16].",
        "3. [cite_start]Third-Party Services: The App utilizes third-party services that may collect information used to identify you or process your requests[cite: 17]. [cite_start]These services include: Google Play Services (for app distribution and payments), RevenueCat (for managing in-app purchases and token balances), and Google Gemini API (for Al handwriting recognition and formatting)[cite: 18, 19].",
        "4. [cite_start]Data Retention and Deletion: Because PaperLoop stores your exam data locally on your device, you have complete control over it[cite: 20]. [cite_start]You can delete specific questions, sections, or entire exams within the App[cite: 21]. [cite_start]You can also clear the temporary image cache via the App's Settings menu[cite: 22]. [cite_start]Uninstalling the App will delete all locally saved exams and data[cite: 23].",
        "5. [cite_start]Children's Privacy: Our App is intended for educators, teachers, and professionals[cite: 24]. [cite_start]We do not knowingly collect personally identifiable information from children under 13[cite: 25].",
        "6. [cite_start]Changes to This Privacy Policy: We may update our Privacy Policy from time to time[cite: 26]. [cite_start]We will notify you of any changes by posting the new Privacy Policy on this page and updating the 'Last Updated' date[cite: 27].",
        "7. [cite_start]Contact Us: If you have questions or comments about this Privacy Policy, you may contact us at: Developer: Shanjit Thokchom [cite: 28, 29] | [cite_start]Support via Email: th.shanjit@gmail.com [cite: 30] | [cite_start]Support via Phone: +91 62907 39163 [cite: 31] | [cite_start]Website: shanjitthokchom.xyz [cite: 32]"
      ]
    },
    terms: {
      title: "Terms of Service for PaperLoop",
      lastUpdated: "27-02-2028",
      paragraphs: [
        "1. [cite_start]Acceptance of Terms: By downloading, installing, or using PaperLoop (the 'App'), you agree to be bound by these Terms of Service[cite: 35]. [cite_start]If you do not agree to these terms, please do not use the App[cite: 36].",
        "2. [cite_start]Description of Service: PaperLoop provides tools to scan handwritten question papers, format them using Al, and export them as PDF documents[cite: 37]. [cite_start]The quality of the Al transcription depends on the legibility of the handwriting, lighting conditions, and camera quality[cite: 38].",
        "3. [cite_start]In-App Purchases and 'Scan Tokens': [cite: 39]",
        "• Consumable Tokens: PaperLoop operates on a 'Scan Token' system. [cite_start]Processing a full page of handwriting consumes one (1) Token[cite: 41].",
        [cite_start]"• Purchases: Tokens are purchased in packs (e.g., 10 Scans, 50 Scans) via the Google Play Store[cite: 42].",
        [cite_start]"• Non-Refundable: All purchases of Scan Tokens are final and non-refundable[cite: 43]. [cite_start]Tokens are tied to the device/store account used to purchase them[cite: 44].",
        [cite_start]"• Failed Scans: If the Al completely fails to detect any text on a page, the App is designed to not deduct a token[cite: 45]. [cite_start]However, if text is detected but requires manual editing by you, the token is considered consumed[cite: 46].",
        "4. [cite_start]User Content and Responsibility: [cite: 47]",
        [cite_start]"• Ownership: You retain all rights and ownership to the content (exams, questions, diagrams) you create and export using PaperLoop[cite: 48].",
        [cite_start]"• Lawful Use: You agree not to use the App to scan, generate, or distribute material that is illegal, infringes on intellectual property rights, or violates the privacy of others[cite: 49]. [cite_start]You are solely responsible for the content of the PDFs you generate[cite: 50].",
        "5. [cite_start]Disclaimer of Warranties: The App and its Al services are provided 'AS IS' and 'AS AVAILABLE.' [cite: 51] [cite_start]While we strive for accuracy, Al handwriting recognition is not perfect[cite: 52]. [cite_start]We do not warrant that the transcription will be 100% accurate, error-free, or perfectly formatted[cite: 53]. [cite_start]You are expected to review and edit the generated text before exporting your final PDF[cite: 54].",
        "6. [cite_start]Limitation of Liability: To the maximum extent permitted by law, Shanjit Thokchom and PaperLoop shall not be liable for any indirect, incidental, special, or consequential damages, or any loss of profits or revenues, whether incurred directly or indirectly, resulting from your use of the App, including but not limited to lost data, incorrectly formatted exams, or device issues[cite: 55].",
        "7. [cite_start]Changes to Terms: We reserve the right to modify these terms at any time[cite: 56]. [cite_start]Your continued use of the App following the posting of changes constitutes your acceptance of such changes[cite: 57].",
        "8. [cite_start]Contact Information: For any questions regarding these Terms, please contact: Developer: Shanjit Thokchom [cite: 58, 59] | [cite_start]Support via Email: th.shanjit@gmail.com [cite: 60] | [cite_start]Support via Phone: +91 62907 39163 [cite: 61] | [cite_start]Website: shanjitthokchom.xyz [cite: 62]"
      ]
    }
  }
};

// ==========================================
// 🎨 PORTFOLIO COMPONENTS
// ==========================================

export default function PortfolioApp() {
  const [activeView, setActiveView] = useState('portfolio');
  const [activeDoc, setActiveDoc] = useState<any>(null);
  const [scrollY, setScrollY] = useState(0);

  // Parallax Event Listener & Auto-Scroll to Top on View Change
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeView, activeDoc]);

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-zinc-900 selection:text-white flex flex-col overflow-x-hidden relative">
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee { 0% { transform: translateX(0%); } 100% { transform: translateX(-50%); } }
        .animate-marquee { display: inline-block; white-space: nowrap; animation: marquee 30s linear infinite; }
        .hover-trigger .hover-target { transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1); }
        .hover-trigger:hover .hover-target { transform: translateX(4px) translateY(-4px); }
      `}} />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-zinc-100 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div 
            className="font-medium text-sm tracking-wide flex items-center gap-2 cursor-pointer"
            onClick={() => { setActiveView('portfolio'); setActiveDoc(null); }}
          >
            <span className="w-1.5 h-1.5 bg-zinc-900 rounded-full"></span>
            {cmsData.site.name} <span className="text-zinc-400 hidden sm:inline ml-2">— {cmsData.site.role}</span>
          </div>
          <div className="flex items-center gap-6">
            {['portfolio', 'about', 'documents'].map((view) => (
              <button 
                key={view}
                onClick={() => { setActiveView(view); setActiveDoc(null); }}
                className={`text-sm tracking-wide capitalize transition-all duration-300 relative py-2
                  ${(activeView === view || (view === 'documents' && activeView === 'article')) ? 'text-zinc-900' : 'text-zinc-400 hover:text-zinc-900'}`}
              >
                {view === 'documents' ? 'Docs' : view}
                <span className={`absolute bottom-0 left-0 w-full h-[1px] bg-zinc-900 transform origin-left transition-transform duration-300 ${(activeView === view || (view === 'documents' && activeView === 'article')) ? 'scale-x-100' : 'scale-x-0'}`}></span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow relative z-10 pt-20">
        {activeView === 'portfolio' && <PortfolioView data={cmsData} scrollY={scrollY} />}
        {activeView === 'about' && <AboutView data={cmsData.about} />}
        {activeView === 'documents' && <DocumentView data={cmsData.documents} onDocClick={(doc) => { setActiveDoc(doc); setActiveView('article'); }} />}
        {activeView === 'article' && activeDoc && <ArticleView data={activeDoc} onBack={() => setActiveView('documents')} />}
        {activeView === 'privacy' && <LegalPageView data={cmsData.legalPages.privacy} />}
        {activeView === 'terms' && <LegalPageView data={cmsData.legalPages.terms} />}
      </main>

      {/* Footer */}
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
            
            {/* NEW: Legal Footer Links */}
            <div className="flex gap-6 text-[10px] tracking-[0.2em] uppercase text-zinc-400">
              <button onClick={() => { setActiveView('privacy'); window.scrollTo(0, 0); }} className="hover:text-zinc-900 transition-colors">Privacy Policy</button>
              <button onClick={() => { setActiveView('terms'); window.scrollTo(0, 0); }} className="hover:text-zinc-900 transition-colors">Terms of Service</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// --- PORTFOLIO VIEW ---
function PortfolioView({ data, scrollY }: { data: any, scrollY: number }) {
  return (
    <div className="animate-in fade-in duration-1000">
      <section className="relative max-w-7xl mx-auto px-6 pt-32 pb-32 overflow-hidden flex flex-col lg:flex-row items-center gap-20 min-h-[85vh]">
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute right-[-10%] top-[-10%] w-[800px] h-[800px] rounded-full border border-zinc-100 text-zinc-100 opacity-50" style={{ transform: `translateY(${scrollY * 0.1}px)` }} />
          <div className="absolute left-[10%] bottom-[20%]" style={{ transform: `translateY(${scrollY * -0.2}px) rotate(${scrollY * 0.02}deg)` }}>
            <Plus size={120} className="text-zinc-100" strokeWidth={0.5} />
          </div>
        </div>
        <div className="relative z-10 w-full lg:w-[50%] flex flex-col items-start">
          <span className="text-zinc-400 text-xs tracking-widest uppercase mb-8 border-b border-zinc-200 pb-2 inline-block">{data.bestProject.tag}</span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-zinc-900 leading-[1.05] mb-8">{data.bestProject.title}</h1>
          <p className="text-lg md:text-xl font-light text-zinc-500 leading-relaxed mb-12 max-w-lg">{data.bestProject.description}</p>
          <div className="flex flex-col gap-3 mb-16">
            {data.bestProject.metrics.map((metric: string, i: number) => (
              <div key={i} className="text-sm font-medium text-zinc-600 flex items-center gap-4">
                <span className="w-6 h-[1px] bg-zinc-300"></span>{metric}
              </div>
            ))}
          </div>
          <a href={data.bestProject.linkUrl} className="group inline-flex items-center gap-4 text-sm font-medium uppercase tracking-widest hover:text-zinc-500 transition-colors">
            {data.bestProject.linkText} 
            <span className="w-10 h-[1px] bg-zinc-900 group-hover:w-16 group-hover:bg-zinc-400 transition-all duration-500 relative">
              <ArrowRight size={14} className="absolute right-[-4px] top-[-6px] text-zinc-900 group-hover:text-zinc-400 group-hover:translate-x-2 transition-all duration-500" strokeWidth={1.5} />
            </span>
          </a>
        </div>
        <div className="relative z-10 w-full lg:w-[50%] flex justify-center lg:justify-end">
           <div className="relative w-full max-w-lg aspect-[4/5] group cursor-pointer">
              <div className="absolute inset-0 bg-[#fafafa] border border-zinc-200 flex flex-col items-center justify-center text-center transition-all duration-700 group-hover:border-zinc-300 group-hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] overflow-hidden">
                <svg className="absolute inset-0 w-full h-full text-zinc-100 z-0" xmlns="http://www.w3.org/2000/svg"><line x1="0" y1="100%" x2="100%" y2="0" stroke="currentColor" strokeWidth="1" /></svg>
                <div className="relative z-10 flex flex-col items-center transform transition-transform duration-700 group-hover:scale-105">
                  <Circle size={40} className="text-zinc-300 mb-6 group-hover:text-zinc-900 transition-colors duration-500" strokeWidth={0.5} />
                  <p className="text-zinc-400 tracking-widest text-[10px] uppercase font-medium">Visual Assets Pending</p>
                </div>
              </div>
           </div>
        </div>
      </section>

      <div className="w-full border-y border-zinc-100 bg-white py-6 overflow-hidden relative z-20 flex items-center">
        <div className="animate-marquee opacity-40">
          <span className="text-xs font-light uppercase tracking-[0.2em] mx-8 text-zinc-500">
            Agentic AI <span className="mx-4 font-thin text-zinc-300">/</span> User Research <span className="mx-4 font-thin text-zinc-300">/</span> Product Strategy <span className="mx-4 font-thin text-zinc-300">/</span> Prototypes
          </span>
          <span className="text-xs font-light uppercase tracking-[0.2em] mx-8 text-zinc-500">
            Agentic AI <span className="mx-4 font-thin text-zinc-300">/</span> User Research <span className="mx-4 font-thin text-zinc-300">/</span> Product Strategy <span className="mx-4 font-thin text-zinc-300">/</span> Prototypes
          </span>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-6 pb-40 pt-32 relative z-10">
        <div className="flex items-end justify-between mb-16 border-b border-zinc-900 pb-6">
          <h2 className="text-3xl font-light tracking-tight text-zinc-900">Selected Works</h2>
          <span className="text-xs tracking-widest text-zinc-400 uppercase">[ {data.projects.length} ]</span>
        </div>
        <div className="flex flex-col">
          {data.projects.map((project: any, index: number) => (
            <a key={project.id} href={project.link} className="group flex flex-col md:flex-row md:items-center py-10 border-b border-zinc-100 hover:border-zinc-300 transition-colors relative">
              <div className="absolute inset-0 bg-zinc-50 scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-500 -z-10"></div>
              <div className="md:w-1/6 mb-4 md:mb-0"><span className="text-xs text-zinc-400 tracking-widest">0{index + 1}</span></div>
              <div className="md:w-2/6 mb-4 md:mb-0 pr-8">
                <h3 className="text-2xl font-light text-zinc-900 group-hover:text-zinc-600 transition-colors">{project.title}</h3>
                <span className="text-[10px] uppercase tracking-widest text-zinc-400 mt-2 block">{project.type} • {project.year}</span>
              </div>
              <div className="md:w-2/6 mb-4 md:mb-0 pr-8">
                <p className="text-sm font-light text-zinc-500 leading-relaxed">{project.description}</p>
              </div>
              <div className="md:w-1/6 flex justify-between items-center md:justify-end gap-4">
                <div className="text-[10px] font-medium text-zinc-500 border border-zinc-200 px-3 py-1.5 rounded-full md:hidden lg:block">{project.metric}</div>
                <div className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center group-hover:bg-zinc-900 group-hover:border-zinc-900 transition-all duration-300 text-zinc-400 group-hover:text-white">
                  <ArrowUpRight size={16} strokeWidth={1.5} className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}

// --- DOCUMENT HOST VIEW (Updated with Boxed Paperloop Section) ---
function DocumentView({ data, onDocClick }: { data: any, onDocClick: (doc: any) => void }) {
  return (
    <div className="max-w-5xl mx-auto px-6 py-32 animate-in fade-in duration-1000 relative z-10 min-h-[80vh]">
      <div className="mb-24 max-w-2xl">
        <h1 className="text-5xl font-light tracking-tight text-zinc-900 mb-8">Data Room</h1>
        <p className="text-lg font-light text-zinc-500 leading-relaxed">
          A centralized repository for marketing assets, brand guidelines, and product documentation. 
          Select a document below to read.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
        <div>
          <h2 className="text-xs font-medium uppercase tracking-widest mb-8 text-zinc-400 border-b border-zinc-100 pb-4">I. Marketing & Brand</h2>
          <div className="flex flex-col border-t border-zinc-100">
            {data.marketing.map((doc: any) => <DocRow key={doc.id} doc={doc} onClick={() => onDocClick(doc)} />)}
          </div>
        </div>
        <div>
          <h2 className="text-xs font-medium uppercase tracking-widest mb-8 text-zinc-400 border-b border-zinc-100 pb-4">II. Legal & Compliance</h2>
          <div className="flex flex-col border-t border-zinc-100">
            {data.legal.map((doc: any) => <DocRow key={doc.id} doc={doc} onClick={() => onDocClick(doc)} />)}
          </div>
        </div>
      </div>

      {/* New Boxed Paperloop Section */}
      <div className="border border-zinc-200 bg-zinc-50/50 rounded-2xl p-8 md:p-12 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-96 h-96 bg-zinc-200 rounded-full blur-3xl opacity-20 -mr-32 -mt-32 transition-opacity duration-700 group-hover:opacity-40"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <span className="w-2 h-2 bg-zinc-900 rounded-full"></span>
            <h2 className="text-2xl font-light text-zinc-900">Paperloop Application</h2>
          </div>
          <p className="text-sm font-light text-zinc-500 mb-10 max-w-xl leading-relaxed">
            Official documentation, product requirement documents, and user research assets related to the ongoing development of the Paperloop platform.
          </p>
          <div className="flex flex-col border-t border-zinc-200/60">
            {data.paperloop.map((doc: any) => <DocRow key={doc.id} doc={doc} onClick={() => onDocClick(doc)} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

function DocRow({ doc, onClick }: { doc: any, onClick: () => void }) {
  return (
    <div onClick={onClick} className="py-5 border-b border-zinc-200/60 flex items-center justify-between group hover-trigger cursor-pointer">
      <div className="flex items-center gap-6">
        <div className="text-zinc-300 group-hover:text-zinc-900 transition-colors">
          <FileText size={20} strokeWidth={1} />
        </div>
        <div>
          <h4 className="font-light text-base text-zinc-900 group-hover:text-zinc-600 transition-colors">{doc.title}</h4>
          <div className="flex items-center gap-3 text-[10px] font-medium text-zinc-400 mt-2 uppercase tracking-widest">
            <span>{doc.type}</span>
            <span className="w-1 h-1 rounded-full bg-zinc-200"></span>
            <span>{doc.readTime}</span>
            <span className="w-1 h-1 rounded-full bg-zinc-200"></span>
            <span>{doc.date}</span>
          </div>
        </div>
      </div>
      <div className="text-zinc-300 group-hover:text-zinc-900 transition-transform duration-300 transform group-hover:translate-x-2 p-2" title="Read Document">
        <ArrowRight size={18} strokeWidth={1.5} />
      </div>
    </div>
  );
}

// --- ARTICLE READING VIEW ---
function ArticleView({ data, onBack }: { data: any, onBack: () => void }) {
  return (
    <div className="max-w-3xl mx-auto px-6 py-32 animate-in fade-in duration-1000 min-h-[80vh]">
      <button onClick={onBack} className="group flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-zinc-400 hover:text-zinc-900 transition-colors mb-12">
        <ArrowRight size={14} className="rotate-180 transform group-hover:-translate-x-1 transition-transform duration-300" strokeWidth={1.5} /> 
        Back to Data Room
      </button>
      
      <div className="flex items-center gap-3 text-[10px] font-medium text-zinc-400 mb-8 uppercase tracking-widest">
        <span>{data.type}</span>
        <span className="w-1 h-1 rounded-full bg-zinc-200"></span>
        <span>{data.readTime}</span>
        <span className="w-1 h-1 rounded-full bg-zinc-200"></span>
        <span>{data.date}</span>
      </div>

      <h1 className="text-4xl md:text-5xl font-light tracking-tight text-zinc-900 mb-16">{data.title}</h1>
      
      <div className="flex flex-col gap-6 text-zinc-600 font-light leading-loose text-lg">
        {data.content.map((paragraph: string, index: number) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}

// --- LEGAL TEXT VIEW (For Privacy & Terms) ---
function LegalPageView({ data }: { data: any }) {
  return (
    <div className="animate-in fade-in duration-1000 max-w-3xl mx-auto px-6 py-32 relative z-10 min-h-[80vh]">
      <div className="mb-16 border-b border-zinc-100 pb-8">
        <h1 className="text-4xl md:text-5xl font-light tracking-tight text-zinc-900 mb-4">{data.title}</h1>
        <p className="text-xs font-medium uppercase tracking-widest text-zinc-400">Last Updated: {data.lastUpdated}</p>
      </div>
      
      <div className="prose prose-zinc max-w-none">
        {data.paragraphs.map((paragraph: string, i: number) => (
          <p key={i} className="text-zinc-600 font-light leading-loose text-lg mb-8">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}

// --- ABOUT VIEW ---
function AboutView({ data }: { data: any }) {
  return (
    <div className="animate-in fade-in duration-1000 max-w-7xl mx-auto px-6 py-32 relative z-10 min-h-[80vh]">
      <div className="flex flex-col lg:flex-row gap-20 items-start">
        <div className="lg:w-1/2">
          <h1 className="text-5xl font-light tracking-tight text-zinc-900 mb-12">{data.title}</h1>
          <div className="relative pt-2 mb-16">
            <span className="absolute -top-12 -left-6 text-8xl font-serif text-zinc-100 opacity-50 z-0 select-none">"</span>
            <p className="text-zinc-600 font-light leading-loose text-xl relative z-10">{data.content}</p>
          </div>
          <div className="flex flex-col gap-4 border-t border-zinc-100 pt-8">
            <span className="text-xs font-medium uppercase tracking-widest text-zinc-400 mb-2">Core Competencies</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data.skills.map((skill: string, i: number) => (
                <div key={i} className="flex items-center gap-3 group">
                  <span className="w-4 h-[1px] bg-zinc-200 group-hover:w-8 group-hover:bg-zinc-400 transition-all duration-500"></span>
                  <span className="text-sm font-light text-zinc-600 group-hover:text-zinc-900 transition-colors">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:w-1/2 w-full lg:pl-12 lg:border-l border-zinc-100">
          <span className="text-xs font-medium uppercase tracking-widest text-zinc-400 mb-12 block">Background & Education</span>
          <div className="flex flex-col">
            {data.experience.map((item: any, index: number) => (
              <div key={item.id} className="group relative pb-12 pl-8 border-l border-zinc-100 last:border-transparent last:pb-0">
                <div className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full bg-white border border-zinc-300 group-hover:border-zinc-900 group-hover:bg-zinc-900 transition-all duration-300"></div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest text-zinc-400 mb-2">{item.year} • {item.type}</span>
                  <h3 className="text-lg font-light text-zinc-900 group-hover:text-zinc-600 transition-colors mb-1">{item.role}</h3>
                  <span className="text-sm font-light text-zinc-500">{item.company}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
