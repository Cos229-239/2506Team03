// app/index.tsx
import { Redirect } from 'expo-router';

export default function IndexRedirect() {
  return <Redirect href="/(tabs)/ProfileScreen" />;
}