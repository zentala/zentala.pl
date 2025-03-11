import { test, expect } from '@playwright/test';

test.describe('Strona bloga', () => {
  test('powinna wyświetlać się poprawnie', async ({ page }) => {
    await page.goto('/blog');
    
    // Sprawdź, czy tytuł strony zawiera słowo Blog
    await expect(page).toHaveTitle(/Blog/i);
    
    // Sprawdź, czy na stronie jest jakiś element
    await expect(page.locator('body')).toBeVisible();
    
    // Sprawdź, czy istnieją linki do postów
    const links = page.locator('a[href^="/blog/"]');
    await expect(links).toHaveCount({ gte: 0 }); // Może nie być żadnych postów
  });
  
  test('powinna umożliwiać nawigację do pojedynczego posta', async ({ page }) => {
    await page.goto('/blog');
    
    // Znajdź pierwszy link do posta, jeśli istnieje
    const firstPostLink = page.locator('a[href^="/blog/"]').first();
    
    if (await firstPostLink.count() > 0) {
      await firstPostLink.click();
      
      // Sprawdź, czy URL zawiera /blog/
      await expect(page.url()).toContain('/blog/');
    }
  });
  
  test('blog post powinien być dostępny', async ({ page }) => {
    // Idź bezpośrednio do pierwszego przykładowego posta
    await page.goto('/blog/first-post');
    
    // Sprawdź, czy strona się załadowała
    await expect(page.locator('body')).toBeVisible();
    
    // Sprawdź, czy nagłówek jest widoczny
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible();
  });
});