import React from "react";
import RoundButton from "components/RoundButton";
import { useTheme } from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";
import { Container, StyledLargeTitle, IconContainer } from "./styles";

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
            onPress={onPress}
            underlayColor={underlayColor || theme.header.underlayColor}
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
        <StyledLargeTitle
          color={titleColor || theme.header.titleColor}
          numberOfLines={2}
        >
          {text}
        </StyledLargeTitle>
      )}
    </Container>
  );
};

export default Header;
