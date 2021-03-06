import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { NotificationType } from "types/notifications";
import { useSafeAreaInsets } from "react-native-safe-area-context";
// Hooks
import useNotification from "hooks/useNotification";
import Theme from "theme/index";
import { MaterialIcons } from "@expo/vector-icons";
import RoundButton from "components/RoundButton";
import { SmallTitle } from "components/Typography";
import { useTheme } from "styled-components/native";
import { Container, LeftIconWrapper, TextContainer, Wrapper } from "./styles";

const handleNotificationType = (
  type: NotificationType,
  theme: typeof Theme
) => {
  switch (type) {
    case NotificationType.success:
      return {
        backgroundColor: theme.colors.green400,
        icon: "check-circle",
        underlayColor: theme.colors.green200,
      };
    case NotificationType.warning:
      return {
        backgroundColor: theme.colors.orange400,
        icon: "warning",
        underlayColor: theme.colors.orange200,
      };
    case NotificationType.danger:
      return {
        backgroundColor: theme.colors.danger,
        icon: "report",
        underlayColor: theme.colors.red200,
      };
    case NotificationType.info:
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

const Notification: React.FC = () => {
  const insets = useSafeAreaInsets();
  const notificationAnimation = useRef(new Animated.Value(0)).current;
  const theme = useTheme();
  const {
    context: {
      state: { message, isOpen, type },
      dispatch,
    },
  } = useNotification();
  const { color } = theme.notification;
  const componentHeight = 84; // 10 + 54 + 20
  const notificationHeight = componentHeight + insets.top;

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
  }, [notificationAnimation, isOpen]);

  useEffect(() => {
    let timer = 0;
    if (isOpen) {
      timer = setTimeout(() => {
        dispatch({
          type: "CLOSE_NOTIFICATION",
          payload: {
            isOpen: false,
          },
        });
      }, 5200);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [isOpen, dispatch]);

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

  if (!isOpen) {
    return null;
  }

  return (
    <AnimatedContainer style={animationStyles} paddingTop={insets.top + 10}>
      <Wrapper
        style={styles(theme).shadow}
        backgroundColor={handleNotificationType(type, theme).backgroundColor}
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
            {message}
          </SmallTitle>
        </TextContainer>
        <RoundButton
          size="small"
          underlayColor={handleNotificationType(type, theme).underlayColor}
          onPress={() =>
            dispatch({
              type: "CLOSE_NOTIFICATION",
              payload: {
                isOpen: false,
              },
            })
          }
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
  );
};

export default Notification;
