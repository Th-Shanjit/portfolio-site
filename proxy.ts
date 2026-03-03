import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. ALLOW public access to docs and content APIs
  if (
    pathname.startsWith('/docs') || 
    pathname.startsWith('/api/content') || 
    pathname.startsWith('/api/views')
  ) {
    return NextResponse.next();
  }

  // 2. PROTECT the Admin Dashboard
  if (pathname.startsWith('/admin')) {
    const adminSession = request.cookies.get('admin_session');
    
    if (!adminSession) {
      // Redirect to login if no session is found
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

// 🚀 CRITICAL: Matcher must be specific to avoid intercepting 
// static assets like images and CSS, which causes "Document Unavailable"
export const config = {
  matcher: [
    '/admin/:path*',
    '/api/:path*',
    '/docs/:path*',
  ],
};