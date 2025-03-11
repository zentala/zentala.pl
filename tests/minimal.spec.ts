import { test, expect } from '@playwright/test';

test.describe('Testy podstawowe', () => {
  test('strona główna powinna się ładować', async ({ page }) => {
    await page.goto('/');
    
    // Sprawdź, czy strona się załadowała
    await expect(page.locator('body')).toBeVisible();
    
    // Sprawdź, czy istnieje jakiś nagłówek
    const heading = page.locator('h1, h2, h3').first();
    await expect(heading).toBeVisible();
  });

  test('strona bloga powinna się ładować', async ({ page }) => {
    await page.goto('/blog');
    
    // Sprawdź, czy strona się załadowała
    await expect(page.locator('body')).toBeVisible();
  });
});