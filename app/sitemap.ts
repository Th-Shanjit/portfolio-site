import type { MetadataRoute } from 'next';
import { getPortfolio, publicDocs } from '@/lib/getPortfolio';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://shanjitthokchom.xyz';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const data = await getPortfolio();
  const docs = publicDocs(data.docs);
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${siteUrl}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/docs`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
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
