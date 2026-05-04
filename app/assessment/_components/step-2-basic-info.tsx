'use client';

import { useEffect, useState } from 'react';
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

function cmFromFtIn(ft: number, inches: number): number | undefined {
  if (!Number.isFinite(ft) && !Number.isFinite(inches)) return undefined;
  const totalInches = (Number.isFinite(ft) ? ft : 0) * 12 + (Number.isFinite(inches) ? inches : 0);
  if (totalInches <= 0) return undefined;
  return Math.round(totalInches * 2.54);
}

function ftInFromCm(cm: number | undefined): { ft: string; inches: string } {
  if (!cm || cm <= 0) return { ft: '', inches: '' };
  const totalInches = cm / 2.54;
  const ft = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches - ft * 12);
  return { ft: String(ft), inches: String(inches) };
}

function kgFromLbs(lbs: number): number | undefined {
  if (!Number.isFinite(lbs) || lbs <= 0) return undefined;
  return Math.round(lbs / 2.2046226218);
}

function lbsFromKg(kg: number | undefined): string {
  if (!kg || kg <= 0) return '';
  return String(Math.round(kg * 2.2046226218));
}

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

  const initialFtIn = ftInFromCm(heightCm);
  const [ft, setFt] = useState(initialFtIn.ft);
  const [inches, setInches] = useState(initialFtIn.inches);
  const [lbs, setLbs] = useState(lbsFromKg(weightKg));

  // Re-sync local imperial state if metric values are restored from localStorage on mount.
  useEffect(() => {
    const next = ftInFromCm(heightCm);
    if (next.ft !== ft && (ft === '' || ft !== next.ft)) {
      setFt(next.ft);
      setInches(next.inches);
    }
    const nextLbs = lbsFromKg(weightKg);
    if (nextLbs !== lbs && (lbs === '' || lbs !== nextLbs)) {
      setLbs(nextLbs);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleHeightChange(nextFt: string, nextIn: string) {
    setFt(nextFt);
    setInches(nextIn);
    const f = nextFt === '' ? 0 : Number.parseInt(nextFt, 10);
    const i = nextIn === '' ? 0 : Number.parseInt(nextIn, 10);
    setField('heightCm', cmFromFtIn(f, i));
  }

  function handleWeightChange(next: string) {
    setLbs(next);
    const n = next === '' ? NaN : Number.parseInt(next, 10);
    setField('weightKg', kgFromLbs(n));
  }

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

      <div className="space-y-3">
        <FieldLabel>Height — optional</FieldLabel>
        <div className="grid grid-cols-2 gap-3">
          <div className="relative">
            <TextField
              id="height-ft"
              type="number"
              inputMode="numeric"
              min={3}
              max={8}
              value={ft}
              onChange={(v) => handleHeightChange(v, inches)}
              placeholder="5"
            />
            <span className="text-fg-secondary pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 text-sm">
              ft
            </span>
          </div>
          <div className="relative">
            <TextField
              id="height-in"
              type="number"
              inputMode="numeric"
              min={0}
              max={11}
              value={inches}
              onChange={(v) => handleHeightChange(ft, v)}
              placeholder="7"
            />
            <span className="text-fg-secondary pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 text-sm">
              in
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <FieldLabel>Weight — optional</FieldLabel>
        <div className="relative max-w-xs">
          <TextField
            id="weight-lbs"
            type="number"
            inputMode="numeric"
            min={50}
            max={500}
            value={lbs}
            onChange={handleWeightChange}
            placeholder="140"
          />
          <span className="text-fg-secondary pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 text-sm">
            lbs
          </span>
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
