/* eslint-disable prettier/prettier */
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="welecome"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="sign-in"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="sign-up"
        options={{ headerShown: false }}
      />
    </Stack>
    // <StatusBar style='auto' />
  );
}
