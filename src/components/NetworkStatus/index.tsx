import React from "react";
import { Linking } from "react-native";
// Components
import { MaterialIcons } from "@expo/vector-icons";
import RoundButton from "components/RoundButton";
// Styles
import { useTheme } from "styled-components";
// Utils
import { storyticsUrl } from "utils/constants";

const NetworkStatusComponent: React.FC = () => {
  const theme = useTheme();

  return (
    <RoundButton onPress={() => Linking.openURL(storyticsUrl)} size="large">
      <MaterialIcons
        name="storefront"
        size={24}
        color={theme.iconDefaultColor}
      />
    </RoundButton>
  );
};

export default NetworkStatusComponent;
