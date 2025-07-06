
import { Stack } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from '../src/firebaseConfig'; // adjust if you placed firebaseConfig elsewhere

export default function RootLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    return unsubscribe;
  }, []);

  if (isLoggedIn === null) {
    return null; // or a loading spinner if you want
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
  {isLoggedIn ? (
    <Stack.Screen name="(tabs)" />
  ) : (
    <Stack.Screen name="login" />
  )}
</Stack>
  );
}

export const unstable_settings = {
  initialRouteName: 'login',
};
