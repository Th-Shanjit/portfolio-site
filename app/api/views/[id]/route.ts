import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await context.params;
    const id = resolvedParams.id;

    // Fetch the live database from Upstash
    let data: any = await redis.get('portfolio_data');
    
    if (!data) return NextResponse.json({ error: 'Database empty' }, { status: 404 });

    // Find the document and increment views
    const docIndex = data.docs.findIndex((d: any) => d.id === id);
    
    if (docIndex !== -1) {
      data.docs[docIndex].views = (data.docs[docIndex].views || 0) + 1;
      
      // Save the new view count back to the cloud
      await redis.set('portfolio_data', data);
      
      return NextResponse.json({ views: data.docs[docIndex].views });
    }

    return NextResponse.json({ error: 'Document not found' }, { status: 404 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}