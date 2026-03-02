import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function proxy(req: NextRequest) {
  const url = req.nextUrl;

  // 🚀 Protect Admin UI and Content API
  if (url.pathname.startsWith('/admin') || url.pathname.startsWith('/api/content')) {
    
    // Check for the session cookie set by your /login page
    const session = req.cookies.get('admin_session')?.value;
    const expectedPass = process.env.ADMIN_PASS?.trim();

    // If no valid session exists, enforce protection
    if (!session || session !== expectedPass) {
      
      // If they are on the dashboard, redirect to your custom /login page
      if (url.pathname.startsWith('/admin')) {
        return NextResponse.redirect(new URL('/login', req.url));
      }

      // If they hit the API directly without a cookie, block them
      return new NextResponse('Unauthorized Access', { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin', 
    '/admin/:path*', 
    '/api/content/:path*'
  ],
};