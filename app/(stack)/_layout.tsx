import { Stack } from "expo-router";

export default function StackGroupLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }} initialRouteName="login">
      <Stack.Screen name="login" />
      <Stack.Screen name="cadastro" />
      <Stack.Screen name="teste-vocacional" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}

