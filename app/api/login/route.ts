import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const expectedPass = process.env.ADMIN_PASS?.trim();

    // 🚀 FIX: Match the variable name to ADMIN_PASS
    if (password === expectedPass && expectedPass) {
      const response = NextResponse.json({ success: true });
      
      // Set a secure, HTTP-only cookie that lasts for 7 days
      response.cookies.set('admin_session', password, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7, 
        path: '/',
      });

      return response;
    }

    return NextResponse.json({ error: 'Invalid Password' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}