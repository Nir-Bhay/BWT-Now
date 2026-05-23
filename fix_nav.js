const fs = require('fs');
const path = require('path');

const rootHtmlFile = 'index.html';
const pagesDir = 'pages';

const pagesToLink = [
  'login', 'register', 'about-us', 'blogs', 'categories', 
  'privacy-policy', 'terms-and-conditions', 'responsible-gaming', 'customer-care'
];

// 1. Fix root index.html
if (fs.existsSync(rootHtmlFile)) {
  let content = fs.readFileSync(rootHtmlFile, 'utf8');
  let originalContent = content;

  pagesToLink.forEach(page => {
    // Replace href="/page" with href="pages/page.html"
    const regex = new RegExp(`href="/${page}"`, 'g');
    content = content.replace(regex, `href="pages/${page}.html"`);
  });

  // also fix href="/register.html" if it exists in index.html
  content = content.replace(/href="\/register\.html"/g, 'href="pages/register.html"');
  content = content.replace(/href="\/login\.html"/g, 'href="pages/login.html"');

  if (content !== originalContent) {
    fs.writeFileSync(rootHtmlFile, content, 'utf8');
    console.log('Fixed links in root index.html');
  }
}

// 2. Fix pages inside pages/ directory
if (fs.existsSync(pagesDir)) {
  const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html'));

  files.forEach(file => {
    const filePath = path.join(pagesDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;

    // Remove "pages/" from href="pages/..."
    content = content.replace(/href="pages\/([^"]+)"/g, 'href="$1"');

    // Replace href="/login.html" with href="login.html"
    content = content.replace(/href="\/login\.html"/g, 'href="login.html"');
    content = content.replace(/href="\/register\.html"/g, 'href="register.html"');
    
    // Replace href="/about-us" with href="about-us.html"
    pagesToLink.forEach(page => {
      const regex = new RegExp(`href="/${page}"`, 'g');
      content = content.replace(regex, `href="${page}.html"`);
    });

    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Fixed links in ${filePath}`);
    }
  });
}
