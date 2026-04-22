'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

type Variant = 'primary' | 'ghost' | 'soft' | 'dark';
type Size = 'sm' | 'md' | 'lg';

type CommonProps = {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  icon?: React.ReactNode;
  trailingIcon?: React.ReactNode | false;
  className?: string;
};

type LinkBtnProps = CommonProps & {
  href: string;
  external?: boolean;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  type?: never;
};

type ButtonBtnProps = CommonProps & {
  href?: never;
  external?: never;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
};

type Props = LinkBtnProps | ButtonBtnProps;

const base =
  'inline-flex items-center justify-center gap-2 font-mono uppercase tracking-[0.14em] rounded-[4px] transition-all duration-200 whitespace-nowrap select-none';

const sizes: Record<Size, string> = {
  sm: 'text-[9px] px-3.5 py-2',
  md: 'text-[10px] px-5 py-3',
  lg: 'text-[11px] px-6 py-3.5',
};

const variants: Record<Variant, string> = {
  primary:
    'bg-[#1c1916] text-[#f8f4ef] hover:bg-[#2a2522] hover:-translate-y-[1px] shadow-[0_2px_10px_rgba(28,25,22,0.12)] hover:shadow-[0_6px_20px_rgba(28,25,22,0.18)]',
  ghost:
    'bg-transparent text-[#1c1916] border border-[#e6ded4] hover:border-[#1c1916]/50 hover:bg-[#1c1916]/[0.03]',
  soft:
    'bg-[#f2ede5] text-[#1c1916] border border-[#ede8e1] hover:bg-[#e6ded4]',
  dark:
    'bg-[#CF8610] text-white hover:bg-[#B07610] hover:-translate-y-[1px] shadow-[0_4px_14px_rgba(207,134,16,0.3)] hover:shadow-[0_6px_20px_rgba(207,134,16,0.45)]',
};

export default function Button(props: Props) {
  const {
    children,
    variant = 'primary',
    size = 'md',
    icon,
    trailingIcon,
    className = '',
  } = props;

  const cls = `${base} ${sizes[size]} ${variants[variant]} ${className}`;

  const trailing =
    trailingIcon === false
      ? null
      : trailingIcon ?? <ArrowUpRight size={size === 'sm' ? 10 : size === 'lg' ? 13 : 11} />;

  const content = (
    <>
      {icon}
      <span>{children}</span>
      {trailing}
    </>
  );

  if ('href' in props && props.href) {
    const { href, external, onClick } = props;
    const isExternal = external ?? /^https?:|^mailto:|^tel:/.test(href);
    if (isExternal) {
      return (
        <a
          href={href}
          className={cls}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClick}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={cls} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <button type={props.type ?? 'button'} onClick={props.onClick} className={cls}>
      {content}
    </button>
  );
}
