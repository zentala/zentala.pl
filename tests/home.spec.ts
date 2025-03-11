import { test, expect } from '@playwright/test';

test.describe('Strona główna', () => {
  test('powinna załadować się poprawnie', async ({ page }) => {
    await page.goto('/');
    
    // Sprawdź tytuł strony
    await expect(page).toHaveTitle(/Zentala.pl - Blog o innowacjach/);
    
    // Sprawdź nagłówek
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    await expect(heading).toContainText('Innowacje dla Polski');
    
    // Sprawdź sekcję z artykułami
    const articlesSection = page.locator('section', { hasText: 'Najnowsze artykuły' });
    await expect(articlesSection).toBeVisible();
    
    // Sprawdź linki nawigacyjne
    const navigation = page.locator('header');
    await expect(navigation).toBeVisible();
    await expect(navigation.getByRole('link', { name: 'Strona główna' })).toBeVisible();
    await expect(navigation.getByRole('link', { name: 'Blog' })).toBeVisible();
    await expect(navigation.getByRole('link', { name: 'O mnie' })).toBeVisible();
    await expect(navigation.getByRole('link', { name: 'Tagi' })).toBeVisible();
    
    // Sprawdź stopkę
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    await expect(footer).toContainText('Wszelkie prawa zastrzeżone');
  });
  
  test('powinna wyświetlać układ masonry', async ({ page }) => {
    await page.goto('/');
    
    // Sprawdź, czy siatka masonry jest widoczna
    const masonryGrid = page.locator('div[class*="grid"]').filter({ hasText: /artykuł/ });
    await expect(masonryGrid).toBeVisible();
    
    // Sprawdź, czy widoczne są karty postów
    const postCards = masonryGrid.locator('div[class*="col-span"]');
    await expect(postCards).toHaveCount({ gte: 1 });
  });
  
  test('powinna mieć działające linki nawigacyjne', async ({ page }) => {
    await page.goto('/');
    
    // Kliknij link do bloga
    await page.getByRole('link', { name: 'Blog' }).click();
    await expect(page).toHaveURL(/\/blog\/?$/);
    
    // Wróć i kliknij link do tagów
    await page.goto('/');
    await page.getByRole('link', { name: 'Tagi' }).click();
    await expect(page).toHaveURL(/\/tags\/?$/);
    
    // Wróć i kliknij link do strony O mnie
    await page.goto('/');
    await page.getByRole('link', { name: 'O mnie' }).click();
    await expect(page).toHaveURL(/\/about\/?$/);
  });
});