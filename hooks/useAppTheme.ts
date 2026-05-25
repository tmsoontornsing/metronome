import { useColorScheme } from 'react-native';
import { DarkTheme, LightTheme } from '../theme';

export function useAppTheme() {
  const colorScheme = useColorScheme();
  return colorScheme === 'dark' ? DarkTheme : LightTheme;
}
