import React from "react";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "styled-components/native";
import { Container, BookIdentifier, Line } from "./styles";

interface BookIllustrationProps {
  bookColor?: string;
}

const styles = StyleSheet.create({
  container: {
    shadowColor: "#141414",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  linearGradient: {
    width: 60,
    height: 80,
  },
});

const BookIllustration: React.FC<BookIllustrationProps> = ({ bookColor }) => {
  const theme = useTheme();
  return (
    <Container style={styles.container}>
      <BookIdentifier bookColor={bookColor} />
      <Line top={15} />
      <Line top={58} />
      <Line top={66} />
      <LinearGradient
        colors={[
          theme.bookIllustration.linearGradient[0],
          theme.bookIllustration.linearGradient[1],
        ]}
        style={styles.linearGradient}
      />
    </Container>
  );
};

export default BookIllustration;
