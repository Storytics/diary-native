import React from "react";
import { FlatList, StyleSheet } from "react-native";
import ActivityCard, { ActivityCardProps } from "components/ActivityCard";
import ActivityCardContainer from "./styles";

interface ActivityListProps extends ActivityCardProps {
  id: string;
}

interface ActivityCardListProps {
  data: Array<ActivityListProps>;
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  content: {
    paddingLeft: 30,
    paddingRight: 30,
  },
});

const ActivityCardList: React.FC<ActivityCardListProps> = ({ data }) => {
  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.content}
      data={data}
      renderItem={({ item }) => (
        <ActivityCardContainer>
          <ActivityCard
            title={item.title}
            date={item.date}
            onPress={item.onPress}
          />
        </ActivityCardContainer>
      )}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default ActivityCardList;
