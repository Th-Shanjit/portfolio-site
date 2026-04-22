import { track as vercelTrack } from '@vercel/analytics';

type EventProps = Record<string, string | number | boolean | null>;

export function track(event: string, props?: EventProps) {
  if (typeof window === 'undefined') return;
  try {
    vercelTrack(event, props);
  } catch {
    // no-op: analytics is best-effort
  }
}
