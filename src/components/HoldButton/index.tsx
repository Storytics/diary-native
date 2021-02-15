import React, { useCallback, useRef, useState } from "react";
import {
  Animated,
  GestureResponderEvent,
  TouchableWithoutFeedback,
} from "react-native";
import { MediumTitle } from "components/Typography";
import { useTheme } from "styled-components/native";
import { Container, Loader } from "./styles";

interface HoldButtonProps {
  text: string;
  onLongPress: (event: GestureResponderEvent) => void;
}

const LoaderAnimatedLoader = Animated.createAnimatedComponent(Loader);

const HoldButton: React.FC<HoldButtonProps> = ({ text, onLongPress }) => {
  const [buttonWidth, setButtonWidth] = useState(0);
  const [animate, setAnimate] = useState(false);
  const loadAnim = useRef(new Animated.Value(0)).current;

  const toggleAnimation = useCallback(() => {
    loadAnim.setValue(0);
    Animated.timing(loadAnim, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: true,
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

  const theme = useTheme();
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
        <MediumTitle color={theme.holdButton.color}>{text}</MediumTitle>
        {animate && (
          <LoaderAnimatedLoader pointerEvents="none" style={animationStyles} />
        )}
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default HoldButton;
