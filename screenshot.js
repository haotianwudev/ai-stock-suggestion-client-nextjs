const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1280, height: 1080 } });
  const page = await context.newPage();
  
  await page.goto('http://localhost:3000/articles/conformal-prediction-portfolio-risk-var', { waitUntil: 'networkidle' });
  
  // Check for Subscribe Gate
  const likeButton = page.getByRole('button', { name: /Like on YouTube/i }).first();
  if (await likeButton.count() > 0 && await likeButton.isVisible()) {
    console.log("Subscribe gate found, clicking it...");
    const [popup] = await Promise.all([
      page.waitForEvent('popup'),
      likeButton.click()
    ]);
    await popup.close();
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
  await page.screenshot({ path: 'C:\\Users\\lswht\\.gemini\\antigravity-ide\\brain\\91d4ecf1-ed53-4ff6-8623-5d0886cfec59\\scratch\\conformal-prediction-portfolio-risk-var.png', fullPage: true });

  // Dark mode
  const darkContext = await browser.newContext({ viewport: { width: 1280, height: 1080 }, colorScheme: 'dark' });
  const darkPage = await darkContext.newPage();
  await darkPage.goto('http://localhost:3000/articles/mathematics-microstructure-cboe-vix', { waitUntil: 'networkidle' });
  
  currentScroll = 0;
  while (currentScroll < maxScroll) {
    currentScroll += scrollStep;
    await darkPage.evaluate((y) => window.scrollTo(0, y), currentScroll);
    await darkPage.waitForTimeout(120);
  }
  await darkPage.waitForTimeout(400);
  await darkPage.screenshot({ path: 'C:\\Users\\lswht\\.gemini\\antigravity-ide\\brain\\91d4ecf1-ed53-4ff6-8623-5d0886cfec59\\scratch\\mathematics-microstructure-cboe-vix-dark.png', fullPage: true });

  // Check overflow
  const hasOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  console.log(`Horizontal Overflow: ${hasOverflow}`);
  
  await browser.close();
})();
