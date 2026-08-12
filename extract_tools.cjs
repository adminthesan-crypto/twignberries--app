const fs = require('fs');

const path = './src/App.jsx';
const content = fs.readFileSync(path, 'utf8');

// Extract tools imports
let toolsImports = [];
const importRegex = /^import .+ from '\.\/tools\/.+';$/gm;
let match;
while ((match = importRegex.exec(content)) !== null) {
  toolsImports.push(match[0].replace("'./tools/", "'../tools/"));
}

// Find const TOOLS
const toolsStart = content.indexOf('const TOOLS = [');
// Find the end of TOOLS (it ends right before ToolCard definition)
const toolsEndStr = 'function ToolCard({';
const toolsEnd = content.indexOf(toolsEndStr, toolsStart);

// We want to capture until the ]; before ToolCard.
const toolsContent = content.substring(toolsStart, toolsEnd).trim();

const newToolsDataContent = `import React from 'react';\n` + toolsImports.join('\n') + `\n\n` + toolsContent + `\n\nexport default TOOLS;\n`;
fs.writeFileSync('./src/data/toolsData.jsx', newToolsDataContent);

// Remove the tools imports and TOOLS definition from App.jsx
// We also need to remove empty lines where the imports were
const newContent = content.replace(importRegex, '')
  .replace(content.substring(toolsStart, toolsEnd), "import TOOLS from './data/toolsData';\n\n")
  .replace(/\n{3,}/g, '\n\n'); // Clean up excessive newlines
  
fs.writeFileSync('./src/App.jsx', newContent);
console.log('Extraction complete');
