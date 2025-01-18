import { useContext } from 'react';
import ThemeContext from '@/contexts/ThemeContext';

export default function useThemeContext() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }

  return context;
}
