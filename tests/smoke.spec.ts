import { test, expect } from '@playwright/test';

const ROUTES = [
  '/',
  '/roadmaps',
  '/dashboard',
  '/groups',
  '/roadmap/ai-engineering',
  '/roadmap/full-stack',
];

test.describe('Smoke Tests & Responsiveness', () => {
  ROUTES.forEach((route) => {
    test(`Should load ${route} without console errors or horizontal overflow`, async ({ page, isMobile }) => {
      const errors: string[] = [];
      
      // Capture unexpected console errors
      page.on('pageerror', (err) => {
        errors.push(err.message);
      });
      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          const text = msg.text();
          // Ignore known harmless noise like missing favicon or specific hydration warnings 
          // (if any, though we aim for 0)
          if (!text.includes('favicon.ico') && !text.includes('Supabase initialization') && !text.includes('WebSocket')) {
            errors.push(text);
          }
        }
      });

      await page.goto(route);
      
      // Wait for network to be idle
      await page.waitForLoadState('networkidle');

      // Check for horizontal overflow (critical for mobile)
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
      
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth);
      
      // We expect 0 errors
      expect(errors).toHaveLength(0);
    });
  });
});
