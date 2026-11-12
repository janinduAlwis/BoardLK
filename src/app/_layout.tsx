import { useStore } from '@/store/useStore';
import { Stack } from 'expo-router';
import { useEffect } from 'react';

export default function RootLayout() {
  const loadProperties = useStore((state) => state.loadProperties);

  useEffect(() => {
    void loadProperties();
  }, [loadProperties]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="chat/[id]" />
      <Stack.Screen name="property/[id]" options={{ headerShown: false }} />
      <Stack.Screen name="login" />
      <Stack.Screen name="edit-profile" />
      <Stack.Screen name="review" options={{ presentation: 'modal' }} />
      <Stack.Screen name="filters" options={{ presentation: 'modal' }} />
      <Stack.Screen name="my-listings" />
    </Stack>
  );
}
