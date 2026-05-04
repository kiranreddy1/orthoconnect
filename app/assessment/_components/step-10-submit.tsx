'use client';

import { Button } from '@/components/ui/button';

interface Props {
  onSubmit: () => void;
  status: 'idle' | 'submitting' | 'error';
  error: string | null;
}

export function Step10Submit({ onSubmit, status, error }: Props) {
  return (
    <div className="space-y-8">
      <div className="bg-bg-secondary ring-subtle rounded-card p-6">
        <p className="text-fg-primary text-base">
          Ready to see your awareness report.
        </p>
        <p className="text-fg-secondary mt-3 text-sm">
          We&apos;ll generate it from your answers — no account required.
        </p>
      </div>

      <Button onClick={onSubmit} disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Analyzing your pattern…' : 'See my report'}
      </Button>

      {error ? (
        <p className="text-awareness-red text-sm">{error}</p>
      ) : null}
    </div>
  );
}
