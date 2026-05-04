import { describe, it, expect } from 'vitest';
import { ageModifiers, bmiModifiers, sportModifiers, computeCombinedModifier } from '../modifiers';
import { MODIFIER_CAP } from '../types';
import { makeInput } from './fixtures';

describe('age modifiers', () => {
  it('Osgood-Schlatter pattern: <14 + knee + below kneecap = 1.20', () => {
    const mods = ageModifiers(makeInput({ age: 12, bodyRegion: 'knee', bodySubregion: 'below_kneecap' }));
    expect(mods.find((m) => m.id === 'age_under_14_anterior_knee')?.factor).toBe(1.2);
  });

  it("Sever's pattern: <14 + heel = 1.20", () => {
    const mods = ageModifiers(makeInput({ age: 11, bodyRegion: 'foot', bodySubregion: 'heel' }));
    expect(mods.find((m) => m.id === 'age_under_14_heel')?.factor).toBe(1.2);
  });

  it('Little League elbow: <16 + medial elbow + throwing sport = 1.30', () => {
    const mods = ageModifiers(
      makeInput({ age: 13, sport: 'baseball', bodyRegion: 'elbow', bodySubregion: 'medial' }),
    );
    expect(mods.find((m) => m.id === 'age_under_16_medial_elbow_throwing')?.factor).toBe(1.3);
  });

  it('acute injury under 16 stacks 1.15', () => {
    const mods = ageModifiers(makeInput({ age: 14, onset: 'sudden' }));
    expect(mods.find((m) => m.id === 'age_under_16_acute_injury')?.factor).toBe(1.15);
  });

  it('age 25+ produces no modifiers', () => {
    expect(ageModifiers(makeInput({ age: 28, bodyRegion: 'knee', bodySubregion: 'below_kneecap' }))).toEqual([]);
  });
});

describe('BMI modifiers', () => {
  it('high BMI on lower-body region applies 1.10', () => {
    const mods = bmiModifiers(makeInput({ age: 30, bodyRegion: 'knee', heightCm: 170, weightKg: 95 }));
    expect(mods.find((m) => m.id === 'bmi_high_lower_body')?.factor).toBe(1.1);
  });

  it('elevated BMI on lower-body region applies 1.05', () => {
    const mods = bmiModifiers(makeInput({ age: 30, bodyRegion: 'knee', heightCm: 175, weightKg: 80 }));
    expect(mods.find((m) => m.id === 'bmi_elevated_lower_body')?.factor).toBe(1.05);
  });

  it('upper-body region never gets a BMI modifier even with high BMI', () => {
    expect(bmiModifiers(makeInput({ age: 30, bodyRegion: 'shoulder', heightCm: 170, weightKg: 95 }))).toEqual([]);
  });

  it('missing height/weight returns no BMI modifier', () => {
    expect(bmiModifiers(makeInput({ age: 30, bodyRegion: 'knee' }))).toEqual([]);
  });
});

describe('sport modifiers', () => {
  it('soccer + knee = 1.10', () => {
    expect(sportModifiers(makeInput({ sport: 'soccer', bodyRegion: 'knee' }))[0]?.factor).toBe(1.1);
  });

  it('baseball + shoulder = 1.15', () => {
    expect(sportModifiers(makeInput({ sport: 'baseball', bodyRegion: 'shoulder' }))[0]?.factor).toBe(1.15);
  });

  it('gymnastics + wrist = 1.15', () => {
    expect(sportModifiers(makeInput({ sport: 'gymnastics', bodyRegion: 'wrist' }))[0]?.factor).toBe(1.15);
  });

  it('basketball + knee = 1.10', () => {
    expect(sportModifiers(makeInput({ sport: 'basketball', bodyRegion: 'knee' }))[0]?.factor).toBe(1.1);
  });

  it('non-matching sport+region combo returns []', () => {
    expect(sportModifiers(makeInput({ sport: 'swimming', bodyRegion: 'knee' }))).toEqual([]);
  });
});

describe('combined modifier cap', () => {
  it('caps the combined product at 1.40', () => {
    const result = computeCombinedModifier(
      makeInput({
        age: 13,
        sport: 'baseball',
        bodyRegion: 'elbow',
        bodySubregion: 'medial',
        onset: 'sudden',
      }),
    );
    expect(result.applied.length).toBeGreaterThanOrEqual(2);
    expect(result.combined).toBeLessThanOrEqual(MODIFIER_CAP + 1e-9);
    expect(result.capped).toBe(true);
  });

  it('no modifiers means combined is exactly 1.0', () => {
    const result = computeCombinedModifier(
      makeInput({ age: 30, sport: 'swimming', bodyRegion: 'shoulder', bodySubregion: 'side' }),
    );
    expect(result.applied).toEqual([]);
    expect(result.combined).toBe(1);
    expect(result.capped).toBe(false);
  });
});
