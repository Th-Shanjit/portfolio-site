/** YouTube video ID for the product demo (set NEXT_PUBLIC_PAPERLOOP_DEMO_VIDEO_ID in .env.local). */
export const PAPERLOOP_DEMO_VIDEO_ID =
  process.env.NEXT_PUBLIC_PAPERLOOP_DEMO_VIDEO_ID ?? '';

export const PAPERLOOP_DEMO_WATCH_URL = PAPERLOOP_DEMO_VIDEO_ID
  ? `https://www.youtube.com/watch?v=${PAPERLOOP_DEMO_VIDEO_ID}`
  : '';
