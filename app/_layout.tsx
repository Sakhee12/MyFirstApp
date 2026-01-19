import { useColorScheme } from '@/hooks/use-color-scheme';
import { Stack } from 'expo-router';
import 'react-native-reanimated';
import { AppModeProvider } from '../context/AppModeContext';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

   //return <Stack screenOptions={{ headerShown: false }} />;

    return (
    <AppModeProvider>
      
      <Stack screenOptions={{ headerShown: false }} />
    </AppModeProvider>
  );

  // return (
  //   <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
  //     <Stack>
  //       <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
  //       <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
  //     </Stack>
  //     <StatusBar style="auto" />
  //   </ThemeProvider>
  // );
}
