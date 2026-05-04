'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function EmailSignupForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    setError(null);

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error ?? 'Something went wrong. Try again in a moment.');
      }
      setStatus('success');
      setEmail('');
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    }
  }

  if (status === 'success') {
    return (
      <p className="text-awareness-green text-base">
        Thanks — you&apos;re on the list. Check your inbox for a confirmation.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
      <input
        type="email"
        required
        autoComplete="email"
        placeholder="you@somewhere.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="bg-bg-elevated text-fg-primary placeholder:text-fg-secondary ring-subtle focus:ring-accent h-14 flex-1 rounded-pill px-6 text-base outline-none focus:ring-2"
        disabled={status === 'submitting'}
      />
      <Button size="md" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Submitting…' : 'Subscribe'}
      </Button>
      {error ? <p className="text-awareness-red w-full text-sm sm:basis-full">{error}</p> : null}
    </form>
  );
}
