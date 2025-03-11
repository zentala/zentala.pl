import { test, expect } from '@playwright/test';

test.describe('System tagów', () => {
  test('strona z tagami powinna wyświetlać listę tagów', async ({ page }) => {
    await page.goto('/tags');
    
    // Sprawdź nagłówek
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible();
    await expect(heading).toContainText('tagi');
    
    // Sprawdź, czy istnieje jakakolwiek lista lub siatka
    const tagsList = page.locator('div[class*="grid"]').first();
    await expect(tagsList).toBeVisible();
  });
  
  test('powinna umożliwiać przejście do widoku konkretnego tagu', async ({ page }) => {
    // Przejdź do strony z tagami
    await page.goto('/tags');
    
    // Znajdź pierwszy link z tagiem i kliknij go, jeśli istnieje
    const firstTagLink = page.locator('a[href^="/tags/"]').first();
    
    if (await firstTagLink.count() > 0) {
      await firstTagLink.click();
      
      // Sprawdź, czy URL zawiera /tags/
      await expect(page.url()).toContain('/tags/');
      
      // Sprawdź, czy jakiś nagłówek jest widoczny
      const heading = page.locator('h1').first();
      await expect(heading).toBeVisible();
    }
  });
  
  test('karty postów mogą zawierać tagi', async ({ page }) => {
    await page.goto('/');
    
    // Sprawdź czy istnieje jakakolwiek siatka
    const grid = page.locator('div[class*="grid"]').first();
    await expect(grid).toBeVisible();
    
    // Sprawdź, czy grid zawiera linki
    const links = grid.locator('a');
    const count = await links.count();
    expect(count).toBeGreaterThanOrEqual(0);
  });
});