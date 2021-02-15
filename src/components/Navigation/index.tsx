import React from "react";
import RoundButton from "components/RoundButton";
import { useTheme } from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";
import { Container, Wrapper, MainButtonContainer } from "./styles";

export interface DiaryCardProps {
  isPageNavigation?: boolean;
  pageNavigationIcon?: string;
  onPressLeft: () => void;
  onPressMain: () => void;
  onPressRight: () => void;
}

const Navigation: React.FC<DiaryCardProps> = ({
  isPageNavigation,
  pageNavigationIcon = "create",
  onPressLeft,
  onPressMain,
  onPressRight,
}) => {
  const theme = useTheme();

  return (
    <Container isPageNavigation={isPageNavigation}>
      <Wrapper>
        <RoundButton size="medium" onPress={onPressLeft}>
          <MaterialIcons
            name={isPageNavigation ? "chevron-left" : "backup"}
            size={24}
            color={theme.iconDefaultColor}
          />
        </RoundButton>
        <MainButtonContainer>
          <RoundButton
            size="large"
            backgroundColor={theme.navigation.mainButton.backgroundColor}
            underlayColor={theme.navigation.mainButton.underlayColor}
            onPress={onPressMain}
          >
            <MaterialIcons
              name={
                isPageNavigation
                  ? (pageNavigationIcon as keyof typeof MaterialIcons.glyphMap)
                  : "add"
              }
              size={24}
              color={theme.navigation.mainButton.iconColor}
            />
          </RoundButton>
        </MainButtonContainer>
        <RoundButton size="medium" onPress={onPressRight}>
          <MaterialIcons
            name={isPageNavigation ? "chevron-right" : "menu"}
            size={24}
            color={theme.iconDefaultColor}
          />
        </RoundButton>
      </Wrapper>
    </Container>
  );
};

export default Navigation;
