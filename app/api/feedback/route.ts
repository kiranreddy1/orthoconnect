import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getDb, schema } from '@/lib/db/client';

const FeedbackSchema = z.object({
  rating: z.number().int().min(1).max(5).nullable().optional(),
  message: z.string().min(1).max(2000),
  email: z.string().email().max(255).nullable().optional(),
});

const EMAIL_RE = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/gi;
const PHONE_RE = /(\+?\d[\d\s().-]{7,}\d)/g;

function scrubMessage(text: string): string {
  return text.replace(EMAIL_RE, '[email removed]').replace(PHONE_RE, '[number removed]');
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON.' }, { status: 400 });
  }

  const parsed = FeedbackSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Please check the form and try again.' }, { status: 400 });
  }

  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ error: 'Storage not configured.' }, { status: 503 });
  }

  try {
    const db = getDb();
    await db.insert(schema.feedback).values({
      rating: parsed.data.rating ?? null,
      message: scrubMessage(parsed.data.message),
      email: parsed.data.email ?? null,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('feedback insert failed', err);
    return NextResponse.json({ error: 'Could not save your feedback right now.' }, { status: 500 });
  }
}
