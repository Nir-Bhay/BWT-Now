const fs = require('fs');
const path = require('path');

const rootHtmlFile = 'index.html';
const pagesDir = 'pages';

const pagesToLink = [
  'login', 'register', 'about-us', 'blogs', 'categories', 
  'privacy-policy', 'terms-and-conditions', 'responsible-gaming', 'customer-care', 'home'
];

function fixHtml(content) {
  pagesToLink.forEach(page => {
    // Fix href="page" to href="page.html"
    const exactRegex = new RegExp(`href="${page}"`, 'g');
    content = content.replace(exactRegex, `href="${page}.html"`);

    // Fix href="/page" to href="${page}.html" in case any were missed
    const slashRegex = new RegExp(`href="/${page}"`, 'g');
    content = content.replace(slashRegex, `href="${page}.html"`);
    
    // Fix href="pages/page" to href="page.html"
    const pagesRegex = new RegExp(`href="pages/${page}"`, 'g');
    content = content.replace(pagesRegex, `href="${page}.html"`);
  });
  return content;
}

if (fs.existsSync(pagesDir)) {
  const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html'));
  files.forEach(file => {
    const filePath = path.join(pagesDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;

    content = fixHtml(content);

    // Also fix any stray href="/register" or href="/login" or href="/customer-care" just in case
    // (handled by the loop above)

    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Enforced .html links in ${filePath}`);
    }
  });
}

// Let's also check index.html to ensure they all point to pages/page.html
if (fs.existsSync(rootHtmlFile)) {
  let content = fs.readFileSync(rootHtmlFile, 'utf8');
  let originalContent = content;

  pagesToLink.forEach(page => {
    // Fix href="/page" to href="pages/page.html"
    const slashRegex = new RegExp(`href="/${page}"`, 'g');
    content = content.replace(slashRegex, `href="pages/${page}.html"`);

    // Fix href="page" to href="pages/page.html"
    const exactRegex = new RegExp(`href="${page}"`, 'g');
    content = content.replace(exactRegex, `href="pages/${page}.html"`);
  });

  if (content !== originalContent) {
    fs.writeFileSync(rootHtmlFile, content, 'utf8');
    console.log(`Enforced .html links in ${rootHtmlFile}`);
  }
}
