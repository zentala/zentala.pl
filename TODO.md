# TODO - Zentala.pl

## Priorytety na podstawie ostatnich ustaleń

### Struktura i nawigacja
- [x] Naprawić nieprawidłowe linki do artykułów (problem z /blog/undefined)
- [ ] Ujednolicić ścieżki - zdecydować między `/blog/[slug]` a `/[slug]` i konsekwentnie używać
- [ ] Dokończyć implementację stron kategorii pod `/kategoria/[kategoria]`
- [ ] Dokończyć implementację stron tagów pod `/tag/[tag]`
- [ ] Dodać testy sprawdzające poprawność nawigacji i linkowania między stronami

### Komponenty i interfejs
- [ ] Przeprojektować komponenty dla maksymalnej reużywalności
- [ ] Zaimplementować przełącznik trybu jasnego/ciemnego (dark/light theme switch)
- [ ] Ulepszyć menu nawigacyjne dla urządzeń mobilnych
- [ ] Dopracować responsywność na wszystkich urządzeniach

### Testy
- [ ] Rozszerzyć testy sprawdzające faktyczne przejścia między stronami
- [ ] Dodać testy sprawdzające renderowanie różnych typów treści (tekst, wideo, audio, infografika)
- [ ] Dodać testy sprawdzające filtrowanie po tagach i kategoriach
- [ ] Zautomatyzować testy jako część procesu CI/CD

### Design i UX
- [ ] Zaktualizować paletę kolorów z uwzględnieniem ciemnego motywu
- [ ] Wprowadzić lepsze fonty odpowiednie dla bloga o innowacjach
- [ ] Zaimplementować favicon (https://id.zentala.io/favicon-32x32.6344800f.png)
- [ ] Ulepszyć układ masonry na stronie głównej

### Funkcjonalności
- [ ] Zaimplementować wyszukiwarkę treści (dla pola, które już jest w interfejsie)
- [ ] Dodać system komentarzy (np. Disqus) pod artykułami
- [ ] Dodać licznik czasu czytania dla każdego artykułu
- [ ] Poprawić udostępnianie na social media (FB, X/Twitter, LinkedIn)

### Techniczne
- [ ] Zoptymalizować ładowanie mediów (obrazy, wideo, audio)
- [ ] Poprawić dostępność (WCAG) dla wszystkich elementów
- [ ] Poprawić SEO dla każdej strony
- [ ] Dodać mikrodane (schema.org) dla artykułów bloga

## Kolejne kroki
1. Ujednolicić ścieżki URL dla postów
2. Zaimplementować przełącznik dark/light mode
3. Rozszerzyć testy nawigacji i wyświetlania treści
4. Zaimplementować komponenty w sposób maksymalnie reużywalny
5. Poprawić responsywność na urządzeniach mobilnych