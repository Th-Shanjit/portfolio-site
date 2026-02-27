import fs from 'fs';
import path from 'path';

export function getPortfolioData() {
  const filePath = path.join(process.cwd(), 'data', 'portfolio.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}