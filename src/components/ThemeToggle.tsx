import React, { useState, useEffect } from 'react';

// Dostępne motywy
type Theme = 'light' | 'dark' | 'system';

// Funkcja do ustawiania aktualnego motywu
const setTheme = (theme: Theme) => {
  // Zapisujemy preferencję użytkownika w localStorage
  if (theme === 'system') {
    localStorage.removeItem('theme-preference');
  } else {
    localStorage.setItem('theme-preference', theme);
  }

  // Aktualizujemy klasy na głównym elemencie root
  const root = document.documentElement;
  
  if (theme === 'dark') {
    root.classList.add('dark-theme');
    root.classList.remove('light-theme');
  } else if (theme === 'light') {
    root.classList.add('light-theme');
    root.classList.remove('dark-theme');
  } else {
    // Dla trybu systemowego sprawdzamy preferencje systemowe
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
      root.classList.add('dark-theme');
      root.classList.remove('light-theme');
    } else {
      root.classList.add('light-theme');
      root.classList.remove('dark-theme');
    }
  }
  
  // Wymuszenie aktualizacji styli nagłówka
  const header = document.getElementById('site-header');
  if (header) {
    // Trik: usuń i dodaj element z powrotem do DOM, aby wymusić ponowne renderowanie styli
    const parent = header.parentNode;
    const next = header.nextSibling;
    if (parent) {
      parent.removeChild(header);
      setTimeout(() => {
        parent.insertBefore(header, next);
      }, 10);
    }
  }
};

// Funkcja do pobierania bieżącego motywu
const getTheme = (): Theme => {
  const savedTheme = localStorage.getItem('theme-preference') as Theme | null;
  return savedTheme || 'system';
};

const ThemeToggle: React.FC = () => {
  // Stan do przechowywania bieżącego motywu
  const [theme, setThemeState] = useState<Theme>('system');

  // Funkcja do przełączania motywu
  const toggleTheme = () => {
    const newTheme: Theme = theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light';
    setThemeState(newTheme);
    setTheme(newTheme);
  };

  // Inicjalizacja motywu przy montowaniu komponentu
  useEffect(() => {
    const savedTheme = getTheme();
    setThemeState(savedTheme);
    setTheme(savedTheme);

    // Nasłuchiwanie zmian preferencji systemowych
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (getTheme() === 'system') {
        setTheme('system');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Ikonki dla różnych motywów
  const renderIcon = () => {
    switch (theme) {
      case 'light':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        );
      case 'dark':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        );
      case 'system':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
    }
  };

  // Etykieta dla motywu (dostępna dla czytników ekranowych)
  const getThemeLabel = () => {
    switch (theme) {
      case 'light': return 'Jasny motyw';
      case 'dark': return 'Ciemny motyw';
      case 'system': return 'Motyw systemowy';
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-neutral-200 text-neutral-700 hover:text-primary-color dark-theme:bg-neutral-700 dark-theme:text-neutral-300 dark-theme:hover:text-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-color transition-colors"
      aria-label={`Przełącz motyw, obecnie: ${getThemeLabel()}`}
      title={getThemeLabel()}
    >
      {renderIcon()}
    </button>
  );
};

export default ThemeToggle;