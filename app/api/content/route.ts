import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import fallbackData from '@/data/portfolio.json';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

// 🚀 Safely connect to Upstash
const getRedis = () => {
  try {
    if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
      return Redis.fromEnv();
    }
    return null;
  } catch (e) {
    return null;
  }
};

const redis = getRedis();

export async function GET() {
  try {
    if (redis) {
      let data = await redis.get('portfolio_data');
      if (!data) {
        console.log("Seeding Upstash database for the first time...");
        await redis.set('portfolio_data', fallbackData);
        data = fallbackData;
      }
      return NextResponse.json(data);
    }
  } catch (error: any) {
    console.error("Upstash GET Error:", error);
  }

  // Fallback to local file read for immediate updates in dev or when no Redis
  try {
    const filePath = path.join(process.cwd(), 'data', 'portfolio.json');
    const fileData = fs.readFileSync(filePath, 'utf8');
    return NextResponse.json(JSON.parse(fileData));
  } catch (e) {
    return NextResponse.json(fallbackData);
  }
}

export async function POST(request: Request) {
  try {
    const newData = await request.json();
    
    let savedToCloud = false;
    if (redis) {
      await redis.set('portfolio_data', newData);
      savedToCloud = true;
    }
    
    // Also try to save locally (mainly for local dev without Redis)
    let savedLocally = false;
    try {
      const filePath = path.join(process.cwd(), 'data', 'portfolio.json');
      fs.writeFileSync(filePath, JSON.stringify(newData, null, 2), 'utf8');
      savedLocally = true;
    } catch (e) {
      console.error("Failed to write local file", e);
    }

    if (!savedToCloud && !savedLocally) {
      throw new Error("Failed to save to both Cloud and Local Storage.");
    }
    
    return NextResponse.json({ message: 'Database updated instantly.' });
  } catch (error: any) {
    console.error("Save Error:", error);
    return NextResponse.json({ error: error.message || 'Failed to save data' }, { status: 500 });
  }
}