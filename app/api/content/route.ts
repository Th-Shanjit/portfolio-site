import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'data', 'portfolio.json');

export async function GET() {
  try {
    const raw = fs.readFileSync(dataPath, 'utf-8');
    const data = JSON.parse(raw);
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ error: 'Failed to read content' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newData = await request.json();
    fs.writeFileSync(dataPath, JSON.stringify(newData, null, 2), 'utf8');
    
    return NextResponse.json({ message: 'Content updated successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update content' }, { status: 500 });
  }
}