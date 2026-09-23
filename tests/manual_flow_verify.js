const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  
  const results = {};
  const errors = [];
  
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });
  page.on('pageerror', err => {
    errors.push(err.message);
  });

  try {
    // 1 & 2: Email confirmation completed & Email + Password login
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'fahmidsunnydz@gmail.com');
    await page.fill('input[name="password"]', 'testinglc');
    
    await Promise.all([
      page.waitForNavigation({ timeout: 15000 }).catch(() => null),
      page.click('button[type="submit"]')
    ]);

    const url = page.url();
    if (url.includes('/login?error')) {
       let errorText = 'Unknown error';
       try {
         errorText = await page.locator('.bg-red-500\\/10').innerText({ timeout: 2000 });
       } catch (e) {}
       
       if (errorText.toLowerCase().includes('email not confirmed')) {
           results['1. Email confirmation completed'] = 'FAIL (Email not confirmed)';
       } else if (errorText.toLowerCase().includes('invalid')) {
           results['1. Email confirmation completed'] = 'FAIL (Invalid credentials / Not found)';
       } else {
           results['1. Email confirmation completed'] = 'FAIL (' + errorText + ')';
       }
       results['2. Email + Password login'] = 'FAIL';
       console.log(JSON.stringify(results, null, 2));
       await browser.close();
       return;
    } else {
       results['1. Email confirmation completed'] = 'PASS';
       results['2. Email + Password login'] = 'PASS';
    }

    // 3. Session creation & 4. Profile/Dashboard access
    // After login, we should be redirected to /profile (or dashboard)
    await page.goto('http://localhost:3000/profile');
    let h1Text = '';
    try {
      h1Text = await page.locator('h1').innerText({ timeout: 2000 });
    } catch(e) {}
    
    if (h1Text.includes('Profile')) {
      results['3. Session creation'] = 'PASS';
      results['4. Profile/Dashboard access'] = 'PASS';
    } else {
      results['3. Session creation'] = 'FAIL';
      results['4. Profile/Dashboard access'] = 'FAIL';
    }

    // 5. Page refresh & 6. Session persistence after refresh
    await page.reload();
    await page.waitForTimeout(2000); // Wait for client hydration
    const isLogoutVisible = await page.getByRole('button', { name: /Logout/i }).isVisible();
    results['5. Page refresh'] = 'PASS';
    results['6. Session persistence after refresh'] = isLogoutVisible ? 'PASS' : 'FAIL';

    // 9. Correct LEARNER role
    await page.goto('http://localhost:3000/admin');
    await page.waitForTimeout(1000);
    const adminUrl = page.url();
    if (adminUrl.includes('/unauthorized') || adminUrl.includes('/login')) {
      results['9. Correct LEARNER role'] = 'PASS';
    } else {
      results['9. Correct LEARNER role'] = 'FAIL (Allowed admin access)';
    }

    // 7. Logout & 8. Protected route access after logout
    await page.goto('http://localhost:3000/profile');
    await Promise.all([
      page.waitForNavigation({ timeout: 15000 }).catch(() => null),
      page.getByRole('button', { name: /Logout/i }).click()
    ]);
    results['7. Logout'] = 'PASS';
    
    await page.goto('http://localhost:3000/profile');
    await page.waitForTimeout(1000);
    const postLogoutUrl = page.url();
    results['8. Protected route access after logout'] = postLogoutUrl.includes('/login') ? 'PASS' : 'FAIL';

    // 10. No console/runtime errors during the flow
    const filteredErrors = errors.filter(e => !e.includes('favicon.ico')); // Ignore favicon
    results['10. No console/runtime errors during the flow'] = filteredErrors.length === 0 ? 'PASS' : 'FAIL (' + filteredErrors.length + ' errors)';

    console.log(JSON.stringify(results, null, 2));

  } catch (err) {
    console.error('SCRIPT ERROR:', err.message);
  } finally {
    await browser.close();
  }
})();
