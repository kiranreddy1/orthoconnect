'use client';

import { FieldLabel } from './form-primitives';

const MAX_LEN = 500;

export function Step9FreeText({
  freeText,
  setField,
}: {
  freeText: string | undefined;
  setField: (field: 'freeText', value: string | undefined) => void;
}) {
  const value = freeText ?? '';
  const remaining = MAX_LEN - value.length;

  return (
    <div className="space-y-4">
      <FieldLabel>Anything else you want us to share?</FieldLabel>
      <p className="text-fg-secondary text-sm">
        Optional — share emotional context, training changes, or anything that doesn&apos;t fit the
        questions above. Please don&apos;t include names or contact info.
      </p>
      <textarea
        value={value}
        onChange={(e) => setField('freeText', e.target.value.slice(0, MAX_LEN) || undefined)}
        rows={6}
        maxLength={MAX_LEN}
        placeholder="e.g. Tryouts are next week. I really don't want to miss them."
        className="bg-bg-elevated text-fg-primary placeholder:text-fg-secondary ring-subtle focus:ring-accent w-full rounded-card p-4 text-base outline-none focus:ring-2"
      />
      <p className="text-fg-secondary text-right font-mono text-xs">{remaining}</p>
    </div>
  );
}
