import React from "react";
import { TouchableHighlight } from "react-native";
import { useTheme } from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";
import { MediumTitle, Text } from "components/Typography";
import {
  Wrapper,
  Container,
  LeftIconContainer,
  ContentContainer,
  TextContainer,
} from "./styles";

export interface ActivityCardProps {
  title: string;
  date: string;
  onPress: () => void;
}

const ActivityCard: React.FC<ActivityCardProps> = ({
  date,
  title,
  onPress,
}) => {
  const theme = useTheme();
  return (
    <Wrapper>
      <TouchableHighlight
        underlayColor={theme.activityCard.underlayColor}
        onPress={onPress}
      >
        <Container>
          <LeftIconContainer>
            <MaterialIcons
              name="menu-book"
              size={24}
              color={theme.iconDefaultColor}
            />
          </LeftIconContainer>
          <ContentContainer>
            <TextContainer>
              <MediumTitle>{title}</MediumTitle>
            </TextContainer>
            <Text>{date}</Text>
          </ContentContainer>
          <MaterialIcons
            name="chevron-right"
            size={24}
            color={theme.iconDefaultColor}
          />
        </Container>
      </TouchableHighlight>
    </Wrapper>
  );
};

export default ActivityCard;
