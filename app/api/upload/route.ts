import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // 🚀 Uploads the file to Vercel Blob Storage permanently
    const blob = await put(file.name, file, {
      access: 'public', // Makes the PDF viewable to users reading your site
    });

    // Hands the permanent link back to the Editor
    return NextResponse.json({ url: blob.url });
    
  } catch (error: any) {
    console.error("Upload Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}