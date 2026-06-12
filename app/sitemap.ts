import type { MetadataRoute } from 'next';
import { publicDocs } from '@/lib/docs';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://shanjitthokchom.xyz';

export default function sitemap(): MetadataRoute.Sitemap {
  const docs = publicDocs();
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${siteUrl}/docs`, lastModified: now, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${siteUrl}/paperloop`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${siteUrl}/paperloop/download`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  ];

  const docRoutes: MetadataRoute.Sitemap = docs.map((d) => ({
    url: `${siteUrl}/docs/${d.id}`,
    lastModified: d.date ? new Date(d.date) : now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...docRoutes];
}
