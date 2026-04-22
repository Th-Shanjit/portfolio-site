import { ImageResponse } from 'next/og';
import { getPortfolio } from '@/lib/getPortfolio';

export const runtime = 'nodejs';
export const alt = 'Writing — Shanjit Thokchom';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function DocOG({ params }: { params: { slug: string } }) {
  const data = await getPortfolio();
  const doc = data.docs?.find((d) => d.id === params.slug);
  const title = doc?.title || 'Writing';
  const tag = doc?.tag || doc?.type || 'Case study';
  const readTime = doc?.readTime || '';
  const authorName = data.site?.name || 'Shanjit Thokchom';

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
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            fontSize: 14,
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
            color: '#c8873c',
            fontFamily: 'ui-monospace, monospace',
          }}
        >
          <span
            style={{
              padding: '6px 14px',
              borderRadius: 9999,
              background: 'rgba(200,135,60,0.12)',
              border: '1px solid rgba(200,135,60,0.3)',
            }}
          >
            {tag}
          </span>
          {readTime && <span style={{ color: '#7a7470' }}>{readTime}</span>}
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 28,
            maxWidth: 1040,
          }}
        >
          <div
            style={{
              fontSize: title.length > 60 ? 58 : 70,
              lineHeight: 1.08,
              letterSpacing: '-0.02em',
              color: '#1c1916',
              fontWeight: 400,
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              paddingTop: 24,
              borderTop: '1px solid #e6ded4',
              fontSize: 18,
              color: '#7a7470',
            }}
          >
            <span>{authorName}</span>
            <span style={{ color: '#c8bfb2' }}>·</span>
            <span
              style={{
                fontSize: 13,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                fontFamily: 'ui-monospace, monospace',
                color: '#b8b2aa',
              }}
            >
              shanjitthokchom.xyz
            </span>
          </div>
        </div>

        <div
          style={{
            alignSelf: 'flex-end',
            fontSize: 13,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#b8b2aa',
            fontFamily: 'ui-monospace, monospace',
          }}
        >
          Writing · Case studies
        </div>
      </div>
    ),
    size
  );
}
