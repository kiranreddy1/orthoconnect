import { NextResponse } from 'next/server';
import { z } from 'zod';

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

  // Stub: persistence + Resend confirmation email land in the API-routes commit.
  // For now we just acknowledge so the homepage form is interactive end-to-end.
  return NextResponse.json({ ok: true });
}
