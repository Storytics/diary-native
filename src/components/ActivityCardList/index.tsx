import React from "react";
import { FlatList, StyleSheet } from "react-native";
// Styles
import { useTheme } from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
// Components
import Placeholder from "components/Placeholder";
import ActivityCard from "components/ActivityCard";
// utils
import { unescapeHtml } from "utils//functions";

import { Container, ActivityCardContainer } from "./styles";

interface ActivityCardListProps {
  data: Array<{
    title: string;
    id: string;
    createdAt: string;
    bookId: string;
    content: string;
  }>;
  placeholderText: string;
  onPress: (bookId: string, bookTitle: string, activityPageId: string) => void;
}

// replace(/<\/?[^>]+(>|$)/g, "")

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  content: {
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 5,
  },
  linearGradient: {
    height: 30,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
});

const ActivityCardList: React.FC<ActivityCardListProps> = ({
  data,
  placeholderText,
  onPress,
}) => {
  const theme = useTheme();
  return (
    <Container>
      <FlatList
        style={styles.container}
        contentContainerStyle={styles.content}
        data={data}
        renderItem={({ item }) => (
          <ActivityCardContainer>
            <ActivityCard
              title={item.title}
              description={unescapeHtml(item.content)
                .replace(/<\/?[^>]+(>|$)/g, "")
                .replace(/&nbsp;/g, "")}
              onPress={() => onPress(item.bookId, item.title, item.id)}
            />
          </ActivityCardContainer>
        )}
        keyExtractor={(item) => item.id.toString()}
        initialNumToRender={10}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Placeholder icon="text-snippet" text={placeholderText} />
        }
        snapToAlignment="start"
        snapToInterval={85}
        decelerationRate={0.95}
      />
      {!!data.length && (
        <LinearGradient
          pointerEvents="none"
          colors={[
            theme.activityCardList.linearGradient[0],
            theme.activityCardList.linearGradient[1],
          ]}
          style={styles.linearGradient}
        />
      )}
    </Container>
  );
};

export default ActivityCardList;
