const { chromium } = require('@playwright/test');
const path = require('node:path');

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });
  await page.goto('http://127.0.0.1:3000/#ready-to-build', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Scroll to CTA & ticker & contact & footer
  const cta = page.locator('#ready-to-build');
  if (await cta.count() > 0) {
    await cta.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.screenshot({ path: '/Users/renelrosene/.gemini/antigravity-ide/brain/fe1324dd-5367-4aac-a5c5-67a2c17044f2/ready-cta.png' });
  }

  const footer = page.locator('#site-footer');
  if (await footer.count() > 0) {
    await footer.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.screenshot({ path: '/Users/renelrosene/.gemini/antigravity-ide/brain/fe1324dd-5367-4aac-a5c5-67a2c17044f2/footer-modern.png' });
  }

  // Full bottom section screenshot
  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight - 1600);
  });
  await page.waitForTimeout(600);
  await page.screenshot({ path: '/Users/renelrosene/.gemini/antigravity-ide/brain/fe1324dd-5367-4aac-a5c5-67a2c17044f2/bottom-flow.png' });

  await browser.close();
  console.log('Screenshots captured successfully!');
})();
