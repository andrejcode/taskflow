import { useState } from 'react';
import ThemeContext, { type ThemeContextType } from '@/contexts/ThemeContext';

function getInitialTheme(): ThemeContextType['theme'] {
  console.log('getInitialTheme');
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'light' || savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', savedTheme);
    console.log('savedTheme', savedTheme);
    return savedTheme;
  }

  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = prefersDarkMode ? 'dark' : 'light';

  document.documentElement.setAttribute('data-theme', initialTheme);
  console.log('initialTheme', initialTheme);
  return initialTheme;
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeContextType['theme']>(() => getInitialTheme());

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';

    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);

    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}
