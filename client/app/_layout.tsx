import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import * as NavigationBar from 'expo-navigation-bar'

NavigationBar.setPositionAsync("absolute");
NavigationBar.setVisibilityAsync("hidden")
NavigationBar.setBehaviorAsync('overlay-swipe')

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    "HelveticaNeue-Bold": require('../assets/fonts/HelveticaNeueBold.otf'),
    "HelveticaNeue-ExtraBold": require('../assets/fonts/HelveticaNeueExtraBold.otf'),
    "HelveticaNeue-ExtraLight": require('../assets/fonts/HelveticaNeueExtraLight.otf'),
    "HelveticaNeue-Light": require('../assets/fonts/HelveticaNeueLight.otf'),
    "HelveticaNeue-Medium": require('../assets/fonts/HelveticaNeueMedium.otf'),
    "HelveticaNeue-Regular": require('../assets/fonts/HelveticaNeueRegular.otf'),
    "HelveticaNeue-Semi-Bold": require('../assets/fonts/HelveticaNeueSemiBold.otf'),
    "Telegraf-Regular": require('../assets/fonts/PPTelegraf-Regular.otf'),
    "Telegraf-Bold": require('../assets/fonts/PPTelegraf-UltraBold.otf'),
    "Telegraf-Light": require('../assets/fonts/PPTelegraf-UltraLight.otf'),
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
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(root)" options={{ headerShown: false }} />
        {/* <Stack.Screen name="+not-found" /> */}
      </Stack>
  );
}
