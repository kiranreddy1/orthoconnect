'use client';

import { FieldLabel, RadioCardGroup } from './form-primitives';
import type { Duration, Onset } from '@/lib/logic-engine/types';

const ONSET_OPTIONS = [
  { id: 'sudden' as const, label: 'Started suddenly (a moment of injury)' },
  { id: 'gradual' as const, label: 'Came on gradually' },
  { id: 'unsure' as const, label: "I don't remember" },
];

const DURATION_OPTIONS = [
  { id: 'less_than_day' as const, label: 'Less than 1 day' },
  { id: 'one_to_seven_days' as const, label: '1–7 days' },
  { id: 'one_to_four_weeks' as const, label: '1–4 weeks' },
  { id: 'more_than_month' as const, label: 'More than a month' },
];

export function Step5Onset({
  onset,
  duration,
  setField,
}: {
  onset: Onset | undefined;
  duration: Duration | undefined;
  setField: <K extends 'onset' | 'duration'>(field: K, value: unknown) => void;
}) {
  return (
    <div className="space-y-10">
      <div className="space-y-3">
        <FieldLabel>How did this start?</FieldLabel>
        <RadioCardGroup
          name="onset"
          value={onset}
          onChange={(v) => setField('onset', v)}
          options={ONSET_OPTIONS}
        />
      </div>
      <div className="space-y-3">
        <FieldLabel>How long has it been going on?</FieldLabel>
        <RadioCardGroup
          name="duration"
          value={duration}
          onChange={(v) => setField('duration', v)}
          options={DURATION_OPTIONS}
          columns={2}
        />
      </div>
    </div>
  );
}

export function isStep5Valid(state: { onset: Onset | undefined; duration: Duration | undefined }): boolean {
  return !!state.onset && !!state.duration;
}
