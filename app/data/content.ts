// --- TYPESCRIPT DEFINITIONS ---
export interface ProjectType { id: string; title: string; type: string; year: string; description: string; metric: string; link: string; }
export interface DocType { id: string; title: string; type: string; readTime: string; date: string; content: string[]; }
export interface ExperienceType { id: string; role: string; company: string; year: string; type: string; }

// --- YOUR CONTENT ---
export const cmsData = {
  site: {
    name: "Shanjit Thokchom",
    role: "AI Product Manager",
    email: "hello@shanjitthokchom.xyz"
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
      { id: "m2", title: "Media Kit & Bio", type: "Press", readTime: "2 min read", date: "Sep 2024", content: ["Short Bio: Shanjit is an AI Product Manager specializing in Agentic workflows and enterprise orchestration.", "Long Bio: With a background spanning technical execution and UX design, Shanjit builds intelligent systems that augment human capabilities. I believe the best AI products require rigorous attention to UX, safety, and observability.", "Approved photos and speaking materials are available upon direct request."] },
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
      title: "Privacy Policy",
      lastUpdated: "February 27, 2026",
      paragraphs: [
        "This is a placeholder for your Privacy Policy. You can replace this text with your actual policy details. We collect information to provide better services to all our users. The information we collect, and how that information is used, depends on how you use our services.",
        "When you use our services, you’re trusting us with your information. We understand this is a big responsibility and work hard to protect your information and put you in control."
      ]
    },
    terms: {
      title: "Terms of Service",
      lastUpdated: "February 27, 2026",
      paragraphs: [
        "This is a placeholder for your Terms of Service. By using our services, you are agreeing to these terms. Please read them carefully.",
        "Our services are very diverse, so sometimes additional terms or product requirements may apply. Additional terms will be available with the relevant services."
      ]
    }
  }
};

// Helper array to power individual document pages
export const allDocs = [
  ...cmsData.documents.marketing,
  ...cmsData.documents.legal,
  ...cmsData.documents.paperloop
];