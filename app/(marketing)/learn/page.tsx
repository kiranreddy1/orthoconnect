import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ARTICLES } from '@/content/learn/articles';

const CARD_BGS = ['bg-soft-sage', 'bg-soft-sky', 'bg-soft-peach', 'bg-soft-lavender', 'bg-soft-rose'];
const ACCENT_TEXTS = [
  'text-awareness-green',
  'text-awareness-yellow',
  'text-awareness-orange',
  'text-awareness-red',
  'text-awareness-orange',
];

export const metadata = {
  title: 'Learn',
  description:
    'A small library of evergreen articles on pain literacy, growth-plate basics, injury aftercare protocols, and when to see a doctor. Written by Aarush Nibbaragandla.',
};

export default function LearnPage() {
  return (
    <main className="container-content min-h-screen pt-32 pb-section">
      <div className="max-w-3xl">
        <p className="text-awareness-orange text-sm font-medium uppercase tracking-widest">Learn</p>
        <h1 className="font-display text-display-lg text-fg-primary mt-4">
          A small library on pain literacy.
        </h1>
        <p className="text-fg-secondary mt-6 text-lg leading-relaxed">
          Short, evergreen articles meant to help young athletes (and the adults around them) make
          better-informed decisions about pain. Written and curated by Aarush Nibbaragandla.
        </p>
      </div>

      <div className="mt-section grid gap-6 md:grid-cols-2">
        {ARTICLES.map((a, i) => {
          const bg = CARD_BGS[i % CARD_BGS.length];
          const accent = ACCENT_TEXTS[i % ACCENT_TEXTS.length];
          return (
            <Link
              key={a.slug}
              href={`/learn/${a.slug}`}
              className={`group ${bg} ring-subtle rounded-card p-8 transition-transform hover:-translate-y-1`}
            >
              <p className={`${accent} font-mono text-xs uppercase tracking-widest`}>{a.estimatedReadingTime}</p>
              <h2 className="font-display text-fg-primary mt-3 text-2xl">{a.title}</h2>
              <p className="text-fg-primary/75 mt-4 text-base leading-relaxed">{a.summary}</p>
              <span className="text-fg-primary mt-6 inline-flex items-center gap-2 text-sm">
                Read
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
              </span>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
