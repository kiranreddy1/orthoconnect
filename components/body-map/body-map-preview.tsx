import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const REGIONS = [
  { id: 'shoulder', label: 'Shoulder' },
  { id: 'elbow', label: 'Elbow' },
  { id: 'wrist', label: 'Wrist' },
  { id: 'lower_back', label: 'Lower back' },
  { id: 'hip', label: 'Hip' },
  { id: 'knee', label: 'Knee' },
  { id: 'ankle', label: 'Ankle' },
  { id: 'foot', label: 'Foot' },
];

export function BodyMapPreview() {
  return (
    <div className="relative grid items-center gap-12 lg:grid-cols-[1fr_1.2fr]">
      <div>
        <p className="text-fg-secondary text-sm uppercase tracking-widest">Where it hurts</p>
        <h2 className="font-display text-display-md text-fg-primary mt-4 max-w-xl">
          Pick a region. Start with one tap.
        </h2>
        <p className="text-fg-secondary mt-6 max-w-md text-lg">
          The assessment opens with a body map so you can land on the right area in one
          interaction. The full anatomical map is interactive — this is a quick preview.
        </p>
      </div>
      <div className="bg-bg-secondary ring-subtle relative overflow-hidden rounded-card p-10">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-2">
          {REGIONS.map((r) => (
            <Link
              key={r.id}
              href={`/assessment?region=${r.id}`}
              className="group ring-subtle bg-bg-elevated text-fg-primary hover:bg-accent hover:text-bg-primary flex h-14 items-center justify-between rounded-card px-4 text-sm transition-colors"
            >
              <span>{r.label}</span>
              <ArrowRight className="h-4 w-4 opacity-50 transition-opacity group-hover:opacity-100" strokeWidth={1.5} />
            </Link>
          ))}
        </div>
        <p className="text-fg-secondary mt-8 text-xs">
          Full 2D anatomical map (front + back views) coming online with the assessment wizard.
        </p>
      </div>
    </div>
  );
}
