import React from "react";
import { FlatList, StyleSheet } from "react-native";
import DiaryCard, { DiaryCardProps } from "components/DiaryCard";
import { Container, DiaryCardContainer } from "./styles";

interface DiaryListProps extends DiaryCardProps {
  id: string;
}

interface DiaryCardListProps {
  data: Array<DiaryListProps>;
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
  },
  content: {
    paddingLeft: 30,
    paddingRight: 15,
  },
});

const DiaryCardList: React.FC<DiaryCardListProps> = ({ data }) => {
  return (
    <Container>
      <FlatList
        style={styles.container}
        contentContainerStyle={styles.content}
        data={data}
        renderItem={({ item }) => (
          <DiaryCardContainer>
            <DiaryCard
              title={item.title}
              bookColor={item.bookColor}
              onPress={item.onPress}
              onPressMore={item.onPressMore}
            />
          </DiaryCardContainer>
        )}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </Container>
  );
};

export default DiaryCardList;
