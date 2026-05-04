import type { AssessmentInput, MatchedPattern } from './types';

interface PatternTemplate {
  id: string;
  title: string;
  description: string;
  contributingFactors: (input: AssessmentInput) => string[];
  citationIds: string[];
  matches: (input: AssessmentInput) => boolean;
}

const sub = (input: AssessmentInput, ...keywords: string[]): boolean => {
  const s = input.bodySubregion.toLowerCase();
  return keywords.some((k) => s.includes(k));
};

const isJumpingSport = (s: string) => ['volleyball', 'basketball', 'soccer'].includes(s.toLowerCase());
const isRunningSport = (s: string) => ['running', 'cross_country', 'track', 'soccer'].includes(s.toLowerCase());
const isThrowingSport = (s: string) => ['baseball', 'softball', 'tennis', 'volleyball'].includes(s.toLowerCase());

const PATTERN_TEMPLATES: PatternTemplate[] = [
  {
    id: 'osgood_schlatter',
    title: 'Pattern consistent with Osgood-Schlatter',
    description:
      'In athletes whose growth plates are still open, anterior knee pain just below the kneecap that worsens with running and jumping is commonly associated with irritation of the tibial tubercle apophysis. It is usually self-limiting but typically benefits from temporary load reduction.',
    contributingFactors: (input) => [
      `Age ${input.age} is within the range where the tibial tubercle apophysis is still open.`,
      'Jumping and sprinting concentrate force at the patellar tendon insertion.',
    ],
    citationIds: ['caine_2006', 'difiori_2014'],
    matches: (input) =>
      input.age < 16 &&
      input.bodyRegion === 'knee' &&
      sub(input, 'below_kneecap', 'below kneecap', 'anterior') &&
      input.onset !== 'sudden',
  },
  {
    id: 'patellar_tendon_overuse',
    title: 'Pattern consistent with patellar tendon overuse',
    description:
      "Anterior knee pain that builds gradually with jumping, sprinting, or landing — sometimes called \"jumper's knee\" — often reflects patellar tendon overuse. It typically responds to brief load reduction and a structured return-to-play.",
    contributingFactors: (input) => [
      `${input.sport} involves repeated jumping or sprinting load on the patellar tendon.`,
    ],
    citationIds: ['difiori_2014'],
    matches: (input) =>
      input.bodyRegion === 'knee' &&
      sub(input, 'anterior', 'below_kneecap', 'below kneecap', 'front') &&
      input.onset !== 'sudden' &&
      isJumpingSport(input.sport) &&
      input.age >= 14,
  },
  {
    id: 'severs_apophysitis',
    title: "Pattern consistent with Sever's apophysitis",
    description:
      'In skeletally immature athletes, heel pain that worsens with running and jumping is commonly associated with irritation of the calcaneal apophysis. It usually resolves with growth and a brief activity reduction, sometimes plus heel cushioning.',
    contributingFactors: (input) => [
      `Age ${input.age} is within the range where the calcaneal apophysis is still open.`,
      'Running and jumping place repeated tensile load on the Achilles attachment.',
    ],
    citationIds: ['caine_2006'],
    matches: (input) =>
      input.age < 14 &&
      (input.bodyRegion === 'foot' || input.bodyRegion === 'ankle') &&
      sub(input, 'heel', 'posterior') &&
      input.onset !== 'sudden',
  },
  {
    id: 'little_league_elbow',
    title: 'Pattern consistent with Little League elbow',
    description:
      'Medial elbow pain in a young throwing athlete is commonly associated with irritation of the medial epicondyle growth plate. Continuing to throw through this pattern is the main risk factor for it worsening.',
    contributingFactors: (input) => [
      `Age ${input.age} is within the range where the medial epicondyle apophysis is still open.`,
      'Throwing places repetitive valgus stress on the medial elbow.',
    ],
    citationIds: ['caine_2006', 'difiori_2014'],
    matches: (input) =>
      input.age < 16 &&
      input.bodyRegion === 'elbow' &&
      sub(input, 'medial', 'inner') &&
      isThrowingSport(input.sport),
  },
  {
    id: 'rotator_cuff_overuse',
    title: 'Pattern consistent with rotator cuff overuse',
    description:
      'Anterior or top-of-shoulder pain that builds gradually with overhead activity often reflects rotator cuff overuse. It usually responds to a brief load reduction and a structured shoulder strengthening program.',
    contributingFactors: (input) => [
      `${input.sport} involves repetitive overhead motion that loads the rotator cuff.`,
    ],
    citationIds: ['difiori_2014'],
    matches: (input) =>
      input.bodyRegion === 'shoulder' &&
      sub(input, 'anterior', 'front', 'top') &&
      input.onset !== 'sudden' &&
      isThrowingSport(input.sport),
  },
  {
    id: 'lateral_ankle_sprain',
    title: 'Pattern consistent with a lateral ankle ligament sprain',
    description:
      'Lateral ankle pain that started suddenly with a twist or roll is commonly associated with stretching or partial tearing of the lateral ankle ligaments. Rest, protection, and a graded return to activity are the typical pathway.',
    contributingFactors: () => ['A sudden twisting or inversion mechanism is the classic trigger for this pattern.'],
    citationIds: ['ottawa_ankle_bachmann_2003'],
    matches: (input) => input.bodyRegion === 'ankle' && sub(input, 'lateral', 'outside') && input.onset === 'sudden',
  },
  {
    id: 'medial_tibial_stress',
    title: 'Pattern consistent with medial tibial stress (shin splints)',
    description:
      'Pain along the inside of the lower leg that builds with running mileage is commonly associated with medial tibial stress syndrome. Reducing load and addressing training-volume changes is the usual first step.',
    contributingFactors: (input) => [
      `${input.sport} can produce rapid increases in repetitive ground impact.`,
      'Recent changes in training volume, surface, or footwear are common contributors.',
    ],
    citationIds: ['difiori_2014'],
    matches: (input) =>
      (input.bodyRegion === 'foot' || input.bodyRegion === 'ankle') &&
      sub(input, 'shin', 'medial', 'inside') &&
      input.onset !== 'sudden' &&
      isRunningSport(input.sport),
  },
  {
    id: 'iliotibial_band',
    title: 'Pattern consistent with iliotibial band syndrome',
    description:
      'Lateral knee pain in a runner or cyclist that builds during longer sessions often reflects iliotibial band irritation. Load reduction and hip-strength work are typical components of recovery.',
    contributingFactors: (input) => [`${input.sport} involves repetitive flexion-extension cycles at the knee.`],
    citationIds: ['difiori_2014'],
    matches: (input) =>
      input.bodyRegion === 'knee' &&
      sub(input, 'lateral', 'outside') &&
      input.onset !== 'sudden' &&
      isRunningSport(input.sport),
  },
  {
    id: 'lumbar_overuse',
    title: 'Pattern consistent with lumbar overuse',
    description:
      'Lower-back pain that builds gradually with high-volume training is commonly associated with overuse rather than a structural injury — but persistent or worsening back pain in young athletes is one of the cases where earlier evaluation is recommended.',
    contributingFactors: () => [
      'Repetitive bending, twisting, or extension under load can drive this pattern.',
      'Sudden ramps in training volume are a common trigger.',
    ],
    citationIds: ['brenner_2007', 'difiori_2014'],
    matches: (input) => input.bodyRegion === 'lower_back' && input.onset !== 'sudden',
  },
  {
    id: 'gymnast_wrist',
    title: 'Pattern consistent with wrist load stress',
    description:
      "Wrist pain in a gymnast or weight-bearing-on-hands athlete is commonly associated with load stress on the distal radius — a notable concern in skeletally immature athletes. Earlier evaluation is recommended when pain persists.",
    contributingFactors: (input) => [`${input.sport} repeatedly loads the wrist as a weight-bearing joint.`],
    citationIds: ['caine_2006', 'maffulli_2010'],
    matches: (input) =>
      input.bodyRegion === 'wrist' &&
      input.onset !== 'sudden' &&
      input.sport.toLowerCase() === 'gymnastics',
  },
];

export function matchPatterns(input: AssessmentInput, limit = 3): MatchedPattern[] {
  const matched = PATTERN_TEMPLATES.filter((p) => p.matches(input));
  return matched.slice(0, limit).map((p) => ({
    id: p.id,
    title: p.title,
    description: p.description,
    contributingFactors: p.contributingFactors(input),
    citationIds: p.citationIds,
  }));
}

export function listAllPatternIds(): string[] {
  return PATTERN_TEMPLATES.map((p) => p.id);
}
