import Link from 'next/link';
import { ArrowRight, Check, X, Activity, MapPin, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/fade-in';
import { BodyMapPreview } from '@/components/body-map/body-map-preview';
import { HeroIllustration, DecorativeOrb } from '@/components/hero-illustration';
import { EmailSignupForm } from './_components/email-signup-form';

const HOW_IT_WORKS = [
  {
    n: '01',
    title: 'Tell us where it hurts.',
    body: 'Pinpoint the location on a body map.',
    bg: 'bg-soft-sage',
    Icon: MapPin,
  },
  {
    n: '02',
    title: 'Describe the pattern.',
    body: 'About 15 quick questions on quality, timing, and triggers.',
    bg: 'bg-soft-sky',
    Icon: Activity,
  },
  {
    n: '03',
    title: 'Get your awareness report.',
    body: 'Personalized insights — and clear next steps — in under 5 minutes.',
    bg: 'bg-soft-peach',
    Icon: FileText,
  },
];

const WHAT_IT_IS = [
  'An educational pain-pattern awareness tool for athletes',
  'A structured questionnaire that produces a personalized report',
  'A guide for when to consider seeing a sports medicine professional',
  'A printable summary you can share with coaches, parents, and trainers',
];

const WHAT_IT_ISNT = [
  'Not a medical device. It does not diagnose injuries.',
  'Not a treatment tool. It does not prescribe therapy or rehab.',
  'Not a replacement for professional medical care.',
  'Not HIPAA-covered — it is positioned as a general consumer wellness tool.',
];

export default function HomePage() {
  return (
    <main>
      {/* Section A — Hero */}
      <section className="relative overflow-hidden pt-24">
        <DecorativeOrb
          color="peach"
          className="pointer-events-none absolute -right-20 -top-20 h-[600px] w-[600px] opacity-70"
        />
        <DecorativeOrb
          color="sage"
          className="pointer-events-none absolute -left-40 top-60 h-[500px] w-[500px] opacity-60"
        />

        <div className="container-content relative grid min-h-[80vh] items-center gap-12 py-section lg:grid-cols-[1.2fr_1fr]">
          <div>
            <FadeIn>
              <p className="text-fg-secondary text-sm uppercase tracking-widest">OrthoConnect</p>
            </FadeIn>
            <FadeIn delay={0.05}>
              <h1 className="font-display text-display-xl md:text-display-2xl text-fg-primary mt-6 max-w-[900px] leading-tight">
                Your pain has a pattern.
                <br />
                Let&apos;s decode it.
              </h1>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-fg-secondary mt-8 max-w-2xl text-xl">
                A free, structured awareness tool for athletes — built by an aspiring orthopedic
                surgeon.
              </p>
            </FadeIn>
            <FadeIn delay={0.12}>
              {/* Awareness spectrum mini-bar */}
              <div className="mt-10 inline-flex items-center gap-2">
                <span className="text-fg-secondary text-xs uppercase tracking-widest">Awareness levels</span>
                <span className="bg-awareness-green inline-block h-2 w-8 rounded-full" />
                <span className="bg-awareness-yellow inline-block h-2 w-8 rounded-full" />
                <span className="bg-awareness-orange inline-block h-2 w-8 rounded-full" />
                <span className="bg-awareness-red inline-block h-2 w-8 rounded-full" />
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="mt-12 flex flex-wrap items-center gap-6">
                <Button href="/assessment">Start assessment</Button>
                <Link
                  href="#how-it-works"
                  className="text-fg-secondary hover:text-fg-primary inline-flex items-center gap-2 text-base transition-colors"
                >
                  Learn more
                  <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                </Link>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.2}>
            <HeroIllustration className="mx-auto h-auto w-full max-w-[480px]" />
          </FadeIn>
        </div>
      </section>

      {/* Section B — Body map preview */}
      <section className="container-content py-section-lg">
        <FadeIn>
          <BodyMapPreview />
        </FadeIn>
      </section>

      {/* Section C — How it works */}
      <section id="how-it-works" className="relative overflow-hidden py-section-lg">
        <DecorativeOrb
          color="sky"
          className="pointer-events-none absolute -right-32 top-32 h-[400px] w-[400px] opacity-50"
        />
        <div className="container-content relative">
          <FadeIn>
            <p className="text-fg-secondary text-sm uppercase tracking-widest">How it works</p>
          </FadeIn>
          <FadeIn delay={0.05}>
            <h2 className="font-display text-display-lg text-fg-primary mt-4 max-w-3xl">
              Three steps. Five minutes. A clearer next step.
            </h2>
          </FadeIn>
          <div className="mt-section grid gap-6 md:grid-cols-3">
            {HOW_IT_WORKS.map((step, i) => (
              <FadeIn key={step.n} delay={0.05 * (i + 1)}>
                <div className={`${step.bg} ring-subtle h-full rounded-card p-8`}>
                  <div className="bg-bg-primary text-fg-primary inline-flex h-12 w-12 items-center justify-center rounded-full">
                    <step.Icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <p className="text-fg-primary/60 font-mono mt-6 text-sm">{step.n}</p>
                  <h3 className="font-display text-fg-primary mt-2 text-2xl">{step.title}</h3>
                  <p className="text-fg-primary/70 mt-3 text-base leading-relaxed">{step.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Section D — What it is / isn't */}
      <section className="container-content py-section-lg">
        <div className="grid gap-12 md:grid-cols-2">
          <FadeIn>
            <div className="bg-soft-sage ring-subtle h-full rounded-card p-10">
              <p className="text-fg-primary/60 text-sm uppercase tracking-widest">What it is</p>
              <ul className="mt-8 space-y-4">
                {WHAT_IT_IS.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="bg-awareness-green/25 text-awareness-green mt-1 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full">
                      <Check className="h-3.5 w-3.5" strokeWidth={2} />
                    </span>
                    <span className="text-fg-primary text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="bg-soft-rose ring-subtle h-full rounded-card p-10">
              <p className="text-fg-primary/60 text-sm uppercase tracking-widest">What it isn&apos;t</p>
              <ul className="mt-8 space-y-4">
                {WHAT_IT_ISNT.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="bg-awareness-red/25 text-awareness-red mt-1 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full">
                      <X className="h-3.5 w-3.5" strokeWidth={2} />
                    </span>
                    <span className="text-fg-primary text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Section E — Founder story */}
      <section className="container-content py-section-lg">
        <div className="grid gap-12 md:grid-cols-[1fr_2fr] md:items-center">
          <FadeIn>
            <div className="bg-soft-lavender ring-subtle relative aspect-square w-full max-w-xs overflow-hidden rounded-card">
              <DecorativeOrb
                color="lavender"
                className="absolute inset-0 h-full w-full opacity-90"
              />
              <div className="relative flex h-full w-full flex-col items-center justify-center p-8 text-center">
                <div className="bg-bg-primary text-fg-primary flex h-20 w-20 items-center justify-center rounded-full font-display text-3xl">
                  AN
                </div>
                <p className="text-fg-primary mt-6 font-display text-lg">Aarush</p>
                <p className="text-fg-primary/60 text-xs uppercase tracking-widest">Founder</p>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div>
              <p className="text-fg-secondary text-sm uppercase tracking-widest">Founder</p>
              <p className="text-awareness-orange font-mono mt-2 text-sm">
                Aarush Nibbaragandla · 10th grade · Aspiring orthopedic surgeon
              </p>
              <h2 className="font-display text-display-md text-fg-primary mt-6">
                Most injuries don&apos;t start big. They start small.
              </h2>
              <p className="text-fg-secondary mt-6 max-w-xl text-lg leading-relaxed">
                The idea grew from watching my father push through small injuries — pains he
                ignored until they became real problems. Athletes rarely know what to do with
                early warning signs. OrthoConnect is built to fill that gap.
              </p>
              <Link
                href="/about"
                className="text-fg-primary hover:text-awareness-orange mt-8 inline-flex items-center gap-2 text-base transition-colors"
              >
                Read the full story
                <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Section F — Email signup */}
      <section className="container-content py-section-lg">
        <FadeIn>
          <div className="bg-soft-cream ring-subtle relative overflow-hidden rounded-card p-10 md:p-16">
            <DecorativeOrb
              color="peach"
              className="pointer-events-none absolute -bottom-20 -right-20 h-[300px] w-[300px] opacity-70"
            />
            <div className="relative">
              <h2 className="font-display text-display-md text-fg-primary max-w-2xl">
                Get injury-prevention insights in your inbox.
              </h2>
              <p className="text-fg-secondary mt-6 max-w-xl text-lg">
                Occasional notes on pain literacy, training-load awareness, and growth-plate-aware
                return-to-play.
              </p>
              <div className="mt-10 max-w-xl">
                <EmailSignupForm />
              </div>
              <p className="text-fg-secondary mt-6 text-sm">
                No spam. Unsubscribe anytime. Built by a high school student — please be patient
                with response times.
              </p>
            </div>
          </div>
        </FadeIn>
      </section>
    </main>
  );
}
