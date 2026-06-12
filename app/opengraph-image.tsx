import { ImageResponse } from 'next/og';
import { HERO_CONTENT } from '@/data/portfolio-static';

export const runtime = 'edge';
export const alt = `${HERO_CONTENT.title} — ${HERO_CONTENT.subtitle}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#f8f4ef',
          padding: '72px 80px',
          fontFamily: 'Georgia, serif',
          color: '#1c1916',
          position: 'relative',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            fontSize: 14,
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
            color: '#c8873c',
            fontFamily: 'ui-monospace, monospace',
          }}
        >
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: 9999,
              background: '#c8873c',
            }}
          />
          {HERO_CONTENT.subtitle}
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 32,
            maxWidth: 980,
          }}
        >
          <div
            style={{
              fontSize: 76,
              lineHeight: 1.04,
              letterSpacing: '-0.02em',
              color: '#1c1916',
              fontWeight: 400,
            }}
          >
            {HERO_CONTENT.description.slice(0, 80)}…
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 20,
              paddingTop: 28,
              borderTop: '1px solid #e6ded4',
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 12,
                background: '#1c1916',
                color: '#f8f4ef',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 26,
                fontWeight: 600,
              }}
            >
              {HERO_CONTENT.title.charAt(0)}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={{ fontSize: 24, color: '#1c1916' }}>{HERO_CONTENT.title}</div>
              <div
                style={{
                  fontSize: 14,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#7a7470',
                  fontFamily: 'ui-monospace, monospace',
                }}
              >
                shanjitthokchom.xyz
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            right: 80,
            bottom: 72,
            fontSize: 13,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#b8b2aa',
            fontFamily: 'ui-monospace, monospace',
          }}
        >
          Currently · PaperLoop
        </div>
      </div>
    ),
    size
  );
}
