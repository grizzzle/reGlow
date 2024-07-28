// _layout.tsx
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import LoginScreen from './Login';
import HomeScreen from './tabs/home';
import { LogbookProvider } from './LogbookContext';
import { ProductProvider } from './ProductContext';
import LogbookEntry from './entryLog';
import LogbookOverview from './tabs/logbook';
import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <LogbookProvider>
      <ProductProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: true }} />
            <Stack.Screen name="Login" options={{ headerShown: true }} />
            <Stack.Screen name="tabs" options={{ headerShown: true }} />
            <Stack.Screen name="entryLog" options={{ headerShown: true }} />
            <Stack.Screen name="SkinQuiz" options={{ headerShown: true }} />
            <Stack.Screen name="+not-found" />
          </Stack>
        </ThemeProvider>
      </ProductProvider>
    </LogbookProvider>
  );
}
