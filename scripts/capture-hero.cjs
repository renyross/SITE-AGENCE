const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 950 } });
  await page.goto('http://127.0.0.1:3000/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1500);

  // Take hero screenshot
  const hero = page.locator('.hero');
  await hero.screenshot({ path: '/Users/renelrosene/.gemini/antigravity-ide/brain/fe1324dd-5367-4aac-a5c5-67a2c17044f2/hero-with-video.png' });

  // Mobile viewport screenshot
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(500);
  await hero.screenshot({ path: '/Users/renelrosene/.gemini/antigravity-ide/brain/fe1324dd-5367-4aac-a5c5-67a2c17044f2/hero-mobile-video.png' });

  await browser.close();
  console.log('Hero screenshots captured successfully!');
})();
