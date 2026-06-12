import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft, ArrowRight, Clock, Calendar, Hash, Download, ChevronLeft } from 'lucide-react';
import { Reveal } from '@/lib/design';
import Tag from '@/components/ui/Tag';
import { getAllDocs, getAuthorMeta, publicDocs, type Doc } from '@/lib/docs';
import DocReaderClient from './DocReaderClient';

export async function generateStaticParams() {
  return publicDocs().map((d) => ({ slug: d.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = getAllDocs().find((d) => d.id === slug);

  if (!doc) {
    return { title: 'Document' };
  }

  const description = doc.description || 'Writing and case studies by Shanjit Thokchom.';

  return {
    title: doc.title,
    description,
    openGraph: {
      title: doc.title,
      description,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: doc.title,
      description,
    },
  };
}

export default async function DocumentReader({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const allDocs = getAllDocs();
  const docs = publicDocs(allDocs);
  const idx = docs.findIndex((d) => d.id === slug);

  let doc: Doc | undefined;
  let prev: Doc | undefined;
  let next: Doc | undefined;

  if (idx === -1) {
    doc = allDocs.find((d) => d.id === slug);
  } else {
    doc = docs[idx];
    prev = idx > 0 ? docs[idx - 1] : undefined;
    next = idx < docs.length - 1 ? docs[idx + 1] : undefined;
  }

  const author = getAuthorMeta();

  if (!doc) {
    return (
      <main className="bg-[#f8f4ef] min-h-screen flex flex-col items-center justify-center text-[#1c1916]">
        <h1 className="font-serif text-[32px] mb-2">Document unavailable</h1>
        <p className="font-sans text-[15px] text-[#7a7470] mb-8">
          The requested write-up might be private or deleted.
        </p>
        <Link
          href="/docs"
          className="flex items-center gap-2 font-mono text-[10px] text-[#7a7470] uppercase tracking-[0.1em] no-underline hover:text-[#c8873c] transition-colors"
        >
          <ArrowLeft size={14} /> Return to writing
        </Link>
      </main>
    );
  }

  const bodyHtml = Array.isArray(doc.content) ? doc.content.join('\n\n') : (doc.content || '');

  return (
    <main className="bg-[#f8f4ef] min-h-screen text-[#1c1916] max-w-[800px] mx-auto px-[clamp(20px,5vw,64px)] pt-[120px] pb-40">
      <DocReaderClient />

      <article>
        <Reveal>
          <div className="mb-12">
            <Link
              href="/docs"
              className="inline-flex items-center gap-2 font-mono text-[10px] text-[#b8b2aa] uppercase tracking-[0.1em] no-underline hover:text-[#1c1916] transition-colors mb-12"
            >
              <ArrowLeft size={14} /> Back to writing
            </Link>

            <div className="flex flex-wrap gap-2 mb-8">
              <Tag tone="neutral" size="sm">
                <Hash size={10} className="inline mr-1" />
                {doc.type}
              </Tag>
              {doc.tag && (
                <Tag tone="accent" size="sm">
                  {doc.tag}
                </Tag>
              )}
              {doc.date && (
                <Tag tone="neutral" size="sm">
                  <Calendar size={10} className="inline mr-1" />
                  {doc.date}
                </Tag>
              )}
              {doc.readTime && (
                <Tag tone="neutral" size="sm">
                  <Clock size={10} className="inline mr-1" />
                  {doc.readTime}
                </Tag>
              )}
            </div>

            <h1 className="font-serif font-normal text-[#1c1916] leading-[1.05] tracking-[-0.02em] mb-8 text-[clamp(36px,5.5vw,60px)]">
              {doc.title}
            </h1>

            {doc.description && (
              <p className="font-sans text-[17px] text-[#7a7470] font-light leading-[1.6] max-w-[620px] mb-10">
                {doc.description}
              </p>
            )}

            <div className="flex items-center gap-3 py-5 border-y border-[#ede8e1]">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-[#e6ded4] shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={author.dpUrl}
                  alt={`${author.name} profile photo`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-[15px] text-[#1c1916]">{author.name}</span>
                <span className="font-mono text-[9px] text-[#b8b2aa] tracking-[0.14em] uppercase">
                  {author.role}
                </span>
              </div>
            </div>
          </div>

          {doc.coverImage && (
            <div className="w-full h-[360px] md:h-[420px] mb-14 rounded-2xl overflow-hidden border border-[#e6ded4]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={doc.coverImage} alt={doc.title} className="w-full h-full object-cover" />
            </div>
          )}
        </Reveal>

        <Reveal delay={100}>
          <div className="flex flex-col gap-8">
            <div
              className="rich-text-content font-sans text-[17px] md:text-[18px] text-[#2f2a26] font-light leading-[1.8]"
              dangerouslySetInnerHTML={{ __html: bodyHtml }}
            />

            {doc.pdfUrl && (
              <div className="mt-14 bg-white rounded-2xl border border-[#e6ded4] flex flex-col overflow-hidden">
                <div className="px-7 py-6 border-b border-[#ede8e1] flex items-center justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-[18px] md:text-[22px] text-[#1c1916] mb-1">
                      Attached document
                    </h3>
                    <p className="font-sans text-[12px] text-[#7a7470] m-0">PDF viewer</p>
                  </div>
                  <a
                    href={doc.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#f2ede5] border border-[#e6ded4] hover:bg-[#e6ded4] rounded-full font-sans text-[12px] text-[#1c1916] no-underline transition-colors whitespace-nowrap"
                  >
                    <Download size={13} /> Open external
                  </a>
                </div>
                <div className="w-full h-[calc(100vh-120px)] min-h-[500px] max-h-[1000px] bg-[#f8f9fa] relative">
                  <iframe
                    src={`${doc.pdfUrl}#view=FitH&toolbar=1`}
                    className="absolute inset-0 w-full h-full border-none"
                    title="PDF Viewer"
                  />
                </div>
              </div>
            )}
          </div>
        </Reveal>

        {(prev || next) && (
          <div className="mt-20 pt-10 border-t border-[#e6ded4] grid grid-cols-1 md:grid-cols-2 gap-4">
            {prev ? (
              <Link
                href={`/docs/${prev.id}`}
                className="group bg-white border border-[#e6ded4] rounded-2xl p-5 no-underline hover:border-[#1c1916]/40 transition-colors"
              >
                <span className="flex items-center gap-1.5 font-mono text-[9px] text-[#b8b2aa] uppercase tracking-[0.14em] mb-2">
                  <ChevronLeft size={11} /> Previous
                </span>
                <span className="font-serif text-[17px] text-[#1c1916] group-hover:text-[#c8873c] transition-colors line-clamp-2">
                  {prev.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
            {next ? (
              <Link
                href={`/docs/${next.id}`}
                className="group bg-white border border-[#e6ded4] rounded-2xl p-5 no-underline hover:border-[#1c1916]/40 transition-colors md:text-right"
              >
                <span className="flex items-center md:justify-end gap-1.5 font-mono text-[9px] text-[#b8b2aa] uppercase tracking-[0.14em] mb-2">
                  Next <ArrowRight size={11} />
                </span>
                <span className="font-serif text-[17px] text-[#1c1916] group-hover:text-[#c8873c] transition-colors line-clamp-2">
                  {next.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </div>
        )}
      </article>
    </main>
  );
}
