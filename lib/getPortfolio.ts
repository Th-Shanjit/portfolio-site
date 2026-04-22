import { cache } from 'react';
import fs from 'fs';
import path from 'path';
import { Redis } from '@upstash/redis';
import fallbackData from '@/data/portfolio.json';

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

export type Portfolio = {
  site?: { name?: string; role?: string; dpUrl?: string; email?: string; resumeUrl?: string; linkedinUrl?: string };
  socials?: { name: string; url: string }[];
  hero?: Record<string, unknown>;
  highlightedProjects?: { id: string }[];
  contact?: { heading?: string; subheading?: string; email?: string };
  about?: Record<string, unknown>;
  docs?: Doc[];
};

const getRedis = () => {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
};

async function loadPortfolio(): Promise<Portfolio> {
  const redis = getRedis();
  if (redis) {
    try {
      const cloud = (await redis.get('portfolio_data')) as Portfolio | null;
      if (cloud) return cloud;
    } catch (err) {
      console.error('getPortfolio redis read failed:', err);
    }
  }

  try {
    const filePath = path.join(process.cwd(), 'data', 'portfolio.json');
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(raw) as Portfolio;
    }
  } catch (err) {
    console.error('getPortfolio file read failed:', err);
  }

  return fallbackData as Portfolio;
}

export const getPortfolio = cache(loadPortfolio);

export function publicDocs(docs: Doc[] | undefined): Doc[] {
  return (docs || []).filter((d) => d.published !== false && d.type !== 'legal');
}
