import React, { useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "styled-components/native";
import { Text } from "components/Typography";
import {
  Container,
  Wrapper,
  Header,
  HeaderWrapper,
  Content,
  LinesWrapper,
  Line,
  Footer,
} from "./styles";

interface ActivityCardProps {
  page: number;
  date: string;
  day: string;
  hasPaddingBottom?: boolean;
  noteBookHeight?: number;
}

const styles = StyleSheet.create({
  linearGradient: {
    width: 15,
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
  },
});

const NoteBook: React.FC<ActivityCardProps> = ({
  page = "1",
  date,
  day,
  hasPaddingBottom = true,
  children,
  noteBookHeight,
}) => {
  const [numberOfLinesToRender, setNumberOfLinesToRender] = useState(0);
  const theme = useTheme();
  const lineHeight = 40;

  return (
    <Container hasPaddingBottom={hasPaddingBottom} height={noteBookHeight}>
      <Wrapper>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={[
            theme.noteBook.linearGradient[0],
            theme.noteBook.linearGradient[1],
          ]}
          style={styles.linearGradient}
        />
        <Header>
          <HeaderWrapper>
            <Text>{date}</Text>
            <Text color={theme.noteBook.header.dayColor}>{day}</Text>
          </HeaderWrapper>
        </Header>
        <Content>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1 }}
          >
            <LinesWrapper
              pointerEvents="none"
              onLayout={(e) => {
                const { height } = e.nativeEvent.layout;
                setNumberOfLinesToRender(Math.floor(height / lineHeight));
              }}
            >
              {[...Array(numberOfLinesToRender)].map((e, i) => (
                <Line key={i.toString()} height={lineHeight} />
              ))}
            </LinesWrapper>
            {children}
          </ScrollView>
        </Content>
        <Footer>
          <Text>{page}</Text>
        </Footer>
      </Wrapper>
    </Container>
  );
};

export default NoteBook;
