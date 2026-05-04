import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // SWA's edge rewrites the Host header before middleware runs, so the original
  // user-facing host lives in x-forwarded-host. Check that first, fall back to host.
  const host = (req.headers.get('x-forwarded-host') ?? req.headers.get('host') ?? '').toLowerCase();
  if (host === 'www.orthoconnect.care') {
    const url = new URL(req.url);
    url.host = 'orthoconnect.care';
    url.protocol = 'https:';
    return NextResponse.redirect(url.toString(), 308);
  }
  return NextResponse.next();
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};
