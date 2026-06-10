import { Reveal, SectionHeading } from '@/lib/design';
import HashScroll from './_components/HashScroll';
import HeroSection from './_components/home/HeroSection';
import ProofStrip from './_components/home/ProofStrip';
import FeaturedWorkCard from './_components/home/FeaturedWorkCard';
import SideQuests from './_components/home/SideQuests';
import ProductNotes from './_components/home/ProductNotes';
import AboutPreview from './_components/home/AboutPreview';
import ContactSection from './_components/home/ContactSection';
import { getPortfolio, type Doc } from '@/lib/getPortfolio';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const portfolio = await getPortfolio();

  const name = portfolio.site?.name || 'Shanjit Thokchom';
  const dpUrl = portfolio.site?.dpUrl || '/profile.jpg';
  const linkedinUrl =
    portfolio.site?.linkedinUrl ||
    'https://www.linkedin.com/in/shanjit-thokchom-7101202b6';
  const email = portfolio.site?.email || 'th.shanjit@gmail.com';
  const resumeUrl = portfolio.site?.resumeUrl || '/resume.pdf';

  const hero = (portfolio.hero || {}) as Record<string, string | undefined>;
  const role =
    hero.description ||
    hero.eyebrow ||
    'Product Manager focused on Agentic AI, workflow automation, and practical AI tools.';
  const headline = hero.headline || 'Early in my career. Already shipping.';
  const subhead =
    hero.subhead ||
    'I build scrappy products, test them with real users, and turn messy workflows into usable systems.';
  const availability = hero.tag || 'Available for product roles';

  const about = (portfolio.about || {}) as Record<string, string | undefined>;
  const location = about.location || 'Shillong, India';

  const contactH =
    portfolio.contact?.heading ||
    'Hiring for product roles, building AI workflow tools, or want to exchange product notes?';
  const contactSub =
    portfolio.contact?.subheading ||
    'My inbox is open for product conversations, collaborations, and thoughtful notes.';

  const productNotes = (portfolio.docs || [])
    .filter((d) => d.published !== false && d.type !== 'legal')
    .slice(0, 3) as Doc[];

  return (
    <div className="bg-[#F7F3EA] min-h-screen text-[#161616]">
      <HashScroll />

      <HeroSection
        name={name}
        role={role}
        headline={headline}
        subhead={subhead}
        availability={availability}
        location={location}
        linkedinUrl={linkedinUrl}
        resumeUrl={resumeUrl}
      />

      <ProofStrip />

      <section
        id="work"
        className="max-w-[1080px] mx-auto px-[clamp(20px,5vw,64px)] pb-24 md:pb-32 scroll-mt-28"
      >
        <Reveal>
          <SectionHeading number="01" title="Featured Work" />
        </Reveal>
        <Reveal delay={80}>
          <FeaturedWorkCard />
        </Reveal>
      </section>

      <SideQuests />
      <ProductNotes docs={productNotes} />
      <AboutPreview name={name} dpUrl={dpUrl} resumeUrl={resumeUrl} />

      <ContactSection
        name={name}
        email={email}
        linkedinUrl={linkedinUrl}
        resumeUrl={resumeUrl}
        heading={contactH}
        subheading={contactSub}
      />
    </div>
  );
}
