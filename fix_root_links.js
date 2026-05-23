const fs = require('fs');
const path = require('path');

const pagesDir = 'pages';

if (fs.existsSync(pagesDir)) {
  const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html'));

  files.forEach(file => {
    const filePath = path.join(pagesDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;

    // Replace href="/" with href="../index.html"
    content = content.replace(/href="\/"/g, 'href="../index.html"');

    // Also fix cases where we might have href="/home" just in case
    content = content.replace(/href="\/home"/g, 'href="../index.html"');

    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Fixed root links in ${filePath}`);
    }
  });
}
