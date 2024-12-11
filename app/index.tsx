import { Redirect, Stack } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  return <Redirect href={"/(auth)/welecome"} />;
};

export default Home;
