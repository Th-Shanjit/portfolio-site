import type { Metadata } from 'next';
import PLNav from './_components/PLNav';
import HeroSection from './_components/HeroSection';
import PainSection from './_components/PainSection';
import RealWorkflowSection from './_components/RealWorkflowSection';
import TestingPivotsSection from './_components/TestingPivotsSection';
import HowItWorksSection from './_components/HowItWorksSection';
import FeaturesSection from './_components/FeaturesSection';
import FairnessSection from './_components/FairnessSection';
import PricingSection from './_components/PricingSection';
import RoadmapSection from './_components/RoadmapSection';
import FinalCTASection from './_components/FinalCTASection';
import PLFooter from './_components/PLFooter';

export const metadata: Metadata = {
  title: 'PaperLoop — Handwritten drafts to PDF-ready papers',
  description:
    'PaperLoop helps teachers turn handwritten question-paper drafts into editable, PDF-ready papers using AI. Android closed beta on Google Play.',
  openGraph: {
    title: 'PaperLoop — Handwritten drafts to PDF-ready papers',
    description:
      'AI-assisted workflow for educators: scan a draft, review extraction, edit, export. Built and tested with real teacher papers.',
    type: 'website',
    images: ['/og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PaperLoop — Handwritten drafts to PDF-ready papers',
    description:
      'Turn handwritten question-paper drafts into editable, PDF-ready papers. Closed beta on Google Play.',
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
      <RealWorkflowSection />
      <TestingPivotsSection />
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
