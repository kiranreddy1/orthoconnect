export interface Citation {
  id: string;
  authors: string;
  year: number;
  title: string;
  journal: string;
  doi?: string;
  url?: string;
  verified: boolean;
}

export const CITATIONS: Record<string, Citation> = {
  brenner_2007: {
    id: 'brenner_2007',
    authors: 'Brenner JS; American Academy of Pediatrics Council on Sports Medicine and Fitness',
    year: 2007,
    title: 'Overuse injuries, overtraining, and burnout in child and adolescent athletes',
    journal: 'Pediatrics',
    doi: '10.1542/peds.2007-0887',
    verified: false,
  },
  difiori_2014: {
    id: 'difiori_2014',
    authors: 'DiFiori JP, Benjamin HJ, Brenner JS, et al.',
    year: 2014,
    title: 'Overuse injuries and burnout in youth sports: a position statement from the American Medical Society for Sports Medicine',
    journal: 'British Journal of Sports Medicine',
    doi: '10.1136/bjsports-2013-093299',
    verified: false,
  },
  aossm_specialization_2016: {
    id: 'aossm_specialization_2016',
    authors: 'LaPrade RF, Agel J, Baker J, et al.',
    year: 2016,
    title: 'AOSSM Early Sport Specialization Consensus Statement',
    journal: 'Orthopaedic Journal of Sports Medicine',
    doi: '10.1177/2325967116644241',
    verified: false,
  },
  ottawa_knee_stiell_1995: {
    id: 'ottawa_knee_stiell_1995',
    authors: 'Stiell IG, Greenberg GH, Wells GA, et al.',
    year: 1995,
    title: 'Derivation of a decision rule for the use of radiography in acute knee injuries',
    journal: 'Annals of Emergency Medicine',
    verified: false,
  },
  ottawa_ankle_bachmann_2003: {
    id: 'ottawa_ankle_bachmann_2003',
    authors: 'Bachmann LM, Kolb E, Koller MT, Steurer J, ter Riet G',
    year: 2003,
    title: 'Accuracy of Ottawa ankle rules to exclude fractures of the ankle and mid-foot: systematic review',
    journal: 'BMJ',
    verified: false,
  },
  caine_2006: {
    id: 'caine_2006',
    authors: 'Caine D, DiFiori J, Maffulli N',
    year: 2006,
    title: "Physeal injuries in children's and youth sports: reasons for concern?",
    journal: 'British Journal of Sports Medicine',
    verified: false,
  },
  maffulli_2010: {
    id: 'maffulli_2010',
    authors: 'Maffulli N, Longo UG, Spiezia F, Denaro V',
    year: 2010,
    title: 'Sports injuries in young athletes: long-term outcome and prevention strategies',
    journal: 'The Physician and Sportsmedicine',
    verified: false,
  },
};

export function getCitations(ids: string[]): Citation[] {
  return ids.map((id) => CITATIONS[id]).filter((c): c is Citation => c !== undefined);
}

export function isCitationKnown(id: string): boolean {
  return id in CITATIONS;
}
