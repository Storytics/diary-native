import React from "react";
import Theme from "theme/index";
import { useTheme } from "styled-components/native";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const styles = (theme: typeof Theme, insets: { top: number; bottom: number }) =>
  StyleSheet.create({
    safeAreaContainer: {
      height: "100%",
      backgroundColor: theme.container.backgroundColor,
    },
    safeArea: {
      flexGrow: 1,
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
    },
  });

const CustomSafeArea: React.FC = ({ children }) => {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  return (
    <View style={styles(theme, insets).safeAreaContainer}>
      <View style={styles(theme, insets).safeArea}>{children}</View>
    </View>
  );
};

export default CustomSafeArea;
