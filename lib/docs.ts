import { DOCS } from '@/data/docs-static';
import { HERO_CONTENT } from '@/data/portfolio-static';

export type Doc = {
  id: string;
  title: string;
  type: string;
  tag?: string;
  date?: string;
  readTime?: string;
  coverImage?: string;
  thumbnail?: string;
  content?: string[] | string;
  pdfUrl?: string;
  published?: boolean;
  description?: string;
  status?: string;
  link?: string;
};

const allDocs = DOCS as unknown as Doc[];

export function publicDocs(docs: Doc[] = allDocs): Doc[] {
  return docs.filter((d) => d.published !== false && d.type !== 'legal');
}

export function getAllDocs(): Doc[] {
  return allDocs;
}

export function getDocById(id: string): Doc | undefined {
  return allDocs.find((d) => d.id === id);
}

export function getAuthorMeta() {
  return {
    name: HERO_CONTENT.title,
    role: HERO_CONTENT.subtitle,
    dpUrl: HERO_CONTENT.avatarUrl,
  };
}
