import type { Metadata } from 'next';
import { getPortfolio, publicDocs } from '@/lib/getPortfolio';
import DocsArchiveClient from './DocsArchiveClient';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Writing — Shanjit Thokchom',
  description: 'Notes, case studies, and product decisions written in the open.',
};

export default async function DocsArchive() {
  const data = await getPortfolio();
  const docs = publicDocs(data.docs);
  return <DocsArchiveClient docs={docs} />;
}
