const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = dir + '/' + file;
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            if (file.endsWith('.js') || file.endsWith('.jsx') || file.endsWith('.css')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk('./src');
let replaceCount = 0;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes('Twignberries')) {
        content = content.replace(/Twignberries/g, 'Pahruli');
        fs.writeFileSync(file, content, 'utf8');
        replaceCount++;
        console.log(`Replaced in ${file}`);
    }
});

console.log(`Successfully replaced Twignberries with Pahruli in ${replaceCount} files.`);
