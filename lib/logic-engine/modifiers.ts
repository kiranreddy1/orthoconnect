import type { AssessmentInput, ModifierApplied } from './types';
import { MODIFIER_CAP } from './types';

const LOWER_BODY_REGIONS = new Set(['knee', 'ankle', 'hip', 'lower_back', 'foot']);
const THROWING_SPORTS = new Set(['baseball', 'softball', 'tennis', 'volleyball']);

function bmi(input: AssessmentInput): number | null {
  if (!input.heightCm || !input.weightKg) return null;
  const heightM = input.heightCm / 100;
  if (heightM <= 0) return null;
  return input.weightKg / (heightM * heightM);
}

export function ageModifiers(input: AssessmentInput): ModifierApplied[] {
  const out: ModifierApplied[] = [];
  const sub = input.bodySubregion.toLowerCase();
  const subBelowKneecap = sub.includes('below_kneecap') || sub.includes('below kneecap');

  if (input.age < 14 && input.bodyRegion === 'knee' && subBelowKneecap) {
    out.push({
      id: 'age_under_14_anterior_knee',
      factor: 1.2,
      reason: "Anterior knee pain below the kneecap in athletes under 14 can involve the tibial growth plate (Osgood-Schlatter pattern). We weight these patterns higher so they get an earlier look.",
    });
  }
  if (input.age < 14 && (input.bodyRegion === 'foot' || sub.includes('heel'))) {
    out.push({
      id: 'age_under_14_heel',
      factor: 1.2,
      reason: "Heel pain in athletes under 14 can involve the calcaneal apophysis (Sever's pattern). We weight these patterns higher so they get an earlier look.",
    });
  }
  if (input.age < 16 && input.bodyRegion === 'elbow' && sub.includes('medial') && THROWING_SPORTS.has(input.sport)) {
    out.push({
      id: 'age_under_16_medial_elbow_throwing',
      factor: 1.3,
      reason: 'Medial elbow pain in a throwing athlete under 16 can involve the medial epicondyle growth plate (Little League elbow pattern). Earlier evaluation is warranted.',
    });
  }
  if (input.age < 16 && input.onset === 'sudden') {
    out.push({
      id: 'age_under_16_acute_injury',
      factor: 1.15,
      reason: 'Acute joint injuries in skeletally immature athletes carry growth-plate fracture risk. We weight these higher so they are not dismissed as "just a sprain".',
    });
  }
  return out;
}

export function bmiModifiers(input: AssessmentInput): ModifierApplied[] {
  if (!LOWER_BODY_REGIONS.has(input.bodyRegion)) return [];
  const value = bmi(input);
  if (value === null) return [];
  if (value >= 30) {
    return [
      {
        id: 'bmi_high_lower_body',
        factor: 1.1,
        reason: 'Higher load on lower-body joints can amplify overuse patterns. Used as a load factor only — never displayed back to the user.',
      },
    ];
  }
  if (value >= 25) {
    return [
      {
        id: 'bmi_elevated_lower_body',
        factor: 1.05,
        reason: 'Slightly elevated load on lower-body joints. Used as a load factor only — never displayed back to the user.',
      },
    ];
  }
  return [];
}

export function sportModifiers(input: AssessmentInput): ModifierApplied[] {
  const sport = input.sport.toLowerCase();
  const region = input.bodyRegion;

  if (sport === 'soccer' && region === 'knee') {
    return [{ id: 'sport_soccer_knee', factor: 1.1, reason: 'Soccer is a high-knee-injury sport per youth injury surveillance data.' }];
  }
  if ((sport === 'baseball' || sport === 'softball') && (region === 'shoulder' || region === 'elbow')) {
    return [{ id: 'sport_throwing_arm', factor: 1.15, reason: 'Overhead throwing places repetitive load on the shoulder and elbow.' }];
  }
  if ((sport === 'running' || sport === 'cross_country' || sport === 'track') && (region === 'foot' || region === 'ankle' || region === 'lower_back')) {
    return [{ id: 'sport_running_lower', factor: 1.1, reason: 'High-volume repetitive loading is characteristic of running-related overuse patterns.' }];
  }
  if (sport === 'gymnastics' && region === 'wrist') {
    return [{ id: 'sport_gymnastics_wrist', factor: 1.15, reason: 'Weight-bearing on the upper extremity is unusual and the wrist is a known stress point in gymnasts.' }];
  }
  if ((sport === 'volleyball' || sport === 'basketball') && region === 'knee') {
    return [{ id: 'sport_jumping_knee', factor: 1.1, reason: "Jumping-sport athletes show elevated rates of patellar tendon overuse (jumper's knee)." }];
  }
  return [];
}

export interface ModifierResult {
  applied: ModifierApplied[];
  combined: number;
  capped: boolean;
}

export function computeCombinedModifier(input: AssessmentInput): ModifierResult {
  const applied = [...ageModifiers(input), ...bmiModifiers(input), ...sportModifiers(input)];
  const product = applied.reduce((acc, m) => acc * m.factor, 1);
  const capped = product > MODIFIER_CAP;
  return {
    applied,
    combined: capped ? MODIFIER_CAP : product,
    capped,
  };
}
