import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { useTheme } from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import Placeholder from "components/Placeholder";
import ActivityCard from "components/ActivityCard";
import { Container, ActivityCardContainer } from "./styles";

interface ActivityCardListProps {
  data: Array<{
    id: string;
    title: string;
    date: string;
  }>;
  placeholderText: string;
  onPress: () => void;
}

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
    height: 20,
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
              date={item.date}
              onPress={onPress}
            />
          </ActivityCardContainer>
        )}
        keyExtractor={(item) => item.id}
        initialNumToRender={10}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Placeholder icon="text-snippet" text={placeholderText} />
        }
      />
      {!!data.length && (
        <LinearGradient
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
