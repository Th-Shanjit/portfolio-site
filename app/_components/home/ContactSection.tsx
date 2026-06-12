'use client';

import { useCallback, useState } from 'react';
import { Mail } from 'lucide-react';
import { FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';
import { Reveal, SectionHeading } from '@/lib/design';
import Button from '@/components/ui/Button';
import ResumeButton from '../ResumeButton';
import { CONTACT_LINKS, HERO_CONTENT } from '@/data/portfolio-static';

function parseLink(value: string): string {
  const match = value.match(/\[([^\]]+)\]\(([^)]+)\)/);
  return match ? match[2] : value;
}

const emailAddress = CONTACT_LINKS.email.replace(/^mailto:/i, '');
const linkedinUrl = parseLink(CONTACT_LINKS.linkedin);
const githubUrl = parseLink(CONTACT_LINKS.github);
const twitterUrl = parseLink(CONTACT_LINKS.twitter);

export default function ContactSection() {
  const [toast, setToast] = useState(false);

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(emailAddress);
      setToast(true);
      window.setTimeout(() => setToast(false), 2200);
    } catch {
      window.location.href = CONTACT_LINKS.email;
    }
  }, []);

  return (
    <section
      id="contact"
      className="max-w-[1080px] mx-auto px-[clamp(20px,5vw,64px)] pb-24 md:pb-32 scroll-mt-28"
    >
      <Reveal>
        <SectionHeading number="05" title="Let's talk" />
      </Reveal>

      <Reveal delay={60}>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-12 pb-12 border-b border-[rgba(22,22,22,0.10)]">
          <div className="max-w-[560px]">
            <p className="font-[family-name:var(--font-heading)] text-[#161616] font-medium tracking-[-0.02em] leading-[1.25] m-0 text-[clamp(24px,3.5vw,38px)]">
              Open to product conversations, collaborations, and thoughtful notes.
            </p>
          </div>

          <div className="relative shrink-0">
            <div className="flex flex-wrap items-center gap-3">
              <Button
                variant="accent"
                size="md"
                icon={<Mail size={15} />}
                trailingIcon={false}
                onClick={copyEmail}
              >
                Email me
              </Button>
              <Button
                href={linkedinUrl}
                external
                variant="ghost"
                size="md"
                icon={<FiLinkedin size={15} />}
                trailingIcon={false}
              >
                LinkedIn
              </Button>
              <Button
                href={githubUrl}
                external
                variant="ghost"
                size="md"
                icon={<FiGithub size={15} />}
                trailingIcon={false}
              >
                GitHub
              </Button>
              <Button
                href={twitterUrl}
                external
                variant="ghost"
                size="md"
                icon={<FiTwitter size={15} />}
                trailingIcon={false}
              >
                Twitter
              </Button>
              <ResumeButton href={HERO_CONTENT.resumeUrl} label="Resume" source="home_contact" />
            </div>

            {toast && (
              <p
                role="status"
                aria-live="polite"
                className="absolute top-full left-0 mt-2 font-sans text-[13px] text-[#6F6A61]"
              >
                Email copied to clipboard.
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-7">
          <span className="font-sans text-[13px] text-[#9A9489]">
            {HERO_CONTENT.title} © {new Date().getFullYear()}
          </span>
          <span className="font-mono text-[11px] text-[#9A9489]">
            Warm editorial · product accents
          </span>
        </div>
      </Reveal>
    </section>
  );
}
