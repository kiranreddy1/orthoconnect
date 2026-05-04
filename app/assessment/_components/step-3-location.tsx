'use client';

import dynamic from 'next/dynamic';
import { RadioCardGroup, FieldLabel } from './form-primitives';
import { SUBREGIONS } from './options';
import type { BodyRegion } from '@/lib/logic-engine';

const BodyMap3D = dynamic(
  () => import('@/components/body-map/body-map-3d').then((m) => m.BodyMap3D),
  {
    ssr: false,
    loading: () => (
      <div className="bg-bg-secondary ring-subtle flex h-[520px] w-full items-center justify-center rounded-card">
        <p className="text-fg-secondary text-sm">Loading 3D model…</p>
      </div>
    ),
  },
);

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
      <BodyMap3D
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
          Click a body part on the figure. We&apos;ll ask for the more specific spot next.
        </p>
      )}
    </div>
  );
}

export function isStep3Valid(state: { bodyRegion: BodyRegion | undefined; bodySubregion: string | undefined }): boolean {
  return !!state.bodyRegion && !!state.bodySubregion;
}
