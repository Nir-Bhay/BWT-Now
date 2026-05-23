const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Fix all menu icon PNGs - serve at 24x24 with auto format+quality
// These are uploaded as 64x64 but displayed at 19x19 - 24x24 is fine
html = html.replace(
  /https:\/\/res\.cloudinary\.com\/dbkcmdx7g\/image\/upload\/(v\d+\/reddybook_assets\/menu-[^"'\s]+\.png)/g,
  'https://res.cloudinary.com/dbkcmdx7g/image/upload/w_24,h_24,c_fill,f_auto,q_auto/$1'
);

// Fix all remaining logo instances that were NOT yet transformed
// (the ones we updated individually may already be fixed, but any duplicate hits will be skipped by regex)
html = html.replace(
  /https:\/\/res\.cloudinary\.com\/dbkcmdx7g\/image\/upload\/(v1779532384\/reddybook_assets\/reddybook\.live\.png)/g,
  'https://res.cloudinary.com/dbkcmdx7g/image/upload/w_203,h_51,c_fill,f_auto,q_auto/$1'
);

fs.writeFileSync('index.html', html, 'utf8');

// Count how many menu icons were updated
const menuCount = (html.match(/w_24,h_24,c_fill,f_auto,q_auto.*menu-/g) || []).length;
const logoCount = (html.match(/w_203,h_51,c_fill,f_auto,q_auto.*reddybook\.live/g) || []).length;
console.log('Menu icons optimized:', menuCount);
console.log('Logo instances optimized:', logoCount);
console.log('Done!');
