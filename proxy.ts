import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 🚀 Use 'export default' so Next.js recognizes the proxy handler
export default function proxy(req: NextRequest) {
  const url = req.nextUrl;

  // Protect Admin UI and Content API
  if (url.pathname.startsWith('/admin') || url.pathname.startsWith('/api/content')) {
    
    // Check for the session cookie set by your /api/login route
    const session = req.cookies.get('admin_session')?.value;
    const expectedPass = process.env.ADMIN_PASS?.trim();

    // If no valid session exists, enforce protection
    if (!session || session !== expectedPass) {
      
      // If they are trying to view the Admin UI, redirect to your /login page
      if (url.pathname.startsWith('/admin')) {
        return NextResponse.redirect(new URL('/login', req.url));
      }

      // If they are trying to hit the API directly, return a 401
      return new NextResponse('Unauthorized', { status: 401 });
    }
  }

  return NextResponse.next();
}

// 🚀 Matcher must include the base '/admin' to catch the dashboard load
export const config = {
  matcher: [
    '/admin', 
    '/admin/:path*', 
    '/api/content/:path*'
  ],
};