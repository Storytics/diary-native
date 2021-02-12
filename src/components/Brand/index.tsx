import React from "react";
import { useTheme } from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";
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
        <StyledText> {year}</StyledText>
      </ContentWrapper>
    </Container>
  );
};

export default Brand;
