import fs from 'fs';
import path from 'path';

const DOMAIN = 'https://www.usepahruli.com';
const toolsDataPath = path.resolve('src/data/toolsData.jsx');
const content = fs.readFileSync(toolsDataPath, 'utf8');

const regex = /id:\s*'([^']+)'/g;
const ids = [];
let match;
while ((match = regex.exec(content)) !== null) {
  // Avoid capturing false positives if any, but since this is our data file it should be fine.
  ids.push(match[1]);
}

// Remove duplicates just in case
const uniqueIds = [...new Set(ids)];

const urls = [
  '/',
  ...uniqueIds.map(id => `/tool/${id}`)
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${DOMAIN}${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${url === '/' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;

fs.writeFileSync(path.resolve('public/sitemap.xml'), sitemap);
console.log('Generated public/sitemap.xml with', urls.length, 'URLs');

const robots = `User-agent: *
Allow: /

Sitemap: ${DOMAIN}/sitemap.xml
`;

fs.writeFileSync(path.resolve('public/robots.txt'), robots);
console.log('Generated public/robots.txt');
