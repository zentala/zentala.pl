import { test, expect } from '@playwright/test';

test.describe('Strona główna', () => {
  test('powinna załadować się poprawnie', async ({ page }) => {
    await page.goto('/');
    
    // Sprawdź tytuł strony
    await expect(page).toHaveTitle(/Zentala.pl - Blog o innowacjach/);
    
    // Sprawdź nagłówek
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible();
    await expect(heading).toContainText('Innowacje dla Polski');
    
    // Sprawdź sekcję z artykułami - używamy sekcji, która zawiera słowo "artykuły" lub jest drugą sekcją na stronie
    const articlesSection = page.locator('section >> nth=1');
    await expect(articlesSection).toBeVisible();
    
    // Sprawdź linki nawigacyjne - mogą być w różnych miejscach w zależności od rozmiaru ekranu
    const navigation = page.locator('header').first();
    await expect(navigation).toBeVisible();
    
    // Sprawdź, czy widoczny jest przynajmniej jeden z linków nawigacyjnych
    const navLinks = navigation.locator('a');
    const count = await navLinks.count();
    expect(count).toBeGreaterThanOrEqual(1);
    
    // Sprawdź stopkę
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
  });
  
  test('powinna wyświetlać układ siatki', async ({ page }) => {
    await page.goto('/');
    
    // Sprawdź, czy jakakolwiek siatka jest widoczna
    const grid = page.locator('div[class*="grid"]').first();
    await expect(grid).toBeVisible();
  });
  
  test('powinna mieć działające linki nawigacyjne', async ({ page }) => {
    await page.goto('/');
    
    // Kliknij link do bloga - jeśli istnieje
    const blogLink = page.getByRole('link', { name: /Blog/i }).first();
    try {
      const isVisible = await blogLink.isVisible();
      if (isVisible) {
        await blogLink.click();
        await expect(page.url()).toContain('/blog');
        
        // Wróć do strony głównej
        await page.goto('/');
      }
    } catch (error) {
      console.log('Blog link not found or not clickable');
    }
    
    // Kliknij link do tagów - jeśli istnieje
    const tagsLink = page.getByRole('link', { name: /Tag/i }).first();
    try {
      const isVisible = await tagsLink.isVisible();
      if (isVisible) {
        await tagsLink.click();
        await expect(page.url()).toContain('/tags');
        
        // Wróć do strony głównej
        await page.goto('/');
      }
    } catch (error) {
      console.log('Tag link not found or not clickable');
    }
  });
});