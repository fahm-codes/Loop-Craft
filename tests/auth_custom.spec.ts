import { test, expect } from '@playwright/test';

test.describe('Custom Authentication Flows', () => {

  test('1. Signup automatically logs the user in', async ({ page }) => {
    const testEmail = `test_user_signup_${Date.now()}_${Math.random()}@example.com`;
    const testPassword = 'Password123!';
    await page.goto('/signup');

    await page.fill('input[name="fullName"]', 'Test User');
    await page.fill('input[name="email"]', testEmail);
    await page.fill('input[name="password"]', testPassword);
    await page.fill('input[name="confirmPassword"]', testPassword);

    await Promise.all([
      page.waitForNavigation({ url: '**/profile', timeout: 15000 }).catch(() => null),
      page.click('button[type="submit"]'),
    ]);

    // Should redirect to profile and we should see our profile header
    await expect(page).toHaveURL(/\/profile/);
    await expect(page.getByRole('heading', { name: 'My Profile' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Logout', exact: true }).first()).toBeVisible();
  });

  test('2. Logout clears session and redirects', async ({ page }) => {
    const testEmail = `test_user_logout_${Date.now()}_${Math.random()}@example.com`;
    const testPassword = 'Password123!';
    // First signup
    await page.goto('/signup');
    await page.fill('input[name="fullName"]', 'Test User');
    await page.fill('input[name="email"]', testEmail);
    await page.fill('input[name="password"]', testPassword);
    await page.fill('input[name="confirmPassword"]', testPassword);
    await Promise.all([
      page.waitForNavigation({ url: '**/profile', timeout: 15000 }).catch(() => null),
      page.click('button[type="submit"]'),
    ]);
    await expect(page).toHaveURL(/\/profile/);

    // Logout
    await Promise.all([
      page.waitForURL('**/login', { timeout: 10000 }).catch(() => null),
      page.locator('main form button:has-text("Logout")').first().click({ force: true }),
    ]);

    // Try accessing profile again
    await page.goto('/profile');
    await expect(page).toHaveURL(/\/login/);
  });

  test('3. Login with invalid credentials shows error', async ({ page }) => {
    await page.goto('/login');
    await page.fill('input[name="email"]', 'nonexistent@example.com');
    await page.fill('input[name="password"]', 'WrongPassword123!');
    
    await Promise.all([
      page.waitForNavigation({ timeout: 10000 }).catch(() => null),
      page.click('button[type="submit"]'),
    ]);

    await expect(page).toHaveURL(/\/login/);
    // Allow for a slight delay for error to render
    const errorDiv = page.locator('.bg-red-500\\/10');
    await expect(errorDiv).toBeVisible({ timeout: 10000 });
    await expect(errorDiv).toContainText('Invalid email or password');
  });

  test('4. Duplicate signup shows error', async ({ page }) => {
    const testEmail = `test_user_dup_${Date.now()}_${Math.random()}@example.com`;
    const testPassword = 'Password123!';
    
    // First signup
    await page.goto('/signup');
    await page.fill('input[name="fullName"]', 'Test User');
    await page.fill('input[name="email"]', testEmail);
    await page.fill('input[name="password"]', testPassword);
    await page.fill('input[name="confirmPassword"]', testPassword);
    await Promise.all([
      page.waitForNavigation({ timeout: 10000 }).catch(() => null),
      page.click('button[type="submit"]'),
    ]);
    await expect(page).toHaveURL(/\/profile/);

    // Logout
    await Promise.all([
      page.waitForURL('**/login', { timeout: 10000 }).catch(() => null),
      page.locator('main form button:has-text("Logout")').first().click({ force: true }),
    ]);

    // Second signup with same email
    await page.goto('/signup');
    await page.fill('input[name="fullName"]', 'Test User 2');
    await page.fill('input[name="email"]', testEmail);
    await page.fill('input[name="password"]', testPassword);
    await page.fill('input[name="confirmPassword"]', testPassword);

    await Promise.all([
      page.waitForNavigation({ timeout: 10000 }).catch(() => null),
      page.click('button[type="submit"]'),
    ]);

    await expect(page).toHaveURL(/\/signup/);
    const errorDiv = page.locator('.bg-red-500\\/10');
    await expect(errorDiv).toBeVisible({ timeout: 10000 });
    await expect(errorDiv).toContainText('An account with this email already exists');
  });

  test('5. /admin protects against unauthorized users', async ({ page }) => {
    const testEmail = `test_user_admin_${Date.now()}_${Math.random()}@example.com`;
    const testPassword = 'Password123!';
    
    // Login as normal LEARNER
    await page.goto('/signup');
    await page.fill('input[name="fullName"]', 'Test User');
    await page.fill('input[name="email"]', testEmail);
    await page.fill('input[name="password"]', testPassword);
    await page.fill('input[name="confirmPassword"]', testPassword);
    await Promise.all([
      page.waitForNavigation({ url: '**/profile', timeout: 15000 }).catch(() => null),
      page.click('button[type="submit"]'),
    ]);
    await expect(page).toHaveURL(/\/profile/);

    // Try admin
    await page.goto('/admin');
    await expect(page).toHaveURL(/\/unauthorized/);
  });
});
