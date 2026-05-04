'use client';

import { FieldLabel, RadioCardGroup } from './form-primitives';
import type { FunctionalImpact, Progression } from '@/lib/logic-engine/types';

const FUNC_OPTIONS = [
  { id: 'normal' as const, label: 'I can play normally' },
  { id: 'plays_with_pain' as const, label: 'I can play but it bothers me' },
  { id: 'modifies_play' as const, label: 'I have to modify how I play' },
  { id: 'stopped_playing' as const, label: 'I had to stop playing' },
];

const PROG_OPTIONS = [
  { id: 'worsening' as const, label: 'Getting worse' },
  { id: 'stable' as const, label: 'About the same' },
  { id: 'improving' as const, label: 'Getting better' },
];

export function Step8Functional({
  functionalImpact,
  progression,
  setField,
}: {
  functionalImpact: FunctionalImpact | undefined;
  progression: Progression | undefined;
  setField: <K extends 'functionalImpact' | 'progression'>(field: K, value: unknown) => void;
}) {
  return (
    <div className="space-y-10">
      <div className="space-y-3">
        <FieldLabel>How is the pain affecting your play?</FieldLabel>
        <RadioCardGroup
          name="func"
          value={functionalImpact}
          onChange={(v) => setField('functionalImpact', v)}
          options={FUNC_OPTIONS}
        />
      </div>
      <div className="space-y-3">
        <FieldLabel>Over the last few days, has it been…</FieldLabel>
        <RadioCardGroup
          name="prog"
          value={progression}
          onChange={(v) => setField('progression', v)}
          options={PROG_OPTIONS}
          columns={3}
        />
      </div>
    </div>
  );
}

export function isStep8Valid(state: {
  functionalImpact: FunctionalImpact | undefined;
  progression: Progression | undefined;
}): boolean {
  return !!state.functionalImpact && !!state.progression;
}
