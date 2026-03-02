import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const getFilePath = () => path.join(process.cwd(), 'data', 'portfolio.json');

export async function POST(
  request: NextRequest, // 🚀 FIX: Must strictly be NextRequest in Next 15
  context: { params: Promise<{ id: string }> } // 🚀 FIX: Must use context wrapper
) {
  try {
    // Unwrap the promise
    const resolvedParams = await context.params;
    const id = resolvedParams.id;

    const fileContents = fs.readFileSync(getFilePath(), 'utf8');
    const data = JSON.parse(fileContents);
    
    // Find the document and increment views
    const docIndex = data.docs.findIndex((d: any) => d.id === id);
    
    if (docIndex !== -1) {
      data.docs[docIndex].views = (data.docs[docIndex].views || 0) + 1;
      fs.writeFileSync(getFilePath(), JSON.stringify(data, null, 2), 'utf8');
      return NextResponse.json({ views: data.docs[docIndex].views });
    }

    return NextResponse.json({ error: 'Document not found' }, { status: 404 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}