import type { AssessmentInput } from './types';

export function severityScore(severity: number): number {
  const clamped = Math.max(0, Math.min(10, severity));
  return clamped * 3;
}

export function durationScore(duration: AssessmentInput['duration']): number {
  switch (duration) {
    case 'less_than_day':
      return 5;
    case 'one_to_seven_days':
      return 10;
    case 'one_to_four_weeks':
      return 15;
    case 'more_than_month':
      return 20;
  }
}

export function functionalImpactScore(impact: AssessmentInput['functionalImpact']): number {
  switch (impact) {
    case 'normal':
      return 0;
    case 'plays_with_pain':
      return 10;
    case 'modifies_play':
      return 18;
    case 'stopped_playing':
      return 25;
  }
}

const MECHANICAL_TRIGGERS = new Set([
  'running',
  'jumping',
  'lifting',
  'specific_motion',
  'twisting',
  'landing',
  'throwing',
  'pivoting',
]);

export function triggerSpecificityScore(input: AssessmentInput): number {
  if (input.worseTriggers.length === 0 || input.worseTriggers.includes('no_clear_trigger')) {
    return 0;
  }
  const mechanical = input.worseTriggers.filter((t) => MECHANICAL_TRIGGERS.has(t));
  if (mechanical.length === 0) return 7;
  if (mechanical.length === 1) return 12;
  return 15;
}

export function progressionScore(progression: AssessmentInput['progression']): number {
  switch (progression) {
    case 'worsening':
      return 10;
    case 'improving':
      return 0;
    case 'stable':
    case undefined:
      return 5;
  }
}

export interface RawScoreBreakdown {
  severity: number;
  duration: number;
  functionalImpact: number;
  triggerSpecificity: number;
  progression: number;
  total: number;
}

export function computeRawScore(input: AssessmentInput): RawScoreBreakdown {
  const severity = severityScore(input.severity);
  const duration = durationScore(input.duration);
  const functionalImpact = functionalImpactScore(input.functionalImpact);
  const triggerSpecificity = triggerSpecificityScore(input);
  const progression = progressionScore(input.progression);
  return {
    severity,
    duration,
    functionalImpact,
    triggerSpecificity,
    progression,
    total: severity + duration + functionalImpact + triggerSpecificity + progression,
  };
}
