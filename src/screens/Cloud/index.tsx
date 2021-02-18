import React from "react";
import { Button } from "react-native";
import { getNetworkStateAsync } from "expo-network";

// Components
import { SafeAreaView } from "react-native-safe-area-context";
import Container from "components/Container";
// Types
import { CloudScreenNavigationProp } from "types/navigation";
// API
import supabase from "libs/supabase";
import { exportAllData } from "database/Global";

/** URL polyfill. Required for Supabase queries to work in React Native. */
import "react-native-url-polyfill/auto";

interface Props {
  navigation: CloudScreenNavigationProp;
}

const DiaryScreen: React.FC<Props> = ({ navigation }) => {
  const onSignUp = async () => {
    try {
      const { user, error } = await supabase.auth.signUp({
        email: "va.joe@baclmail.com",
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
        email: "va.works@hotmail.com",
        password: "#Qwerty123",
      });

      console.log("onSignIn user = ", user);
      console.log("error = ", error);
    } catch (error) {
      console.log("onSignIn Error = ", error);
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
          user_id: "8dc8b3bc-faee-41d5-89ea-9697ecf4c05b",
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
        // .eq("user_id", "82e3e8cb-ff55-4453-bd1a-9734d2146a03")
        .order("created_at", { ascending: true })
        .limit(1);

      console.log("onGetBackup data = ", data);
      console.log("error = ", error);
    } catch (error) {
      console.log("onGetBackup Error = ", error);
    }
  };

  const onGetNeworkStatus = async () => {
    try {
      const res = await getNetworkStateAsync();
      console.log("network is connect = ", res.isConnected);
    } catch (error) {
      console.log("onGetNeworkStatus Error = ", error);
    }
  };

  return (
    <SafeAreaView>
      <Container>
        <Button title="Create a new user" onPress={onSignUp} />
        <Button title="Sign In" onPress={onSignIn} />
        <Button title="Sign Out" onPress={() => supabase.auth.signOut()} />
        <Button title="Current User" onPress={getCurrentUser} />
        <Button title="Create a backup" onPress={onCreateBackup} />
        <Button title="Get Backup" onPress={onGetBackup} />
        <Button title="Get Network status" onPress={onGetNeworkStatus} />
      </Container>
    </SafeAreaView>
  );
};

export default DiaryScreen;
