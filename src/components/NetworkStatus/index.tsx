import React from "react";
// Components
import { MaterialIcons } from "@expo/vector-icons";
// Styles
import { useTheme } from "styled-components";
// Hooks
import useStore from "hooks/useStore";

const status = {
  loading: "cached",
  online: "cloud-off",
  offline: "wifi-off",
  lock: "no-encryption",
  authenticated: "backup",
  sync: "cloud-done",
};

const NetworkStatus = () => {
  const theme = useTheme();
  const {
    state: { networkStatus },
  } = useStore();

  return (
    <MaterialIcons
      name={status[networkStatus] as keyof typeof MaterialIcons.glyphMap}
      size={24}
      color={theme.iconDefaultColor}
    />
  );
};

export default NetworkStatus;
