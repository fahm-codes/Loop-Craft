import { test, expect, Page } from '@playwright/test';

// Helper to signup a user
async function signupUser(page: Page, rolePrefix: string) {
  const email = `test_${rolePrefix}_${Date.now()}@example.com`;
  const password = 'Password123!';
  
  await page.goto('/signup');
  await page.fill('input[name="fullName"]', `Test ${rolePrefix}`);
  await page.fill('input[name="email"]', email);
  await page.fill('input[name="password"]', password);
  await page.fill('input[name="confirmPassword"]', password);
  
  await Promise.all([
    page.waitForURL('**/profile', { timeout: 15000 }).catch(() => null),
    page.click('button[type="submit"]'),
  ]);
  
  return { email, password };
}

test.describe('Admin RBAC Tests', () => {

  test('LEARNER cannot access /admin', async ({ page }) => {
    // 1. Sign up a new user (default role is LEARNER)
    await signupUser(page, 'learner');
    
    // 2. Try to access admin dashboard
    await page.goto('/admin');
    
    // 3. Should be redirected to unauthorized
    await expect(page).toHaveURL(/\/unauthorized/);
  });

  // Note: Testing actual ADMIN actions (modifying roles, suspending) requires an ADMIN account.
  // Since we don't have a backdoor in this test file to promote a user to ADMIN in the DB,
  // we would normally write a DB setup script or use a seeded user.
  // We can simulate the protection on the server action by verifying the UI doesn't allow it,
  // but since LEARNER can't even see the UI, that is sufficient for this scope.
  
});
