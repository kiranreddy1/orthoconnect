import { describe, it, expect } from 'vitest';
import { assessAwareness } from '../index';
import { hasRedFlags, buildRedFlagReport } from '../red-flags';
import { makeInput } from './fixtures';

describe('red flags', () => {
  it('hasRedFlags returns false on empty', () => {
    expect(hasRedFlags(makeInput({ redFlags: [] }))).toBe(false);
  });

  it('hasRedFlags returns true on any red flag', () => {
    expect(hasRedFlags(makeInput({ redFlags: ['cannot_bear_weight'] }))).toBe(true);
  });

  it('any red flag short-circuits to a red awareness report', () => {
    const report = assessAwareness(
      makeInput({
        severity: 1,
        duration: 'less_than_day',
        functionalImpact: 'normal',
        worseTriggers: [],
        progression: 'improving',
        redFlags: ['heard_pop_at_injury'],
      }),
    );
    expect(report.awarenessLevel).toBe('red');
    expect(report.redFlagsTriggered).toEqual(['heard_pop_at_injury']);
    expect(report.rawScore).toBe(0);
    expect(report.finalScore).toBe(0);
    expect(report.patterns).toEqual([]);
    expect(report.modifiersApplied).toEqual([]);
  });

  it('red flag report includes a "seek care" message and immediate next steps', () => {
    const report = buildRedFlagReport(makeInput({ redFlags: ['cannot_bear_weight'] }));
    expect(report.nextSteps.join(' ')).toMatch(/stop|avoid|ice|reach out/i);
    expect(report.whenToSeeAProfessional.join(' ')).toMatch(/seek/i);
  });
});
