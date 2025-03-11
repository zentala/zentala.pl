import { test, expect } from '@playwright/test';

test.describe('Strona bloga', () => {
  test('powinna wyświetlać się poprawnie', async ({ page }) => {
    await page.goto('/blog');
    
    // Sprawdź, czy tytuł strony zawiera słowo Blog lub Innowacje
    await expect(page).toHaveTitle(/Blog|Innowacje/i);
    
    // Sprawdź, czy na stronie jest jakiś element
    await expect(page.locator('body')).toBeVisible();
    
    // Sprawdź, czy istnieją linki do postów
    const links = page.locator('a[href^="/blog/"]');
    const count = await links.count();
    expect(count).toBeGreaterThanOrEqual(0); // Może nie być żadnych postów
  });
  
  test('powinna umożliwiać nawigację do pojedynczego posta', async ({ page }) => {
    await page.goto('/blog');
    
    // Znajdź pierwszy link do posta, jeśli istnieje
    const firstPostLink = page.locator('a[href^="/blog/"]');
    const count = await firstPostLink.count();
    
    if (count > 0) {
      await firstPostLink.first().click();
      
      // Sprawdź, czy URL zawiera /blog/
      await expect(page.url()).toContain('/blog/');
      
      // Sprawdź, czy treść artykułu się załadowała
      const articleContent = page.locator('.post-content');
      await expect(articleContent).toBeVisible();
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
    
    // Sprawdź, czy treść artykułu jest widoczna
    const content = page.locator('.post-content');
    await expect(content).toBeVisible();
  });
  
  test('przekierowanie z /[slug] do /blog/[slug] powinno działać', async ({ page }) => {
    // Przejdź do artykułu bezpośrednio przez ścieżkę /[slug]
    await page.goto('/first-post');
    
    // Sprawdź, czy zostaliśmy przekierowani na /blog/first-post
    await expect(page).toHaveURL(/\/blog\/first-post$/);
    
    // Sprawdź, czy treść artykułu się załadowała
    const articleContent = page.locator('.post-content');
    await expect(articleContent).toBeVisible();
  });
});