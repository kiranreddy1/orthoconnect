'use client';

import { CheckboxRow } from './form-primitives';
import { DISCLAIMER_TEXT, URGENT_TEXT } from '@/components/disclaimer';

export function Step1Welcome({
  acknowledgedDisclaimer,
  acknowledgedAge,
  setField,
}: {
  acknowledgedDisclaimer: boolean;
  acknowledgedAge: boolean;
  setField: (field: 'acknowledgedDisclaimer' | 'acknowledgedAge', value: boolean) => void;
}) {
  return (
    <div className="space-y-8">
      <div className="bg-bg-secondary ring-subtle rounded-card p-6 text-base leading-relaxed">
        <p>{DISCLAIMER_TEXT}</p>
        <p className="text-fg-secondary mt-4">{URGENT_TEXT}</p>
      </div>

      <p className="text-fg-secondary text-sm">This will take about 5 minutes.</p>

      <div className="space-y-3">
        <CheckboxRow
          id="ack-disclaimer"
          label="I understand this is educational, not medical advice."
          hint="If I am experiencing severe symptoms, I will seek medical attention immediately."
          checked={acknowledgedDisclaimer}
          onChange={(v) => setField('acknowledgedDisclaimer', v)}
        />
        <CheckboxRow
          id="ack-age"
          label="I am 13 years old or older."
          hint="OrthoConnect is currently for users aged 13+. If you are younger, please ask a parent for help."
          checked={acknowledgedAge}
          onChange={(v) => setField('acknowledgedAge', v)}
        />
      </div>
    </div>
  );
}

export function isStep1Valid(ackDisclaimer: boolean, ackAge: boolean): boolean {
  return ackDisclaimer && ackAge;
}
