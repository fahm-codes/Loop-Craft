const { chromium } = require('playwright');
const fs = require('fs');

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
  
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const startBtn = btns.find(b => b.textContent && b.textContent.toUpperCase().includes('START LESSON'));
    if (startBtn) startBtn.click();
  });
  
  await page.waitForTimeout(2000);
  
  const html = await page.content();
  fs.writeFileSync('page.html', html);
  
  await browser.close();
})();
