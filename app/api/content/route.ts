import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const newData = await request.json();
    const filePath = path.join(process.cwd(), 'data', 'portfolio.json');
    
    // Write the new data back to the local JSON file
    fs.writeFileSync(filePath, JSON.stringify(newData, null, 2), 'utf8');
    
    return NextResponse.json({ message: 'Content updated successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update content' }, { status: 500 });
  }
}