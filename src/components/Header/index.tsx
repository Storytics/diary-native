import React from "react";
import RoundButton from "components/RoundButton";
import { useTheme } from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";
import { LargeTitle } from "components/Typography";
import { Container, IconContainer } from "./styles";

interface HeaderProps {
  text?: string;
  hasBackButton?: boolean;
  onPress?: () => void;
  hasMarginBottom?: boolean;
  hasTitle?: boolean;
  underlayColor?: string;
  iconColor?: string;
  titleColor?: string;
}

const Header: React.FC<HeaderProps> = ({
  text,
  hasBackButton = false,
  onPress,
  hasMarginBottom = true,
  hasTitle = true,
  underlayColor,
  iconColor,
  titleColor,
}) => {
  const theme = useTheme();
  return (
    <Container hasBackButton={hasBackButton} hasMarginBottom={hasMarginBottom}>
      {hasBackButton && (
        <IconContainer>
          <RoundButton
            size="large"
            onPress={onPress}
            underlayColor={underlayColor || theme.header.underlayColor}
            accessibilityLabel="Go Back"
          >
            <MaterialIcons
              name="arrow-back"
              size={24}
              color={iconColor || theme.header.iconColor}
            />
          </RoundButton>
        </IconContainer>
      )}
      {hasTitle && (
        <LargeTitle
          color={titleColor || theme.header.titleColor}
          numberOfLines={2}
        >
          {text}
        </LargeTitle>
      )}
    </Container>
  );
};

export default Header;
