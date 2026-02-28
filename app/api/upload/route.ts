import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create an 'uploads' folder inside your public directory if it doesn't exist
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    await mkdir(uploadDir, { recursive: true });

    // Clean the filename and add a timestamp so files never overwrite each other
    const cleanFileName = file.name.replace(/\s+/g, '-').toLowerCase();
    const uniqueName = `${Date.now()}-${cleanFileName}`;
    const filePath = path.join(uploadDir, uniqueName);

    // Save the file
    await writeFile(filePath, buffer);

    // Return the URL path that the frontend can use (e.g., /uploads/my-photo.jpg)
    return NextResponse.json({ url: `/uploads/${uniqueName}` });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}