import { test, expect } from '@playwright/test';

test.describe('Practice & Assignments Submission', () => {
  const ROADMAP_URL = '/roadmap/ai-engineering/learn';
  // This title comes from the live Neon seed (week-1, type=assignment, order_index=5)
  const ASSIGNMENT_TITLE = 'Track A: Finish all these exercises';

  // Wait for LearnView to hydrate and render content.
  // LearnView uses opacity-0 → opacity-100 after isMounted.
  // We wait for the specific assignment text to appear rather than checking CSS state.
  async function waitForAssignmentVisible(page: any) {
    // Retry loop: activate first node via Start Lesson if needed, then check for assignment text
    await expect(async () => {
      const startBtn = page.getByRole('button', { name: /Start Lesson/i }).first();
      if (await startBtn.isVisible({ timeout: 500 }).catch(() => false)) {
        await startBtn.click({ force: true });
      }
      await expect(
        page.getByText(ASSIGNMENT_TITLE, { exact: false }).first()
      ).toBeVisible({ timeout: 2000 });
    }).toPass({ timeout: 25000 });
  }

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.clear();
      // Seed enrollment date so week-1 is the active node
      localStorage.setItem('loopcraft-enrollment-ai-engineering', new Date().toISOString());
    });
  });

  test('Should handle assignment submission flow correctly', async ({ page }) => {
    await page.goto(ROADMAP_URL);
    // Wait for the LearnView client component to hydrate (isMounted transition)
    await page.waitForTimeout(3000);
    await waitForAssignmentVisible(page);

    // The assignment section container (find the specific resource card)
    const assignmentContainer = page.locator('div.border.transition-all').filter({ hasText: ASSIGNMENT_TITLE }).first();
    await expect(assignmentContainer).toBeVisible();

    // 2. URL input is present
    const input = assignmentContainer.locator('input[type="url"]');
    await expect(input).toBeVisible();

    // 3. Invalid URL is rejected
    let alertMessage = '';
    page.on('dialog', dialog => {
      alertMessage = dialog.message();
      dialog.accept();
    });

    await input.fill('invalid-url');
    await assignmentContainer.getByRole('button', { name: 'Submit' }).click();
    expect(alertMessage).toContain('Please enter a valid URL');

    // 4. Valid URL can be submitted
    const validUrl = 'https://github.com/loopcraft/project';
    await input.fill(validUrl);
    await assignmentContainer.getByRole('button', { name: 'Submit' }).click();

    // 5. Submitted URL is displayed
    await expect(assignmentContainer.getByText('Submitted', { exact: true })).toBeVisible();
    const link = assignmentContainer.getByRole('link', { name: validUrl });
    await expect(link).toBeVisible();

    // 6. Submission does NOT automatically mark assignment completed
    const checkButton = assignmentContainer.locator('button[title="Mark complete"]');
    await expect(checkButton).toBeVisible();

    // 7. Existing completion still works
    await checkButton.click();
    await expect(assignmentContainer.locator('button[title="Mark incomplete"]')).toBeVisible();

    // 8. Submission persists after refresh
    await page.reload();
    await page.waitForTimeout(3000);
    await waitForAssignmentVisible(page);

    const reloadedContainer = page.locator('div.border.transition-all').filter({ hasText: ASSIGNMENT_TITLE }).first();
    await expect(reloadedContainer.getByText('Submitted', { exact: true })).toBeVisible();
    await expect(reloadedContainer.getByRole('link', { name: validUrl })).toBeVisible();

    // 9. URL can be edited
    await reloadedContainer.getByRole('button', { name: /Edit URL/i }).click();
    const editInput = reloadedContainer.locator('input[type="url"]');
    await expect(editInput).toHaveValue(validUrl);
  });

  test('Existing completed assignment without URL remains completed', async ({ page }) => {
    // Seed localStorage with a completed assignment but NO submission
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.setItem('loopcraft-enrollment-ai-engineering', new Date().toISOString());
      localStorage.setItem('loopcraft-assignments-ai-engineering', JSON.stringify({
        'week-1': ['Track A: Finish all these exercises']
      }));
    });

    await page.goto(ROADMAP_URL);
    await page.waitForTimeout(3000);
    await waitForAssignmentVisible(page);

    const assignmentContainer = page.locator('div.border.transition-all').filter({ hasText: ASSIGNMENT_TITLE }).first();

    // Should be marked as complete (Mark incomplete button visible)
    await expect(assignmentContainer).toBeVisible();
    await expect(assignmentContainer.locator('button[title="Mark incomplete"]')).toBeVisible();

    // Should display the fallback text for completed without a link
    await expect(assignmentContainer.getByText(/Completed.*No project link provided/i)).toBeVisible();
  });
});
