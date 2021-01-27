import React from "react";
import { View, Text } from "react-native";
// Utils
import { SafeAreaProvider } from "react-native-safe-area-context";
// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// Screens
import HomeScreen from "screens/Home";
import DiaryScreen from "screens/Diary";
// Types
import { RootStackParamList } from "./types";

const Stack = createStackNavigator<RootStackParamList>();

// headerMode="none"

const Navigation: React.FC = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          headerMode="screen"
          mode="card"
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Diary" component={DiaryScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default Navigation;