'use client';

import { CheckboxRow, FieldLabel, RadioCardGroup } from './form-primitives';
import { BETTER_TRIGGER_OPTIONS, WORSE_TRIGGER_OPTIONS } from './options';
import type { WorstWhen } from '@/lib/logic-engine/types';

const WORST_OPTIONS = [
  { id: 'morning' as const, label: 'In the morning' },
  { id: 'during_activity' as const, label: 'During activity' },
  { id: 'after_activity' as const, label: 'After activity' },
  { id: 'at_night' as const, label: 'At night' },
  { id: 'all_the_time' as const, label: 'All the time' },
];

export function Step7Pattern({
  worstWhen,
  worseTriggers,
  betterTriggers,
  setField,
}: {
  worstWhen: WorstWhen | undefined;
  worseTriggers: string[] | undefined;
  betterTriggers: string[] | undefined;
  setField: <K extends 'worstWhen' | 'worseTriggers' | 'betterTriggers'>(field: K, value: unknown) => void;
}) {
  const worse = worseTriggers ?? [];
  const better = betterTriggers ?? [];

  const toggle = (list: string[], id: string, checked: boolean) =>
    checked ? [...list, id] : list.filter((x) => x !== id);

  return (
    <div className="space-y-10">
      <div className="space-y-3">
        <FieldLabel>When is it worst?</FieldLabel>
        <RadioCardGroup
          name="worst"
          value={worstWhen}
          onChange={(v) => setField('worstWhen', v)}
          options={WORST_OPTIONS}
          columns={2}
        />
      </div>
      <div className="space-y-3">
        <FieldLabel>What makes it worse? (pick all that apply)</FieldLabel>
        <div className="space-y-2">
          {WORSE_TRIGGER_OPTIONS.map((opt) => (
            <CheckboxRow
              key={opt.id}
              id={`worse-${opt.id}`}
              label={opt.label}
              checked={worse.includes(opt.id)}
              onChange={(v) => setField('worseTriggers', toggle(worse, opt.id, v))}
            />
          ))}
        </div>
      </div>
      <div className="space-y-3">
        <FieldLabel>What makes it better? (pick all that apply)</FieldLabel>
        <div className="space-y-2">
          {BETTER_TRIGGER_OPTIONS.map((opt) => (
            <CheckboxRow
              key={opt.id}
              id={`better-${opt.id}`}
              label={opt.label}
              checked={better.includes(opt.id)}
              onChange={(v) => setField('betterTriggers', toggle(better, opt.id, v))}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function isStep7Valid(state: { worstWhen: WorstWhen | undefined }): boolean {
  return !!state.worstWhen;
}
