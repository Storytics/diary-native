import React from "react";
import { Button } from "react-native";
// Components
import Title from "components/Title";
import Description from "components/Description";
import Container from "components/Container";
// Utils
import { SafeAreaView } from "react-native-safe-area-context";
// Types
import { HomeScreenNavigationProp } from "navigation/types";
// Locales
import i18n from "locales/index";

interface Props {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView>
      <Container>
        <Title>{i18n.t("title")}</Title>
        <Description>{i18n.t("description")}</Description>
        <Button
          title="Go to Diary"
          onPress={() => navigation.navigate("Diary")}
        />
      </Container>
    </SafeAreaView>
  );
};

export default HomeScreen;
