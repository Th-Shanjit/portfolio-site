/**
 * Type definitions for portfolio metadata (data/portfolio.json).
 */

export interface Site {
  name: string;
  role: string;
  email: string;
  linkedinUrl?: string;
  dpUrl?: string;
  resumeUrl?: string;
}

export interface Social {
  name: string;
  url: string;
}

export interface Hero {
  tag?: string;
  eyebrow?: string;
  headline?: string;
  subhead?: string;
  title?: string;
  description?: string;
  link?: string;
  linkText?: string;
  coverImage?: string;
}

export interface HighlightedProject {
  id: string;
}

export interface Contact {
  heading?: string;
  subheading?: string;
  email?: string;
}

export interface ExperienceEntry {
  role: string;
  company: string;
  year: string;
}

export interface About {
  heading?: string;
  subheading?: string;
  originTitle?: string;
  originText?: string;
  location?: string;
  educationTitle?: string;
  educationSubtitle?: string;
  focusTitle?: string;
  focusText?: string;
  bio?: string[];
  tools?: string[];
  experience?: ExperienceEntry[];
}

export interface Doc {
  id: string;
  title: string;
  type: string;
  tag?: string;
  status?: string;
  published?: boolean;
  description?: string;
  thumbnail?: string;
  coverImage?: string;
  pdfUrl?: string;
  date?: string;
  readTime?: string;
  views?: number;
  content?: string[];
  link?: string;
}

export interface PortfolioData {
  site: Site;
  socials?: Social[];
  hero?: Hero;
  highlightedProjects?: HighlightedProject[];
  contact?: Contact;
  about?: About;
  docs: Doc[];
}
