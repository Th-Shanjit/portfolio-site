import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import fallbackData from '@/data/portfolio.json';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

// 🚀 Helper to get Redis instance or throw meaningful error
const getRedis = () => {
  // Check both Upstash-specific and Vercel-KV-specific environment variables
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  
  if (!url || !token) {
    console.warn("Upstash Redis environment variables are missing (checked UPSTASH_REDIS_REST_URL/TOKEN and KV_REST_API_URL/TOKEN).");
    return null;
  }
  
  return new Redis({ url, token });
};

export async function GET() {
  const redis = getRedis();
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

  // Fallback to local file read
  try {
    const filePath = path.join(process.cwd(), 'data', 'portfolio.json');
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, 'utf8');
      return NextResponse.json(JSON.parse(fileData));
    }
  } catch (e) {
    console.error("Local Read Error:", e);
  }
  
  return NextResponse.json(fallbackData);
}

export async function POST(request: Request) {
  const redis = getRedis();
  try {
    const newData = await request.json();
    
    let savedToCloud = false;
    let cloudError = null;

    if (redis) {
      try {
        await redis.set('portfolio_data', newData);
        savedToCloud = true;
      } catch (e: any) {
        cloudError = e.message;
        console.error("Cloud Save Error:", e);
      }
    } else {
      cloudError = "Upstash environment variables are missing (UPSTASH_REDIS_REST_URL/TOKEN or KV_REST_API_URL/TOKEN).";
    }
    
    // Also try to save locally (for local dev)
    let savedLocally = false;
    try {
      const filePath = path.join(process.cwd(), 'data', 'portfolio.json');
      fs.writeFileSync(filePath, JSON.stringify(newData, null, 2), 'utf8');
      savedLocally = true;
    } catch (e) {
      // Expected to fail on Vercel read-only filesystem
    }

    if (!savedToCloud && !savedLocally) {
      return NextResponse.json({ 
        error: `Persistence failed. Cloud: ${cloudError || 'Unknown'}. Local: Filesystem is read-only.` 
      }, { status: 500 });
    }
    
    return NextResponse.json({ 
      message: savedToCloud ? 'Saved to Cloud.' : 'Saved locally (Cloud setup missing).' 
    });
  } catch (error: any) {
    console.error("POST Handler Error:", error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}