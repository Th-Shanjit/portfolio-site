import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// 🚀 REPO DETAILS
const GITHUB_OWNER = 'th-shanjit'; 
const GITHUB_REPO = 'portfolio-site'; 
const FILE_PATH = 'data/portfolio.json';

export async function GET() {
  const token = process.env.GITHUB_TOKEN;
  
  try {
    // 1. Fetch live from GitHub to ensure we bypass Vercel's cache entirely
    const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${FILE_PATH}`;
    const res = await fetch(url, {
      headers: {
         Authorization: `Bearer ${token}`,
         Accept: 'application/vnd.github.v3.raw',
         'Cache-Control': 'no-store, max-age=0'
      }
    });
    
    if (!res.ok) throw new Error('Failed to fetch live data from GitHub');
    const data = await res.json();
    return NextResponse.json(data);
    
  } catch (error: any) {
    console.error("GitHub Fetch Failed, falling back to local:", error);
    // Fallback: If GitHub fails, read the local file deployed with Vercel
    const fs = require('fs');
    const path = require('path');
    const fileContents = fs.readFileSync(path.join(process.cwd(), FILE_PATH), 'utf8');
    return NextResponse.json(JSON.parse(fileContents));
  }
}

export async function POST(request: Request) {
  const token = process.env.GITHUB_TOKEN;
  
  if (!token) {
    return NextResponse.json({ error: 'GITHUB_TOKEN environment variable is missing in Vercel.' }, { status: 500 });
  }

  try {
    const newData = await request.json();
    
    // Convert the new JSON data into base64 (required by GitHub API)
    const contentBase64 = Buffer.from(JSON.stringify(newData, null, 2)).toString('base64');

    // 1. Get the current file's SHA (GitHub requires this to update an existing file)
    const getUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${FILE_PATH}`;
    const getRes = await fetch(getUrl, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const fileInfo = await getRes.json();
    
    if (!fileInfo.sha) throw new Error('Could not find the target file in GitHub.');

    // 2. Push the updated file back to GitHub
    const updateRes = await fetch(getUrl, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'CMS Update: New portfolio content published via Admin Dashboard',
        content: contentBase64,
        sha: fileInfo.sha,
        branch: 'main' // Ensure your default branch is 'main'
      })
    });

    if (!updateRes.ok) {
      const errData = await updateRes.json();
      throw new Error(`GitHub API Error: ${errData.message}`);
    }

    return NextResponse.json({ message: 'Content pushed to GitHub successfully!' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}