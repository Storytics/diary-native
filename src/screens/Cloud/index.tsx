import React, { useState } from "react";
import { Alert } from "react-native";
// Components
import { SafeAreaView } from "react-native-safe-area-context";
import Container from "components/Container";
import Button from "components/Button";
import Input from "components/Input";
// Context
import useStore from "hooks/useStore";
import { dispatchAuthenticationStatus } from "context/StoreContext";
// Types
import { CloudScreenNavigationProp } from "types/navigation";
import { SubscriptionStatus, User } from "types/store";
// API
import supabase from "libs/supabase";
import { exportAllData } from "database/Global";

/** URL polyfill. Required for Supabase queries to work in React Native. */
import "react-native-url-polyfill/auto";

interface Props {
  navigation: CloudScreenNavigationProp;
}

/* const getCurrentUser = () => {
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
}; */

const DiaryScreen: React.FC<Props> = ({ navigation }) => {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [isCreateAccount, setIsCreateAccount] = useState(true);
  const { dispatch } = useStore();

  const handleAutenticationStatus = async (user: User) => {
    try {
      const hasSubscription = await dispatchAuthenticationStatus(
        user as User,
        dispatch
      );
      console.log("hasSubscription = ", hasSubscription);

      if (!hasSubscription) {
        Alert.alert("Needs to enable a plan");
      }
    } catch (e) {
      console.log("error handling auth status after login or sign up ", e);
    }
  };

  const onSignUp = async () => {
    try {
      const { user } = await supabase.auth.signUp({
        email: emailValue.toLocaleLowerCase(),
        password: passwordValue,
      });

      if (user) {
        console.log("onSignUp user = ", user);
        await handleAutenticationStatus(user as User);
      }
    } catch (error) {
      console.log("SignUp Error = ", error);
    }
  };

  const onSignIn = async () => {
    try {
      const { user } = await supabase.auth.signIn({
        email: emailValue.toLocaleLowerCase(),
        password: passwordValue,
      });

      if (user) {
        console.log("onSignIn user = ", user);
        await handleAutenticationStatus(user as User);
      }
    } catch (error) {
      console.log("onSignIn Error = ", error);
    }
  };

  const onHandleAuthentication = async () => {
    try {
      // check for empty
      if (emailValue && passwordValue) {
        if (isCreateAccount) {
          await onSignUp();
        } else {
          await onSignIn();
        }
      } else {
        Alert.alert("Fields cannot be empty");
      }
    } catch (error) {
      console.log(
        `Error ${
          isCreateAccount ? "Creating a new account" : "log in to the account"
        } = `,
        error
      );
    }
  };

  return (
    <SafeAreaView>
      <Container>
        <Input
          title="Email"
          placeholderText="Email"
          inputText={emailValue}
          onChangeText={setEmailValue}
        />

        <Input
          title="Password"
          placeholderText="Password"
          inputText={passwordValue}
          onChangeText={setPasswordValue}
          secureTextEntry
        />

        <Button
          text={
            isCreateAccount
              ? "Already have an account? Login"
              : "Create a new account"
          }
          variant="default"
          onPress={() => setIsCreateAccount((prevState: boolean) => !prevState)}
        />

        <Button
          text={isCreateAccount ? "Sign Up" : "Login"}
          variant="primary"
          onPress={onHandleAuthentication}
        />
      </Container>
    </SafeAreaView>
  );
};

export default DiaryScreen;
