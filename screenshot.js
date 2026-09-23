const { chromium, devices } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  
  // Desktop Light
  const desktopLight = await browser.newContext({ colorScheme: 'light', viewport: { width: 1280, height: 800 } });
  const page1 = await desktopLight.newPage();
  await page1.goto('http://localhost:3000/');
  await page1.waitForTimeout(1000);
  await page1.screenshot({ path: 'screenshots/homepage_light_desktop.png', fullPage: true });
  await desktopLight.close();

  // Desktop Dark
  const desktopDark = await browser.newContext({ colorScheme: 'dark', viewport: { width: 1280, height: 800 } });
  const page2 = await desktopDark.newPage();
  await page2.goto('http://localhost:3000/');
  await page2.evaluate(() => {
      document.documentElement.classList.add('dark-theme');
      document.documentElement.classList.remove('light-theme');
      localStorage.setItem('loopcraft-theme', 'dark');
  });
  await page2.waitForTimeout(1000);
  await page2.screenshot({ path: 'screenshots/homepage_dark_desktop.png', fullPage: true });
  await desktopDark.close();

  // Mobile Light
  const mobileLight = await browser.newContext({ ...devices['Pixel 5'], colorScheme: 'light' });
  const page3 = await mobileLight.newPage();
  
  await page3.goto('http://localhost:3000/');
  await page3.waitForTimeout(1000);
  await page3.screenshot({ path: 'screenshots/homepage_light_mobile.png', fullPage: true });

  await page3.goto('http://localhost:3000/roadmap/ai-engineering');
  await page3.waitForTimeout(1000);
  await page3.screenshot({ path: 'screenshots/roadmap_mobile.png', fullPage: true });

  await page3.goto('http://localhost:3000/roadmap/ai-engineering/learn');
  await page3.waitForTimeout(1000);
  await page3.screenshot({ path: 'screenshots/learn_mobile.png', fullPage: true });

  await page3.goto('http://localhost:3000/dashboard');
  await page3.waitForTimeout(1000);
  await page3.screenshot({ path: 'screenshots/dashboard_mobile.png', fullPage: true });

  await mobileLight.close();
  
  // Mobile Dark
  const mobileDark = await browser.newContext({ ...devices['Pixel 5'], colorScheme: 'dark' });
  const page4 = await mobileDark.newPage();
  
  await page4.goto('http://localhost:3000/');
  await page4.evaluate(() => {
      document.documentElement.classList.add('dark-theme');
      document.documentElement.classList.remove('light-theme');
      localStorage.setItem('loopcraft-theme', 'dark');
  });
  await page4.waitForTimeout(1000);
  await page4.screenshot({ path: 'screenshots/homepage_dark_mobile.png', fullPage: true });

  await mobileDark.close();
  await browser.close();
})();
