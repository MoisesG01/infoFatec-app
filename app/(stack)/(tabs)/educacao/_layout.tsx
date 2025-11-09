import { Stack } from "expo-router";

export default function EducacaoLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="cursos/ciencia-de-dados" />
      <Stack.Screen name="cursos/comercio-exterior" />
      <Stack.Screen name="cursos/desenvolvimento-de-software-multiplataforma" />
      <Stack.Screen name="cursos/design-de-produto" />
      <Stack.Screen name="cursos/gestao-da-producao-industrial" />
      <Stack.Screen name="cursos/gestao-empresarial" />
    </Stack>
  );
}
