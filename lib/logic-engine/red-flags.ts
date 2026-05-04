import type { AssessmentInput, AwarenessReport, RedFlag } from './types';

export const RED_FLAG_LABELS: Record<RedFlag, string> = {
  cannot_bear_weight: 'Inability to bear weight on the affected limb',
  visible_deformity_or_instability: 'Visible deformity or joint instability ("it feels loose" or "gives way")',
  numbness_or_tingling: 'Numbness, tingling, or loss of sensation',
  rapid_swelling: 'Significant swelling that came on within 1 hour of injury',
  heard_pop_at_injury: 'Heard or felt a "pop" at the moment of injury',
  wakes_from_sleep: 'Pain that wakes you from sleep',
  fever_with_joint_pain: 'Fever combined with joint pain',
  high_energy_collision: 'Pain following a high-energy collision (car, fall from height)',
};

export function hasRedFlags(input: AssessmentInput): boolean {
  return input.redFlags.length > 0;
}

export function buildRedFlagReport(input: AssessmentInput): AwarenessReport {
  return {
    awarenessLevel: 'red',
    rawScore: 0,
    finalScore: 0,
    redFlagsTriggered: input.redFlags,
    patterns: [],
    modifiersApplied: [],
    combinedModifier: 1,
    contributingFactors: input.redFlags.map((f) => RED_FLAG_LABELS[f]),
    nextSteps: [
      'Stop the activity that involves the painful area.',
      'Avoid putting weight on or stressing the affected joint until you have been seen.',
      'Apply ice to reduce swelling for 15–20 minutes at a time, with breaks.',
      'Reach out to a parent, athletic trainer, or coach so they know what is happening.',
    ],
    whenToSeeAProfessional: [
      'Based on what you described, please seek medical evaluation soon — same day or urgent care if symptoms are severe.',
      'If pain is extreme, you cannot bear weight, you have new numbness, or you have a fever with joint pain, treat this as urgent and seek care immediately.',
    ],
  };
}
