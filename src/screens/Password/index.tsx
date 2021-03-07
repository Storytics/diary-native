import React, { useMemo, useState, useEffect } from "react";
import { View } from "react-native";
import { useTheme } from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";
import Theme from "theme/index";
import AsyncStorage from "@react-native-async-storage/async-storage";
// Types
import { PasswordScreenNavigationProp } from "types/navigation";
import { NotificationType } from "types/notifications";
// Components
import Logo from "components/Logo";
import Header from "components/Header";
import Container from "components/Container";
import CustomSafeArea from "components/CustomSafeArea";
import RoundButton from "components/RoundButton";
import { LargeText } from "components/Typography";
// Utils
import { userPasswordPinItem } from "utils/constants";
import i18n from "locales/index";
import * as LocalAuthentication from "expo-local-authentication";
// Hooks
import useStore from "hooks/useStore";
import useModals from "hooks/useModals";
import useNotification from "hooks/useNotification";
// Styles
import {
  Wrapper,
  LogoContainer,
  PinContainer,
  CirclesFeedback,
  CirclesContainer,
  PinCircle,
  ButtonsContainer,
  Row,
} from "./styles";

interface ButtonProps {
  theme: typeof Theme;
  onPress: () => void;
  isIcon?: boolean;
  text?: string;
  iconName?: keyof typeof MaterialIcons.glyphMap;
}

const Button = ({ theme, onPress, isIcon, text, iconName }: ButtonProps) => {
  const { color } = theme.passwordScreen.numbers;
  return (
    <RoundButton
      size="xLarge"
      onPress={onPress}
      backgroundColor={theme.passwordScreen.numbers.backgroundColor}
      underlayColor={theme.passwordScreen.numbers.underlayColor}
    >
      {isIcon ? (
        <MaterialIcons name={iconName} size={30} color={color} />
      ) : (
        <LargeText color={color}>{text}</LargeText>
      )}
    </RoundButton>
  );
};

Button.defaultProps = {
  isIcon: false,
  text: "0",
  iconName: "keyboard-backspace",
};

interface Props {
  navigation: PasswordScreenNavigationProp;
}

const PasswordScreen: React.FC<Props> = ({ navigation }) => {
  const theme = useTheme();
  const [code, setCode] = useState<Array<string>>([]);
  const [hasFingerprint, setHasFingerprint] = useState(false);
  const {
    state: { hasPasswordPin, passwordPin },
    dispatch,
  } = useStore();
  const notification = useNotification();
  const modals = useModals();

  const animationWidth = useMemo(
    () => [12, 55, 98, 140][code.length - 1 || 0],
    [code]
  );

  const handleNumber = (value: string) => {
    if (code.length < 4) {
      setCode((prevCode) => [...prevCode, value]);
    }
  };

  useEffect(() => {
    if (hasPasswordPin) {
      modals.dispatch({ type: "CLOSE_ALL_MODALS" });
      if (passwordPin === code.toString()) {
        navigation.navigate("Home");
      }
    }
  }, [hasPasswordPin, passwordPin, code, navigation]);

  useEffect(() => {
    const getHardwareSettings = async () => {
      try {
        const hasHardware = await LocalAuthentication.hasHardwareAsync();
        const isHardwareEnabled = await LocalAuthentication.isEnrolledAsync();
        setHasFingerprint(hasHardware && isHardwareEnabled);
      } catch (e) {
        console.log("error getting fingerprint settings = ", e);
      }
    };

    getHardwareSettings();
  }, []);

  const onSave = async () => {
    try {
      if (code.length === 4) {
        await AsyncStorage.setItem(userPasswordPinItem, code.toString());
        dispatch({
          type: "SET_PASSWORD_PIN",
          payload: { hasPasswordPin: true, passwordPin: code.toString() },
        });
        notification.dispatch({
          type: "CREATE_NOTIFICATION",
          payload: {
            isOpen: true,
            message: i18n.t("notifications.savePasswordPin.success"),
            type: NotificationType.success,
          },
        });
        navigation.navigate("Home");
      }
    } catch (e) {
      notification.dispatch({
        type: "CREATE_NOTIFICATION",
        payload: {
          isOpen: true,
          message: i18n.t("notifications.savePasswordPin.error"),
          type: NotificationType.danger,
        },
      });
    }
  };

  const onDelete = () => {
    const updatedCode = code.slice(0, -1);
    setCode(updatedCode);
  };

  const onFingerPrint = async () => {
    try {
      if (hasFingerprint) {
        const result = await LocalAuthentication.authenticateAsync();
        dispatch({
          type: "SET_LOCAL_AUTH",
          payload: { isLocalAuthentication: true },
        });

        if (result.success) {
          navigation.navigate("Home");
          setTimeout(() => {
            dispatch({
              type: "SET_LOCAL_AUTH",
              payload: { isLocalAuthentication: false },
            });
          }, 2000);
        }
      }
    } catch (e) {
      console.log("error using fingerprint = ", e);
    }
  };

  return (
    <CustomSafeArea>
      <Container>
        {!hasPasswordPin && (
          <Header
            hasBackButton
            text="Create Password"
            onPress={() => {
              navigation.navigate("Home");
            }}
          />
        )}
        <Wrapper>
          <LogoContainer>
            <Logo size={48} color={theme.passwordScreen.logo.color} />
          </LogoContainer>
          <PinContainer>
            <CirclesContainer>
              {code.length > 0 && (
                <CirclesFeedback
                  width={code.length < 4 ? animationWidth : 140}
                />
              )}
              <PinCircle />
              <PinCircle />
              <PinCircle />
              <PinCircle />
            </CirclesContainer>
          </PinContainer>
          <ButtonsContainer>
            <Row removeMarginTop>
              <Button
                text="1"
                theme={theme}
                onPress={() => handleNumber("1")}
              />
              <Button
                text="2"
                theme={theme}
                onPress={() => handleNumber("2")}
              />
              <Button
                text="3"
                theme={theme}
                onPress={() => handleNumber("3")}
              />
            </Row>
            <Row>
              <Button
                text="4"
                theme={theme}
                onPress={() => handleNumber("4")}
              />
              <Button
                text="5"
                theme={theme}
                onPress={() => handleNumber("5")}
              />
              <Button
                text="6"
                theme={theme}
                onPress={() => handleNumber("6")}
              />
            </Row>
            <Row>
              <Button
                text="7"
                theme={theme}
                onPress={() => handleNumber("7")}
              />
              <Button
                text="8"
                theme={theme}
                onPress={() => handleNumber("8")}
              />
              <Button
                text="9"
                theme={theme}
                onPress={() => handleNumber("9")}
              />
            </Row>
            <Row>
              <Button
                isIcon
                iconName="backspace"
                theme={theme}
                onPress={onDelete}
              />
              <Button
                text="0"
                theme={theme}
                onPress={() => setCode([...code, "0"])}
              />
              {hasPasswordPin ? (
                <>
                  {hasFingerprint ? (
                    <Button
                      isIcon
                      iconName="fingerprint"
                      onPress={onFingerPrint}
                      theme={theme}
                    />
                  ) : (
                    <View style={{ height: 56, width: 56 }} />
                  )}
                </>
              ) : (
                <Button theme={theme} onPress={onSave} text="OK" />
              )}
            </Row>
          </ButtonsContainer>
        </Wrapper>
      </Container>
    </CustomSafeArea>
  );
};

export default PasswordScreen;
