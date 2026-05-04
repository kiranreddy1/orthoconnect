import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const host = req.headers.get('host') ?? '';
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
