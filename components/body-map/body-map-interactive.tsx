'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import type { BodyRegion } from '@/lib/logic-engine';

type View = 'front' | 'back';

interface RegionRect {
  id: BodyRegion;
  label: string;
  x: number;
  y: number;
  w: number;
  h: number;
  side?: 'left' | 'right' | 'center';
}

const SHARED: RegionRect[] = [
  { id: 'shoulder', label: 'Left shoulder', x: 42, y: 76, w: 28, h: 28, side: 'left' },
  { id: 'shoulder', label: 'Right shoulder', x: 130, y: 76, w: 28, h: 28, side: 'right' },
  { id: 'elbow', label: 'Left elbow', x: 38, y: 144, w: 28, h: 28, side: 'left' },
  { id: 'elbow', label: 'Right elbow', x: 134, y: 144, w: 28, h: 28, side: 'right' },
  { id: 'wrist', label: 'Left wrist', x: 36, y: 208, w: 28, h: 28, side: 'left' },
  { id: 'wrist', label: 'Right wrist', x: 136, y: 208, w: 28, h: 28, side: 'right' },
  { id: 'knee', label: 'Left knee', x: 72, y: 290, w: 26, h: 28, side: 'left' },
  { id: 'knee', label: 'Right knee', x: 102, y: 290, w: 26, h: 28, side: 'right' },
  { id: 'ankle', label: 'Left ankle', x: 72, y: 388, w: 26, h: 22, side: 'left' },
  { id: 'ankle', label: 'Right ankle', x: 102, y: 388, w: 26, h: 22, side: 'right' },
  { id: 'foot', label: 'Left foot', x: 66, y: 410, w: 34, h: 16, side: 'left' },
  { id: 'foot', label: 'Right foot', x: 100, y: 410, w: 34, h: 16, side: 'right' },
];

const FRONT_REGIONS: RegionRect[] = [
  ...SHARED,
  { id: 'hip', label: 'Hip', x: 70, y: 196, w: 60, h: 26, side: 'center' },
];

const BACK_REGIONS: RegionRect[] = [
  ...SHARED,
  { id: 'lower_back', label: 'Lower back', x: 72, y: 168, w: 56, h: 28, side: 'center' },
  { id: 'hip', label: 'Hip', x: 70, y: 196, w: 60, h: 26, side: 'center' },
];

function Silhouette() {
  // Stylized human outline. Stroke-only; the region overlays sit on top.
  return (
    <g stroke="currentColor" strokeWidth={1.5} fill="none" strokeLinejoin="round" strokeLinecap="round">
      <circle cx={100} cy={40} r={22} />
      <line x1={92} y1={62} x2={92} y2={74} />
      <line x1={108} y1={62} x2={108} y2={74} />
      <rect x={70} y={74} width={60} height={122} rx={14} />
      <rect x={42} y={80} width={22} height={140} rx={11} />
      <rect x={136} y={80} width={22} height={140} rx={11} />
      <ellipse cx={53} cy={232} rx={11} ry={13} />
      <ellipse cx={147} cy={232} rx={11} ry={13} />
      <rect x={70} y={196} width={60} height={26} rx={10} />
      <rect x={74} y={222} width={22} height={184} rx={11} />
      <rect x={104} y={222} width={22} height={184} rx={11} />
      <rect x={66} y={406} width={34} height={18} rx={7} />
      <rect x={100} y={406} width={34} height={18} rx={7} />
    </g>
  );
}

export function BodyMapInteractive({
  selected,
  onSelect,
  initialView = 'front',
}: {
  selected: BodyRegion | undefined;
  onSelect: (region: BodyRegion) => void;
  initialView?: View;
}) {
  const [view, setView] = useState<View>(initialView);
  const regions = view === 'front' ? FRONT_REGIONS : BACK_REGIONS;

  return (
    <div className="grid gap-6">
      <div className="ring-subtle bg-bg-elevated inline-flex w-fit rounded-pill p-1">
        {(['front', 'back'] as View[]).map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => setView(v)}
            className={cn(
              'rounded-pill px-5 py-2 text-sm capitalize transition-colors',
              view === v ? 'bg-accent text-bg-primary' : 'text-fg-secondary hover:text-fg-primary',
            )}
          >
            {v}
          </button>
        ))}
      </div>

      <div className="bg-bg-secondary ring-subtle rounded-card p-6">
        <svg
          viewBox="0 0 200 460"
          role="group"
          aria-label={`Anatomical ${view} view — pick a region`}
          className="text-fg-secondary mx-auto h-[480px] w-auto"
        >
          <Silhouette />
          {regions.map((r, idx) => {
            const isSelected = selected === r.id;
            return (
              <g key={`${r.id}-${r.side ?? 'c'}-${idx}`}>
                <rect
                  role="button"
                  aria-label={`Select ${r.label}`}
                  aria-pressed={isSelected}
                  tabIndex={0}
                  x={r.x}
                  y={r.y}
                  width={r.w}
                  height={r.h}
                  rx={6}
                  className={cn(
                    'cursor-pointer transition-colors focus:outline-none',
                    isSelected
                      ? 'fill-accent/30 stroke-accent'
                      : 'fill-transparent stroke-transparent hover:fill-accent/10 hover:stroke-accent/40',
                  )}
                  strokeWidth={1.5}
                  onClick={() => onSelect(r.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSelect(r.id);
                    }
                  }}
                />
              </g>
            );
          })}
        </svg>
      </div>

      <p className="text-fg-secondary text-xs">
        Tap or use the keyboard (Tab to focus, Enter or Space to select).
      </p>
    </div>
  );
}
