export const BODY_REGIONS = [
  'knee',
  'shoulder',
  'ankle',
  'hip',
  'lower_back',
  'wrist',
  'elbow',
  'foot',
] as const;
export type BodyRegion = (typeof BODY_REGIONS)[number];

export const RED_FLAGS = [
  'cannot_bear_weight',
  'visible_deformity_or_instability',
  'numbness_or_tingling',
  'rapid_swelling',
  'heard_pop_at_injury',
  'wakes_from_sleep',
  'fever_with_joint_pain',
  'high_energy_collision',
] as const;
export type RedFlag = (typeof RED_FLAGS)[number];

export const ONSETS = ['sudden', 'gradual', 'unsure'] as const;
export type Onset = (typeof ONSETS)[number];

export const DURATIONS = ['less_than_day', 'one_to_seven_days', 'one_to_four_weeks', 'more_than_month'] as const;
export type Duration = (typeof DURATIONS)[number];

export const PAIN_QUALITIES = ['sharp', 'dull_ache', 'throbbing', 'burning', 'tight_or_pulling'] as const;
export type PainQuality = (typeof PAIN_QUALITIES)[number];

export const WORST_WHEN = ['morning', 'during_activity', 'after_activity', 'at_night', 'all_the_time'] as const;
export type WorstWhen = (typeof WORST_WHEN)[number];

export const FUNCTIONAL_IMPACTS = ['normal', 'plays_with_pain', 'modifies_play', 'stopped_playing'] as const;
export type FunctionalImpact = (typeof FUNCTIONAL_IMPACTS)[number];

export const PROGRESSIONS = ['worsening', 'stable', 'improving'] as const;
export type Progression = (typeof PROGRESSIONS)[number];

export const ACTIVITY_FREQUENCIES = ['once_a_week', 'twice_or_three', 'four_or_five', 'daily'] as const;
export type ActivityFrequency = (typeof ACTIVITY_FREQUENCIES)[number];

export const SEX_AT_BIRTH = ['male', 'female', 'prefer_not_to_say'] as const;
export type SexAtBirth = (typeof SEX_AT_BIRTH)[number];

export interface AssessmentInput {
  age: number;
  sexAtBirth?: SexAtBirth;
  heightCm?: number;
  weightKg?: number;
  sport: string;
  activityFrequency: ActivityFrequency;
  bodyRegion: BodyRegion;
  bodySubregion: string;
  redFlags: RedFlag[];
  onset: Onset;
  duration: Duration;
  painQuality: PainQuality;
  severity: number;
  worstWhen: WorstWhen;
  worseTriggers: string[];
  betterTriggers: string[];
  functionalImpact: FunctionalImpact;
  progression?: Progression;
  freeText?: string;
}

export type AwarenessLevel = 'green' | 'yellow' | 'orange' | 'red';

export interface MatchedPattern {
  id: string;
  title: string;
  description: string;
  contributingFactors: string[];
  citationIds: string[];
}

export interface ModifierApplied {
  id: string;
  factor: number;
  reason: string;
}

export interface AwarenessReport {
  awarenessLevel: AwarenessLevel;
  rawScore: number;
  finalScore: number;
  redFlagsTriggered: RedFlag[];
  patterns: MatchedPattern[];
  modifiersApplied: ModifierApplied[];
  combinedModifier: number;
  contributingFactors: string[];
  nextSteps: string[];
  whenToSeeAProfessional: string[];
}

export const MODIFIER_CAP = 1.4;
