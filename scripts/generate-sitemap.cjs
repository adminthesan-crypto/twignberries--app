const fs = require('fs');
const path = require('path');

const toolsDataPath = path.join(__dirname, '../src/data/toolsData.jsx');
const sitemapPath = path.join(__dirname, '../public/sitemap.xml');

const fileContent = fs.readFileSync(toolsDataPath, 'utf8');

// Regex to extract objects that have an `id:` property and potentially a `useCases:` property.
const toolRegex = /id:\s*'([^']+)'(?:[^}]*?useCases:\s*\[([^\]]+)\])?/g;

let match;
const urls = [];
const baseUrl = 'https://free.pahruli.in';

// Homepage
urls.push({
  loc: baseUrl,
  changefreq: 'daily',
  priority: '1.0'
});

while ((match = toolRegex.exec(fileContent)) !== null) {
  const id = match[1];
  const useCasesString = match[2];

  // Base tool URL
  urls.push({
    loc: `${baseUrl}/tool/${id}`,
    changefreq: 'weekly',
    priority: '0.8'
  });

  // If there are use cases, generate a URL for each
  if (useCasesString) {
    // Clean up the string to get individual use cases (remove quotes, whitespace)
    const useCases = useCasesString.split(',').map(s => s.replace(/['"\s]/g, '')).filter(Boolean);
    
    for (const uc of useCases) {
      urls.push({
        loc: `${baseUrl}/tool/${id}/${uc}`,
        changefreq: 'monthly',
        priority: '0.6'
      });
    }
  }
}

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

fs.writeFileSync(sitemapPath, sitemapXml);
console.log(`Generated sitemap with ${urls.length} URLs at ${sitemapPath}`);
