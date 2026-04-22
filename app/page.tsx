import Link from 'next/link';
import {
  ArrowUpRight,
  Linkedin,
  Mail,
  MapPin,
} from 'lucide-react';
import { Reveal, Label } from '@/lib/design';
import Button from '@/components/ui/Button';
import Tag from '@/components/ui/Tag';
import Filmstrip from './_components/Filmstrip';
import HomeAvatar from './_components/HomeAvatar';
import ResumeButton from './_components/ResumeButton';
import { getPortfolio, type Doc } from '@/lib/getPortfolio';

export const dynamic = 'force-dynamic';

function WritingList({ docs }: { docs: Doc[] }) {
  const visible = docs.slice(0, 5);
  if (visible.length === 0) return null;
  return (
    <div className="flex flex-col divide-y divide-[#ede8e1] border-y border-[#ede8e1]">
      {visible.map((doc) => (
        <Link
          key={doc.id}
          href={doc.link || `/docs/${doc.id}`}
          target={doc.link ? '_blank' : undefined}
          className="group grid grid-cols-[1fr_auto] items-center gap-6 py-5 no-underline transition-colors"
        >
          <div className="min-w-0">
            <div className="flex items-center gap-3 mb-1.5">
              <Tag tone="neutral" size="sm">
                {doc.type}
              </Tag>
              {doc.readTime && (
                <span className="font-mono text-[9px] text-[#b8b2aa] tracking-[0.12em] uppercase">
                  {doc.readTime}
                </span>
              )}
              {doc.date && (
                <span className="font-mono text-[9px] text-[#b8b2aa] tracking-[0.12em] uppercase">
                  · {doc.date}
                </span>
              )}
            </div>
            <h3 className="font-serif text-[22px] font-medium text-[#1c1916] group-hover:text-[#c8873c] transition-colors leading-tight truncate">
              {doc.title}
            </h3>
            {doc.description && (
              <p className="font-sans text-[13px] text-[#7a7470] mt-1 line-clamp-1">
                {doc.description}
              </p>
            )}
          </div>
          <ArrowUpRight
            size={16}
            className="shrink-0 text-[#b8b2aa] group-hover:text-[#c8873c] transition-colors"
          />
        </Link>
      ))}
    </div>
  );
}

export default async function Home() {
  const portfolio = await getPortfolio();

  const name = portfolio.site?.name || 'Shanjit Thokchom';
  const dpUrl = portfolio.site?.dpUrl || '/profile.jpg';
  const linkedinUrl =
    portfolio.site?.linkedinUrl ||
    'https://www.linkedin.com/in/shanjit-thokchom-7101202b6';
  const email = portfolio.site?.email || 'hello@shanjitthokchom.xyz';
  const resumeUrl = portfolio.site?.resumeUrl || '/resume.pdf';

  const hero = (portfolio.hero || {}) as Record<string, string | undefined>;
  const eyebrow = hero.eyebrow || portfolio.site?.role || 'Product Manager · Agentic AI';
  const headline =
    hero.headline || 'I ship AI products that survive contact with real users.';
  const subhead =
    hero.subhead ||
    hero.description ||
    'Currently turning handwritten exams into print-ready PDFs with PaperLoop — a Gemini-powered scanner for educators, live on the Play Store.';
  const ctaLink = hero.link || '/paperloop';
  const ctaText = hero.linkText || 'See PaperLoop';
  const availability = hero.tag || 'Available for product roles';

  const about = (portfolio.about || {}) as Record<string, string | undefined>;
  const location = about.location || 'Shillong, India';

  const contactH = portfolio.contact?.heading || "Let's build something teachers actually use.";
  const contactSub =
    portfolio.contact?.subheading ||
    "Whether you're hiring a PM who ships, exploring agentic architectures, or want to exchange notes — my inbox is open.";

  const rawProjects = (portfolio.highlightedProjects || [])
    .map((p) => portfolio.docs?.find((d) => d.id === p.id))
    .filter((d): d is Doc => !!d && d.published !== false);

  const writing = (portfolio.docs || [])
    .filter(
      (d) =>
        d.published !== false &&
        d.type !== 'legal' &&
        !rawProjects.some((p) => p.id === d.id)
    )
    .slice(0, 5);

  return (
    <main className="bg-[#f8f4ef] min-h-screen text-[#1c1916]">

      <section className="max-w-[1040px] mx-auto px-[clamp(20px,5vw,64px)] pt-[96px] pb-20 md:pt-[120px] md:pb-28">

        <Reveal>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12 sm:mb-16">
            <div className="flex items-center gap-[9px]">
              <div className="w-[7px] h-[7px] rounded-full bg-[#4ade80] shadow-[0_0_8px_rgba(74,222,128,0.5)]" />
              <Label>{availability}</Label>
            </div>
            <div className="flex items-center gap-6 sm:gap-10">
              <div className="flex items-center gap-1.5">
                <MapPin size={10} className="text-[#b8b2aa]" />
                <Label>{location}</Label>
              </div>
              <Label>{eyebrow}</Label>
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 md:gap-12 items-start">
          <div className="flex flex-col">
            <Reveal>
              <span className="font-mono text-[10px] text-[#9b5f1b] tracking-[0.22em] uppercase mb-3">
                {eyebrow}
              </span>
            </Reveal>
            <Reveal delay={60}>
              <h1 className="font-serif font-normal text-[#1c1916] tracking-[-0.025em] leading-[0.96] m-0 text-[clamp(44px,7.5vw,88px)]">
                {headline}
              </h1>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-6 md:mt-8 font-sans font-light text-[16px] md:text-[17px] text-[#7a7470] leading-[1.7] max-w-[560px]">
                {subhead}
              </p>
            </Reveal>
            <Reveal delay={200}>
              <div className="mt-7 md:mt-9 flex flex-wrap gap-2.5">
                <Button href={ctaLink} variant="primary" size="md">
                  {ctaText}
                </Button>
                <ResumeButton href={resumeUrl} label="Resume" source="home_hero" />
                <Button
                  href={linkedinUrl}
                  external
                  variant="ghost"
                  size="md"
                  icon={<Linkedin size={11} />}
                  trailingIcon={false}
                >
                  LinkedIn
                </Button>
              </div>
            </Reveal>
          </div>

          <Reveal delay={180}>
            <div className="flex flex-row md:flex-col items-center md:items-end gap-3 shrink-0">
              <div className="w-[86px] h-[86px] md:w-[104px] md:h-[104px] rounded-[10px] overflow-hidden border border-[#e6ded4] shadow-[0_6px_24px_rgba(28,25,22,0.10)]">
                <HomeAvatar src={dpUrl} alt={name} />
              </div>
              <div className="flex flex-col md:items-end gap-1">
                <span className="font-serif text-[16px] text-[#1c1916]">{name}</span>
                <span className="font-mono text-[9px] text-[#b8b2aa] tracking-[0.14em] uppercase">
                  {eyebrow}
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="max-w-[1040px] mx-auto px-[clamp(20px,5vw,64px)] pb-24">
        <Reveal>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Label>01</Label>
              <div className="w-10 h-px bg-[#e6ded4]" />
              <Label>Selected Work</Label>
            </div>
            <Link
              href="/docs"
              className="font-mono text-[9px] text-[#b8b2aa] hover:text-[#c8873c] transition-colors tracking-[0.14em] uppercase flex items-center gap-1.5"
            >
              All work <ArrowUpRight size={10} />
            </Link>
          </div>
        </Reveal>
        {rawProjects.length > 0 ? (
          <Filmstrip items={rawProjects} />
        ) : (
          <div className="py-16 text-center border border-dashed border-[#e6ded4] rounded-xl">
            <p className="font-mono text-[10px] text-[#b8b2aa] tracking-[0.15em] uppercase">
              No featured work yet.
            </p>
          </div>
        )}
      </section>

      {writing.length > 0 && (
        <section className="max-w-[1040px] mx-auto px-[clamp(20px,5vw,64px)] pb-24">
          <Reveal>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <Label>02</Label>
                <div className="w-10 h-px bg-[#e6ded4]" />
                <Label>Writing</Label>
              </div>
              <Link
                href="/docs"
                className="font-mono text-[9px] text-[#b8b2aa] hover:text-[#c8873c] transition-colors tracking-[0.14em] uppercase flex items-center gap-1.5"
              >
                Browse all <ArrowUpRight size={10} />
              </Link>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <WritingList docs={writing} />
          </Reveal>
        </section>
      )}

      <section className="max-w-[1040px] mx-auto px-[clamp(20px,5vw,64px)] pb-24">
        <Reveal>
          <div className="flex items-center gap-4 mb-12">
            <Label>{writing.length > 0 ? '03' : '02'}</Label>
            <div className="w-10 h-px bg-[#e6ded4]" />
            <Label>Contact</Label>
          </div>
        </Reveal>

        <Reveal delay={60}>
          <div className="grid grid-cols-1 md:grid-cols-[1.2fr_auto] gap-10 items-start md:items-end pb-12 border-b border-[#e6ded4]">
            <div>
              <h2 className="font-serif text-[#1c1916] font-normal tracking-[-0.02em] leading-[1.04] m-0 text-[clamp(32px,5vw,56px)]">
                {contactH}
              </h2>
              <p className="mt-5 font-sans text-[14px] font-light text-[#7a7470] leading-[1.7] max-w-[440px]">
                {contactSub}
              </p>
            </div>
            <div className="flex flex-col gap-2.5 md:items-end">
              <Button
                href={`mailto:${email}`}
                external
                variant="primary"
                size="md"
                icon={<Mail size={11} />}
              >
                Email me
              </Button>
              <Button
                href={linkedinUrl}
                external
                variant="ghost"
                size="md"
                icon={<Linkedin size={11} />}
                trailingIcon={false}
              >
                LinkedIn
              </Button>
              <ResumeButton href={resumeUrl} label="Resume (PDF)" source="home_contact" />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-7">
            <span className="font-mono text-[9px] text-[#b8b2aa] tracking-[0.14em] uppercase">
              {name.toUpperCase()} © {new Date().getFullYear()}
            </span>
            <span className="font-mono text-[9px] text-[#c8bfb2] tracking-[0.08em]">
              Built with Next.js
            </span>
          </div>
        </Reveal>
      </section>

    </main>
  );
}
