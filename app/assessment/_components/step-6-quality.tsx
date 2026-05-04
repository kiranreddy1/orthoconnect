'use client';

import { FieldLabel, RadioCardGroup, SeveritySlider } from './form-primitives';
import type { PainQuality } from '@/lib/logic-engine/types';

const QUALITY_OPTIONS = [
  { id: 'sharp' as const, label: 'Sharp' },
  { id: 'dull_ache' as const, label: 'Dull aching' },
  { id: 'throbbing' as const, label: 'Throbbing' },
  { id: 'burning' as const, label: 'Burning' },
  { id: 'tight_or_pulling' as const, label: 'Tight or pulling' },
];

export function Step6Quality({
  painQuality,
  severity,
  setField,
}: {
  painQuality: PainQuality | undefined;
  severity: number | undefined;
  setField: <K extends 'painQuality' | 'severity'>(field: K, value: unknown) => void;
}) {
  return (
    <div className="space-y-10">
      <div className="space-y-3">
        <FieldLabel>What does the pain feel like?</FieldLabel>
        <RadioCardGroup
          name="quality"
          value={painQuality}
          onChange={(v) => setField('painQuality', v)}
          options={QUALITY_OPTIONS}
          columns={2}
        />
      </div>
      <div className="space-y-4">
        <FieldLabel>On its worst day, how bad is the pain?</FieldLabel>
        <SeveritySlider value={severity ?? 0} onChange={(v) => setField('severity', v)} />
      </div>
    </div>
  );
}

export function isStep6Valid(state: { painQuality: PainQuality | undefined; severity: number | undefined }): boolean {
  return !!state.painQuality && typeof state.severity === 'number';
}
