import { test, expect } from '@playwright/test';

test.describe('Theme Tests', () => {
  test('Light and Dark mode tokens are present', async ({ page }) => {
    await page.goto('/');
    
    // Switch to Light Mode
    await page.evaluate(() => {
      document.documentElement.classList.add('light-theme');
      document.documentElement.classList.remove('dark-theme');
    });

    const lightStyles = await page.evaluate(() => {
      const computed = getComputedStyle(document.documentElement);
      return {
        accent: computed.getPropertyValue('--app-accent').trim(),
        bgMain: computed.getPropertyValue('--app-bg-main').trim(),
        error: computed.getPropertyValue('--app-error').trim(),
        warning: computed.getPropertyValue('--app-warning').trim(),
      };
    });

    // Check light tokens based on requested spec
    expect(lightStyles.accent.toLowerCase()).toBe('#38ce3c');
    expect(lightStyles.bgMain.toLowerCase()).toBe('#f7f9fc');
    expect(lightStyles.error.toLowerCase()).toBe('#ff4d6b');
    expect(lightStyles.warning.toLowerCase()).toBe('#ffde73');

    // Switch to Dark Mode
    await page.evaluate(() => {
      document.documentElement.classList.add('dark-theme');
      document.documentElement.classList.remove('light-theme');
    });

    const darkStyles = await page.evaluate(() => {
      const computed = getComputedStyle(document.documentElement);
      return {
        accent: computed.getPropertyValue('--app-accent').trim(),
        bgMain: computed.getPropertyValue('--app-bg-main').trim(),
        success: computed.getPropertyValue('--app-success').trim(),
        blue: computed.getPropertyValue('--app-blue').trim(),
        info: computed.getPropertyValue('--app-info').trim(),
      };
    });

    // Check dark tokens based on requested spec
    expect(darkStyles.accent.toLowerCase()).toBe('#af1763');
    expect(darkStyles.bgMain.toLowerCase()).toBe('#191c24');
    expect(darkStyles.success.toLowerCase()).toBe('#198754');
    expect(darkStyles.blue.toLowerCase()).toBe('#0d6efd');
    expect(darkStyles.info.toLowerCase()).toBe('#0dcaf0');
  });

  test('Theme persists across reload', async ({ page }) => {
    // Go to homepage
    await page.goto('/');
    
    // Ensure we start with system or a default, let's explicitly set dark in localStorage
    await page.evaluate(() => {
      localStorage.setItem('loopcraft-theme', 'dark');
    });
    
    // Reload so script in head picks it up
    await page.reload();
    
    let isDark = await page.evaluate(() => document.documentElement.classList.contains('dark-theme'));
    expect(isDark).toBe(true);

    // Click the theme toggle in Navbar if available (Navbar exists on /)
    // We can also just set it via our ThemeProvider logic, but simulating toggle is better
    // Since we know the toggle is there, we'll try to find it. The toggle uses Moon/Sun icon.
    // It's easier to just invoke the localStorage update as a user would or use the actual button.
    const toggleButton = await page.locator('header button, nav button').filter({ hasText: '' }).first(); 
    // Actually finding the toggle by clicking the sun/moon is fragile in a smoke test if icons change.
    // Let's just set the localStorage to light and reload, validating persistence mechanics directly.
    
    await page.evaluate(() => {
      localStorage.setItem('loopcraft-theme', 'light');
    });
    await page.reload();

    let isLight = await page.evaluate(() => document.documentElement.classList.contains('light-theme'));
    expect(isLight).toBe(true);
  });
});
