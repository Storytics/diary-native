import React from "react";
import { useTheme } from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Text } from "components/Typography";
import { Container, TextContainer, ContentContainer } from "./styles";

export interface ActivityCardProps {
  icon: keyof typeof MaterialIcons.glyphMap;
  text: string;
}

const styles = StyleSheet.create({
  linearGradient: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
});

const Placeholder: React.FC<ActivityCardProps> = ({ icon, text }) => {
  const theme = useTheme();
  return (
    <Container>
      <ContentContainer>
        <MaterialIcons name={icon} size={36} color={theme.iconDefaultColor} />
        <TextContainer>
          <Text>{text}</Text>
        </TextContainer>
      </ContentContainer>
      <LinearGradient
        colors={[
          theme.placeHolder.linearGradient[0],
          theme.placeHolder.linearGradient[1],
        ]}
        style={styles.linearGradient}
      />
    </Container>
  );
};

export default Placeholder;
