'use client';

import { CheckboxRow } from './form-primitives';
import { RED_FLAG_LABELS } from '@/lib/logic-engine/red-flags';
import type { RedFlag } from '@/lib/logic-engine';
import { RED_FLAGS } from '@/lib/logic-engine/types';

export function Step4RedFlags({
  redFlags,
  setField,
}: {
  redFlags: RedFlag[] | undefined;
  setField: (field: 'redFlags', value: RedFlag[]) => void;
}) {
  const current = redFlags ?? [];
  const toggle = (flag: RedFlag, checked: boolean) => {
    setField('redFlags', checked ? [...current, flag] : current.filter((f) => f !== flag));
  };

  return (
    <div className="space-y-6">
      <p className="text-fg-secondary">
        Check any that apply. If any of these are happening to you, we&apos;ll skip ahead and recommend
        seeing a professional soon.
      </p>
      <div className="space-y-3">
        {RED_FLAGS.map((flag) => (
          <CheckboxRow
            key={flag}
            id={`red-${flag}`}
            label={RED_FLAG_LABELS[flag]}
            checked={current.includes(flag)}
            onChange={(v) => toggle(flag, v)}
          />
        ))}
      </div>
    </div>
  );
}
