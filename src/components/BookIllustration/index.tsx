import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "styled-components/native";
import { Container, BookIdentifier, Line } from "./styles";

interface BookIllustrationProps {
  bookColor?: string;
}

const BookIllustration: React.FC<BookIllustrationProps> = ({ bookColor }) => {
  const theme = useTheme();
  return (
    <Container style={{ elevation: 4 }}>
      <BookIdentifier bookColor={bookColor} />
      <Line top={15} />
      <Line top={58} />
      <Line top={66} />
      <LinearGradient
        colors={[
          theme.bookIllustration.linearGradient[0],
          theme.bookIllustration.linearGradient[1],
        ]}
        style={{
          width: 60,
          height: 80,
        }}
      />
    </Container>
  );
};

export default BookIllustration;
