import React, { useState } from "react";
import Theme from "theme/index";
import { useTheme } from "styled-components/native";
import {
  Container,
  StyledSmallTitle,
  ButtonsWrapper,
  Button,
  InnerButton,
} from "./styles";

interface SelectProps {
  title: string;
  onChange: (value: string) => void;
}

const buttons = [
  {
    color: "blue",
    isSelected: true,
  },
  {
    color: "yellow",
    isSelected: false,
  },
  {
    color: "orange",
    isSelected: false,
  },
  {
    color: "purple",
    isSelected: false,
  },
  {
    color: "green",
    isSelected: false,
  },
];

const handleColorType = (color: string, theme: typeof Theme) => {
  switch (color) {
    case "blue":
      return {
        backgroundColor: theme.colors.blue400,
        underlayColor: theme.colors.blue200,
      };
    case "orange":
      return {
        backgroundColor: theme.colors.orange400,
        underlayColor: theme.colors.orange200,
      };
    case "yellow":
      return {
        backgroundColor: theme.colors.yellow400,
        underlayColor: theme.colors.yellow200,
      };
    case "purple":
      return {
        backgroundColor: theme.colors.purple400,
        underlayColor: theme.colors.purple200,
      };
    case "green":
      return {
        backgroundColor: theme.colors.green400,
        underlayColor: theme.colors.green200,
      };
    default:
      return {
        backgroundColor: theme.colors.blue400,
        underlayColor: theme.colors.blue200,
      };
  }
};

const Select: React.FC<SelectProps> = ({ title, onChange }) => {
  const [isSelectedValue, setSelectedValue] = useState(0);

  const theme = useTheme();
  return (
    <Container>
      <StyledSmallTitle>{title}</StyledSmallTitle>
      <ButtonsWrapper>
        {buttons.map((button, index, { length }) => {
          return (
            <Button
              key={index.toString()}
              onPress={() => {
                onChange(button.color);
                setSelectedValue(index);
              }}
              underlayColor={handleColorType(button.color, theme).underlayColor}
              color={handleColorType(button.color, theme).backgroundColor}
              isLastChild={length === index + 1}
            >
              <InnerButton isSelected={isSelectedValue === index} />
            </Button>
          );
        })}
      </ButtonsWrapper>
    </Container>
  );
};

export default Select;
