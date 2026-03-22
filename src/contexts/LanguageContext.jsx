import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const LanguageContext = createContext({
  language: 'en',
  toggleLanguage: () => {}
});

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    if (typeof window === 'undefined') return 'en';
    return localStorage.getItem('rebahin-lang') || 'id';
  });

  useEffect(() => {
    localStorage.setItem('rebahin-lang', language);
  }, [language]);

  const toggleLanguage = () => setLanguage(prev => (prev === 'id' ? 'en' : 'id'));

  const value = useMemo(() => ({ language, toggleLanguage }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => useContext(LanguageContext);
