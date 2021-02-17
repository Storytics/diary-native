import React from "react";
import { TouchableHighlight } from "react-native";
import RoundButton from "components/RoundButton";
import BookIllustration from "components/BookIllustration";
import { useTheme } from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";
import {
  Wrapper,
  Container,
  Header,
  TextContainer,
  BookContainer,
  StyledMediumTitle,
} from "./styles";

interface DiaryCardProps {
  onPress: () => void;
  onPressMore: () => void;
  title: string;
  bookColor?: string;
}

const DiaryCard: React.FC<DiaryCardProps> = ({
  onPress,
  onPressMore,
  title,
  bookColor,
}) => {
  const theme = useTheme();
  return (
    <Wrapper>
      <TouchableHighlight
        underlayColor={theme.diaryCard.underlayColor}
        onPress={onPress}
      >
        <Container>
          <Header>
            <RoundButton size="medium" onPress={onPressMore}>
              <MaterialIcons
                name="more-horiz"
                size={24}
                color={theme.iconDefaultColor}
              />
            </RoundButton>
          </Header>
          <BookContainer>
            <BookIllustration bookColor={bookColor} />
          </BookContainer>
          <TextContainer>
            <StyledMediumTitle numberOfLines={1}>{title}</StyledMediumTitle>
          </TextContainer>
        </Container>
      </TouchableHighlight>
    </Wrapper>
  );
};

export default DiaryCard;
