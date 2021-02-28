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
}

const Header: React.FC<HeaderProps> = ({
  text,
  hasBackButton = false,
  onPress,
  hasMarginBottom = true,
  hasTitle = true,
}) => {
  const theme = useTheme();
  return (
    <Container hasBackButton={hasBackButton} hasMarginBottom={hasMarginBottom}>
      {hasBackButton && (
        <IconContainer>
          <RoundButton
            onPress={onPress}
            underlayColor={theme.header.underlayColor}
          >
            <MaterialIcons
              name="arrow-back"
              size={24}
              color={theme.header.iconColor}
            />
          </RoundButton>
        </IconContainer>
      )}
      {hasTitle && (
        <StyledLargeTitle numberOfLines={2}>{text}</StyledLargeTitle>
      )}
    </Container>
  );
};

export default Header;
