import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

export const dynamic = 'force-dynamic';

const SUPPORT_EMAIL = 'hello@shanjitthokchom.xyz';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const getRedis = () => {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
};

async function sendNotificationEmail(email: string, source: string) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  if (!apiKey || !from) return { sent: false, reason: 'resend not configured' };

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [SUPPORT_EMAIL],
        subject: `PaperLoop waitlist: ${email}`,
        text: `New access request.\n\nEmail: ${email}\nSource: ${source}\nAt: ${new Date().toISOString()}\n`,
      }),
    });
    if (!res.ok) {
      const body = await res.text();
      return { sent: false, reason: `resend ${res.status}: ${body}` };
    }
    return { sent: true };
  } catch (err) {
    return { sent: false, reason: (err as Error).message };
  }
}

export async function POST(request: Request) {
  let email = '';
  let source = 'paperloop-download';
  try {
    const body = await request.json();
    email = String(body?.email || '').trim().toLowerCase();
    if (body?.source) source = String(body.source);
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  if (!email || !EMAIL_RE.test(email) || email.length > 320) {
    return NextResponse.json({ error: 'Please provide a valid email.' }, { status: 400 });
  }

  const redis = getRedis();
  let persisted = false;

  if (redis) {
    try {
      await redis.sadd('waitlist_emails', email);
      await redis.lpush(
        'waitlist_events',
        JSON.stringify({ email, source, at: Date.now() })
      );
      await redis.ltrim('waitlist_events', 0, 999);
      persisted = true;
    } catch (err) {
      console.error('waitlist redis write failed:', err);
    }
  }

  const notify = await sendNotificationEmail(email, source);

  if (!persisted && !notify.sent) {
    return NextResponse.json(
      { error: 'We could not record your request. Please email us directly.' },
      { status: 503 }
    );
  }

  return NextResponse.json({ ok: true, persisted, notified: notify.sent });
}
