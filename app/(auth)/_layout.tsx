/* eslint-disable prettier/prettier */
import { useAuth } from "@clerk/clerk-expo";
import { Redirect, Stack } from "expo-router";

export default function Layout() {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Redirect href={"/"} />;
  }

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
