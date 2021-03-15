import React from "react";
import Theme from "theme/index";
import { useTheme } from "styled-components/native";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface CustomSafeAreaProps {
  backgroundColor?: string;
}

const styles = (
  theme: typeof Theme,
  insets: { top: number; bottom: number },
  backgroundColor?: string
) =>
  StyleSheet.create({
    safeAreaContainer: {
      height: "100%",
      backgroundColor: backgroundColor || theme.container.backgroundColor,
    },
    safeArea: {
      flexGrow: 1,
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
    },
  });

const CustomSafeArea: React.FC<CustomSafeAreaProps> = ({
  children,
  backgroundColor,
}) => {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  return (
    <View style={styles(theme, insets, backgroundColor).safeAreaContainer}>
      <View style={styles(theme, insets, backgroundColor).safeArea}>
        {children}
      </View>
    </View>
  );
};

export default CustomSafeArea;
