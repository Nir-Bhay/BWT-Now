const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({
    headless: true
  });

  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 }
  });

  // Open website
  await page.goto("https://www.reddybook.live/home", {
    waitUntil: "networkidle"
  });

  // Wait extra for Angular hydration
  await page.waitForTimeout(5000);

  // Save final rendered HTML
  const html = await page.content();

  fs.writeFileSync("index.html", html);

  console.log("HTML saved!");

  // Full page screenshot
  await page.screenshot({
    path: "fullpage.png",
    fullPage: true
  });

  console.log("Screenshot saved!");

  await browser.close();
})();