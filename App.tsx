import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import AppContainer from "./src";

const Register: React.FC = () => {
  const [fontsLoaded] = useFonts({
    "OpenSans-Regular": require("./assets/fonts/OpenSans-Regular.ttf"),
    "OpenSans-SemiBold": require("./assets/fonts/OpenSans-SemiBold.ttf"),
    "OpenSans-Bold": require("./assets/fonts/OpenSans-Bold.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <SafeAreaView>
      <AppContainer />
    </SafeAreaView>
  );
};

export default Register;
