import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';

const modernGreen = '#30C878'; // More refined, less neon green
const modernGreenSecondary = '#2BB86E'; // Slightly darker variant

export const LightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: modernGreen,
    secondary: modernGreenSecondary,
    tertiary: '#30C878',
    surfaceVariant: '#F8F8FA', // Slightly warmer light gray
    surface: '#FFFFFF',
  },
};

export const DarkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: modernGreen,
    secondary: modernGreenSecondary,
    tertiary: '#30C878',
    background: '#09090B',
    surface: '#161618',
    surfaceVariant: '#262628', // Better contrast
    elevation: {
      ...MD3DarkTheme.colors.elevation,
      level2: '#262628',
      level1: '#1C1C1E',
    },
  },
};
