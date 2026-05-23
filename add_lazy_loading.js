const fs = require('fs');
const path = require('path');

const BASE_DIR = __dirname;
const filesToProcess = [
  path.join(BASE_DIR, 'index (2).html'),
  path.join(BASE_DIR, 'index.html')
];

const pagesDir = path.join(BASE_DIR, 'pagess', 'pages');
if (fs.existsSync(pagesDir)) {
  const pages = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html'));
  pages.forEach(p => filesToProcess.push(path.join(pagesDir, p)));
}

let modifiedCount = 0;

for (const file of filesToProcess) {
  if (!fs.existsSync(file)) continue;
  let content = fs.readFileSync(file, 'utf8');
  
  // Find all <img ... > tags
  // Replace those that do not have loading="lazy" or loading="eager"
  const updatedContent = content.replace(/<img\s([^>]+)>/gi, (match, attributes) => {
    // If it already has a loading attribute or fetchpriority="high", skip it
    if (/loading=["'][^"']*["']/i.test(attributes)) {
      return match;
    }
    if (/fetchpriority=["']high["']/i.test(attributes)) {
      return match; // Don't lazy load LCP images
    }
    
    // Add loading="lazy" and decoding="async" for best performance
    // Make sure we append it properly before the closing bracket
    let newAttrs = attributes.trim();
    if (newAttrs.endsWith('/')) {
      newAttrs = newAttrs.slice(0, -1).trim() + ' loading="lazy" decoding="async" /';
    } else {
      newAttrs = newAttrs + ' loading="lazy" decoding="async"';
    }
    
    return `<img ${newAttrs}>`;
  });
  
  if (content !== updatedContent) {
    fs.writeFileSync(file, updatedContent, 'utf8');
    console.log(`Updated ${path.basename(file)}`);
    modifiedCount++;
  }
}

console.log(`Added lazy loading to ${modifiedCount} files.`);
