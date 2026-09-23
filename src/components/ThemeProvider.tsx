"use client";
import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  actualTheme: 'dark' | 'light';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('system');
  const [actualTheme, setActualTheme] = useState<'dark' | 'light'>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('loopcraft-theme') as Theme;
    if (stored) {
      setThemeState(stored);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const applyTheme = (newTheme: Theme) => {
      let resolved: 'dark' | 'light' = 'dark';
      if (newTheme === 'system') {
        resolved = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
      } else {
        resolved = newTheme;
      }
      
      const root = document.documentElement;
      root.classList.remove('light-theme', 'dark-theme');
      root.classList.add(`${resolved}-theme`);
      setActualTheme(resolved);
    };

    applyTheme(theme);
    if (theme !== 'system') {
      localStorage.setItem('loopcraft-theme', theme);
    } else {
      localStorage.removeItem('loopcraft-theme');
    }
  }, [theme, mounted]);

  useEffect(() => {
    if (!mounted || theme !== 'system') return;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
    const handleChange = () => {
      const root = document.documentElement;
      root.classList.remove('light-theme', 'dark-theme');
      const resolved = mediaQuery.matches ? 'light' : 'dark';
      root.classList.add(`${resolved}-theme`);
      setActualTheme(resolved);
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, mounted]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme: setThemeState, actualTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
