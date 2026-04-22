import type { Metadata } from 'next';
import PLNav from './_components/PLNav';
import HeroSection from './_components/HeroSection';
import PainSection from './_components/PainSection';
import HowItWorksSection from './_components/HowItWorksSection';
import FeaturesSection from './_components/FeaturesSection';
import FairnessSection from './_components/FairnessSection';
import PricingSection from './_components/PricingSection';
import RoadmapSection from './_components/RoadmapSection';
import FinalCTASection from './_components/FinalCTASection';
import PLFooter from './_components/PLFooter';

export const metadata: Metadata = {
  title: 'PaperLoop — Handwritten to print-ready in seconds',
  description:
    'PaperLoop scans a handwritten exam draft and returns a formatted, print-ready PDF. Powered by Gemini Vision. Live on the Play Store.',
  openGraph: {
    title: 'PaperLoop — Handwritten to print-ready in seconds',
    description:
      'A Gemini-powered scanner for educators. Scan a draft, get a print-ready PDF. No retyping.',
    type: 'website',
    images: ['/og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PaperLoop — Handwritten to print-ready in seconds',
    description: 'A Gemini-powered scanner for educators. Scan a draft, get a print-ready PDF.',
    images: ['/og.png'],
  },
};

export default function PaperLoopLanding() {
  return (
    <div
      data-theme="dark"
      className="paperloop min-h-screen bg-[#0B1825] text-[#EDE8DB] antialiased selection:bg-[#CF8610] selection:text-white"
    >
      <PLNav />
      <HeroSection />
      <PainSection />
      <HowItWorksSection />
      <FeaturesSection />
      <FairnessSection />
      <PricingSection />
      <RoadmapSection />
      <FinalCTASection />
      <PLFooter />
    </div>
  );
}
