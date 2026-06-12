export interface ProjectItem {
  id: string;
  title: string;
  tag: string;
  description: string;
  link: string;
  borderColor?: string;
  backgroundColor?: string;
}

export const HERO_CONTENT = {
  avatarUrl: '/profile.jpg',
  title: 'Shanjit Thokchom',
  subtitle: 'Aspiring Product Manager & Builder',
  description:
    'Transitioning from a background in law to building digital products. Certified in Product Management & Agentic AI from Masai School & IIT Patna. Actively vibe coding with AI agents and no-code infrastructure.',
  resumeUrl: '/uploads/resume_shanjit.pdf',
  primaryCtaText: 'View Work',
  secondaryCtaText: "Let's Talk",
};

export const OVERVIEW_TEXT = {
  bio: 'I craft minimalist, neo-brutalist digital interfaces and design intuitive product loops. Deeply fascinated by high-level architectural frameworks, Stoicism, Absurdism, and vintage motorcycle restorations.',
};

export const MOOD_BOARD_BRAND_LOGOS = [
  { name: 'Cursor', iconPath: '/file.svg' },
  { name: 'Replit', iconPath: '/window.svg' },
  { name: 'Vercel', iconPath: '/vercel.svg' },
  { name: 'Next.js', iconPath: '/next.svg' },
];

export const HIGHLIGHTS: { productNotes: ProjectItem[]; sideQuests: ProjectItem[] } = {
  productNotes: [
    {
      id: 'vela',
      title: 'Vela (Formerly Fluid)',
      tag: 'SaaS / Tablet Utilities',
      description:
        'A stylus-optimized document organization application tailored heavily for Android S-Pen users.',
      link: '#',
      borderColor: '#000000',
      backgroundColor: '#FEF9E7',
    },
  ],
  sideQuests: [
    {
      id: 'vintage-restoration',
      title: 'Vintage Super Cub Logistics',
      tag: 'Motorcycles / Restorations',
      description:
        'Sourcing, restoring, and tracking the engineering blueprints of vintage Honda Super Cub frames in India.',
      link: '#',
    },
    {
      id: 'cbz-xtreme',
      title: 'CBZ Xtreme Maintenance Track',
      tag: 'Hardware Tuning',
      description:
        'Custom tinkering, maintenance logs, and spare parts sourcing for the Hero Honda CBZ Xtreme platform.',
      link: '#',
    },
  ],
};

export const CONTACT_LINKS = {
  email: 'mailto:shanjit@example.com',
  linkedin: '[https://linkedin.com/in/shanjitthokchom](https://linkedin.com/in/shanjitthokchom)',
  github: '[https://github.com/th-shanjit](https://github.com/th-shanjit)',
  twitter: '[https://twitter.com/shanjit](https://twitter.com/shanjit)',
};
