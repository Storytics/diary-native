import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Theme from "theme/index";
import { MaterialIcons } from "@expo/vector-icons";
import RoundButton from "components/RoundButton";
import { SmallTitle } from "components/Typography";
import { useTheme } from "styled-components/native";
import { Container, Wrapper, TextContainer, LeftIconWrapper } from "./styles";

type notificationType = "info" | "success" | "warning" | "danger";

interface NotificationProps {
  text: string;
  type: notificationType;
}

const handleNotificationType = (
  type: notificationType,
  theme: typeof Theme
) => {
  switch (type) {
    case "info":
      return {
        backgroundColor: theme.colors.blue400,
        icon: "info",
        underlayColor: theme.colors.blue200,
      };
    case "success":
      return {
        backgroundColor: theme.colors.green400,
        icon: "check-circle",
        underlayColor: theme.colors.green200,
      };
    case "warning":
      return {
        backgroundColor: theme.colors.orange400,
        icon: "warning",
        underlayColor: theme.colors.orange200,
      };
    case "danger":
      return {
        backgroundColor: theme.colors.danger,
        icon: "report",
        underlayColor: theme.colors.red200,
      };
    default:
      return {
        backgroundColor: theme.colors.blue400,
        icon: "info",
        underlayColor: theme.colors.blue200,
      };
  }
};

const styles = (theme: typeof Theme) =>
  StyleSheet.create({
    shadow: {
      shadowColor: theme.bookIllustration.shadowColor,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
    },
    linearGradient: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 0,
    },
  });

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const Notification: React.FC<NotificationProps> = ({ text, type }) => {
  const notificationAnimation = useRef(new Animated.Value(0)).current;
  const [isNotificationVisible, setNotificationVisible] = useState(true);
  const theme = useTheme();
  const { color } = theme.notification;
  const notificationHeight = 79; // 10 + 54 + 15

  useEffect(() => {
    Animated.sequence([
      Animated.timing(notificationAnimation, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(notificationAnimation, {
        toValue: 0,
        delay: 4000,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, [notificationAnimation]);

  const animationStyles = {
    opacity: notificationAnimation,
    transform: [
      {
        translateY: notificationAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [-notificationHeight, 0],
        }),
      },
    ],
  };

  return (
    <>
      {isNotificationVisible && (
        <AnimatedContainer style={animationStyles}>
          <Wrapper
            style={styles(theme).shadow}
            backgroundColor={
              handleNotificationType(type, theme).backgroundColor
            }
          >
            <LeftIconWrapper>
              <MaterialIcons
                // @ts-ignore
                name={handleNotificationType(type, theme).icon}
                size={24}
                color={color}
              />
            </LeftIconWrapper>
            <TextContainer>
              <SmallTitle numberOfLines={1} color={color}>
                {text}
              </SmallTitle>
            </TextContainer>
            <RoundButton
              size="small"
              underlayColor={handleNotificationType(type, theme).underlayColor}
              onPress={() => setNotificationVisible(false)}
            >
              <MaterialIcons name="close" size={24} color={color} />
            </RoundButton>
          </Wrapper>
          <LinearGradient
            pointerEvents="none"
            colors={[
              theme.notification.linearGradient[1],
              theme.notification.linearGradient[0],
            ]}
            style={styles(theme).linearGradient}
          />
        </AnimatedContainer>
      )}
    </>
  );
};

export default Notification;
