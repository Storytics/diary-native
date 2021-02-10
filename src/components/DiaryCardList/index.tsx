import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { useTheme } from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import DiaryCard from "components/DiaryCard";
import Placeholder from "components/Placeholder";
import { Container, DiaryCardContainer, PlaceholderContainer } from "./styles";

interface DiaryCardListProps {
  data: Array<{
    id: string;
    title: string;
    bookColor: string;
  }>;
  placeholderText: string;
  onPress: () => void;
  onPressMore: () => void;
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
  },
  content: {
    paddingLeft: 30,
    paddingRight: 15,
  },
  linearGradient: {
    width: 60,
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
  },
});

const DiaryCardList: React.FC<DiaryCardListProps> = ({
  data,
  placeholderText,
  onPress,
  onPressMore,
}) => {
  const theme = useTheme();
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
              onPress={onPress}
              onPressMore={onPressMore}
            />
          </DiaryCardContainer>
        )}
        keyExtractor={(item) => item.id}
        horizontal={!!data.length}
        showsHorizontalScrollIndicator={false}
        initialNumToRender={10}
        ListEmptyComponent={
          <PlaceholderContainer>
            <Placeholder icon="auto-stories" text={placeholderText} />
          </PlaceholderContainer>
        }
      />
      {!!data.length && (
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={[
            theme.diaryCardList.linearGradient[0],
            theme.diaryCardList.linearGradient[1],
          ]}
          style={styles.linearGradient}
        />
      )}
    </Container>
  );
};

export default DiaryCardList;