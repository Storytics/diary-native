import React, { useState, useMemo, useEffect } from "react";
import Theme from "theme/index";
import { MaterialIcons } from "@expo/vector-icons";
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
  initialIndex: number;
}

export const buttons = (theme: typeof Theme) => [
  {
    backgroundColor: theme.colors.blue400,
    color: "blue",
  },
  {
    backgroundColor: theme.colors.yellow400,
    color: "yellow",
  },
  {
    backgroundColor: theme.colors.orange400,
    color: "orange",
  },
  {
    backgroundColor: theme.colors.purple400,
    color: "purple",
  },
  {
    backgroundColor: theme.colors.green400,
    color: "green",
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

const Select: React.FC<SelectProps> = ({
  title,
  onChange,
  initialIndex = 0,
}) => {
  const [isSelectedValue, setSelectedValue] = useState(initialIndex);
  const theme = useTheme();
  const selectors = useMemo(() => buttons(theme), [theme]);

  useEffect(() => {
    if (initialIndex !== isSelectedValue) {
      setSelectedValue(initialIndex);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialIndex]);

  return (
    <Container>
      <StyledSmallTitle>{title}</StyledSmallTitle>
      <ButtonsWrapper>
        {selectors.map((button, index, { length }) => (
          <Button
            key={index.toString()}
            onPress={() => {
              onChange(handleColorType(button.color, theme).backgroundColor);
              setSelectedValue(index);
            }}
            underlayColor={handleColorType(button.color, theme).underlayColor}
            color={handleColorType(button.color, theme).backgroundColor}
            isLastChild={length === index + 1}
            accessibilityLabel={button.color}
          >
            <InnerButton
              accessibilityLabel={`${button.color} is selected`}
              isSelected={isSelectedValue === index}
            >
              {isSelectedValue === index && (
                <MaterialIcons
                  name="check"
                  size={16}
                  color={theme.select.button.borderColor}
                />
              )}
            </InnerButton>
          </Button>
        ))}
      </ButtonsWrapper>
    </Container>
  );
};

export default Select;
