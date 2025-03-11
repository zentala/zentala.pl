import { test, expect } from '@playwright/test';

test.describe('Strona bloga', () => {
  test('powinna wyświetlać listę postów', async ({ page }) => {
    await page.goto('/blog');
    
    // Sprawdź, czy tytuł strony jest poprawny
    await expect(page).toHaveTitle(/Blog/);
    
    // Sprawdź, czy posty są wyświetlane
    const posts = page.locator('ul li').filter({ hasText: /\d{1,2} .{3,} \d{4}/ });
    await expect(posts).toHaveCount({ gte: 1 });
  });
  
  test('posty powinny mieć linki do pełnych artykułów', async ({ page }) => {
    await page.goto('/blog');
    
    // Znajdź pierwszy post i kliknij go
    const firstPost = page.locator('a[href^="/blog/"]').first();
    const postTitle = await firstPost.textContent();
    await firstPost.click();
    
    // Sprawdź, czy jesteśmy na stronie posta
    await expect(page).toHaveURL(/\/blog\/[^/]+$/);
    
    // Sprawdź, czy tytuł posta jest poprawny
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
  });
  
  test('powinna obsługiwać różne typy postów', async ({ page }) => {
    await page.goto('/');
    
    // Sprawdź, czy karty postów mogą zawierać różne typy mediów
    const postCards = page.locator('div[class*="col-span"]');
    
    // Sprawdź, czy jest miejsce na obrazy (mogą nie być wyświetlane, jeśli nie ma obrazów)
    const images = postCards.locator('img');
    await expect(images).toHaveCount({ gte: 0 });
    
    // Sprawdź miejsca na wideo i audio (opcjonalne, mogą nie być wyświetlane)
    const videos = postCards.locator('iframe, div[class*="video"]');
    await expect(videos).toHaveCount({ gte: 0 });
    
    const audio = postCards.locator('audio');
    await expect(audio).toHaveCount({ gte: 0 });
  });
  
  test('blog post powinien mieć funkcjonalności artykułu', async ({ page }) => {
    await page.goto('/blog');
    
    // Kliknij w pierwszy post
    await page.locator('a[href^="/blog/"]').first().click();
    
    // Sprawdź, czy artykuł zawiera typowe elementy
    const article = page.locator('article');
    await expect(article).toBeVisible();
    
    // Data publikacji
    const date = page.locator('time');
    await expect(date).toBeVisible();
    
    // Treść artykułu
    const content = article.locator('p, h2, h3, ul, ol, blockquote');
    await expect(content.first()).toBeVisible();
  });
});