import { cn } from '@/lib/utils';

export function LogoBadge({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" role="img" aria-label="OrthoConnect mark" className={className}>
      <rect x={0} y={0} width={100} height={100} rx={20} fill="#0F4C5C" />
      <circle
        cx={50}
        cy={50}
        r={38}
        fill="none"
        stroke="#2A6F7E"
        strokeWidth={1.2}
        strokeDasharray="2 3.5"
        opacity={0.6}
      />
      <g transform="translate(-15, -15) scale(0.56)" color="#FBF7F2">
        <circle cx={90} cy={48} r={11} fill="currentColor" />
        <path
          d="M 90 60 Q 88 78 84 100 L 78 130"
          stroke="currentColor"
          strokeWidth={7}
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 86 78 Q 100 86 108 100"
          stroke="currentColor"
          strokeWidth={6}
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 86 78 Q 72 84 64 96"
          stroke="currentColor"
          strokeWidth={6}
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 78 130 Q 96 130 110 122"
          stroke="currentColor"
          strokeWidth={7}
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 78 130 Q 70 144 58 152"
          stroke="currentColor"
          strokeWidth={7}
          strokeLinecap="round"
          fill="none"
        />
      </g>
      <circle cx={76} cy={80} r={8} fill="none" stroke="#F4A261" strokeWidth={1.4} opacity={0.5} />
      <circle cx={76} cy={80} r={4} fill="#F4A261" />
      <circle cx={76} cy={80} r={1.7} fill="#FBF7F2" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return <LogoBadge className={className} />;
}

export function LogoMark({
  className,
  size = 'md',
  showTagline = false,
}: {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}) {
  const dim = size === 'sm' ? 'h-7 w-7' : size === 'lg' ? 'h-10 w-10' : 'h-9 w-9';
  const gap = size === 'sm' ? 'gap-2.5' : 'gap-3';
  const wordSize = size === 'sm' ? 'text-base' : size === 'lg' ? 'text-2xl' : 'text-xl';
  const tagSize = size === 'lg' ? 'text-[10px]' : 'text-[9px]';
  return (
    <span className={cn('inline-flex items-center', gap, className)}>
      <LogoBadge className={dim} />
      <span className="inline-flex flex-col">
        <span className={cn('font-display leading-none tracking-tight', wordSize)}>
          <span className="text-brand-teal font-semibold">Ortho</span>
          <span className="text-brand-coral font-medium">Connect</span>
        </span>
        {showTagline ? (
          <span className={cn('text-fg-secondary mt-1.5 uppercase tracking-[0.2em]', tagSize)}>
            Your pain has a pattern
          </span>
        ) : null}
      </span>
    </span>
  );
}
