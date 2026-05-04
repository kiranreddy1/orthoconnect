'use client';

import { FieldLabel, RadioCardGroup, TextField } from './form-primitives';
import { SPORTS } from './options';
import type { ActivityFrequency, SexAtBirth } from '@/lib/logic-engine/types';

const SEX_OPTIONS = [
  { id: 'male' as const, label: 'Male' },
  { id: 'female' as const, label: 'Female' },
  { id: 'prefer_not_to_say' as const, label: 'Prefer not to say' },
];

const FREQ_OPTIONS = [
  { id: 'once_a_week' as const, label: 'Once a week' },
  { id: 'twice_or_three' as const, label: '2–3 times a week' },
  { id: 'four_or_five' as const, label: '4–5 times a week' },
  { id: 'daily' as const, label: 'Daily' },
];

export function Step2BasicInfo({
  age,
  sexAtBirth,
  heightCm,
  weightKg,
  sport,
  activityFrequency,
  setField,
}: {
  age: number | undefined;
  sexAtBirth: SexAtBirth | undefined;
  heightCm: number | undefined;
  weightKg: number | undefined;
  sport: string | undefined;
  activityFrequency: ActivityFrequency | undefined;
  setField: <K extends 'age' | 'sexAtBirth' | 'heightCm' | 'weightKg' | 'sport' | 'activityFrequency'>(
    field: K,
    value: unknown,
  ) => void;
}) {
  const ageInvalid = typeof age === 'number' && age > 0 && age < 13;

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <FieldLabel>Age</FieldLabel>
        <TextField
          id="age"
          type="number"
          inputMode="numeric"
          min={13}
          max={100}
          value={age ?? ''}
          onChange={(v) => setField('age', v === '' ? undefined : Number.parseInt(v, 10))}
          placeholder="14"
        />
        {ageInvalid ? (
          <p className="text-awareness-red text-sm">
            OrthoConnect is currently for users aged 13+. Please ask a parent for help.
          </p>
        ) : (
          <p className="text-fg-secondary text-sm">Used for growth-plate-aware logic.</p>
        )}
      </div>

      <div className="space-y-3">
        <FieldLabel>Sex assigned at birth</FieldLabel>
        <RadioCardGroup
          name="sex"
          value={sexAtBirth}
          onChange={(v) => setField('sexAtBirth', v)}
          options={SEX_OPTIONS}
          columns={3}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <FieldLabel>Height (cm) — optional</FieldLabel>
          <TextField
            id="height"
            type="number"
            inputMode="numeric"
            min={80}
            max={230}
            value={heightCm ?? ''}
            onChange={(v) => setField('heightCm', v === '' ? undefined : Number.parseInt(v, 10))}
            placeholder="170"
          />
        </div>
        <div className="space-y-2">
          <FieldLabel>Weight (kg) — optional</FieldLabel>
          <TextField
            id="weight"
            type="number"
            inputMode="numeric"
            min={20}
            max={200}
            value={weightKg ?? ''}
            onChange={(v) => setField('weightKg', v === '' ? undefined : Number.parseInt(v, 10))}
            placeholder="65"
          />
        </div>
      </div>

      <div className="space-y-2">
        <FieldLabel>Primary sport</FieldLabel>
        <select
          value={sport ?? ''}
          onChange={(e) => setField('sport', e.target.value)}
          className="bg-bg-elevated text-fg-primary ring-subtle focus:ring-accent h-14 w-full rounded-pill px-6 text-base outline-none focus:ring-2"
        >
          <option value="" disabled>
            Pick one
          </option>
          {SPORTS.map((s) => (
            <option key={s} value={s}>
              {s.replace(/_/g, ' ')}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-3">
        <FieldLabel>How often do you train or play?</FieldLabel>
        <RadioCardGroup
          name="freq"
          value={activityFrequency}
          onChange={(v) => setField('activityFrequency', v)}
          options={FREQ_OPTIONS}
          columns={2}
        />
      </div>
    </div>
  );
}

export function isStep2Valid(state: {
  age: number | undefined;
  sport: string | undefined;
  activityFrequency: ActivityFrequency | undefined;
}): boolean {
  return (
    typeof state.age === 'number' &&
    state.age >= 13 &&
    !!state.sport &&
    !!state.activityFrequency
  );
}
