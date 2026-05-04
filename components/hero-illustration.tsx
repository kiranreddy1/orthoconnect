export function HeroIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 480 480"
      role="img"
      aria-label="Abstract illustration: a human silhouette inside a warm gradient orb, with four awareness-level dots tracing a path around it."
      className={className}
    >
      <defs>
        <radialGradient id="orb" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F5DCC4" />
          <stop offset="55%" stopColor="#EBC9A8" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#F4ECDC" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="figure-stroke" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3A332B" />
          <stop offset="100%" stopColor="#5C4F42" />
        </linearGradient>
      </defs>

      {/* Soft background orb */}
      <circle cx={240} cy={240} r={210} fill="url(#orb)" />

      {/* Inner ring */}
      <circle
        cx={240}
        cy={240}
        r={150}
        fill="none"
        stroke="rgba(58, 51, 43, 0.08)"
        strokeWidth={1}
      />

      {/* Awareness color dots, tracing a path around the orb */}
      <circle cx={120} cy={240} r={12} fill="#5C8B62" />
      <circle cx={210} cy={130} r={12} fill="#B89339" />
      <circle cx={340} cy={170} r={12} fill="#B86F35" />
      <circle cx={380} cy={310} r={12} fill="#B65555" />

      {/* Faint connecting curve */}
      <path
        d="M 132 240 Q 165 165 222 130 Q 285 105 340 170 Q 395 235 380 310"
        fill="none"
        stroke="rgba(58, 51, 43, 0.18)"
        strokeWidth={1}
        strokeDasharray="2 5"
      />

      {/* Stylized human figure (head + torso + simple limbs) */}
      <g stroke="url(#figure-stroke)" strokeWidth={2.5} strokeLinecap="round" fill="none">
        {/* head */}
        <circle cx={240} cy={180} r={22} fill="#F5DCC4" />
        {/* torso (curved) */}
        <path d="M 240 204 Q 235 250 240 290" />
        {/* left arm */}
        <path d="M 240 220 Q 218 240 200 270" />
        {/* right arm (raised, motion) */}
        <path d="M 240 220 Q 268 220 290 200" />
        {/* left leg */}
        <path d="M 240 290 Q 230 320 222 350" />
        {/* right leg (mid-stride, forward) */}
        <path d="M 240 290 Q 256 320 270 348" />
      </g>

      {/* Motion sparkles */}
      <g fill="#3A332B" opacity={0.4}>
        <circle cx={180} cy={310} r={2} />
        <circle cx={170} cy={295} r={1.5} />
        <circle cx={300} cy={180} r={2} />
        <circle cx={320} cy={195} r={1.5} />
      </g>
    </svg>
  );
}

export function DecorativeOrb({
  className,
  color = 'peach',
}: {
  className?: string;
  color?: 'peach' | 'sage' | 'sky' | 'lavender' | 'rose';
}) {
  const fills: Record<string, string> = {
    peach: '#F5DCC4',
    sage: '#D6E4D9',
    sky: '#D4E2EC',
    lavender: '#E0D8E8',
    rose: '#F0D9D9',
  };
  const id = `orb-${color}`;
  return (
    <svg
      viewBox="0 0 400 400"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <radialGradient id={id} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={fills[color]} stopOpacity="0.8" />
          <stop offset="100%" stopColor={fills[color]} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx={200} cy={200} r={200} fill={`url(#${id})`} />
    </svg>
  );
}
