const { chromium } = require('playwright');
const { createClient } = require('@supabase/supabase-js');

async function runTest() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const email = `testuser_${Date.now()}@example.com`;
  const password = `SecurePass123!`;
  const fullName = `Test Learner`;

  console.log(`\n--- 1. Testing Signup ---`);
  await page.goto('http://localhost:3000/signup');
  await page.fill('input[name="fullName"]', fullName);
  await page.fill('input[name="email"]', email);
  await page.fill('input[name="password"]', password);
  await page.fill('input[name="confirmPassword"]', password);
  
  await Promise.all([
    page.waitForNavigation({ timeout: 10000 }).catch(e => null),
    page.click('button[type="submit"]')
  ]);
  
  const errorEl = await page.$('.bg-red-500\\/10');
  if (errorEl) {
    const errText = await errorEl.innerText();
    console.error("FAIL: Signup error displayed on screen:", errText);
    await browser.close();
    return;
  }

  const profileUrl = page.url();
  if (profileUrl.includes('/profile')) {
    console.log(`PASS: Signup successfully redirected to ${profileUrl}`);
  } else {
    console.error(`FAIL: Signup redirected to ${profileUrl} instead of /profile`);
  }

  await browser.close();
}
runTest().catch(console.error);
