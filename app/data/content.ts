// --- TYPESCRIPT INTERFACES (Clears IDE Errors) ---
export interface ProjectType { 
  id: string; 
  title: string; 
  type: string; 
  year: string; 
  description: string; 
  metric: string; 
  link: string; 
}

export interface DocType { 
  id: string; 
  title: string; 
  type: string; 
  readTime: string; 
  date: string; 
  content: string[]; 
}

export interface ExperienceType { 
  id: string; 
  role: string; 
  company: string; 
  year: string; 
  type: string; 
}

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
    description: "A comprehensive platform enabling cross-functional teams to deploy, monitor, and iterate on multi-agent workflows.",
    metrics: ["Increased automation by 65%", "Zero critical failures in beta", "Adopted by 3 enterprise clients"],
    linkText: "Read Case Study",
    linkUrl: "#"
  },
  about: {
    title: "Profile",
    content: "I'm a product manager with a specialized focus on Agentic AI. My background spans both technical execution and user-centric design.",
    skills: ["Product Strategy", "LLM Integration", "Prompt Engineering", "User Research"],
    experience: [
      { id: "exp1", role: "Diploma in Product Management with Agentic AI", company: "Product Academy", year: "2024", type: "Education" },
      { id: "exp2", role: "Senior Product Manager", company: "TechNexus Inc.", year: "2021 — 2023", type: "Experience" }
    ]
  },
  socials: [
    { name: "LinkedIn", url: "#" },
    { name: "GitHub", url: "#" },
    { name: "Resume (PDF)", url: "/resume.pdf" }
  ],
  projects: [
    { id: "p1", title: "Agent Orchestrator", type: "Capstone Project", year: "2024", description: "Comprehensive product lifecycle management for an AI agent orchestration tool.", metric: "Validated with 15 beta testers", link: "#" }
  ],
  documents: {
    marketing: [
      { id: "m1", title: "Personal Brand Guidelines", type: "Brand Strategy", readTime: "4 min read", date: "Oct 2024", content: ["..."] },
      { id: "m2", title: "Media Kit & Bio", type: "Press", readTime: "2 min read", date: "Sep 2024", content: ["..."] },
    ],
    legal: [
      // Move Privacy and Terms here so they show up in the Data Room index
      { 
        id: "privacy", 
        title: "Privacy Policy", 
        type: "Legal", 
        readTime: "3 min read", 
        date: "Feb 2026", 
        content: [
          "This is your official Privacy Policy. We collect information to provide better services to all our users.",
          "When you use our services, you’re trusting us with your information. We work hard to protect it."
        ] 
      },
      { 
        id: "terms", 
        title: "Terms of Service", 
        type: "Legal", 
        readTime: "3 min read", 
        date: "Feb 2026", 
        content: [
          "By using our services, you are agreeing to these terms. Please read them carefully.",
          "Our services are diverse, so sometimes additional terms or product requirements may apply."
        ] 
      },
      { id: "l1", title: "Standard NDA", type: "Legal", readTime: "5 min read", date: "Jan 2024", content: ["..."] },
      { id: "l2", title: "Consulting Agreement Template", type: "Legal", readTime: "6 min read", date: "Feb 2024", content: ["..."] },
    ],
    paperloop: [
      // ... paperloop docs ...
    ]
  }
};

// This ensures the dynamic [id] page can find the new privacy/terms documents
export const allDocs: DocType[] = [
  ...cmsData.documents.marketing,
  ...cmsData.documents.legal,
  ...cmsData.documents.paperloop
];