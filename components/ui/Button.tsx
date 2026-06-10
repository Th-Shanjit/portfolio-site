'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

type Variant = 'primary' | 'ghost' | 'soft' | 'dark' | 'accent' | 'ghostLight';
type Size = 'sm' | 'md' | 'lg';

type CommonProps = {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  icon?: React.ReactNode;
  trailingIcon?: React.ReactNode | false;
  className?: string;
  disabled?: boolean;
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
  'group/btn inline-flex items-center justify-center gap-2 font-sans font-medium rounded-lg transition-[transform,background-color,border-color,box-shadow,color] duration-200 whitespace-nowrap select-none disabled:opacity-50 disabled:pointer-events-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6B35] motion-safe:hover:-translate-y-px active:translate-y-0';

const sizes: Record<Size, string> = {
  sm: 'text-[13px] px-3.5 py-2',
  md: 'text-[14px] px-5 py-2.5',
  lg: 'text-[15px] px-6 py-3',
};

const variants: Record<Variant, string> = {
  primary:
    'bg-[#161616] text-[#F7F3EA] hover:bg-[#2a2826] shadow-[0_1px_0_rgba(22,22,22,0.08)]',
  ghost:
    'bg-transparent text-[#161616] border border-[rgba(22,22,22,0.10)] hover:border-[rgba(22,22,22,0.22)] hover:bg-[rgba(22,22,22,0.03)]',
  soft:
    'bg-[#F0EBE0] text-[#161616] border border-[rgba(22,22,22,0.06)] hover:bg-[#E8E2D6]',
  dark:
    'bg-[#1D1915] text-[#F7F3EA] hover:bg-[#2a2520]',
  accent:
    'bg-[#FF6B35] text-white hover:bg-[#E85A28]',
  ghostLight:
    'bg-transparent text-white/85 border border-[rgba(255,255,255,0.12)] hover:border-[rgba(255,255,255,0.25)] hover:bg-[rgba(255,255,255,0.04)] hover:text-white',
};

function ArrowIcon({ size }: { size: Size }) {
  return (
    <ArrowUpRight
      size={size === 'sm' ? 14 : size === 'lg' ? 16 : 15}
      className="transition-transform duration-200 motion-safe:group-hover/btn:translate-x-1 motion-safe:group-hover/btn:-translate-y-1"
    />
  );
}

export default function Button(props: Props) {
  const {
    children,
    variant = 'primary',
    size = 'md',
    icon,
    trailingIcon,
    className = '',
    disabled = false,
  } = props;

  const cls = `${base} ${sizes[size]} ${variants[variant]} ${className}`;

  const trailing =
    trailingIcon === false ? null : trailingIcon ?? <ArrowIcon size={size} />;

  const content = (
    <>
      {icon}
      <span>{children}</span>
      {trailing}
    </>
  );

  if ('href' in props && typeof props.href === 'string') {
    const { href, external, onClick } = props;
    const isExternal = external ?? /^https?:|^mailto:|^tel:/.test(href);

    if (isExternal) {
      return (
        <a
          href={href}
          className={cls}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
        >
          {content}
        </a>
      );
    }
    return (
      <Link
        href={href}
        className={cls}
        onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
      >
        {content}
      </Link>
    );
  }

  const btnProps = props as ButtonBtnProps;
  return (
    <button
      type={btnProps.type ?? 'button'}
      onClick={btnProps.onClick}
      disabled={disabled}
      className={cls}
    >
      {content}
    </button>
  );
}
