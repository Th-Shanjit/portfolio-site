import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 🚀 NEXT.JS 16 REQUIREMENT: The function must be the default export 
// and is typically named 'proxy' to match the filename.
export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. PUBLIC ROUTES: Allow everyone to see your Case Studies and hit the View Counter
  if (
    pathname.startsWith('/docs') || 
    pathname.startsWith('/api/content') || 
    pathname.startsWith('/api/views')
  ) {
    return NextResponse.next();
  }

  // 2. PROTECTED ROUTES: Lock down the Admin Dashboard
  if (pathname.startsWith('/admin')) {
    const adminSession = request.cookies.get('admin_session');
    
    // If no session cookie is found, redirect to your login page
    if (!adminSession) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

// Ensure the matcher is configured to intercept the correct paths
export const config = {
  matcher: [
    '/admin/:path*',
    '/api/:path*',
    '/docs/:path*',
    '/paperloop',
  ],
};