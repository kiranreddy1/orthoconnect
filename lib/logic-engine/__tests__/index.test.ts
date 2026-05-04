import { describe, it, expect } from 'vitest';
import { assessAwareness, scoreToAwarenessLevel } from '../index';
import { makeInput } from './fixtures';

describe('scoreToAwarenessLevel thresholds', () => {
  it('boundaries match the spec', () => {
    expect(scoreToAwarenessLevel(0)).toBe('green');
    expect(scoreToAwarenessLevel(25)).toBe('green');
    expect(scoreToAwarenessLevel(26)).toBe('yellow');
    expect(scoreToAwarenessLevel(50)).toBe('yellow');
    expect(scoreToAwarenessLevel(51)).toBe('orange');
    expect(scoreToAwarenessLevel(75)).toBe('orange');
    expect(scoreToAwarenessLevel(76)).toBe('red');
    expect(scoreToAwarenessLevel(140)).toBe('red');
  });
});

describe('assessAwareness — sample personas', () => {
  it('mild healing pattern lands in green', () => {
    const report = assessAwareness(
      makeInput({
        severity: 2,
        duration: 'less_than_day',
        functionalImpact: 'normal',
        worseTriggers: ['no_clear_trigger'],
        progression: 'improving',
      }),
    );
    expect(report.awarenessLevel).toBe('green');
    expect(report.nextSteps.length).toBeGreaterThan(0);
  });

  it('Maya — 14yo soccer player, anterior knee pain ~3 weeks, plays with pain — lands in yellow/orange/red range (not green)', () => {
    const report = assessAwareness(
      makeInput({
        age: 14,
        sport: 'soccer',
        bodyRegion: 'knee',
        bodySubregion: 'anterior below_kneecap',
        onset: 'gradual',
        duration: 'one_to_four_weeks',
        severity: 5,
        worseTriggers: ['running', 'jumping'],
        functionalImpact: 'plays_with_pain',
        progression: 'stable',
      }),
    );
    expect(['yellow', 'orange', 'red']).toContain(report.awarenessLevel);
    expect(report.patterns.length).toBeGreaterThan(0);
  });

  it('high severity + stopped playing + worsening hits red without any red flags', () => {
    const report = assessAwareness(
      makeInput({
        severity: 9,
        duration: 'more_than_month',
        functionalImpact: 'stopped_playing',
        worseTriggers: ['running', 'jumping'],
        progression: 'worsening',
        redFlags: [],
      }),
    );
    expect(report.awarenessLevel).toBe('red');
    expect(report.redFlagsTriggered).toEqual([]);
  });

  it('every awareness level produces non-empty nextSteps and whenToSeeAProfessional copy', () => {
    const cases = [
      makeInput({ severity: 1, duration: 'less_than_day', functionalImpact: 'normal', worseTriggers: [], progression: 'improving' }),
      makeInput({ severity: 5, duration: 'one_to_seven_days', functionalImpact: 'plays_with_pain', worseTriggers: ['running'], progression: 'stable' }),
      makeInput({ severity: 7, duration: 'one_to_four_weeks', functionalImpact: 'modifies_play', worseTriggers: ['running'], progression: 'worsening' }),
      makeInput({ redFlags: ['cannot_bear_weight'] }),
    ];
    for (const c of cases) {
      const r = assessAwareness(c);
      expect(r.nextSteps.length).toBeGreaterThan(0);
      expect(r.whenToSeeAProfessional.length).toBeGreaterThan(0);
    }
  });
});
