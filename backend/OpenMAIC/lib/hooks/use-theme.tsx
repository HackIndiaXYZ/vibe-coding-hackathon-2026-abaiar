'use client';

import { createContext, useContext, useEffect, useState, useRef, ReactNode, useCallback } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const API_BASE = 'http://127.0.0.1:5010';
const SYNC_INTERVAL = 2000;
const SYSTEM_THEME_KEY = 'taa-system-theme';

async function fetchSystemTheme(): Promise<'light' | 'dark' | null> {
  try {
    const res = await fetch(`${API_BASE}/api/theme`, { signal: AbortSignal.timeout(3000) });
    if (res.ok) {
      const data = await res.json();
      if (data.theme === 'light' || data.theme === 'dark') {
        return data.theme;
      }
    }
  } catch {
    /* backend unavailable */
  }
  return null;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('system');
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>('light');
  const lastSyncRef = useRef<string | null>(null);
  const mountedRef = useRef(false);

  const resolvedTheme = theme === 'system' ? systemTheme : theme;

  const applyTheme = useCallback((isDark: boolean) => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem('theme') as Theme | null;
    if (stored && ['light', 'dark', 'system'].includes(stored)) {
      setThemeState(stored);
    }
    setSystemTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  }, []);

  useEffect(() => {
    applyTheme(resolvedTheme === 'dark');
  }, [resolvedTheme, applyTheme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      setSystemTheme(mediaQuery.matches ? 'dark' : 'light');
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
    }

    fetchSystemTheme().then((backendTheme) => {
      if (backendTheme) {
        try {
          sessionStorage.setItem(SYSTEM_THEME_KEY, backendTheme);
        } catch { /* ignore */ }
        lastSyncRef.current = backendTheme;

        const stored = localStorage.getItem('theme') as Theme | null;
        if (!stored || stored === 'system') {
          setSystemTheme(backendTheme);
        }
      }
    });

    const interval = setInterval(async () => {
      const backendTheme = await fetchSystemTheme();
      if (backendTheme && backendTheme !== lastSyncRef.current) {
        lastSyncRef.current = backendTheme;
        try {
          sessionStorage.setItem(SYSTEM_THEME_KEY, backendTheme);
        } catch { /* ignore */ }

        const stored = localStorage.getItem('theme') as Theme | null;
        if (!stored || stored === 'system') {
          setSystemTheme(backendTheme);
        } else {
          setSystemTheme(backendTheme);
        }
      }
    }, SYNC_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  const handleSetTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: handleSetTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
