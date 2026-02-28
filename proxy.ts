import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 🚀 FIX: The function must now be explicitly named "proxy" for Next.js 16
export function proxy(req: NextRequest) {
  const basicAuth = req.headers.get('authorization');
  const url = req.nextUrl;

  // Protect Admin and API routes
  if (url.pathname.startsWith('/admin') || url.pathname.startsWith('/api/content')) {
    
    if (basicAuth) {
      const authValue = basicAuth.split(' ')[1];
      const [user, pwd] = atob(authValue).split(':');

      if (user === process.env.ADMIN_USER && pwd === process.env.ADMIN_PASS) {
        return NextResponse.next();
      }
    }

    // Trigger basic auth popup
    return new NextResponse('Authentication required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
      },
    });
  }

  return NextResponse.next();
}

// 🚀 Next.js Config to optimize when the proxy runs
export const config = {
  matcher: [
    '/admin/:path*', 
    '/api/content/:path*'
  ],
};