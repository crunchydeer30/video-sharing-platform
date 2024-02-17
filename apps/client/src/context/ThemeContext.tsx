import { createContext, useEffect, useState } from 'react';

export enum Theme {
  Light = 'light',
  Dark = 'dark',
  Device = 'device'
}

export interface ThemeContext {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ThemeContext = createContext({} as ThemeContext);

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const getCurrentTheme = (): Theme => {
    document.documentElement.style.backgroundColor = '';

    switch (localStorage.getItem('theme')) {
      case Theme.Light:
        return Theme.Light;
      case Theme.Dark:
        return Theme.Dark;
      default:
        localStorage.setItem('theme', Theme.Device);
        return Theme.Device;
    }
  };

  const [theme, setTheme] = useState<Theme>(getCurrentTheme());
  const [isDarkMode, setIsDarkMode] = useState(theme === Theme.Dark);

  useEffect(() => {
    localStorage.setItem('theme', theme);

    if (theme !== Theme.Device) {
      setIsDarkMode(theme === Theme.Dark);
      document.documentElement.classList.toggle('dark', Theme.Dark === theme);
    } else {
      document.documentElement.classList.toggle(
        'dark',
        window.matchMedia('(prefers-color-scheme: dark)').matches
      );
      setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }, [theme]);

  /* Watch for system theme changes if theme set to 'device' */

  useEffect(() => {
    const isSystemDark = (event: MediaQueryListEvent) => {
      if (theme === Theme.Device) {
        document.documentElement.classList.toggle('dark', event.matches);
        setIsDarkMode(event.matches);
      }
    };

    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', isSystemDark);

    return () =>
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .removeEventListener('change', isSystemDark);
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{ theme, setTheme, isDarkMode, setIsDarkMode }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
