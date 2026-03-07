import { NextResponse } from 'next/server';

// Required env vars:
// LINKEDIN_ACCESS_TOKEN — OAuth 2.0 bearer token with r_member_social scope
// LINKEDIN_PERSON_URN   — e.g. "urn:li:person:abc123" (from GET /v2/userinfo)

export const revalidate = 3600; // 1-hour caching

export async function GET() {
  const token = process.env.LINKEDIN_ACCESS_TOKEN;
  const personUrn = process.env.LINKEDIN_PERSON_URN;

  if (!token || !personUrn) {
    return NextResponse.json({ error: "LinkedIn credentials not configured." }, { status: 500 });
  }

  try {
    const headers = {
      'Authorization': `Bearer ${token}`,
      'X-Restli-Protocol-Version': '2.0.0',
      'LinkedIn-Version': '202304',
    };

      const response = await fetch(`https://api.linkedin.com/v2/ugcPosts?q=authors&authors=List(${encodeURIComponent(personUrn)})&count=6&sortBy=LAST_MODIFIED`, {
      headers,
      next: { revalidate: 3600 }
    });
    
    if (!response.ok) {
      const errorData = await response.text();
      return NextResponse.json({ error: `LinkedIn API error: ${response.status} ${errorData}` }, { status: response.status });
    }

    const data = await response.json();
    const elements = data.elements || [];

    const posts = await Promise.all(elements.map(async (element: any) => {
      const postId = element.id;
      const createdAt = element.created?.time || Date.now();
      let text = '';
      let postUrl = `https://www.linkedin.com/feed/update/${postId}`;
      let thumbnail = '';

      const specificContent = element.specificContent?.['com.linkedin.ugc.ShareContent'];
      if (specificContent) {
        text = specificContent.shareCommentary?.text || '';
        const media = specificContent.media?.[0];
        if (media) {
          thumbnail = media.thumbnails?.[0]?.url || '';
        }
      }

      let likes = 0;
      let comments = 0;

      try {
        const socialResponse = await fetch(`https://api.linkedin.com/v2/socialActions/${encodeURIComponent(postId)}`, {
          headers,
          next: { revalidate: 3600 }
        });
        if (socialResponse.ok) {
          const socialData = await socialResponse.json();
          likes = socialData.likesSummary?.totalLikes || 0;
          comments = socialData.commentsSummary?.totalComments || 0; 
        }
      } catch (e) {
        // Ignore stats fetch failure
      }

      return {
        id: postId,
        text,
        thumbnail,
        postUrl,
        likes,
        comments,
        createdAt
      };
    }));

    return NextResponse.json({ posts });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch LinkedIn posts" }, { status: 500 });
  }
}