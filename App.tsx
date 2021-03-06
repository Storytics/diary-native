import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import * as Font from "expo-font";
import { MaterialIcons } from "@expo/vector-icons";
import { enableScreens } from "react-native-screens";
import { DatabaseInit } from "database/DatabaseConnection";
import AppContainer from "./src";

enableScreens();

const Register: React.FC = () => {
  const [isDatabaseLoading, setDatabaseLoading] = useState(true);
  const [isFontsLoading, setIsFontsLoading] = useState(true);

  useEffect(() => {
    const loadDatabaseAsync = async () => {
      try {
        await DatabaseInit();

        setDatabaseLoading(false);
      } catch (e) {
        console.log("loadDataAsync error", e);
      }
    };

    const loadFonts = async () => {
      try {
        await Font.loadAsync({
          "OpenSans-Regular": require("./assets/fonts/OpenSans-Regular.ttf"),
          "OpenSans-SemiBold": require("./assets/fonts/OpenSans-SemiBold.ttf"),
          "OpenSans-Bold": require("./assets/fonts/OpenSans-Bold.ttf"),
          "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
          "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
          "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
          ...MaterialIcons.font,
        });
        setIsFontsLoading(false);
      } catch (e) {
        console.log("error loading fonts = ", e);
      }
    };
    loadFonts();
    loadDatabaseAsync();
  }, []);

  return (
    <AppContainer
      isFontsLoading={isFontsLoading}
      isDatabaseLoading={isDatabaseLoading}
    />
  );
};

export default Register;
