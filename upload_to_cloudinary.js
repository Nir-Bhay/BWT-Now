const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dbkcmdx7g',
  api_key: '542321747711727',
  api_secret: 'pqiw_pTdGPr1RL4n-kcqUMPGqTs'
});

const BASE_DIR = __dirname;
const filesToProcess = [
  path.join(BASE_DIR, 'index (2).html'),
  path.join(BASE_DIR, 'index.html')
];

// Add all files in pagess/pages
const pagesDir = path.join(BASE_DIR, 'pagess', 'pages');
if (fs.existsSync(pagesDir)) {
  const pages = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html'));
  pages.forEach(p => filesToProcess.push(path.join(pagesDir, p)));
}

async function uploadToCloudinary(imagePath) {
  try {
    let source = imagePath;
    if (!imagePath.startsWith('http') && !imagePath.startsWith('//')) {
      // Resolve local path
      // Handle cases where the path starts with a slash or doesn't
      let cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
      source = path.join(BASE_DIR, cleanPath);
      
      if (!fs.existsSync(source)) {
        console.log(`[Warning] Local file not found: ${source}`);
        return null;
      }
    }
    
    console.log(`Uploading: ${imagePath}...`);
    const result = await cloudinary.uploader.upload(source, {
      folder: 'reddybook_assets',
      use_filename: true,
      unique_filename: false,
      overwrite: false
    });
    return result.secure_url;
  } catch (err) {
    console.error(`[Error] Upload failed for ${imagePath}:`, err.message);
    return null;
  }
}

async function run() {
  const imageRegex = /src=["']([^"']+\.(?:png|jpe?g|gif|svg|webp))["']/gi;
  const urlRegex = /url\(['"]?([^'"()]+?\.(?:png|jpe?g|gif|svg|webp))['"]?\)/gi;
  
  const uniqueImages = new Set();
  const fileContents = {};

  // Parse files and collect images
  for (const file of filesToProcess) {
    if (!fs.existsSync(file)) continue;
    let content = fs.readFileSync(file, 'utf8');
    fileContents[file] = content;
    
    let match;
    while ((match = imageRegex.exec(content)) !== null) {
      uniqueImages.add(match[1]);
    }
    while ((match = urlRegex.exec(content)) !== null) {
      uniqueImages.add(match[1]);
    }
  }

  console.log(`Found ${uniqueImages.size} unique images.`);
  
  // Upload images
  const urlMap = {};
  for (const img of uniqueImages) {
    const newUrl = await uploadToCloudinary(img);
    if (newUrl) {
      urlMap[img] = newUrl;
      console.log(`Mapped: ${img} -> ${newUrl}`);
    }
  }

  // Replace URLs in files
  for (const file of filesToProcess) {
    if (!fileContents[file]) continue;
    let content = fileContents[file];
    
    for (const [oldUrl, newUrl] of Object.entries(urlMap)) {
      // Create global regex to replace all occurrences
      // Escape special characters in oldUrl
      const escapedUrl = oldUrl.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
      const replaceRegex = new RegExp(escapedUrl, 'g');
      content = content.replace(replaceRegex, newUrl);
    }
    
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated file: ${path.basename(file)}`);
  }
  
  console.log('Finished uploading and replacing images.');
}

run();
