'use client';

import Button from '@/components/ui/Button';
import { FileText } from 'lucide-react';
import { track } from '@/lib/track';

type Props = {
  href: string;
  label?: string;
  source?: string;
};

export default function ResumeButton({ href, label = 'Resume', source = 'home_hero' }: Props) {
  return (
    <Button
      href={href}
      external
      variant="ghost"
      size="md"
      icon={
        <FileText
          size={15}
          className="motion-safe:group-hover/btn:translate-y-px transition-transform duration-200"
        />
      }
      trailingIcon={false}
      onClick={() => track('resume_click', { source })}
    >
      {label}
    </Button>
  );
}
