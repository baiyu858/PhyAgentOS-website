import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import { themes, defaultTheme, type ThemeConfig } from './theme-config';

interface ThemeContextType {
  currentTheme: ThemeConfig;
  setTheme: (themeId: string) => void;
  allThemes: ThemeConfig[];
}

const ThemeContext = createContext<ThemeContextType>({
  currentTheme: defaultTheme,
  setTheme: () => {},
  allThemes: themes,
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<ThemeConfig>(defaultTheme);

  useEffect(() => {
    applyThemeToDOM(currentTheme);
  }, []);

  const setTheme = useCallback((themeId: string) => {
    const theme = themes.find((t) => t.id === themeId);
    if (theme) {
      setCurrentTheme(theme);
      applyThemeToDOM(theme);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, allThemes: themes }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

export function applyThemeToDOM(theme: ThemeConfig) {
  const root = document.documentElement;
  const c = theme.colors;

  root.style.setProperty('--color-bg', c.bg);
  root.style.setProperty('--color-bg-secondary', c.bgSecondary);
  root.style.setProperty('--color-bg-tertiary', c.bgTertiary);
  root.style.setProperty('--color-bg-elevated', c.bgElevated);
  root.style.setProperty('--color-accent', c.accent);
  root.style.setProperty('--color-accent-light', c.accentLight);
  root.style.setProperty('--color-accent-dark', c.accentDark ?? c.accent);
  root.style.setProperty('--color-accent-glow', c.accentGlow);
  root.style.setProperty('--color-text', c.text);
  root.style.setProperty('--color-text-secondary', c.textSecondary);
  root.style.setProperty('--color-text-tertiary', c.textTertiary);
  root.style.setProperty('--color-text-on-accent', c.textOnAccent ?? c.text);
  root.style.setProperty('--color-border', c.border);
  root.style.setProperty('--color-border-hover', c.borderHover);
  root.style.setProperty('--color-success', c.success);
  root.style.setProperty('--color-warning', c.warning);
  root.style.setProperty('--color-info', c.info);
  root.style.setProperty('--radius', theme.style.borderRadius);

  // Apply dark/light class for Tailwind
  if (theme.category === 'light') {
    root.classList.add('theme-light');
    root.classList.remove('theme-dark');
  } else {
    root.classList.add('theme-dark');
    root.classList.remove('theme-light');
  }
}
