import React from "react";
// Navigation
import {
  NavigationContainer,
  NavigationContainerRef,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// Screens
import HomeScreen from "screens/Home";
import DiaryScreen from "screens/Diary";
import EditorScreen from "screens/Editor";
import CloudScreen from "screens/Cloud";
import PasswordScreen from "screens/Password";
import BillingScreen from "screens/Billing";
import CheckoutScreen from "screens/Billing/Checkout";
import PortalScreen from "screens/Billing/Portal";
import PrivacyScreen from "screens/Legal/Privacy";
import TermsScreen from "screens/Legal/Terms";
// Types
import { RootStackParamList } from "types/navigation";

const Stack = createStackNavigator<RootStackParamList>();

export const navigationRef = React.createRef<NavigationContainerRef>();

export const navigate = (name: string, params?: RootStackParamList) => {
  navigationRef.current?.navigate(name, params);
};

const Navigation: React.FC = () => (
  <NavigationContainer ref={navigationRef}>
    <Stack.Navigator initialRouteName="Home" headerMode="none" mode="card">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Diary" component={DiaryScreen} />
      <Stack.Screen name="Editor" component={EditorScreen} />
      <Stack.Screen name="Cloud" component={CloudScreen} />
      <Stack.Screen name="Password" component={PasswordScreen} />
      <Stack.Screen name="Billing" component={BillingScreen} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
      <Stack.Screen name="Portal" component={PortalScreen} />
      <Stack.Screen name="Terms" component={TermsScreen} />
      <Stack.Screen name="Privacy" component={PrivacyScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default Navigation;
