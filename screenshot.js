const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1280, height: 1080 } });
  const page = await context.newPage();
  
  const articleSlug = process.argv[2] || 'autocallable-strategy-engineered-yield-sideways-markets';
  await page.goto(`http://localhost:3000/articles/${articleSlug}`, { waitUntil: 'networkidle' });
  
  // Check for Subscribe Gate
  const likeButton = page.getByRole('button', { name: /Like on YouTube/i }).first();
  if (await likeButton.count() > 0 && await likeButton.isVisible()) {
    console.log("Subscribe gate found, clicking it...");
    try {
      const [popup] = await Promise.all([
        page.waitForEvent('popup', { timeout: 5000 }),
        likeButton.click()
      ]);
      await popup.close();
    } catch (e) {
      console.log("No popup opened or timeout:", e.message);
    }
  }
  
  // Scroll to trigger IntersectionObservers
  console.log("Scrolling...");
  let currentScroll = 0;
  const scrollStep = 400;
  const maxScroll = await page.evaluate(() => document.body.scrollHeight);
  while (currentScroll < maxScroll) {
    currentScroll += scrollStep;
    await page.evaluate((y) => window.scrollTo(0, y), currentScroll);
    await page.waitForTimeout(120);
  }
  await page.waitForTimeout(400);

  // Take screenshot
  await page.screenshot({ path: `C:\\Users\\lswht\\.gemini\\antigravity-ide\\brain\\91d4ecf1-ed53-4ff6-8623-5d0886cfec59\\scratch\\${articleSlug}.png`, fullPage: true });

  // Dark mode
  const darkContext = await browser.newContext({ viewport: { width: 1280, height: 1080 }, colorScheme: 'dark' });
  const darkPage = await darkContext.newPage();
  await darkPage.goto(`http://localhost:3000/articles/${articleSlug}`, { waitUntil: 'networkidle' });
  
  currentScroll = 0;
  while (currentScroll < maxScroll) {
    currentScroll += scrollStep;
    await darkPage.evaluate((y) => window.scrollTo(0, y), currentScroll);
    await darkPage.waitForTimeout(120);
  }
  await darkPage.waitForTimeout(400);
  await darkPage.screenshot({ path: `C:\\Users\\lswht\\.gemini\\antigravity-ide\\brain\\91d4ecf1-ed53-4ff6-8623-5d0886cfec59\\scratch\\${articleSlug}-dark.png`, fullPage: true });

  // Check overflow
  const hasOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  console.log(`Horizontal Overflow: ${hasOverflow}`);
  
  await browser.close();
})();
