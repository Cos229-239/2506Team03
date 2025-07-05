import { Stack } from 'expo-router';
import { useState } from 'react';

export default function RootLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // change to true to test tabs

  return (
    <Stack>
      {isLoggedIn ? (
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      ) : (
        <Stack.Screen name="login" options={{ headerShown: false }} />
      )}
    </Stack>
  );
}
