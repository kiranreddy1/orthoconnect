import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      role="img"
      aria-label="OrthoConnect logo"
      className={className}
    >
      <path
        d="M 22 6 L 11 16"
        stroke="currentColor"
        strokeWidth={3.5}
        strokeLinecap="round"
      />
      <path
        d="M 11 16 L 22 26"
        stroke="#B86F35"
        strokeWidth={3.5}
        strokeLinecap="round"
      />
    </svg>
  );
}

export function LogoMark({
  className,
  size = 'md',
}: {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}) {
  const dim = size === 'sm' ? 'h-4 w-4' : size === 'lg' ? 'h-7 w-7' : 'h-5 w-5';
  const gap = size === 'sm' ? 'gap-2' : 'gap-2.5';
  const text = size === 'sm' ? 'text-base' : size === 'lg' ? 'text-2xl' : 'text-lg';
  return (
    <span className={cn('inline-flex items-center', gap, className)}>
      <Logo className={dim} />
      <span className={cn('font-display tracking-tight', text)}>OrthoConnect</span>
    </span>
  );
}
