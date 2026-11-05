import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="chat/[id]" />
      <Stack.Screen name="property/[id]" options={{ headerShown: false }} />
      <Stack.Screen name="login" />
      <Stack.Screen name="edit-profile" />
      <Stack.Screen name="review" options={{ presentation: 'modal' }} />
      <Stack.Screen name="filters" options={{ presentation: 'modal' }} />
    </Stack>
  );
}
