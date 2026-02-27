/**
 * Type definitions for portfolio metadata (data/portfolio.json).
 * Frontend components import the JSON directly; this file has no file-system usage.
 */

export interface Site {
  name: string;
  role: string;
  email: string;
}

export interface Social {
  name: string;
  url: string;
}

export interface Hero {
  tag: string;
  title: string;
  description: string;
  link: string;
  linkText: string;
}

export interface HighlightedProject {
  id: string;
  title: string;
  category: string;
  year: string;
  slug: string;
}

export interface Contact {
  heading: string;
  email: string;
}

export interface Doc {
  id: string;
  title: string;
  type: string;
  readTime: string;
  date: string;
  content: string[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  year: string;
  type: string;
}

export interface About {
  title: string;
  content: string;
  skills: string[];
  experience: Experience[];
}

export interface PortfolioData {
  site: Site;
  socials: Social[];
  hero: Hero;
  highlightedProjects: HighlightedProject[];
  contact: Contact;
  docs: Doc[];
  about?: About;
}
