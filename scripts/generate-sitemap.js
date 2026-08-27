import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const toolsDataPath = path.join(__dirname, '../src/data/toolsData.jsx');
const sitemapPath = path.join(__dirname, '../public/sitemap.xml');

const content = fs.readFileSync(toolsDataPath, 'utf8');

// Rough parsing to extract IDs and useCases without running the React code
const toolRegex = /id:\s*['"]([^'"]+)['"]/g;
let match;
const toolIds = [];
while ((match = toolRegex.exec(content)) !== null) {
  toolIds.push(match[1]);
}

const useCaseRegex = /id:\s*['"]([^'"]+)['"][\s\S]*?useCases:\s*\[(.*?)\]/g;
const useCasesMap = {};
let ucMatch;
while ((ucMatch = useCaseRegex.exec(content)) !== null) {
  const toolId = ucMatch[1];
  const arrayString = ucMatch[2];
  // extract strings from the array string
  const items = [];
  const stringRegex = /['"]([^'"]+)['"]/g;
  let strMatch;
  while ((strMatch = stringRegex.exec(arrayString)) !== null) {
    items.push(strMatch[1]);
  }
  if (items.length > 0) {
    useCasesMap[toolId] = items;
  }
}

const DOMAIN = 'https://usepahruli.com';
const today = new Date().toISOString().split('T')[0];

let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

// Add Homepage
xml += `  <url>\n    <loc>${DOMAIN}/</loc>\n    <lastmod>${today}</lastmod>\n    <priority>1.0</priority>\n  </url>\n`;

// Add Embed discovery page
xml += `  <url>\n    <loc>${DOMAIN}/embed-tools</loc>\n    <lastmod>${today}</lastmod>\n    <priority>0.8</priority>\n  </url>\n`;

// Add Tool Pages and their specific Use Cases
for (const id of toolIds) {
  xml += `  <url>\n    <loc>${DOMAIN}/tool/${id}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>0.9</priority>\n  </url>\n`;
  
  if (useCasesMap[id]) {
    for (const uc of useCasesMap[id]) {
      xml += `  <url>\n    <loc>${DOMAIN}/tool/${id}/${uc}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>0.7</priority>\n  </url>\n`;
    }
  }
}

xml += `</urlset>`;

fs.writeFileSync(sitemapPath, xml);
console.log(`✅ Sitemap generated at ${sitemapPath} with ${toolIds.length + Object.values(useCasesMap).flat().length + 2} URLs.`);
