// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = 'Zentala.pl - Blog o innowacjach';
export const SITE_DESCRIPTION = 'Blog o innowacjach społecznych, politycznych, administracyjnych i innych, które mogą pomóc Polsce.';

export const NAV_ITEMS = [
  { name: 'Strona główna', href: '/' },
  { name: 'Blog', href: '/blog' },
  { name: 'O mnie', href: '/about' },
];

export type PostType = 'text' | 'video' | 'audio' | 'infographic';
export type PostSize = 'small' | 'medium' | 'large';
