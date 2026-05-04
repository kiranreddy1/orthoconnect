'use client';

import { BodyMapInteractive } from '@/components/body-map/body-map-interactive';
import { RadioCardGroup, FieldLabel } from './form-primitives';
import { SUBREGIONS } from './options';
import type { BodyRegion } from '@/lib/logic-engine';

export function Step3Location({
  bodyRegion,
  bodySubregion,
  setField,
}: {
  bodyRegion: BodyRegion | undefined;
  bodySubregion: string | undefined;
  setField: <K extends 'bodyRegion' | 'bodySubregion'>(field: K, value: unknown) => void;
}) {
  const subregionOptions = bodyRegion
    ? SUBREGIONS[bodyRegion].map((s) => ({ id: s.toLowerCase(), label: s }))
    : [];

  return (
    <div className="grid gap-12 lg:grid-cols-[auto_1fr]">
      <BodyMapInteractive
        selected={bodyRegion}
        onSelect={(r) => {
          setField('bodyRegion', r);
          setField('bodySubregion', undefined);
        }}
      />

      {bodyRegion ? (
        <div className="space-y-3">
          <FieldLabel>
            Where in the {bodyRegion.replace('_', ' ')}?
          </FieldLabel>
          <RadioCardGroup
            name="subregion"
            value={bodySubregion}
            onChange={(v) => setField('bodySubregion', v)}
            options={subregionOptions}
          />
        </div>
      ) : (
        <p className="text-fg-secondary self-center text-base">
          Pick a region on the map. We&apos;ll ask for the more specific spot next.
        </p>
      )}
    </div>
  );
}

export function isStep3Valid(state: { bodyRegion: BodyRegion | undefined; bodySubregion: string | undefined }): boolean {
  return !!state.bodyRegion && !!state.bodySubregion;
}
