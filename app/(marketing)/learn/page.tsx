import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ARTICLES } from '@/content/learn/articles';

export const metadata = {
  title: 'Learn',
  description:
    'A small library of evergreen articles on pain literacy, growth-plate basics, injury aftercare protocols, and when to see a doctor. Written by Aarush Nibbaragandla.',
};

export default function LearnPage() {
  return (
    <main className="container-content min-h-screen pt-32 pb-section">
      <div className="max-w-3xl">
        <p className="text-fg-secondary text-sm uppercase tracking-widest">Learn</p>
        <h1 className="font-display text-display-lg text-fg-primary mt-4">
          A small library on pain literacy.
        </h1>
        <p className="text-fg-secondary mt-6 text-lg leading-relaxed">
          Short, evergreen articles meant to help young athletes (and the adults around them) make
          better-informed decisions about pain. Written and curated by Aarush Nibbaragandla.
        </p>
      </div>

      <div className="mt-section grid gap-6 md:grid-cols-2">
        {ARTICLES.map((a) => (
          <Link
            key={a.slug}
            href={`/learn/${a.slug}`}
            className="group bg-bg-secondary ring-subtle hover:bg-bg-elevated rounded-card p-8 transition-colors"
          >
            <p className="text-fg-secondary font-mono text-xs">{a.estimatedReadingTime}</p>
            <h2 className="font-display text-fg-primary mt-3 text-2xl">{a.title}</h2>
            <p className="text-fg-secondary mt-4 text-base leading-relaxed">{a.summary}</p>
            <span className="text-fg-primary mt-6 inline-flex items-center gap-2 text-sm">
              Read
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}
