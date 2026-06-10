import type { Metadata } from 'next';
import RedirectToSection from '../_components/RedirectToSection';

export const metadata: Metadata = {
  title: 'Work',
  robots: { index: false, follow: true },
};

export default function WorkPage() {
  return <RedirectToSection section="work" />;
}
