import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  // Extract the country code from Vercel's edge headers
  const country = request.headers.get('x-vercel-ip-country');

  // If we are in local development, the header won't exist. Allow it.
  // If the header exists and it is strictly NOT "IN", block access.
  if (country && country !== 'IN') {
    // We use rewrite instead of redirect so the user's URL stays the same, 
    // but they see the custom blocked page.
    return NextResponse.rewrite(new URL('/geo-blocked', request.url));
  }

  // Otherwise, allow the request to proceed (India or Local)
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     * - geo-blocked (the blocked page itself to prevent infinite loops)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|geo-blocked).*)',
  ],
};
