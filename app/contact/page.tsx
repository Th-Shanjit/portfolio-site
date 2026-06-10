import type { Metadata } from 'next';
import RedirectToSection from '../_components/RedirectToSection';

export const metadata: Metadata = {
  title: 'Contact',
  robots: { index: false, follow: true },
};

export default function ContactPage() {
  return <RedirectToSection section="contact" />;
}
