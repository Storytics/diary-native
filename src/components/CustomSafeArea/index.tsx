import React from "react";
import Theme from "theme/index";
import { useTheme } from "styled-components/native";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const styles = (theme: typeof Theme) =>
  StyleSheet.create({
    safeArea: {
      backgroundColor: theme.container.backgroundColor,
      flexGrow: 1,
    },
  });

const ActivityCard: React.FC = ({ children }) => {
  const theme = useTheme();
  return <SafeAreaView style={styles(theme).safeArea}>{children}</SafeAreaView>;
};

export default ActivityCard;
