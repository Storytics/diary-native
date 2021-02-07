import React from "react";
import RoundButton from "components/RoundButton";
import { useTheme } from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";
import { Container, Wrapper } from "./styles";

export interface DiaryCardProps {
  onPressUpload: () => void;
  onPressCreate: () => void;
  onPressMenu: () => void;
}

const Navigation: React.FC<DiaryCardProps> = ({
  onPressUpload,
  onPressCreate,
  onPressMenu,
}) => {
  const theme = useTheme();
  return (
    <Container>
      <Wrapper>
        <RoundButton size="large" onPress={onPressUpload}>
          <MaterialIcons
            name="backup"
            size={24}
            color={theme.iconDefaultColor}
          />
        </RoundButton>
        <RoundButton
          size="large"
          backgroundColor={theme.navigation.createButton.backgroundColor}
          underlayColor={theme.navigation.createButton.underlayColor}
          onPress={onPressCreate}
        >
          <MaterialIcons
            name="add"
            size={24}
            color={theme.navigation.createButton.iconColor}
          />
        </RoundButton>
        <RoundButton size="large" onPress={onPressMenu}>
          <MaterialIcons name="menu" size={24} color={theme.iconDefaultColor} />
        </RoundButton>
      </Wrapper>
    </Container>
  );
};

export default Navigation;
