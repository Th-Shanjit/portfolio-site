import type { Metadata } from 'next';
import { publicDocs } from '@/lib/docs';
import DocsArchiveClient from './DocsArchiveClient';

export const metadata: Metadata = {
  title: 'Notes archive — Shanjit Thokchom',
  description: 'Archive of product notes, case studies, and long-form write-ups.',
};

export default function DocsArchive() {
  const docs = publicDocs();
  return <DocsArchiveClient docs={docs} />;
}
