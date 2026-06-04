import type { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const PL_BETA_HREF = '/paperloop/download';
export const PL_DEMO_HREF = '#demo';

export const PL_CTA_PRIMARY = 'Join Android Closed Beta';
export const PL_CTA_SECONDARY = 'Watch Demo';

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F0A535] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1825]';

const btnBase =
  'inline-flex items-center justify-center gap-2 rounded-[6px] font-sans font-medium no-underline transition-colors';

export function PLButtonPrimary({
  className = '',
  size = 'md',
}: {
  className?: string;
  size?: 'md' | 'lg' | 'sm';
}) {
  const sizes =
    size === 'lg'
      ? 'min-h-[44px] px-7 py-3.5 text-[15px] md:text-[15px]'
      : size === 'sm'
        ? 'min-h-[44px] px-4 py-2 text-[13px]'
        : 'min-h-[44px] md:min-h-[40px] px-6 py-3 text-[14px] md:text-[14px]';

  return (
    <Link
      href={PL_BETA_HREF}
      className={`${btnBase} ${sizes} bg-[#CF8610] hover:bg-[#B07610] text-white shadow-[0_4px_16px_rgba(207,134,16,0.32)] hover:shadow-[0_6px_20px_rgba(207,134,16,0.4)] ${focusRing} ${className}`}
    >
      {PL_CTA_PRIMARY}
      <ArrowRight size={15} aria-hidden />
    </Link>
  );
}

export function PLButtonSecondary({
  className = '',
  onLight = false,
}: {
  className?: string;
  onLight?: boolean;
}) {
  const lightStyles = onLight
    ? 'border-[#0B1825]/20 hover:border-[#0B1825]/35 bg-white hover:bg-[#F6F2EB] text-[#0B1825]/85 hover:text-[#0B1825] focus-visible:ring-offset-[#F6F2EB]'
    : 'border-white/20 hover:border-white/35 bg-white/[0.03] hover:bg-white/[0.06] text-[#EDE8DB]/90 hover:text-[#EDE8DB]';

  return (
    <a
      href={PL_DEMO_HREF}
      className={`${btnBase} min-h-[44px] md:min-h-[40px] px-6 py-3 text-[14px] md:text-[14px] border ${lightStyles} ${focusRing} ${className}`}
    >
      {PL_CTA_SECONDARY}
    </a>
  );
}

export function PLContainer({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`max-w-[1180px] mx-auto w-full px-[clamp(16px,5vw,48px)] ${className}`}>{children}</div>
  );
}

export const PL_SECTION_PY = 'py-14 sm:py-20 md:py-24 lg:py-28';
