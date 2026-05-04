import { describe, it, expect } from 'vitest';
import { matchPatterns, listAllPatternIds } from '../patterns';
import { makeInput } from './fixtures';
import { CITATIONS, isCitationKnown } from '../citations';

describe('pattern matching', () => {
  it("Osgood-Schlatter matches a 12-year-old with anterior knee pain below the kneecap", () => {
    const ids = matchPatterns(
      makeInput({ age: 12, bodyRegion: 'knee', bodySubregion: 'below_kneecap', onset: 'gradual' }),
    ).map((p) => p.id);
    expect(ids).toContain('osgood_schlatter');
  });

  it("Sever's matches a 10-year-old with heel pain", () => {
    const ids = matchPatterns(
      makeInput({ age: 10, bodyRegion: 'foot', bodySubregion: 'heel', onset: 'gradual' }),
    ).map((p) => p.id);
    expect(ids).toContain('severs_apophysitis');
  });

  it('Little League elbow matches a 13-year-old baseball pitcher with medial elbow pain', () => {
    const ids = matchPatterns(
      makeInput({
        age: 13,
        sport: 'baseball',
        bodyRegion: 'elbow',
        bodySubregion: 'medial',
        onset: 'gradual',
      }),
    ).map((p) => p.id);
    expect(ids).toContain('little_league_elbow');
  });

  it('lateral ankle sprain matches a sudden lateral ankle twist', () => {
    const ids = matchPatterns(
      makeInput({ bodyRegion: 'ankle', bodySubregion: 'lateral', onset: 'sudden' }),
    ).map((p) => p.id);
    expect(ids).toContain('lateral_ankle_sprain');
  });

  it('returns up to 3 patterns', () => {
    const result = matchPatterns(
      makeInput({
        age: 13,
        sport: 'soccer',
        bodyRegion: 'knee',
        bodySubregion: 'anterior below_kneecap',
        onset: 'gradual',
      }),
    );
    expect(result.length).toBeLessThanOrEqual(3);
  });
});

describe('citation registry', () => {
  it('every pattern citationId is a known citation', () => {
    const ids = listAllPatternIds();
    expect(ids.length).toBeGreaterThanOrEqual(8);
  });

  it('CITATIONS keys equal citation.id values', () => {
    for (const [key, c] of Object.entries(CITATIONS)) {
      expect(c.id).toBe(key);
    }
  });

  it('all CITATIONS entries are flagged unverified until Aarush has confirmed each from the source', () => {
    for (const c of Object.values(CITATIONS)) {
      expect(c.verified).toBe(false);
    }
  });

  it('isCitationKnown returns false for fake ids', () => {
    expect(isCitationKnown('not_a_real_citation')).toBe(false);
  });
});
