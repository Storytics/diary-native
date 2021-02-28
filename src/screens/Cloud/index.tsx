import React, { useState } from "react";
import { Alert, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import i18n from "locales/index";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
// Components
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "components/Button";
import Input from "components/Input";
import { SmallTitle, Text } from "components/Typography";
import Container from "components/Container";
import Header from "components/Header";
// Context
import useStore from "hooks/useStore";
import { dispatchAuthenticationStatus } from "context/StoreContext";
// Types
import { CloudScreenNavigationProp } from "types/navigation";
import { User } from "types/store";
// API
import supabase from "libs/supabase";
// Styled Components
import {
  Box,
  ContentContainer,
  FormContainer,
  FormFooter,
  ForgotPasswordContainer,
  FeaturesContainer,
  ListItem,
  ListItemIconContainer,
  ListItemsContainer,
  ListItemWrapper,
  FeaturesTextWrapper,
  LoginContentWrapper,
  WelcomeBackText,
} from "./styles";

/** URL polyfill. Required for Supabase queries to work in React Native. */
import "react-native-url-polyfill/auto";

interface Props {
  navigation: CloudScreenNavigationProp;
}

interface ListItemProps {
  iconName: string;
  text: string;
  hasMarginBottom?: boolean;
}

const styles = StyleSheet.create({
  linearGradient: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  textCenter: {
    textAlign: "center",
  },
  scrollView: {
    display: "flex",
    flexGrow: 1,
  },
});

const InlineListItem: React.FC<ListItemProps> = ({ iconName, text }) => {
  const theme = useTheme();
  return (
    <ListItemWrapper>
      <ListItem>
        <ListItemIconContainer>
          <MaterialIcons
            name={iconName as keyof typeof MaterialIcons.glyphMap}
            size={24}
            color={theme.cloudScreen.listItem.icon.color}
          />
        </ListItemIconContainer>
        <Text style={styles.textCenter}>{text}</Text>
        <LinearGradient
          colors={[
            theme.cloudScreen.listItem.linearGradient[0],
            theme.cloudScreen.listItem.linearGradient[1],
          ]}
          style={styles.linearGradient}
        />
      </ListItem>
    </ListItemWrapper>
  );
};

const DiaryScreen: React.FC<Props> = ({ navigation }) => {
  const theme = useTheme();
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [isCreateAccount, setIsCreateAccount] = useState(true);
  const { dispatch } = useStore();

  const handleAuthenticationStatus = async (user: User) => {
    try {
      const hasSubscription = await dispatchAuthenticationStatus(
        user as User,
        dispatch
      );

      if (!hasSubscription) {
        navigation.navigate("Billing", {
          user: user as User,
        });
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
        await handleAuthenticationStatus(user as User);
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
        await handleAuthenticationStatus(user as User);
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
      <Container hasPadding={false}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <ContentContainer>
            <Header
              hasBackButton
              hasMarginBottom={false}
              onPress={() => {
                navigation.navigate("Home");
              }}
              text={
                isCreateAccount
                  ? i18n.t("cloudScreen.signUp.content.title")
                  : i18n.t("cloudScreen.logIn.content.title")
              }
            />
            {isCreateAccount ? (
              <FeaturesContainer>
                <FeaturesTextWrapper>
                  <Box mb={5}>
                    <SmallTitle>
                      {i18n.t("cloudScreen.signUp.content.subtitle")}
                    </SmallTitle>
                  </Box>
                  <SmallTitle color={theme.cloudScreen.valueColor}>
                    {i18n.t("cloudScreen.signUp.content.value")}
                  </SmallTitle>
                </FeaturesTextWrapper>
                <ListItemsContainer>
                  <InlineListItem
                    iconName="backup"
                    text={i18n.t("cloudScreen.signUp.content.listItem1")}
                  />
                  <InlineListItem
                    iconName="verified-user"
                    text={i18n.t("cloudScreen.signUp.content.listItem2")}
                  />
                  <InlineListItem
                    iconName="phone-android"
                    text={i18n.t("cloudScreen.signUp.content.listItem3")}
                    hasMarginBottom={false}
                  />
                </ListItemsContainer>
              </FeaturesContainer>
            ) : (
              <LoginContentWrapper>
                <WelcomeBackText>
                  {i18n.t("cloudScreen.logIn.content.text")}
                </WelcomeBackText>
              </LoginContentWrapper>
            )}
          </ContentContainer>
          <FormContainer>
            <Box mb={20}>
              <Input
                hasEmojiFeedback={false}
                title={i18n.t("cloudScreen.email.title")}
                placeholderText={i18n.t("cloudScreen.email.placeholder")}
                inputText={emailValue}
                onChangeText={setEmailValue}
              />
            </Box>
            <Box mb={20}>
              <Input
                title={i18n.t("cloudScreen.password.title")}
                placeholderText={i18n.t("cloudScreen.password.placeholder")}
                inputText={passwordValue}
                onChangeText={setPasswordValue}
                secureTextEntry
              />
            </Box>
            <Button
              text={
                isCreateAccount
                  ? i18n.t("cloudScreen.signUp.primaryButton")
                  : i18n.t("cloudScreen.logIn.primaryButton")
              }
              variant="primary"
              onPress={onHandleAuthentication}
            />
            {!isCreateAccount && (
              <ForgotPasswordContainer>
                <TouchableOpacity>
                  <Text>{i18n.t("cloudScreen.logIn.forgotPassword")}</Text>
                </TouchableOpacity>
              </ForgotPasswordContainer>
            )}
            <FormFooter>
              <Box mr={3}>
                <Text>
                  {isCreateAccount
                    ? i18n.t("cloudScreen.signUp.footer.text")
                    : i18n.t("cloudScreen.logIn.footer.text")}
                </Text>
              </Box>
              <TouchableOpacity
                onPress={() =>
                  setIsCreateAccount((prevState: boolean) => !prevState)
                }
              >
                <SmallTitle color={theme.colors.primary}>
                  {isCreateAccount
                    ? i18n.t("cloudScreen.signUp.footer.link")
                    : i18n.t("cloudScreen.logIn.footer.link")}
                </SmallTitle>
              </TouchableOpacity>
            </FormFooter>
          </FormContainer>
        </ScrollView>
      </Container>
    </SafeAreaView>
  );
};

export default DiaryScreen;
