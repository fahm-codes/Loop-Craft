import { test, expect } from '@playwright/test';

test.describe('DSA Problem Sheets', () => {
  test('DSA Sheets navigation and overview flow', async ({ page }) => {
    // 1. /dsa-sheets loads
    page.on('pageerror', err => console.log('PW ERROR:', err)); await page.goto('/dsa-sheets');
    await expect(page.getByRole('heading', { name: 'DSA Problem Sheets' })).toBeVisible();

    // 2. Apna College DSA Sheet card appears on the index
    const sheetCard = page.getByRole('link', { name: /Apna College DSA Sheet/i }).first();
    await expect(sheetCard).toBeVisible();

    // 3. Click sheet card to go to overview
    await page.goto('/dsa-sheets/apna-college');
    await page.waitForURL('**/apna-college');

    // 4. SheetView is a client component that renders null until isMounted.
    //    Use a fixed wait to allow the React useEffect to fire and set isMounted=true.
    await page.waitForTimeout(3000);
    const heading = page.locator('h1').filter({ hasText: 'Apna College DSA Sheet' });
    await expect(heading).toBeVisible({ timeout: 10000 });

    // 5. Provider text is visible (in breadcrumb span with class text-accent)
    await expect(page.getByText('Apna College', { exact: false }).first()).toBeVisible();

    // 6. Sections appear — first section is auto-expanded after mount
    const sectionTitle = page.getByRole('heading', { name: 'Day 1 : Array (Part 1)' }).first();
    await expect(sectionTitle).toBeVisible({ timeout: 10000 });

    // 7. Problems appear — Majority Element is the first problem
    const problemName = page.getByText('Majority Element').first();
    await expect(problemName).toBeVisible();

    // 8. Status can change
    const selectLocator = page.locator('select').nth(1); // 0 is filter, 1 is the first problem status
    await selectLocator.selectOption('SOLVED');

    // Check if Solved count updated (initially 0, now 1)
    await expect(page.locator('div.text-success.text-2xl').first()).toHaveText('1');

    // 9. Status persists after reload
    await page.reload();
    await page.waitForTimeout(3000);
    await expect(page.locator('h1').filter({ hasText: 'Apna College DSA Sheet' })).toBeVisible({ timeout: 10000 });
    await expect(page.locator('div.text-success.text-2xl').first()).toHaveText('1');

    // 10. Filter works
    const searchInput = page.getByPlaceholder('Search problems...');
    await searchInput.fill('NonExistentProblem123');
    await expect(page.getByText('No problems found matching your criteria.')).toBeVisible();
    await searchInput.fill('Majority Element');
    await expect(page.getByText('Majority Element').first()).toBeVisible();

    // 11. Problem detail opens
    const problemLink = page.getByRole('link', { name: 'Majority Element' }).first();
    await problemLink.click();

    // Check if Problem Details loaded
    await expect(page.getByRole('heading', { name: 'Majority Element' })).toBeVisible();
    await expect(page.getByText('Day 1 : Array (Part 1)').first()).toBeVisible();
    await expect(page.getByText('Easy').first()).toBeVisible();

    // 12. Original problem link exists
    const solveLink = page.getByRole('link', { name: /Solve/i }).first();
    await expect(solveLink).toBeVisible();

    // Status is synced
    const detailSelect = page.locator('select').first();
    await expect(detailSelect).toHaveValue('SOLVED');
  });
});






