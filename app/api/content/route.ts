import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// 🚀 FIX 1: Prevent Next.js from permanently caching this API route
export const dynamic = 'force-dynamic';

const getFilePath = () => path.join(process.cwd(), 'data', 'portfolio.json');

export async function GET() {
  try {
    const fileContents = fs.readFileSync(getFilePath(), 'utf8');
    return NextResponse.json(JSON.parse(fileContents));
  } catch (error: any) {
    console.error("API Error:", error);
    // 🚀 FIX 2: Send the EXACT error message to the frontend
    return NextResponse.json({ error: error.message || 'Failed to read data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newData = await request.json();
    fs.writeFileSync(getFilePath(), JSON.stringify(newData, null, 2), 'utf8');
    return NextResponse.json({ message: 'Content updated successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to save data' }, { status: 500 });
  }
}