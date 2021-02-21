import React from "react";
import { SmallTitle, Text } from "components/Typography";
import i18n from "locales/index";
import CustomSwitch from "components/CustomSwitch";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";
import {
  Container,
  Wrapper,
  IconContainer,
  SwitchAndTextWrapper,
} from "./styles";

interface BorderButtonProps {
  title: string;
  onPress?: () => void;
  hasArrowIcon?: boolean;
  hasSwitch?: boolean;
  hasCustomSwitch?: boolean;
  hasThemeSwitch?: boolean;
  onChangeSwitch?: (value: boolean) => void;
  isSwitchActive?: boolean;
}

const BorderButton: React.FC<BorderButtonProps> = ({
  title = "Title",
  onPress,
  hasArrowIcon = true,
  hasCustomSwitch = false,
  hasThemeSwitch = false,
  onChangeSwitch,
  isSwitchActive = false,
}) => {
  const theme = useTheme();
  const containerProps = hasCustomSwitch || hasThemeSwitch ? {} : { onPress };
  return (
    <Container {...containerProps}>
      <Wrapper>
        <SmallTitle numberOfLines={1}>{title}</SmallTitle>
        <IconContainer>
          {hasArrowIcon && (
            <MaterialIcons
              name="chevron-right"
              size={24}
              color={theme.borderButton.iconColor}
            />
          )}
          {hasThemeSwitch && (
            <SwitchAndTextWrapper>
              <Text color={theme.borderButton.customSwitch.text.left}>
                {i18n.t("borderButton.theme.light")}
              </Text>
              <CustomSwitch
                isActive={isSwitchActive}
                onChangeValue={(value: boolean) => {
                  if (onChangeSwitch) {
                    onChangeSwitch(value);
                  }
                }}
                isThemeSwitch
              />
              <Text color={theme.borderButton.customSwitch.text.right}>
                {i18n.t("borderButton.theme.dark")}
              </Text>
            </SwitchAndTextWrapper>
          )}
          {hasCustomSwitch && (
            <CustomSwitch
              isActive={isSwitchActive}
              onChangeValue={onChangeSwitch}
            />
          )}
        </IconContainer>
      </Wrapper>
    </Container>
  );
};

export default BorderButton;
