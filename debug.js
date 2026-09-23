const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/');
  await page.evaluate(() => {
    localStorage.clear();
    localStorage.setItem('loopcraft-enrollment-ai-engineering', new Date().toISOString());
  });
  await page.goto('http://localhost:3000/roadmap/ai-engineering/learn');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'test1.png' });
  
  const buttons = await page.$$eval('button', buttons => buttons.map(b => b.innerText));
  console.log('Buttons:', buttons);
  
  await page.locator('button', { hasText: 'Start Lesson' }).first().click();
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'test2.png' });
  
  const headers = await page.$$eval('h2', headers => headers.map(h => h.innerText));
  console.log('Headers:', headers);
  
  await browser.close();
})();
