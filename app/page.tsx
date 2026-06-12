import { Reveal, SectionHeading } from '@/lib/design';
import HashScroll from './_components/HashScroll';
import HeroSection from './_components/home/HeroSection';
import ProofStrip from './_components/home/ProofStrip';
import FeaturedWorkCard from './_components/home/FeaturedWorkCard';
import SideQuests from './_components/home/SideQuests';
import ProductNotes from './_components/home/ProductNotes';
import AboutPreview from './_components/home/AboutPreview';
import ContactSection from './_components/home/ContactSection';

export default function Home() {
  return (
    <div className="bg-[#F7F3EA] min-h-screen text-[#161616]">
      <HashScroll />

      <HeroSection />

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
      <ProductNotes />
      <AboutPreview />
      <ContactSection />
    </div>
  );
}
