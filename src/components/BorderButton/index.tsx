import React, { useState } from "react";
import { Switch } from "react-native";
import { SmallTitle } from "components/Typography";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";
import { Container, Wrapper, IconContainer, SwitchContainer } from "./styles";

interface BorderButtonProps {
  title: string;
  onPress: () => void;
  hasArrowIcon?: boolean;
  hasSwitch?: boolean;
}

const BorderButton: React.FC<BorderButtonProps> = ({
  title = "Title",
  onPress,
  hasArrowIcon = true,
  hasSwitch = false,
}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const theme = useTheme();
  return (
    <Container onPress={onPress}>
      <Wrapper>
        <SmallTitle>{title}</SmallTitle>
        <IconContainer>
          {hasArrowIcon && (
            <MaterialIcons
              name="chevron-right"
              size={24}
              color={theme.borderButton.iconColor}
            />
          )}
          {hasSwitch && (
            <SwitchContainer>
              <Switch
                trackColor={{
                  false: theme.borderButton.switch.trackColor.off,
                  true: theme.borderButton.switch.trackColor.on,
                }}
                thumbColor={
                  isEnabled
                    ? theme.borderButton.switch.thumbColor.on
                    : theme.borderButton.switch.thumbColor.off
                }
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </SwitchContainer>
          )}
        </IconContainer>
      </Wrapper>
    </Container>
  );
};

export default BorderButton;
