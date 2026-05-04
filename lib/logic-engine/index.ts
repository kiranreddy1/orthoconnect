import type { AssessmentInput, AwarenessLevel, AwarenessReport } from './types';
import { hasRedFlags, buildRedFlagReport } from './red-flags';
import { computeRawScore } from './scoring';
import { computeCombinedModifier } from './modifiers';
import { matchPatterns } from './patterns';
import { nextStepsFor, whenToSeeAProfessional } from './next-steps';

export function scoreToAwarenessLevel(score: number): AwarenessLevel {
  if (score <= 25) return 'green';
  if (score <= 50) return 'yellow';
  if (score <= 75) return 'orange';
  return 'red';
}

export function assessAwareness(input: AssessmentInput): AwarenessReport {
  if (hasRedFlags(input)) {
    return buildRedFlagReport(input);
  }

  const raw = computeRawScore(input);
  const modifier = computeCombinedModifier(input);
  const finalScore = Math.round(raw.total * modifier.combined);
  const level = scoreToAwarenessLevel(finalScore);
  const patterns = matchPatterns(input);

  const contributingFactors: string[] = [];
  if (raw.duration >= 15) {
    contributingFactors.push('Pain has been present for more than a week — persistence is a meaningful signal.');
  }
  if (raw.functionalImpact >= 18) {
    contributingFactors.push('You are modifying play or have stopped playing — function is a strong signal.');
  }
  if (raw.progression >= 10) {
    contributingFactors.push('The pattern has been getting worse, not better.');
  }
  if (raw.triggerSpecificity >= 12) {
    contributingFactors.push('There is a specific mechanical trigger — that often points to a structural cause.');
  }
  if (input.activityFrequency === 'daily' || input.activityFrequency === 'four_or_five') {
    contributingFactors.push(`Training ${input.activityFrequency.replace('_', ' ')} times per week is a high training volume — overuse patterns are more common at this volume.`);
  }
  for (const pattern of patterns) {
    contributingFactors.push(...pattern.contributingFactors);
  }

  return {
    awarenessLevel: level,
    rawScore: raw.total,
    finalScore,
    redFlagsTriggered: [],
    patterns,
    modifiersApplied: modifier.applied,
    combinedModifier: modifier.combined,
    contributingFactors,
    nextSteps: nextStepsFor(level, input),
    whenToSeeAProfessional: whenToSeeAProfessional(level),
  };
}

export type { AssessmentInput, AwarenessLevel, AwarenessReport, MatchedPattern, ModifierApplied } from './types';
export { CITATIONS, getCitations } from './citations';
export { listAllPatternIds } from './patterns';
