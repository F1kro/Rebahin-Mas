import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {}
});

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'light';
    return localStorage.getItem('rebahin-theme') || 'light';
  });

  useEffect(() => {
    localStorage.setItem('rebahin-theme', theme);
    const root = document.documentElement;
    root.dataset.theme = theme;
    root.classList.remove('theme-light', 'theme-dark', 'dark', 'light');
    root.classList.add(`theme-${theme}`, theme === 'dark' ? 'dark' : 'light');
    document.body.classList.remove('theme-light', 'theme-dark', 'dark', 'light');
    document.body.classList.add(`theme-${theme}`, theme === 'dark' ? 'dark' : 'light');
  }, [theme]);

  const toggleTheme = () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));

  const value = useMemo(() => ({ theme, toggleTheme }), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
