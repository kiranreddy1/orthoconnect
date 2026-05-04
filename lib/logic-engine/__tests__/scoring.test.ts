import { describe, it, expect } from 'vitest';
import {
  severityScore,
  durationScore,
  functionalImpactScore,
  triggerSpecificityScore,
  progressionScore,
  computeRawScore,
} from '../scoring';
import { makeInput } from './fixtures';

describe('scoring components', () => {
  it('severity scales linearly and clamps', () => {
    expect(severityScore(0)).toBe(0);
    expect(severityScore(7)).toBe(21);
    expect(severityScore(10)).toBe(30);
    expect(severityScore(-3)).toBe(0);
    expect(severityScore(99)).toBe(30);
  });

  it('duration follows the spec table', () => {
    expect(durationScore('less_than_day')).toBe(5);
    expect(durationScore('one_to_seven_days')).toBe(10);
    expect(durationScore('one_to_four_weeks')).toBe(15);
    expect(durationScore('more_than_month')).toBe(20);
  });

  it('functional impact follows the spec table', () => {
    expect(functionalImpactScore('normal')).toBe(0);
    expect(functionalImpactScore('plays_with_pain')).toBe(10);
    expect(functionalImpactScore('modifies_play')).toBe(18);
    expect(functionalImpactScore('stopped_playing')).toBe(25);
  });

  it('trigger specificity rewards specific mechanical triggers', () => {
    expect(triggerSpecificityScore(makeInput({ worseTriggers: [] }))).toBe(0);
    expect(triggerSpecificityScore(makeInput({ worseTriggers: ['no_clear_trigger'] }))).toBe(0);
    expect(triggerSpecificityScore(makeInput({ worseTriggers: ['sitting_still'] }))).toBe(7);
    expect(triggerSpecificityScore(makeInput({ worseTriggers: ['running'] }))).toBe(12);
    expect(triggerSpecificityScore(makeInput({ worseTriggers: ['running', 'jumping'] }))).toBe(15);
  });

  it('progression: worsening 10, stable/undefined 5, improving 0', () => {
    expect(progressionScore('worsening')).toBe(10);
    expect(progressionScore('stable')).toBe(5);
    expect(progressionScore(undefined)).toBe(5);
    expect(progressionScore('improving')).toBe(0);
  });

  it('raw score sums to component max bounds', () => {
    const max = computeRawScore(
      makeInput({
        severity: 10,
        duration: 'more_than_month',
        functionalImpact: 'stopped_playing',
        worseTriggers: ['running', 'jumping'],
        progression: 'worsening',
      }),
    );
    expect(max.total).toBe(30 + 20 + 25 + 15 + 10);

    const min = computeRawScore(
      makeInput({
        severity: 0,
        duration: 'less_than_day',
        functionalImpact: 'normal',
        worseTriggers: [],
        progression: 'improving',
      }),
    );
    expect(min.total).toBe(0 + 5 + 0 + 0 + 0);
  });
});
