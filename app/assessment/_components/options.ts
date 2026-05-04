export const SPORTS = [
  'soccer',
  'basketball',
  'football',
  'baseball',
  'softball',
  'volleyball',
  'tennis',
  'lacrosse',
  'hockey',
  'wrestling',
  'cross_country',
  'track',
  'running',
  'swimming',
  'gymnastics',
  'cheerleading',
  'dance',
  'cycling',
  'rowing',
  'golf',
  'martial_arts',
  'skateboarding',
  'climbing',
  'weightlifting',
  'crossfit',
  'other',
] as const;

export const SUBREGIONS: Record<string, string[]> = {
  knee: ['anterior (front)', 'below kneecap', 'lateral (outside)', 'medial (inside)', 'posterior (back of knee)'],
  shoulder: ['anterior (front)', 'top', 'posterior (back)', 'lateral (outside)'],
  ankle: ['lateral (outside)', 'medial (inside)', 'anterior (front)', 'posterior (back)', 'heel'],
  hip: ['anterior (front)', 'lateral (outside)', 'posterior (back)'],
  lower_back: ['midline', 'paraspinal (just off the midline)', 'sacroiliac (low and to one side)'],
  wrist: ['dorsal (back of wrist)', 'palmar (palm side)', 'ulnar (pinky side)', 'radial (thumb side)'],
  elbow: ['medial (inside)', 'lateral (outside)', 'posterior (back)', 'anterior (front)'],
  foot: ['arch', 'ball of foot', 'heel', 'top', 'shin (lower leg)'],
};

export const WORSE_TRIGGER_OPTIONS = [
  { id: 'running', label: 'Running' },
  { id: 'jumping', label: 'Jumping' },
  { id: 'lifting', label: 'Lifting' },
  { id: 'twisting', label: 'Twisting or pivoting' },
  { id: 'throwing', label: 'Throwing' },
  { id: 'landing', label: 'Landing from a jump' },
  { id: 'sitting_still', label: 'Sitting still' },
  { id: 'specific_motion', label: 'A specific motion' },
  { id: 'no_clear_trigger', label: "No clear trigger" },
] as const;

export const BETTER_TRIGGER_OPTIONS = [
  { id: 'rest', label: 'Rest' },
  { id: 'ice', label: 'Ice' },
  { id: 'stretching', label: 'Stretching' },
  { id: 'movement', label: 'Light movement / warming up' },
  { id: 'nothing', label: 'Nothing helps' },
] as const;
