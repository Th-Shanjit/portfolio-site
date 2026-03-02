import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

const getFilePath = () => path.join(process.cwd(), 'data', 'portfolio.json');

export async function GET() {
  try {
    const fileContents = fs.readFileSync(getFilePath(), 'utf8');
    return NextResponse.json(JSON.parse(fileContents));
  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json({ error: error.message || 'Failed to read data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newData = await request.json();
    const jsonString = JSON.stringify(newData, null, 2);

    // Pull GitHub credentials from Vercel Environment Variables
    const githubToken = process.env.GITHUB_TOKEN;
    const githubRepo = process.env.GITHUB_REPO; 

    // 🚀 THE CLOUD CMS LOGIC (Runs on Vercel)
    if (githubToken && githubRepo) {
      const fileUrl = `https://api.github.com/repos/${githubRepo}/contents/data/portfolio.json`;
      
      // 1. Ask GitHub for the current file's SHA signature (required to update files)
      const getRes = await fetch(fileUrl, {
        headers: {
          Authorization: `Bearer ${githubToken}`,
          Accept: 'application/vnd.github.v3+json',
        },
        cache: 'no-store' 
      });

      if (!getRes.ok) throw new Error(`Failed to fetch from GitHub: ${getRes.statusText}`);
      const fileData = await getRes.json();
      const sha = fileData.sha;

      // 2. Push the newly written case study back to GitHub
      const updateRes = await fetch(fileUrl, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${githubToken}`,
          Accept: 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: 'CMS Update: Architecture published via Admin Dashboard',
          content: Buffer.from(jsonString).toString('base64'),
          sha: sha,
          branch: 'main' // Change to 'master' if your repo uses the older naming convention
        }),
      });

      if (!updateRes.ok) {
         const errorText = await updateRes.text();
         throw new Error(`GitHub API update failed: ${errorText}`);
      }

      // 3. Fallback write for local development to keep local testing fast
      if (process.env.NODE_ENV === 'development') {
          fs.writeFileSync(getFilePath(), jsonString, 'utf8');
      }

      return NextResponse.json({ message: 'GitHub updated successfully. Vercel rebuild triggered.' });

    } else {
      // 🚀 THE LOCAL CMS LOGIC (Runs on your laptop if env vars aren't set)
      fs.writeFileSync(getFilePath(), jsonString, 'utf8');
      return NextResponse.json({ message: 'Local file updated successfully.' });
    }

  } catch (error: any) {
    console.error("Save Error:", error);
    return NextResponse.json({ error: error.message || 'Failed to save data' }, { status: 500 });
  }
}