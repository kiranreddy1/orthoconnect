import { NextResponse } from 'next/server';
import { randomUUID } from 'node:crypto';
import { z } from 'zod';
import {
  ACTIVITY_FREQUENCIES,
  BODY_REGIONS,
  DURATIONS,
  FUNCTIONAL_IMPACTS,
  ONSETS,
  PAIN_QUALITIES,
  PROGRESSIONS,
  RED_FLAGS,
  SEX_AT_BIRTH,
  WORST_WHEN,
} from '@/lib/logic-engine/types';
import { assessAwareness } from '@/lib/logic-engine';
import { saveReport } from '@/lib/report-store';

const AssessmentSchema = z.object({
  age: z.number().int().min(13).max(120),
  sexAtBirth: z.enum(SEX_AT_BIRTH).optional(),
  heightCm: z.number().int().min(60).max(260).optional(),
  weightKg: z.number().int().min(15).max(300).optional(),
  sport: z.string().min(1).max(50),
  activityFrequency: z.enum(ACTIVITY_FREQUENCIES),
  bodyRegion: z.enum(BODY_REGIONS),
  bodySubregion: z.string().min(1).max(80),
  redFlags: z.array(z.enum(RED_FLAGS)),
  onset: z.enum(ONSETS),
  duration: z.enum(DURATIONS),
  painQuality: z.enum(PAIN_QUALITIES),
  severity: z.number().int().min(0).max(10),
  worstWhen: z.enum(WORST_WHEN),
  worseTriggers: z.array(z.string().max(50)).max(20),
  betterTriggers: z.array(z.string().max(50)).max(20),
  functionalImpact: z.enum(FUNCTIONAL_IMPACTS),
  progression: z.enum(PROGRESSIONS).optional(),
  freeText: z.string().max(500).optional(),
});

const EMAIL_RE = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/gi;
const PHONE_RE = /(\+?\d[\d\s().-]{7,}\d)/g;

function scrubFreeText(text: string | undefined): string | undefined {
  if (!text) return text;
  return text.replace(EMAIL_RE, '[email removed]').replace(PHONE_RE, '[number removed]');
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON.' }, { status: 400 });
  }

  const parsed = AssessmentSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Some answers are missing or look invalid. Please go back and check.', details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const input = { ...parsed.data, freeText: scrubFreeText(parsed.data.freeText) };
  const report = assessAwareness(input);
  const id = randomUUID();

  try {
    await saveReport({ id, createdAt: new Date().toISOString(), input, report });
  } catch (err) {
    console.error('saveReport failed', err);
    return NextResponse.json({ error: 'Could not save your report. Please try again.' }, { status: 500 });
  }

  return NextResponse.json({ id });
}
