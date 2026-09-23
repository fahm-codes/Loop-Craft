const { chromium } = require('playwright');
const { createClient } = require('@supabase/supabase-js');

async function runTest() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const email = `testuser_${Date.now()}@gmail.com`;
  const password = `SecurePass123!`;
  const fullName = `Test Learner`;

  console.log(`\n--- 1. Testing Signup ---`);
  await page.goto('http://localhost:3000/signup');
  await page.fill('input[name="fullName"]', fullName);
  await page.fill('input[name="email"]', email);
  await page.fill('input[name="password"]', password);
  await page.fill('input[name="confirmPassword"]', password);
  
  await Promise.all([
    page.waitForNavigation({ url: '**/profile', timeout: 10000 }).catch(e => null),
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

  console.log(`\n--- 2. Verifying public.profiles via supabase-js ---`);
  const { data: authData, error: authErr } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  
  if (authErr || !authData.user) {
    console.error("FAIL: Could not authenticate via API to check DB.", authErr);
  } else {
    console.log("PASS: Supabase Auth created user successfully.");
    const userId = authData.user.id;
    
    const { data: profile, error: profErr } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
      
    if (profErr) {
      console.error("FAIL: Profile fetch failed.", profErr);
    } else if (!profile) {
      console.error("FAIL: handle_new_user() trigger did not create a profile row.");
    } else {
      console.log("PASS: handle_new_user() trigger created the profile row.");
      if (profile.role === 'LEARNER') {
        console.log("PASS: New profile role is LEARNER.");
      } else {
        console.error(`FAIL: New profile role is ${profile.role} (Expected LEARNER)`);
      }
    }
  }

  console.log(`\n--- 3. Testing Logout ---`);
  await Promise.all([
    page.waitForNavigation({ timeout: 10000 }).catch(e => null),
    page.click('button:has-text("Logout"), button:has-text("Sign Out")')
  ]);
  
  if (page.url().includes('/login') || page.url().endsWith('/')) {
    console.log(`PASS: Logout successfully redirected to ${page.url()}`);
  } else {
    console.error(`FAIL: Logout redirected to ${page.url()}`);
  }

  console.log(`\n--- 4. Testing Protected Routes after Logout ---`);
  await page.goto('http://localhost:3000/profile');
  await page.waitForTimeout(500);
  if (page.url().includes('/login')) {
    console.log("PASS: /profile properly protected and redirected to /login");
  } else {
    console.error("FAIL: /profile did not redirect after logout. URL:", page.url());
  }

  console.log(`\n--- 5. Testing Login ---`);
  await page.goto('http://localhost:3000/login');
  await page.fill('input[name="email"]', email);
  await page.fill('input[name="password"]', password);
  
  await Promise.all([
    page.waitForNavigation({ url: '**/profile', timeout: 10000 }).catch(e => null),
    page.click('button[type="submit"]')
  ]);

  if (page.url().includes('/profile')) {
    console.log("PASS: Login successfully redirected to /profile");
  } else {
    console.error(`FAIL: Login redirected to ${page.url()}`);
  }
  
  await browser.close();
}

runTest().catch(console.error);
