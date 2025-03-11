# Zentala.pl - Blog o innowacjach

Blog poświęcony innowacjom społecznym, politycznym, administracyjnym i innym, które mogą pomóc Polsce w rozwoju.

## 🚀 Funkcjonalności

- ✅ Układ masonry na stronie głównej (jak Pinterest)
- ✅ Responsywny design (mobile-first)
- ✅ System tagów i linkowania między artykułami
- ✅ Wsparcie dla różnych typów wpisów (tekst, wideo, audio)
- ✅ Wsparcie dla Markdown i MDX
- ✅ Optymalizacja pod SEO
- ✅ Wsparcie dla RSS
- ✅ Sitemap
- ✅ Ciemny motyw
- ✅ Wysoka wydajność

## 🏗️ Struktura projektu

```text
├── public/              # Zasoby statyczne
├── src/
│   ├── components/      # Komponenty Astro i React
│   ├── content/         # Treści w formacie Markdown/MDX
│   │   ├── blog/        # Artykuły
│   │   └── tags/        # Definicje tagów
│   ├── layouts/         # Szablony stron
│   ├── pages/           # Strony
│   ├── styles/          # Style globalne
│   └── utils/           # Funkcje pomocnicze
├── astro.config.mjs     # Konfiguracja Astro
├── tailwind.config.js   # Konfiguracja Tailwind CSS
└── tsconfig.json        # Konfiguracja TypeScript
```

## 💻 Komendy

Wszystkie komendy uruchamiane są z katalogu głównego projektu:

| Komenda                  | Opis                                              |
| :----------------------- | :------------------------------------------------ |
| `npm install`            | Instalacja zależności                             |
| `npm run dev`            | Uruchomienie serwera deweloperskiego (`localhost:4321`) |
| `npm run build`          | Zbudowanie wersji produkcyjnej do katalogu `./dist/` |
| `npm run preview`        | Podgląd wersji produkcyjnej lokalnie              |
| `npm run astro add ...`  | Dodawanie integracji (np. `npm run astro add react`) |

## 📝 Dodawanie treści

### Artykuły

Artykuły dodawane są w katalogu `src/content/blog/` w formacie Markdown (`.md`) lub MDX (`.mdx`). Każdy artykuł powinien zawierać nagłówek frontmatter z metadanymi:

```markdown
---
title: Tytuł artykułu
description: Krótki opis artykułu
pubDate: 2023-11-03
updatedDate: 2023-11-03
heroImage: /sciezka/do/obrazka.jpg
heroVideo: https://youtube.com/embed/xxx  # opcjonalnie
heroAudio: /sciezka/do/audio.mp3  # opcjonalnie
tags: ["tag1", "tag2"]
type: text  # text, video, audio, infographic
size: medium  # small, medium, large
featured: false  # czy post jest wyróżniony
---

Treść artykułu w formacie Markdown...
```

### Tagi

Tagi definiowane są w katalogu `src/content/tags/` jako pliki JSON:

```json
{
  "name": "Nazwa tagu",
  "description": "Opis tagu"
}
```

## 🚀 Wdrażanie na GitHub Pages

1. Zbuduj wersję produkcyjną:
   ```
   npm run build
   ```

2. Wdrażanie za pomocą GitHub Actions (zapoznaj się z plikiem workflow w `.github/workflows/deploy.yml`)

## 🔧 Konfiguracja

Główne ustawienia projektu znajdują się w `astro.config.mjs`.

## 👨‍💻 Technologie

- [Astro](https://astro.build/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [MDX](https://mdxjs.com/)

## 📝 Licencja

Ten projekt jest udostępniony na licencji MIT. Szczegóły w pliku LICENSE.