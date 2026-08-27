import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const toolsDataPath = path.join(__dirname, '../src/data/toolsData.jsx');
let content = fs.readFileSync(toolsDataPath, 'utf8');

// We need to inject these into the arrays without wiping the existing ones.
// Let's use regex to find the useCases array and append to it.

function appendUseCases(toolId, newUseCases) {
  const regex = new RegExp(`(id:\\s*['"]${toolId}['"][\\s\\S]*?useCases:\\s*\\[)([^\\]]*)(\\])`, 'g');
  content = content.replace(regex, (match, p1, p2, p3) => {
    // p2 is the existing useCases string
    const addition = p2.trim() === '' ? newUseCases : `, ${newUseCases}`;
    return `${p1}${p2}${addition}${p3}`;
  });
}

// 1. Error Message Angle (Compress)
appendUseCases('compress-pdf', `'fix-file-size-exceeds-limit', 'whatsapp-media-file-larger-than-100mb'`);

// 2. Limit Reached Angle (Merge)
appendUseCases('merge-pdf', `'ilovepdf-free-alternative-no-limit', 'smallpdf-daily-limit-bypass'`);

// 3. Paranoia / Privacy Angle (Edit/Merge)
appendUseCases('merge-pdf', `'offline-no-upload', 'safe-for-bank-statements'`);

// 4. App-less Mobile Angle (Compress)
appendUseCases('compress-pdf', `'iphone-browser-no-app', 'android-free-no-download'`);

fs.writeFileSync(toolsDataPath, content);
console.log('✅ Injected Lateral Use Cases into toolsData.jsx');
