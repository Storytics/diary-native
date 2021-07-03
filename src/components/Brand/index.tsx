import React from "react";
// Components
import { MaterialIcons } from "@expo/vector-icons";
// Utils
import Constants from "expo-constants";
// Styles
import { useTheme } from "styled-components/native";
import { Container, ContentWrapper, StyledText } from "./styles";

interface BrandProps {
  text?: string;
}

const Brand: React.FC<BrandProps> = () => {
  const year = new Date().getFullYear();
  const theme = useTheme();
  return (
    <Container>
      <ContentWrapper>
        <StyledText>Diary by Storytics </StyledText>
        <MaterialIcons
          name="copyright"
          size={16}
          color={theme.brand.textColor}
        />
        <StyledText>{year}</StyledText>
        <StyledText> | </StyledText>
        <StyledText> v{Constants.manifest?.version}</StyledText>
      </ContentWrapper>
    </Container>
  );
};

export default Brand;
