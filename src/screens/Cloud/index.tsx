import React from "react";
import { Text, Button } from "react-native";
// Components
import { SafeAreaView } from "react-native-safe-area-context";
import Container from "components/Container";
// Types
import { DiaryScreenNavigationProp } from "navigation/types";
// API
import supabase from "libs/supabase";
import { exportAllData } from "database/Global";

/** URL polyfill. Required for Supabase queries to work in React Native. */
import "react-native-url-polyfill/auto";

interface Props {
  navigation: DiaryScreenNavigationProp;
}

const DiaryScreen: React.FC<Props> = ({ navigation }) => {
  const onSignUp = async () => {
    try {
      const { user, error } = await supabase.auth.signUp({
        email: "vitor.works@gmail.com",
        password: "#Qwerty123",
      });

      console.log("onSignUp user = ", user);
      console.log("error = ", error);
    } catch (error) {
      console.log("SignUp Error = ", error);
    }
  };

  const onSignIn = async () => {
    try {
      const { user, error } = await supabase.auth.signIn({
        email: "vitor.works@gmail.com",
        password: "#Qwerty123",
      });

      console.log("onSignIn user = ", user);
      console.log("error = ", error);
    } catch (error) {
      console.log("onSignIn Error = ", error);
    }
  };

  const onCreateProfile = async () => {
    try {
      const { data, error } = await supabase.from("profile").insert([
        {
          name: "Vitor Amaral",
          user_id: "6644bcd4-56ae-434c-b154-7ce8d2e3599d",
        },
      ]);

      console.log("Profile data = ", data);
      console.log("error = ", error);
    } catch (error) {
      console.log("onCreateProfile Error = ", error);
    }
  };

  const getCurrentUser = () => {
    const user = supabase.auth.user();
    console.log("current user = ", user);
  };

  const onCreateBackup = async () => {
    try {
      const allData = await exportAllData();

      const { data, error } = await supabase.from("backup").insert([
        {
          data: JSON.stringify(allData),
          user_id: "6644bcd4-56ae-434c-b154-7ce8d2e3599d",
        },
      ]);

      console.log("onCreateBackup data = ", data);
      console.log("error = ", error);
    } catch (error) {
      console.log("onCreateBackup Error = ", error);
    }
  };

  const onGetBackup = async () => {
    try {
      const { data, error } = await supabase
        .from("backup")
        .select("*")
        .eq("user_id", "6644bcd4-56ae-434c-b154-7ce8d2e3599d")
        .order("created_at", { ascending: true })
        .limit(1);

      console.log("onGetBackup data = ", data);
      console.log("error = ", error);
    } catch (error) {
      console.log("onGetBackup Error = ", error);
    }
  };

  return (
    <SafeAreaView>
      <Container>
        <Button title="Create a new user" onPress={onSignUp} />
        <Button title="Sign In" onPress={onSignIn} />
        <Button title="Current User" onPress={getCurrentUser} />
        <Button title="Create Profile" onPress={onCreateProfile} />
        <Button title="Create a backup" onPress={onCreateBackup} />
        <Button title="Get Backup" onPress={onGetBackup} />
      </Container>
    </SafeAreaView>
  );
};

export default DiaryScreen;
