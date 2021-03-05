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

interface ActivityCardProps {
  title: string;
  description: string;
  onPress: () => void;
}

const ActivityCard: React.FC<ActivityCardProps> = ({
  description,
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
              <MediumTitle numberOfLines={1}>{title}</MediumTitle>
            </TextContainer>
            <Text numberOfLines={1}>{description}</Text>
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
