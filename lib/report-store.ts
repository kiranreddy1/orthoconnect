import type { AssessmentInput, AwarenessReport } from './logic-engine';
import { assessAwareness } from './logic-engine';

export interface StoredReport {
  id: string;
  createdAt: string;
  input: AssessmentInput;
  report: AwarenessReport;
}

declare global {
  // eslint-disable-next-line no-var
  var __ocReports: Map<string, StoredReport> | undefined;
}

function memStore(): Map<string, StoredReport> {
  if (!globalThis.__ocReports) {
    globalThis.__ocReports = new Map();
  }
  return globalThis.__ocReports;
}

export async function saveReport(report: StoredReport): Promise<void> {
  if (!process.env.DATABASE_URL) {
    memStore().set(report.id, report);
    return;
  }
  const { getDb, schema } = await import('./db/client');
  const db = getDb();
  await db.insert(schema.assessments).values({
    id: report.id,
    age: report.input.age,
    sexAtBirth: report.input.sexAtBirth ?? null,
    heightCm: report.input.heightCm ?? null,
    weightKg: report.input.weightKg ?? null,
    sport: report.input.sport,
    activityFrequency: report.input.activityFrequency,
    bodyRegion: report.input.bodyRegion,
    bodySubregion: report.input.bodySubregion,
    redFlags: report.input.redFlags,
    onset: report.input.onset,
    duration: report.input.duration,
    painQuality: report.input.painQuality,
    severity: report.input.severity,
    worstWhen: report.input.worstWhen,
    worseTriggers: report.input.worseTriggers,
    betterTriggers: report.input.betterTriggers,
    functionalImpact: report.input.functionalImpact,
    progression: report.input.progression ?? null,
    freeText: report.input.freeText ?? null,
    awarenessLevel: report.report.awarenessLevel,
    computedScore: report.report.finalScore,
    matchedPatterns: report.report.patterns.map((p) => p.id),
    modifiersApplied: report.report.modifiersApplied,
  });
}

export async function loadReport(id: string): Promise<StoredReport | null> {
  if (!process.env.DATABASE_URL) {
    return memStore().get(id) ?? null;
  }
  const { getDb, schema } = await import('./db/client');
  const { eq } = await import('drizzle-orm');
  const db = getDb();
  const rows = await db.select().from(schema.assessments).where(eq(schema.assessments.id, id)).limit(1);
  const row = rows[0];
  if (!row) return null;
  return rowToStoredReport(row);
}

type AssessmentRow = typeof import('./db/schema').assessments.$inferSelect;

function rowToStoredReport(row: AssessmentRow): StoredReport {
  // Re-running the engine from stored input keeps the report fresh if the engine evolves.
  // But for v1 we store the computed output and reconstruct minimally on read.
  const input: AssessmentInput = {
    age: row.age ?? 0,
    sexAtBirth: (row.sexAtBirth ?? undefined) as AssessmentInput['sexAtBirth'],
    heightCm: row.heightCm ?? undefined,
    weightKg: row.weightKg ?? undefined,
    sport: row.sport ?? '',
    activityFrequency: (row.activityFrequency ?? 'twice_or_three') as AssessmentInput['activityFrequency'],
    bodyRegion: (row.bodyRegion ?? 'knee') as AssessmentInput['bodyRegion'],
    bodySubregion: row.bodySubregion ?? '',
    redFlags: (row.redFlags ?? []) as AssessmentInput['redFlags'],
    onset: (row.onset ?? 'gradual') as AssessmentInput['onset'],
    duration: (row.duration ?? 'one_to_seven_days') as AssessmentInput['duration'],
    painQuality: (row.painQuality ?? 'dull_ache') as AssessmentInput['painQuality'],
    severity: row.severity ?? 0,
    worstWhen: (row.worstWhen ?? 'during_activity') as AssessmentInput['worstWhen'],
    worseTriggers: (row.worseTriggers ?? []) as string[],
    betterTriggers: (row.betterTriggers ?? []) as string[],
    functionalImpact: (row.functionalImpact ?? 'normal') as AssessmentInput['functionalImpact'],
    progression: (row.progression ?? undefined) as AssessmentInput['progression'],
    freeText: row.freeText ?? undefined,
  };

  const report = assessAwareness(input);

  return {
    id: row.id,
    createdAt: row.createdAt.toISOString(),
    input,
    report,
  };
}
