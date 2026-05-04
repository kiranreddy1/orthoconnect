import type { AssessmentInput } from '../types';

export function makeInput(overrides: Partial<AssessmentInput> = {}): AssessmentInput {
  return {
    age: 16,
    sport: 'soccer',
    activityFrequency: 'twice_or_three',
    bodyRegion: 'knee',
    bodySubregion: 'anterior',
    redFlags: [],
    onset: 'gradual',
    duration: 'one_to_seven_days',
    painQuality: 'dull_ache',
    severity: 4,
    worstWhen: 'during_activity',
    worseTriggers: ['running'],
    betterTriggers: ['rest'],
    functionalImpact: 'plays_with_pain',
    progression: 'stable',
    ...overrides,
  };
}
