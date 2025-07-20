import { Stack } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { CopilotProvider } from 'react-native-copilot';
import { UserProvider } from '../src/contexts/UserContext';
import { auth } from '../src/firebaseConfig';

export default function RootLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    return unsubscribe;
  }, []);

  if (isLoggedIn === null) {
    return null;
  }

  return (
    <UserProvider>
      <CopilotProvider
        tooltipStyle={{
          backgroundColor: '#fff',
          borderRadius: 8,
        }}
      >
        <Stack screenOptions={{ headerShown: false }}>
          {isLoggedIn ? (
            <Stack.Screen name="(tabs)" />
          ) : (
            <Stack.Screen name="login" />
          )}
        </Stack>
      </CopilotProvider>
    </UserProvider>
  );
}
