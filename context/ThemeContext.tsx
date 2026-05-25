import React, { createContext, useState, useContext } from 'react';
import { useColorScheme } from 'react-native';
import { DarkTheme, LightTheme } from '@/theme';

type ThemeMode = 'auto' | 'dark' | 'light';

interface ThemeContextType {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeMode, setThemeMode] = useState<ThemeMode>('auto');

  return (
    <ThemeContext.Provider value={{ themeMode, setThemeMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useAppThemeMode() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useAppThemeMode must be used within ThemeProvider');
  }
  return context;
}

export function getThemeForMode(mode: ThemeMode, systemColorScheme: string | null) {
  if (mode === 'auto') {
    return systemColorScheme === 'dark' ? DarkTheme : LightTheme;
  }
  return mode === 'dark' ? DarkTheme : LightTheme;
}
