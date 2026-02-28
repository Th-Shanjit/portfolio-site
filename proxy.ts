import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 🚀 NEXT.JS 16 CONVENTION: Exporting as default function 'proxy'
export default function proxy(req: NextRequest) {
  const basicAuth = req.headers.get('authorization');
  const url = req.nextUrl;

  // Protect the Command Center UI and the Content API
  if (url.pathname.startsWith('/admin') || url.pathname.startsWith('/api/content')) {
    
    // Safely load and trim environment variables
    const expectedUser = process.env.ADMIN_USER?.trim();
    const expectedPass = process.env.ADMIN_PASS?.trim();

    // Safety check for environment variables
    if (!expectedUser || !expectedPass) {
      console.error("🚨 SECURITY ERROR: ADMIN_USER or ADMIN_PASS is missing in your environment variables!");
      return new NextResponse('Server Configuration Error: Missing Environment Variables.', { status: 500 });
    }

    if (basicAuth) {
      try {
        const authValue = basicAuth.split(' ')[1];
        const decodedString = atob(authValue);
        
        const colonIndex = decodedString.indexOf(':');
        const providedUser = decodedString.substring(0, colonIndex);
        const providedPass = decodedString.substring(colonIndex + 1);

        if (providedUser === expectedUser && providedPass === expectedPass) {
          return NextResponse.next(); // Success!
        } else {
          console.error(`🚨 LOGIN FAILED: Invalid credentials provided for ${providedUser}`);
        }
      } catch (e) {
        console.error("🚨 AUTH ERROR: Failed to decode authorization header");
      }
    }

    // Trigger the browser's native login popup
    return new NextResponse('Authentication required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Command Center"',
      },
    });
  }

  return NextResponse.next();
}

// matcher ensures this logic only runs on the paths we want to secure
export const config = {
  matcher: [
    '/admin/:path*', 
    '/api/content/:path*'
  ],
};