const fs = require('fs');

const file = 'D:\\site-clone\\10.250.245.60_5501-20260523T162831.html';
const content = fs.readFileSync(file, 'utf8');

// The Lighthouse JSON is embedded in a script tag like:
// <!--...--> <script>window.__LIGHTHOUSE_JSON__ = {...};</script>
const match = content.match(/window\.__LIGHTHOUSE_JSON__\s*=\s*(\{.*?\});\s*<\/script>/);

if (match && match[1]) {
  try {
    const lhr = JSON.parse(match[1]);
    const performanceScore = lhr.categories.performance.score * 100;
    console.log('Performance Score:', performanceScore);
    
    // Check specific audits related to images and gifs
    const auditsToCheck = [
      'uses-optimized-images', 
      'uses-webp-images', // Next-gen formats
      'efficient-animated-content', // GIFs
      'uses-responsive-images',
      'offscreen-images',
      'unminified-javascript',
      'unused-javascript'
    ];
    
    console.log('\n--- Image & GIF Performance Audits ---');
    auditsToCheck.forEach(id => {
      const audit = lhr.audits[id];
      if (audit && audit.score !== 1) { // 1 is perfect, < 1 means issues
        console.log(`\nAudit: ${audit.title} (Score: ${audit.score})`);
        console.log(`Description: ${audit.description}`);
        if (audit.details && audit.details.items) {
          console.log(`Issues found: ${audit.details.items.length}`);
          let wastedBytes = audit.details.items.reduce((acc, item) => acc + (item.wastedBytes || 0), 0);
          if (wastedBytes > 0) {
            console.log(`Total wasted size: ${(wastedBytes / 1024 / 1024).toFixed(2)} MB`);
          }
        }
      }
    });

  } catch(e) {
    console.error("Error parsing JSON", e.message);
  }
} else {
  console.log("Could not find __LIGHTHOUSE_JSON__");
}
