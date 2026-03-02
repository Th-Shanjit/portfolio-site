import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import fallbackData from '@/data/portfolio.json';

export const dynamic = 'force-dynamic';

// 🚀 Automatically connects using Vercel's injected environment variables
const redis = Redis.fromEnv();

export async function GET() {
  try {
    let data = await redis.get('portfolio_data');

    // Seed the database if it's completely empty
    if (!data) {
      console.log("Seeding Upstash database for the first time...");
      await redis.set('portfolio_data', fallbackData);
      data = fallbackData;
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Upstash GET Error:", error);
    return NextResponse.json(fallbackData);
  }
}

export async function POST(request: Request) {
  try {
    const newData = await request.json();
    
    // 🚀 Instantly save the updated architecture to the cloud
    await redis.set('portfolio_data', newData);
    
    return NextResponse.json({ message: 'Cloud database updated instantly.' });
  } catch (error: any) {
    console.error("Upstash Save Error:", error);
    return NextResponse.json({ error: error.message || 'Failed to save to cloud' }, { status: 500 });
  }
}