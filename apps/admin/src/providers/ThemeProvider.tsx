'use client';

import { FC, PropsWithChildren, useCallback, useEffect, useMemo, useState } from 'react';
import { Theme, ThemeContext } from '@/contexts/ThemeContext';

const STORAGE_KEY = 'tripto-theme';

const resolveInitialTheme = (): Theme => {
  if (typeof window === 'undefined') return 'light';
  const saved = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
  if (saved === 'light' || saved === 'dark') return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

/**
 * App-wide dark mode provider.
 * Applies the `dark` class to `<html>` (matches the Tailwind
 * `@custom-variant dark` in globals.css) and persists the choice.
 * An inline script in `app/layout.tsx` pre-applies the class pre-paint
 * to avoid a light-flash on reload.
 */
export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  // Lazy init reads the persisted/system preference during the first render,
  // so React state agrees with the pre-paint script in app/layout.tsx and the
  // page never flashes light -> dark. SSR always renders 'light'; the resulting
  // markup difference is contained by ToggleThemeButton, which renders stable
  // light-theme markup until mounted.
  const [theme, setThemeState] = useState<Theme>(() =>
    typeof window === 'undefined' ? 'light' : resolveInitialTheme(),
  );

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    root.style.colorScheme = theme;
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
  }, []);

  const value = useMemo(() => ({ theme, setTheme }), [theme, setTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
