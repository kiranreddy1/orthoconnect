'use client';

import { CheckboxRow } from './form-primitives';
import { RED_FLAG_LABELS } from '@/lib/logic-engine/red-flags';
import type { RedFlag } from '@/lib/logic-engine';
import { RED_FLAGS } from '@/lib/logic-engine/types';
import { AlertTriangle } from 'lucide-react';

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
        Check any that apply. If none of these are happening, leave them all unchecked and continue
        to the rest of the questions.
      </p>

      {current.length > 0 ? (
        <div className="bg-awareness-red/10 ring-awareness-red/30 flex items-start gap-3 rounded-card p-5 ring-1">
          <AlertTriangle className="text-awareness-red mt-0.5 h-5 w-5 flex-shrink-0" strokeWidth={2} />
          <div className="text-fg-primary text-sm">
            Because you checked {current.length === 1 ? 'one of these' : `${current.length} of these`},
            clicking <strong>Skip ahead to my report</strong> will take you straight to a Red awareness
            report. We&apos;ll recommend you see a professional soon and skip the remaining questions.
            If you checked one by accident, uncheck it to continue the normal flow.
          </div>
        </div>
      ) : null}

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
