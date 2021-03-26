import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Animated, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "styled-components/native";
import { Text } from "components/Typography";
import {
  Container,
  Wrapper,
  Header,
  HeaderWrapper,
  Content,
  ContentWrapper,
  LinesWrapper,
  Line,
  Footer,
  LoadingContainer,
  LoadingBox,
  EditorContainer,
} from "./styles";

interface ActivityCardProps {
  page: string;
  date: string;
  day: string;
  hasPaddingBottom?: boolean;
  noteBookHeight?: number;
  isLoading: boolean;
  isSimpleLayout?: boolean;
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

const AnimatedLoadingBox = Animated.createAnimatedComponent(LoadingBox);

const NoteBook: React.FC<ActivityCardProps> = ({
  page = "1",
  date,
  day,
  hasPaddingBottom = true,
  children,
  noteBookHeight,
  isLoading = true,
  isSimpleLayout = false,
}) => {
  const linesAnimation = useRef(new Animated.Value(0)).current;
  const [numberOfLinesToRender, setNumberOfLinesToRender] = useState(0);
  const theme = useTheme();
  const lineHeight = 40;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(linesAnimation, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(linesAnimation, {
          toValue: 0.1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
      {}
    ).start();
  }, [linesAnimation]);

  const animationStyles = {
    opacity: linesAnimation,
  };

  return (
    <Container
      hasPaddingBottom={hasPaddingBottom}
      height={noteBookHeight}
      isSimpleLayout={isSimpleLayout}
    >
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
        {!isSimpleLayout && (
          <Header>
            <HeaderWrapper>
              <Text>{date}</Text>
              <Text color={theme.noteBook.header.dayColor}>{day}</Text>
            </HeaderWrapper>
          </Header>
        )}
        <Content isSimpleLayout={isSimpleLayout}>
          <ContentWrapper>
            <ScrollView
              contentContainerStyle={{ flexGrow: 1 }}
              bounces={false}
              showsVerticalScrollIndicator={false}
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
              <EditorContainer>{children}</EditorContainer>
            </ScrollView>
          </ContentWrapper>
          {isLoading && (
            <LoadingContainer isSimpleLayout={isSimpleLayout}>
              <AnimatedLoadingBox style={animationStyles} top={16} />
              <AnimatedLoadingBox style={animationStyles} top={56} width={50} />
              {[...Array(20)].map((e, i) => (
                <Line key={i.toString()} height={lineHeight} />
              ))}
            </LoadingContainer>
          )}
        </Content>
        {!isSimpleLayout && (
          <Footer>
            <Text>{page}</Text>
          </Footer>
        )}
      </Wrapper>
    </Container>
  );
};

export default NoteBook;
