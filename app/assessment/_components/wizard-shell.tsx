'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { WIZARD_STEPS, type StepNumber } from './wizard-state';
import { RotateCcw } from 'lucide-react';

export function ProgressBar({ step }: { step: StepNumber }) {
  const pct = (step / WIZARD_STEPS) * 100;
  return (
    <div className="fixed inset-x-0 top-0 z-30 backdrop-blur-md">
      <div className="container-content flex h-16 items-center justify-between gap-6">
        <Link href="/" className="font-display text-fg-primary text-base tracking-tight">
          OrthoConnect
        </Link>
        <div className="flex flex-1 items-center gap-4">
          <div className="bg-bg-elevated relative h-1 flex-1 overflow-hidden rounded-full">
            <div
              className="bg-accent absolute inset-y-0 left-0 transition-[width] duration-500 ease-oura"
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className="text-fg-secondary font-mono text-xs">
            Step {step} of {WIZARD_STEPS}
          </span>
        </div>
      </div>
    </div>
  );
}

export function WizardShell({
  step,
  title,
  subtitle,
  children,
  onNext,
  onPrev,
  onStartOver,
  nextLabel = 'Continue',
  nextDisabled,
  hideNext,
}: {
  step: StepNumber;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  onNext?: () => void;
  onPrev?: () => void;
  onStartOver?: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
  hideNext?: boolean;
}) {
  return (
    <>
      <ProgressBar step={step} />
      <main className={cn('container-content min-h-screen pt-32 pb-section')}>
        <div className="max-w-2xl">
          <div className="flex items-center justify-between gap-4">
            <p className="text-fg-secondary text-sm uppercase tracking-widest">Step {step}</p>
            {onStartOver ? (
              <button
                type="button"
                onClick={onStartOver}
                className="text-fg-secondary hover:text-fg-primary inline-flex items-center gap-1.5 text-sm transition-colors"
              >
                <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.5} />
                Start over
              </button>
            ) : null}
          </div>
          <h1 className="font-display text-display-md text-fg-primary mt-4">{title}</h1>
          {subtitle ? <p className="text-fg-secondary mt-4 text-lg">{subtitle}</p> : null}
          <div className="mt-12">{children}</div>
          <div className="mt-12 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={onPrev}
              disabled={!onPrev}
              className="text-fg-secondary hover:text-fg-primary text-sm transition-colors disabled:opacity-40"
            >
              ← Back
            </button>
            {hideNext ? null : (
              <Button onClick={onNext} disabled={nextDisabled}>
                {nextLabel}
              </Button>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
