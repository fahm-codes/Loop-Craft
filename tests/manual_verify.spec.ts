import { test, expect } from '@playwright/test';

test('Manual Verification Flow', async ({ page }) => {
  await page.goto('/signup');
  await page.fill('input[name="fullName"]', 'Fahmid Hasan Sunny');
  await page.fill('input[name="email"]', 'fahmidsunnydz@gmail.com');
  await page.fill('input[name="password"]', 'testinglc');
  await page.fill('input[name="confirmPassword"]', 'testinglc');
  
  await Promise.all([
    page.waitForNavigation({ timeout: 15000 }).catch(() => null),
    page.click('button[type="submit"]'),
  ]);
  
  await page.waitForTimeout(3000);
  await page.screenshot({ path: 'signup_attempt.png' });
});
