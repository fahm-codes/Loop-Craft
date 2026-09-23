const { chromium, devices } = require('playwright');
const { createClient } = require('@supabase/supabase-js');

async function testValidations() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log(`\n--- Testing Form Validations ---`);
  
  // 1. Password confirmation mismatch
  await page.goto('http://localhost:3000/signup');
  await page.fill('input[name="fullName"]', 'Test Name');
  await page.fill('input[name="email"]', 'valid@gmail.com');
  await page.fill('input[name="password"]', 'Password123!');
  await page.fill('input[name="confirmPassword"]', 'PasswordMismatch!');
  await Promise.all([page.waitForNavigation({ timeout: 10000 }).catch(e=>null), page.click('button[type="submit"]')]);
  const err1 = await page.$('.bg-red-500\\/10');
  console.log("Password mismatch error:", err1 ? await err1.innerText() : "NONE");

  // 2. Weak/invalid password
  await page.goto('http://localhost:3000/signup');
  await page.fill('input[name="fullName"]', 'Test Name');
  await page.fill('input[name="email"]', 'valid@gmail.com');
  await page.fill('input[name="password"]', '123');
  await page.fill('input[name="confirmPassword"]', '123');
  await Promise.all([page.waitForNavigation({ timeout: 10000 }).catch(e=>null), page.click('button[type="submit"]')]);
  const err2 = await page.$('.bg-red-500\\/10');
  console.log("Weak password error:", err2 ? await err2.innerText() : "NONE");

  // 3. Invalid email
  await page.goto('http://localhost:3000/signup');
  await page.fill('input[name="fullName"]', 'Test Name');
  await page.fill('input[name="email"]', 'notanemail');
  await page.fill('input[name="password"]', 'Password123!');
  await page.fill('input[name="confirmPassword"]', 'Password123!');
  await Promise.all([page.waitForNavigation({ timeout: 10000 }).catch(e=>null), page.click('button[type="submit"]')]);
  const err3 = await page.$('.bg-red-500\\/10');
  console.log("Invalid email error:", err3 ? await err3.innerText() : "NONE (HTML5 likely caught it)");
  
  // 4. Mobile layout check
  console.log(`\n--- Testing Mobile Viewports ---`);
  for (const width of [320, 375, 430]) {
    await page.setViewportSize({ width, height: 800 });
    await page.goto('http://localhost:3000/signup');
    const box = await page.boundingBox('.bg-bg-sec');
    if (box && box.width <= width) {
       console.log(`Mobile ${width}px width fits correctly (Form width: ${box.width})`);
    } else {
       console.error(`Mobile ${width}px width OVERFLOWS`);
    }
  }

  await browser.close();
}
testValidations().catch(console.error);
