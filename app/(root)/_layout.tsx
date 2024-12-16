import { Stack } from "expo-router";

function _layout() {
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}

export default _layout;
