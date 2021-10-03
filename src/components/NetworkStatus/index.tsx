import React from "react";
// Components
import { MaterialIcons } from "@expo/vector-icons";
import RoundButton from "components/RoundButton";
import { ActivityIndicator } from "react-native";
// Styles
import { useTheme } from "styled-components";
// Hooks
import { useNavigation } from "@react-navigation/core";

const status = {
  loading: "cached",
  online: "cloud-off",
  offline: "wifi-off",
  lock: "no-encryption",
  authenticated: "backup",
  sync: "cloud-done",
};

interface RenderButtonProps {
  name: string;
  onPress?: () => void;
}

const NetworkStatusComponent: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation();

  const renderButton = ({ name, ...props }: RenderButtonProps) => (
    <RoundButton size="large" {...props}>
      {name === status.loading ? (
        <ActivityIndicator size="small" color={theme.colors.primary} />
      ) : (
        <MaterialIcons
          name={name as keyof typeof MaterialIcons.glyphMap}
          size={24}
          color={theme.iconDefaultColor}
        />
      )}
    </RoundButton>
  );

  return <>{renderButton({ name: status.offline })}</>;
};

export default NetworkStatusComponent;
