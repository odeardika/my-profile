import { Stack } from "expo-router";

export default function RootLayout() {
  return <>
    <Stack initialRouteName="login/index" >
      <Stack.Screen name="login/index" options={{ headerShown : false }}/>
      <Stack.Screen name="register/index" options={{ headerShown : false }}/>
    </Stack>
  </>
}
