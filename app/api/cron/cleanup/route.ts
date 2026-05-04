import { NextResponse } from 'next/server';
import { lt } from 'drizzle-orm';
import { getDb, schema } from '@/lib/db/client';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const expected = process.env.CRON_SECRET;
  const provided = request.headers.get('x-cron-secret');
  if (!expected || provided !== expected) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ error: 'No database configured.' }, { status: 503 });
  }

  const cutoff = new Date();
  cutoff.setMonth(cutoff.getMonth() - 12);

  try {
    const db = getDb();
    const deleted = await db.delete(schema.assessments).where(lt(schema.assessments.createdAt, cutoff)).returning({ id: schema.assessments.id });
    return NextResponse.json({ ok: true, deletedCount: deleted.length, cutoff: cutoff.toISOString() });
  } catch (err) {
    console.error('cleanup failed', err);
    return NextResponse.json({ error: 'Cleanup failed.' }, { status: 500 });
  }
}
