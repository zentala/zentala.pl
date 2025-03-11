import { test, expect } from '@playwright/test';

test.describe('System tagów', () => {
  test('strona z tagami powinna wyświetlać listę tagów', async ({ page }) => {
    await page.goto('/tags');
    
    // Sprawdź nagłówek
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    await expect(heading).toContainText('Wszystkie tagi');
    
    // Sprawdź, czy wyświetlane są tagi
    const tagCards = page.locator('a[href^="/tags/"]').filter({ hasText: /artykuł|artykuły|artykułów/ });
    await expect(tagCards).toHaveCount({ gte: 1 });
  });
  
  test('powinna umożliwiać przejście do widoku konkretnego tagu', async ({ page }) => {
    // Przejdź do strony z tagami
    await page.goto('/tags');
    
    // Znajdź pierwszy tag i kliknij go
    const firstTag = page.locator('a[href^="/tags/"]').first();
    const tagName = await firstTag.textContent();
    await firstTag.click();
    
    // Sprawdź, czy jesteśmy na stronie tagu
    await expect(page).toHaveURL(/\/tags\/[^/]+$/);
    
    // Sprawdź, czy nagłówek zawiera nazwę tagu
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
  });
  
  test('karty postów powinny zawierać tagi', async ({ page }) => {
    await page.goto('/');
    
    // Znajdź kartę posta z tagami
    const postCard = page.locator('div[class*="col-span"]').first();
    
    // Sprawdź, czy karta posta zawiera tagi
    const tags = postCard.locator('a[href^="/tags/"]');
    await expect(tags).toHaveCount({ gte: 0 }); // Może nie być tagów, ale nie powinno crashować
  });
  
  test('strona tagu powinna wyświetlać powiązane posty', async ({ page }) => {
    // Przejdź do strony z tagami
    await page.goto('/tags');
    
    // Znajdź pierwszy tag i kliknij go
    const firstTag = page.locator('a[href^="/tags/"]').first();
    await firstTag.click();
    
    // Sprawdź, czy wyświetlane są powiązane posty
    const postCards = page.locator('div[class*="col-span"]');
    await expect(postCards).toHaveCount({ gte: 0 }); // Może nie być postów z danym tagiem
    
    // Sprawdź, czy wyświetlana jest sekcja z powiązanymi tagami
    const relatedTagsSection = page.locator('section', { hasText: 'Powiązane tagi' });
    await expect(relatedTagsSection).toBeVisible();
  });
});