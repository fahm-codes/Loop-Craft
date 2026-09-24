
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  page.on('pageerror', err => console.log('ERROR:', err));
  await page.goto('http://localhost:3000/dsa-sheets');
  await page.click('text=Apna College DSA Sheet');
  await page.waitForTimeout(3000);
  const text = await page.evaluate(() => document.body.innerText);
  console.log('BODY:', text);
  await browser.close();
})();

