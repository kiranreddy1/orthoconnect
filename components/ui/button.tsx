import * as React from 'react';
import Link from 'next/link';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-pill font-medium transition-colors duration-300 ease-oura focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-accent text-bg-primary hover:bg-accent/90',
        secondary: 'bg-bg-elevated text-fg-primary ring-subtle hover:bg-bg-secondary',
        ghost: 'text-fg-primary hover:text-accent',
      },
      size: {
        md: 'h-12 px-6 text-base',
        lg: 'h-[60px] px-8 text-lg',
      },
    },
    defaultVariants: { variant: 'primary', size: 'lg' },
  },
);

interface BaseProps extends VariantProps<typeof buttonVariants> {
  className?: string;
  children: React.ReactNode;
}

interface ButtonAsButton extends BaseProps, Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'className'> {
  href?: never;
}

interface ButtonAsLink extends BaseProps {
  href: string;
}

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button(props: ButtonProps) {
  const { variant, size, className, children } = props;
  const classes = cn(buttonVariants({ variant, size }), className);

  if ('href' in props && props.href) {
    const isExternal = /^https?:\/\//i.test(props.href);
    if (isExternal) {
      return (
        <a href={props.href} target="_blank" rel="noopener noreferrer" className={classes}>
          {children}
        </a>
      );
    }
    return (
      <Link href={props.href} className={classes}>
        {children}
      </Link>
    );
  }

  const { href: _href, ...rest } = props as ButtonAsButton;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
