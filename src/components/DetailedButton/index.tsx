import React from "react";
import { MediumTitle, Text } from "components/Typography";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";
import { Container, Wrapper, TextContainer, TextWrapper } from "./styles";

interface DetailedButtonProps {
  title: string;
  text?: string;
  onPress?: () => void;
  icon: keyof typeof MaterialIcons.glyphMap;
}

const DetailedButton: React.FC<DetailedButtonProps> = ({
  title = "Title",
  text,
  onPress,
  icon = "help",
}) => {
  const theme = useTheme();
  return (
    <Container onPress={onPress}>
      <Wrapper>
        <MaterialIcons
          name={icon}
          size={24}
          color={theme.borderButton.iconColor}
        />
        <TextContainer>
          <MediumTitle numberOfLines={1}>{title}</MediumTitle>
          {!!text && (
            <TextWrapper>
              <Text numberOfLines={1}>{text}</Text>
            </TextWrapper>
          )}
        </TextContainer>
      </Wrapper>
    </Container>
  );
};

export default DetailedButton;
