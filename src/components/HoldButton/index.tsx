import React, { useCallback, useRef, useState } from "react";
import {
  Animated,
  GestureResponderEvent,
  TouchableWithoutFeedback,
} from "react-native";
import i18n from "locales/index";
import { MediumTitle } from "components/Typography";
import { useTheme } from "styled-components/native";
import { Container, Loader } from "./styles";

interface HoldButtonProps {
  initialText?: string;
  feedbackText?: string;
  onLongPress?: (event: GestureResponderEvent) => void;
}

const LoaderAnimatedLoader = Animated.createAnimatedComponent(Loader);

const HoldButton: React.FC<HoldButtonProps> = ({
  initialText = i18n.t("holdButton.initialText"),
  feedbackText = i18n.t("holdButton.feedbackText"),
  onLongPress,
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
    <TouchableWithoutFeedback
      delayLongPress={5000}
      onPressIn={() => {
        setAnimate(true);
        toggleAnimation();
      }}
      onPress={() => {
        setAnimate(false);
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
        <MediumTitle
          color={
            !animate ? theme.holdButton.color : theme.holdButton.feedbackColor
          }
        >
          {!animate ? initialText : feedbackText}
        </MediumTitle>
        {animate && (
          <LoaderAnimatedLoader pointerEvents="none" style={animationStyles} />
        )}
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default HoldButton;
