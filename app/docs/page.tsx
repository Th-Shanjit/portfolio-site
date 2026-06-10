import type { Metadata } from 'next';
import { getPortfolio, publicDocs } from '@/lib/getPortfolio';
import DocsArchiveClient from './DocsArchiveClient';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Notes archive — Shanjit Thokchom',
  description: 'Archive of product notes, case studies, and long-form write-ups.',
};

export default async function DocsArchive() {
  const data = await getPortfolio();
  const docs = publicDocs(data.docs);
  return <DocsArchiveClient docs={docs} />;
}
