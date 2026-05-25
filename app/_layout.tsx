import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { RobotoMono_700Bold } from '@expo-google-fonts/roboto-mono';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState, createContext, useContext, ReactNode } from 'react';
import { View, useColorScheme } from 'react-native';
import { DarkTheme, LightTheme } from '../theme';

SplashScreen.preventAutoHideAsync();

type ThemeMode = 'auto' | 'dark' | 'light';

interface ThemeContextType {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useThemeMode() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeMode must be used within ThemeProvider');
  }
  return context;
}

function RootLayoutContent() {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState<ThemeMode>('auto');
  const [fontsLoaded] = useFonts({ RobotoMono_700Bold });

  const getTheme = () => {
    if (themeMode === 'auto') {
      return systemColorScheme === 'dark' ? DarkTheme : LightTheme;
    }
    return themeMode === 'dark' ? DarkTheme : LightTheme;
  };

  const theme = getTheme();

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return <View />;
  }

  return (
    <ThemeContext.Provider value={{ themeMode, setThemeMode }}>
      <PaperProvider theme={theme}>
        <StatusBar style="auto" />
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: theme.colors.surface },
            headerTintColor: theme.colors.primary,
            headerTitleStyle: { color: theme.colors.onSurface },
            contentStyle: { backgroundColor: theme.colors.background },
          }}
        >
          <Stack.Screen
            name="index"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="settings"
            options={{
              presentation: 'modal',
              title: 'Settings',
              contentStyle: { backgroundColor: theme.colors.background },
            }}
          />
        </Stack>
      </PaperProvider>
    </ThemeContext.Provider>
  );
}

export default function RootLayout() {
  return <RootLayoutContent />;
}
