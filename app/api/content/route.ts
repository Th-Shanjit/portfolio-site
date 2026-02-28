import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Helper to get the absolute path to your JSON file
const getFilePath = () => path.join(process.cwd(), 'data', 'portfolio.json');

// GET request: Fetches the latest JSON data
export async function GET() {
  try {
    const fileContents = fs.readFileSync(getFilePath(), 'utf8');
    return NextResponse.json(JSON.parse(fileContents));
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read data' }, { status: 500 });
  }
}

// POST request: Overwrites the JSON file with your new edits
export async function POST(request: Request) {
  try {
    const newData = await request.json();
    fs.writeFileSync(getFilePath(), JSON.stringify(newData, null, 2), 'utf8');
    return NextResponse.json({ message: 'Content updated successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
  }
}