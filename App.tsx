import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import { enableScreens } from "react-native-screens";
import { DatabaseInit } from "database/DatabaseConnection";
import AppContainer from "./src";

enableScreens();

const Register: React.FC = () => {
  const [fontsLoaded] = useFonts({
    "OpenSans-Regular": require("./assets/fonts/OpenSans-Regular.ttf"),
    "OpenSans-SemiBold": require("./assets/fonts/OpenSans-SemiBold.ttf"),
    "OpenSans-Bold": require("./assets/fonts/OpenSans-Bold.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });
  const [isDatabaseLoading, setDatabaseLoading] = useState(true);

  useEffect(() => {
    async function loadDatabaseAsync() {
      try {
        await DatabaseInit();

        setDatabaseLoading(false);
      } catch (e) {
        console.log("loadDataAsync error", e);
      }
    }

    loadDatabaseAsync();
  }, []);

  if (!fontsLoaded && isDatabaseLoading) {
    return <AppLoading />;
  }

  return <AppContainer />;
};

export default Register;
