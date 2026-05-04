import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: 'var(--bg-primary)',
          secondary: 'var(--bg-secondary)',
          elevated: 'var(--bg-elevated)',
        },
        fg: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
        },
        accent: {
          DEFAULT: 'var(--accent-primary)',
        },
        brand: {
          teal: 'var(--brand-teal)',
          'teal-soft': 'var(--brand-teal-soft)',
          coral: 'var(--brand-coral)',
        },
        awareness: {
          green: 'var(--awareness-green)',
          yellow: 'var(--awareness-yellow)',
          orange: 'var(--awareness-orange)',
          red: 'var(--awareness-red)',
        },
        soft: {
          sage: '#D6E4D9',
          peach: '#F5DCC4',
          sky: '#D4E2EC',
          lavender: '#E0D8E8',
          rose: '#F0D9D9',
          cream: '#F4ECDC',
        },
        ring: {
          subtle: 'rgba(0, 0, 0, 0.06)',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'display-2xl': ['96px', { lineHeight: '1.05', letterSpacing: '-0.02em', fontWeight: '500' }],
        'display-xl': ['80px', { lineHeight: '1.05', letterSpacing: '-0.02em', fontWeight: '500' }],
        'display-lg': ['64px', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '500' }],
        'display-md': ['48px', { lineHeight: '1.15', letterSpacing: '-0.01em', fontWeight: '500' }],
      },
      spacing: {
        section: '120px',
        'section-lg': '160px',
      },
      maxWidth: {
        content: '1280px',
      },
      borderRadius: {
        card: '12px',
        pill: '9999px',
      },
      transitionTimingFunction: {
        oura: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
