import React from "react";
import { Button } from "react-native";
// Components
import { SmallTitle } from "components/Typography";
import Container from "components/Container";
// Types
import { DiaryScreenNavigationProp } from "navigation/types";

interface Props {
  navigation: DiaryScreenNavigationProp;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <Container>
      <SmallTitle>Inside of my diary</SmallTitle>
      <Button
        title="Back"
        onPress={() => {
          navigation.navigate("Home");
          console.log("hello");
        }}
      />
    </Container>
  );
};

export default HomeScreen;
