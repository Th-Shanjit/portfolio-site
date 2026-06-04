/** Product demo on YouTube — https://www.youtube.com/watch?v=07vjZy0WkCo */
export const PAPERLOOP_DEMO_VIDEO_ID =
  process.env.NEXT_PUBLIC_PAPERLOOP_DEMO_VIDEO_ID ?? '07vjZy0WkCo';

export const PAPERLOOP_DEMO_START_SECONDS = 3;

export const PAPERLOOP_DEMO_EMBED_URL = `https://www.youtube.com/embed/${PAPERLOOP_DEMO_VIDEO_ID}?start=${PAPERLOOP_DEMO_START_SECONDS}&rel=0`;

export const PAPERLOOP_DEMO_WATCH_URL = `https://www.youtube.com/watch?v=${PAPERLOOP_DEMO_VIDEO_ID}&t=${PAPERLOOP_DEMO_START_SECONDS}s`;
