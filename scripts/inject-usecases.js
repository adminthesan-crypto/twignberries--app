import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const toolsDataPath = path.join(__dirname, '../src/data/toolsData.jsx');
let content = fs.readFileSync(toolsDataPath, 'utf8');

const injections = {
  'compress-pdf': `useCases: ['under-200kb-ssc', 'under-100kb-upsc', 'under-10mb-college-assignment', 'for-email-attachment'],`,
  'merge-pdf': `useCases: ['aadhaar-and-pan', 'resume-and-cover-letter', 'scanned-documents', 'bank-statements'],`,
  'invoice-generator': `useCases: ['indian-freelancer-gst', 'consulting-services', 'contractor', 'international-client'],`,
  'pdf-to-word': `useCases: ['editable-resume', 'legal-contract', 'scanned-document'],`,
  'split-pdf': `useCases: ['extract-one-page', 'remove-blank-pages', 'split-by-size'],`
};

for (const [id, useCaseString] of Object.entries(injections)) {
  const regex = new RegExp(`(id:\\s*['"]${id}['"][\\s\\S]*?)(component:\\s*[a-zA-Z]+,)`, 'g');
  content = content.replace(regex, `$1$2\n    ${useCaseString}`);
}

fs.writeFileSync(toolsDataPath, content);
console.log('✅ Injected pSEO use cases into toolsData.jsx');
