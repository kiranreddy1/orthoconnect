'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function FeedbackForm() {
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!message.trim()) {
      setError('Please share at least a sentence so we know what to improve.');
      return;
    }
    setStatus('submitting');
    setError(null);
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating: rating || null, message, email: email || null }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error ?? 'Could not submit feedback right now.');
      }
      setStatus('success');
      setMessage('');
      setEmail('');
      setRating(0);
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    }
  }

  if (status === 'success') {
    return (
      <p className="text-awareness-green text-base">
        Thanks. Aarush reads every piece of feedback that comes through.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-3">
        <label className="text-fg-primary block text-base font-medium">
          How would you rate the experience? (optional)
        </label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setRating(n === rating ? 0 : n)}
              className="p-2"
              aria-label={`${n} star${n === 1 ? '' : 's'}`}
            >
              <Star
                className={cn(
                  'h-7 w-7 transition-colors',
                  n <= rating
                    ? 'fill-awareness-yellow text-awareness-yellow'
                    : 'text-fg-secondary/40 hover:text-awareness-yellow',
                )}
                strokeWidth={1.5}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <label htmlFor="msg" className="text-fg-primary block text-base font-medium">
          What is on your mind?
        </label>
        <textarea
          id="msg"
          value={message}
          onChange={(e) => setMessage(e.target.value.slice(0, 2000))}
          rows={6}
          maxLength={2000}
          placeholder="What worked? What confused you? What would you add?"
          className="bg-bg-elevated text-fg-primary placeholder:text-fg-secondary ring-subtle focus:ring-accent w-full rounded-card p-4 text-base outline-none focus:ring-2"
        />
        <p className="text-fg-secondary text-right font-mono text-xs">{2000 - message.length}</p>
      </div>

      <div className="space-y-3">
        <label htmlFor="email" className="text-fg-primary block text-base font-medium">
          Your email (optional)
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="If you would like a reply"
          className="bg-bg-elevated text-fg-primary placeholder:text-fg-secondary ring-subtle focus:ring-accent h-14 w-full rounded-pill px-6 text-base outline-none focus:ring-2"
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Button disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Submitting…' : 'Send feedback'}
        </Button>
        {error ? <p className="text-awareness-red text-sm">{error}</p> : null}
      </div>
    </form>
  );
}
