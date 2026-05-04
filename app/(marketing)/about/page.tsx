import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'About',
  description:
    'OrthoConnect was created by Aarush Nibbaragandla, a 10th-grader and aspiring orthopedic surgeon. Built to help athletes recognize pain patterns earlier — before small warning signs become real injuries.',
};

const SECTIONS = [
  {
    label: 'Founder',
    bg: 'bg-soft-lavender',
    accent: 'text-awareness-orange',
    title: 'Aarush Nibbaragandla',
    sub: '10th grade · Aspiring orthopedic surgeon',
    body: [
      'OrthoConnect grew from watching my father push through small injuries — pains he ignored until they became real problems. I realized that most injuries don\'t start big; they start small, and athletes rarely know what to do with those early warning signs. OrthoConnect is built to fill that gap.',
      'The goal is pain literacy: helping young athletes recognize patterns, understand when something warrants a closer look, and have better-informed conversations with the adults around them — coaches, parents, athletic trainers, and physicians.',
    ],
  },
  {
    label: 'How it works',
    bg: 'bg-soft-sage',
    accent: 'text-awareness-green',
    title: 'A deterministic rules engine, grounded in published clinical literature.',
    body: [
      'The OrthoConnect engine is not machine learning. It is a deterministic, auditable rules engine — every rule traces back to published sports medicine research. The source code is open and the citations are listed on each report.',
      'The engine is intentionally conservative about growth-plate-aware patterns (Osgood-Schlatter, Sever\'s, Little League elbow, Salter-Harris injury risk after acute trauma) because those patterns warrant earlier evaluation in skeletally immature athletes than they would in adults.',
    ],
  },
  {
    label: 'Limitations',
    bg: 'bg-soft-peach',
    accent: 'text-awareness-orange',
    title: "What OrthoConnect can't do.",
    body: [
      'OrthoConnect cannot see you, examine you, or know your full medical history. It is not validated against clinical outcomes. The patterns it describes are educational starting points, not conclusions.',
      'The pattern library is small in v1 — about ten common youth-sports patterns. Every report explicitly says "pattern consistent with X," never "you have X," because identifying a condition is something only a licensed clinician can do.',
      'If anything in your situation worries you — severe pain, sudden swelling, the inability to bear weight, numbness, a popping sensation at the moment of injury, fever with joint pain — stop activity and seek medical attention immediately.',
    ],
  },
  {
    label: 'Privacy',
    bg: 'bg-soft-sky',
    accent: 'text-awareness-yellow',
    title: 'Built with the minimum data needed.',
    body: [
      "OrthoConnect does not require an account. Assessment data is stored against an anonymous identifier, not a name. We don't use third-party tracking pixels and we don't sell data. Assessments older than 12 months are automatically deleted.",
    ],
    extra: (
      <p className="text-lg leading-relaxed">
        The full disclaimer and privacy details live on the{' '}
        <Link href="/disclaimer" className="underline">
          disclaimer page
        </Link>
        .
      </p>
    ),
  },
];

export default function AboutPage() {
  return (
    <main className="container-content min-h-screen pt-32 pb-section">
      <div className="max-w-3xl">
        <p className="text-awareness-orange text-sm font-medium uppercase tracking-widest">About</p>
        <h1 className="font-display text-display-lg text-fg-primary mt-4">
          Most injuries don&apos;t start big. They start small.
        </h1>
      </div>

      <div className="mt-section space-y-8">
        {SECTIONS.map((s) => (
          <section key={s.label} className={`${s.bg} ring-subtle rounded-card p-10 md:p-16`}>
            <div className="max-w-3xl">
              <p className={`${s.accent} text-sm font-medium uppercase tracking-widest`}>{s.label}</p>
              {s.sub ? <p className="text-fg-secondary mt-2 text-sm">{s.sub}</p> : null}
              <h2 className="font-display text-fg-primary mt-4 text-3xl">{s.title}</h2>
              <div className="mt-8 space-y-6 text-lg leading-relaxed">
                {s.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
                {s.extra}
              </div>
            </div>
          </section>
        ))}
      </div>

      <div className="mt-section flex flex-wrap gap-4">
        <Button href="/assessment">Start an assessment</Button>
        <Button href="/learn" variant="secondary">
          Read the learn library
        </Button>
      </div>
    </main>
  );
}
