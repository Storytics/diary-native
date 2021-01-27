import React from "react";
import { Button } from "react-native";
// Components
import Title from "components/Title";
import Container from "components/Container";
// Types
import { DiaryScreenNavigationProp } from "navigation/types";

interface Props {
  navigation: DiaryScreenNavigationProp;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <Container>
      <Title>Inside of my diary</Title>
      <Button title="Back" onPress={() => navigation.navigate("Home")} />
    </Container>
  );
};

export default HomeScreen;
