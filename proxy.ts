import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(req: NextRequest) {
  const basicAuth = req.headers.get('authorization');
  const url = req.nextUrl;

  if (url.pathname.startsWith('/admin') || url.pathname.startsWith('/api/content')) {
    
    // 🚀 FIX 1: Safely load and trim hidden spaces/characters from env vars
    const expectedUser = process.env.ADMIN_USER?.trim();
    const expectedPass = process.env.ADMIN_PASS?.trim();

    // 🚀 FIX 2: If the env vars aren't loaded, throw a 500 error instead of an infinite 401 loop
    if (!expectedUser || !expectedPass) {
      console.error("🚨 SECURITY ERROR: ADMIN_USER or ADMIN_PASS is missing in .env.local!");
      return new NextResponse('Server Configuration Error: Missing Environment Variables. Check your terminal.', { status: 500 });
    }

    if (basicAuth) {
      const authValue = basicAuth.split(' ')[1];
      const decodedString = atob(authValue);
      
      // 🚀 FIX 3: Safely extract user and pass even if the password contains a colon
      const colonIndex = decodedString.indexOf(':');
      const providedUser = decodedString.substring(0, colonIndex);
      const providedPass = decodedString.substring(colonIndex + 1);

      if (providedUser === expectedUser && providedPass === expectedPass) {
        return NextResponse.next(); // Success! Let them in.
      } else {
        // 🚀 FIX 4: Print exactly what went wrong to your terminal
        console.error(`🚨 LOGIN FAILED: Expected user '${expectedUser}', but got '${providedUser}'`);
      }
    }

    return new NextResponse('Authentication required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Command Center"',
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*', 
    '/api/content/:path*'
  ],
};