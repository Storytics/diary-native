import React, { useCallback, useRef, useState } from "react";
import { Animated } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";
import {
  CustomSwitchContainer,
  CustomSwitchThumbContainer,
  SwitchIconsContainer,
} from "./styles";

interface CustomSwitchProps {
  onPress?: () => void;
  isThemeSwitch?: boolean;
  onChangeValue?: (value: boolean) => void;
}

const CustomSwitch: React.FC<CustomSwitchProps> = ({
  isThemeSwitch = false,
  onChangeValue,
}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const toggleSwitch = useCallback(() => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    setIsEnabled((previousState) => {
      if (onChangeValue) {
        onChangeValue(!previousState);
      }
      return !previousState;
    });
  }, [fadeAnim, onChangeValue]);

  const animationStyles = {
    opacity: fadeAnim,
  };

  const theme = useTheme();
  return (
    <CustomSwitchContainer
      onPress={toggleSwitch}
      underlayColor={
        isEnabled ? theme.customSwitch.track.on : theme.customSwitch.track.off
      }
      isEnabled={isEnabled}
      isThemeSwitch={isThemeSwitch}
    >
      <Animated.View style={animationStyles}>
        <CustomSwitchThumbContainer isEnabled={isEnabled}>
          <MaterialIcons
            name={isEnabled && isThemeSwitch ? "nights-stay" : "circle"}
            size={22}
            color={
              isEnabled
                ? theme.customSwitch.thumb.on
                : theme.customSwitch.thumb.off
            }
          />
        </CustomSwitchThumbContainer>
        {isThemeSwitch && (
          <SwitchIconsContainer isEnabled={isEnabled}>
            <MaterialIcons
              name={isEnabled ? "auto-awesome" : "bubble-chart"}
              size={isEnabled ? 10 : 12}
              color={
                isEnabled
                  ? theme.customSwitch.thumb.on
                  : theme.customSwitch.thumb.off
              }
            />
          </SwitchIconsContainer>
        )}
      </Animated.View>
    </CustomSwitchContainer>
  );
};

export default CustomSwitch;
