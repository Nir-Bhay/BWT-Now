import fs from 'fs';
import path from 'path';

const root = process.cwd();
const files = [
  'home.html',
  'login.html',
  'register.html',
  'about-us.html',
  'customer-care.html',
  'blogs.html',
  'categories.html',
  'privacy-policy.html',
  'terms-and-conditions.html',
  'responsible-gaming.html',
  '404.html',
];

for (const file of files) {
  const fp = path.join(root, file);
  if (!fs.existsSync(fp)) continue;
  let html = fs.readFileSync(fp, 'utf8');
  html = html.replace(/\s*<li><a href="customer-care\.html"[^>]*>Support<\/a><\/li>\n/g, '\n');
  html = html.replace(
    /<li><a href="responsible-gaming\.html"([^>]*)>Responsible Gaming<\/a><\/li>\s*\n(\s*)<\/ul>/g,
    (match, attrs, indent) => {
      const active = file === 'customer-care.html' ? ' class="active"' : '';
      return `<li><a href="responsible-gaming.html"${attrs}>Responsible Gaming</a></li>\n${indent}<li><a href="customer-care.html"${active}>Customer Care</a></li>\n${indent}</ul>`;
    }
  );
  fs.writeFileSync(fp, html);
  console.log('Updated', file);
}
