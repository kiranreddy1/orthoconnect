import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getDb, schema } from '@/lib/db/client';

const SubscribeSchema = z.object({
  email: z.string().email(),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON.' }, { status: 400 });
  }

  const parsed = SubscribeSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  }

  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ error: 'Storage not configured.' }, { status: 503 });
  }

  try {
    const db = getDb();
    await db.insert(schema.emailSubscribers).values({ email: parsed.data.email });
  } catch (err) {
    const msg = err instanceof Error ? err.message : '';
    // Unique constraint on email — already subscribed. Treat as idempotent success.
    if (/duplicate key|email_subscribers_email_unique|unique constraint/i.test(msg)) {
      return NextResponse.json({ ok: true, alreadySubscribed: true });
    }
    console.error('subscribe insert failed', err);
    return NextResponse.json({ error: 'Could not save your subscription right now.' }, { status: 500 });
  }

  // TODO: when RESEND_API_KEY is set, send a welcome email here.
  return NextResponse.json({ ok: true });
}
