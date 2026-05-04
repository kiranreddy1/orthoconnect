import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Disclaimer } from '@/components/disclaimer';
import { Footer } from '@/components/footer';
import { SiteHeader } from '@/components/site-header';
import { Button } from '@/components/ui/button';
import { loadReport } from '@/lib/report-store';
import { getCitations } from '@/lib/logic-engine';
import { cn } from '@/lib/utils';

const LEVEL_HERO_BG = {
  green: 'bg-awareness-green',
  yellow: 'bg-awareness-yellow',
  orange: 'bg-awareness-orange',
  red: 'bg-awareness-red',
};

const LEVEL_SOFT_BG = {
  green: 'bg-soft-sage',
  yellow: 'bg-soft-peach',
  orange: 'bg-soft-peach',
  red: 'bg-soft-rose',
};

const LEVEL_TEXT = {
  green: 'text-awareness-green',
  yellow: 'text-awareness-yellow',
  orange: 'text-awareness-orange',
  red: 'text-awareness-red',
};

const LEVEL_HEADLINE = {
  green: 'Green Awareness',
  yellow: 'Yellow Awareness',
  orange: 'Orange Awareness',
  red: 'Red Awareness',
};

const LEVEL_BLURB = {
  green: 'Patterns look mild. Most athletes can self-manage with rest and monitoring.',
  yellow: 'Patterns warrant attention. Reduce load and watch for progression.',
  orange: 'Patterns suggest professional evaluation is recommended within the next 1–2 weeks.',
  red: 'Patterns suggest you should seek professional evaluation soon.',
};

export const dynamic = 'force-dynamic';

export default async function ReportPage({ params }: { params: { id: string } }) {
  const stored = await loadReport(params.id);
  if (!stored) notFound();

  const { report } = stored;
  const level = report.awarenessLevel;
  const citations = getCitations(report.patterns.flatMap((p) => p.citationIds));

  return (
    <>
      <SiteHeader />
      <main className="container-content min-h-screen pt-32">
        <div className="bg-bg-secondary ring-subtle rounded-card p-6 text-sm">
          <Disclaimer />
        </div>

        <section className={cn('mt-section text-bg-primary relative overflow-hidden rounded-card p-10 md:p-16', LEVEL_HERO_BG[level])}>
          <p className="font-mono text-sm uppercase tracking-widest opacity-80">Awareness</p>
          <h1 className="font-display mt-3 text-display-lg">{LEVEL_HEADLINE[level]}</h1>
          <p className="mt-6 max-w-2xl text-xl opacity-95">{LEVEL_BLURB[level]}</p>
          <div className="mt-10 flex items-center gap-2">
            {(['green', 'yellow', 'orange', 'red'] as const).map((l) => (
              <span
                key={l}
                className={cn(
                  'inline-block h-2 w-12 rounded-full transition-opacity',
                  l === level ? 'bg-bg-primary' : 'bg-bg-primary/30',
                )}
              />
            ))}
          </div>
        </section>

        {report.patterns.length > 0 ? (
          <section className="mt-section">
            <p className={cn('text-sm font-medium uppercase tracking-widest', LEVEL_TEXT[level])}>
              Common patterns athletes describe
            </p>
            <div className="mt-8 space-y-4">
              {report.patterns.map((p) => (
                <div key={p.id} className={cn('ring-subtle rounded-card p-6', LEVEL_SOFT_BG[level])}>
                  <h2 className="font-display text-fg-primary text-2xl">{p.title}</h2>
                  <p className="text-fg-primary/80 mt-3 text-base leading-relaxed">{p.description}</p>
                  {p.citationIds.length > 0 ? (
                    <p className="text-fg-primary/60 mt-4 text-xs">
                      References: {p.citationIds.join(', ')}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {report.contributingFactors.length > 0 ? (
          <section className="mt-section">
            <p className="text-awareness-orange text-sm font-medium uppercase tracking-widest">
              What might be contributing
            </p>
            <ul className="mt-8 space-y-3">
              {report.contributingFactors.map((c, i) => (
                <li key={i} className="text-fg-primary text-base leading-relaxed">
                  • {c}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section className="mt-section">
          <p className="text-awareness-green text-sm font-medium uppercase tracking-widest">Suggested next steps</p>
          <ul className="mt-8 space-y-3">
            {report.nextSteps.map((s, i) => (
              <li key={i} className="text-fg-primary text-base leading-relaxed">
                • {s}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-section">
          <p className="text-awareness-red text-sm font-medium uppercase tracking-widest">
            When to see a professional
          </p>
          <ul className="mt-8 space-y-3">
            {report.whenToSeeAProfessional.map((s, i) => (
              <li key={i} className="text-fg-primary text-base leading-relaxed">
                • {s}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-section grid gap-4 sm:grid-cols-2">
          <Button href="https://www.amssm.org/find-a-doctor" variant="primary">
            Find a sports medicine doctor (AMSSM)
          </Button>
          <Button href="/" variant="secondary">
            Back to home
          </Button>
        </section>

        {citations.length > 0 ? (
          <section className="mt-section">
            <p className="text-fg-secondary text-sm font-medium uppercase tracking-widest">References</p>
            <ul className="text-fg-secondary mt-6 space-y-3 text-sm">
              {citations.map((c) => (
                <li key={c.id}>
                  {c.authors} ({c.year}). {c.title}. <em>{c.journal}</em>
                  {c.doi ? ` doi:${c.doi}` : ''}
                  {!c.verified ? <span className="ml-2 italic opacity-70">(citation pending verification)</span> : null}
                </li>
              ))}
            </ul>
            <p className="text-fg-secondary mt-6 max-w-2xl text-xs">
              Patterns and references are educational. They are not a diagnosis. Only a licensed
              healthcare provider can diagnose an injury.
            </p>
          </section>
        ) : null}

        <p className="text-fg-secondary mt-section text-xs">
          Report ID: <Link href={`/report/${stored.id}`} className="font-mono">{stored.id}</Link>
        </p>
      </main>
      <Footer />
    </>
  );
}
