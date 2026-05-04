'use client';

import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface RadioOption<T extends string> {
  id: T;
  label: string;
  hint?: string;
}

export function RadioCardGroup<T extends string>({
  name,
  value,
  onChange,
  options,
  columns = 1,
}: {
  name: string;
  value: T | undefined;
  onChange: (next: T) => void;
  options: ReadonlyArray<RadioOption<T>>;
  columns?: 1 | 2 | 3;
}) {
  const grid = columns === 3 ? 'sm:grid-cols-3' : columns === 2 ? 'sm:grid-cols-2' : '';
  return (
    <div className={cn('grid gap-3', grid)}>
      {options.map((opt) => {
        const selected = value === opt.id;
        return (
          <label
            key={opt.id}
            className={cn(
              'group flex min-h-[64px] cursor-pointer items-start gap-4 rounded-card px-5 py-4 transition-colors',
              'ring-subtle bg-bg-elevated text-fg-primary',
              selected ? 'ring-2 ring-accent bg-bg-secondary' : 'hover:bg-bg-secondary',
            )}
          >
            <input
              type="radio"
              name={name}
              value={opt.id}
              checked={selected}
              onChange={() => onChange(opt.id)}
              className="sr-only"
            />
            <span
              className={cn(
                'mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border transition-colors',
                selected ? 'border-accent bg-accent' : 'border-fg-secondary/40',
              )}
              aria-hidden="true"
            >
              {selected ? <Check className="text-bg-primary h-3 w-3" strokeWidth={3} /> : null}
            </span>
            <span className="flex-1">
              <span className="text-base font-medium">{opt.label}</span>
              {opt.hint ? <span className="text-fg-secondary mt-1 block text-sm">{opt.hint}</span> : null}
            </span>
          </label>
        );
      })}
    </div>
  );
}

export function CheckboxRow({
  id,
  label,
  hint,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  hint?: string;
  checked: boolean;
  onChange: (next: boolean) => void;
}) {
  return (
    <label
      className={cn(
        'flex min-h-[64px] cursor-pointer items-start gap-4 rounded-card px-5 py-4 transition-colors',
        'ring-subtle bg-bg-elevated text-fg-primary',
        checked ? 'ring-2 ring-accent bg-bg-secondary' : 'hover:bg-bg-secondary',
      )}
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />
      <span
        className={cn(
          'mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border transition-colors',
          checked ? 'border-accent bg-accent' : 'border-fg-secondary/40',
        )}
        aria-hidden="true"
      >
        {checked ? <Check className="text-bg-primary h-3 w-3" strokeWidth={3} /> : null}
      </span>
      <span className="flex-1">
        <span className="text-base font-medium">{label}</span>
        {hint ? <span className="text-fg-secondary mt-1 block text-sm">{hint}</span> : null}
      </span>
    </label>
  );
}

export function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="text-fg-primary block text-base font-medium">{children}</label>;
}

export function TextField({
  id,
  type = 'text',
  value,
  onChange,
  placeholder,
  inputMode,
  min,
  max,
  required,
}: {
  id: string;
  type?: 'text' | 'number' | 'email';
  value: string | number;
  onChange: (next: string) => void;
  placeholder?: string;
  inputMode?: 'numeric' | 'text';
  min?: number;
  max?: number;
  required?: boolean;
}) {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      inputMode={inputMode}
      min={min}
      max={max}
      required={required}
      className="bg-bg-elevated text-fg-primary placeholder:text-fg-secondary ring-subtle focus:ring-accent h-14 w-full rounded-pill px-6 text-base outline-none focus:ring-2"
    />
  );
}

export function SeveritySlider({
  value,
  onChange,
}: {
  value: number;
  onChange: (next: number) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-baseline justify-between">
        <span className="text-fg-secondary text-sm">No pain</span>
        <span className="text-accent font-mono text-3xl">{value}</span>
        <span className="text-fg-secondary text-sm">Worst imaginable</span>
      </div>
      <input
        type="range"
        min={0}
        max={10}
        value={value}
        onChange={(e) => onChange(Number.parseInt(e.target.value, 10))}
        className="bg-bg-elevated accent-accent h-2 w-full appearance-none rounded-full"
      />
      <div className="text-fg-secondary flex justify-between px-1 text-xs">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
          <span key={n}>{n}</span>
        ))}
      </div>
    </div>
  );
}
