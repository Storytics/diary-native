import React, { useCallback, useRef, useState } from "react";
import { Animated, GestureResponderEvent, Pressable } from "react-native";
import i18n from "locales/index";
import { MaterialIcons } from "@expo/vector-icons";
import { MediumTitle, Text } from "components/Typography";
import { useTheme } from "styled-components/native";
import {
  Container,
  Loader,
  TextContainer,
  TextWrapper,
  Wrapper,
} from "./styles";

interface HoldButtonProps {
  initialText?: string;
  feedbackText?: string;
  onLongPress?: (event: GestureResponderEvent) => void;
  title: string;
}

const LoaderAnimatedLoader = Animated.createAnimatedComponent(Loader);

const HoldButton: React.FC<HoldButtonProps> = ({
  initialText = i18n.t("holdButton.initialText"),
  feedbackText = i18n.t("holdButton.feedbackText"),
  onLongPress,
  title = i18n.t("holdButton.title"),
}) => {
  const [buttonWidth, setButtonWidth] = useState(0);
  const [animate, setAnimate] = useState(false);
  const loadAnim = useRef(new Animated.Value(0)).current;
  const theme = useTheme();

  const toggleAnimation = useCallback(() => {
    loadAnim.setValue(0);
    Animated.timing(loadAnim, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: false,
    }).start();
  }, [loadAnim]);

  const animationStyles = {
    transform: [
      {
        translateX: loadAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [-buttonWidth, 0],
        }),
      },
    ],
  };

  return (
    <Pressable
      delayLongPress={5000}
      onPressIn={() => {
        setAnimate(true);
        toggleAnimation();
      }}
      onPressOut={() => {
        setAnimate(false);
      }}
      onLongPress={onLongPress}
    >
      <Container
        onLayout={(event) => {
          const { width } = event.nativeEvent.layout;
          setButtonWidth(width);
        }}
      >
        <Wrapper>
          <MaterialIcons
            name="delete"
            size={24}
            color={theme.borderButton.iconColor}
          />
          <TextContainer>
            <TextWrapper>
              <MediumTitle numberOfLines={1}>{title}</MediumTitle>
            </TextWrapper>
            <Text numberOfLines={1}>
              {!animate ? initialText : feedbackText}
            </Text>
          </TextContainer>
        </Wrapper>
        {animate && (
          <LoaderAnimatedLoader pointerEvents="none" style={animationStyles} />
        )}
      </Container>
    </Pressable>
  );
};

export default HoldButton;
