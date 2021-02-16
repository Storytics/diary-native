import styled, { css, useTheme } from "styled-components/native";
import React from "react";
import { MediumTitle } from "components/Typography";

type variant = "primary" | "default";

interface StyledButtonProps {
  variant?: variant;
}

const Button = styled.TouchableHighlight.attrs(({ theme, underlayColor }) => ({
  underlayColor: underlayColor || theme.button.primary.underlayColor,
}))<StyledButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  border-radius: 24px;
  ${({ variant }) =>
    variant === "primary"
      ? css`
          background-color: ${({ theme }) =>
            theme.button.primary.backgroundColor};
        `
      : css`
          background-color: ${({ theme }) =>
            theme.button.default.backgroundColor};
        `};
`;

interface ButtonComponentProps {
  variant?: variant;
  text: string;
  onPress?: () => void;
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  variant,
  text,
  onPress,
}) => {
  const theme = useTheme();
  return (
    <Button
      variant={variant}
      onPress={onPress}
      underlayColor={
        variant === "primary"
          ? theme.button.primary.underlayColor
          : theme.button.default.underlayColor
      }
    >
      <MediumTitle
        color={
          variant === "primary"
            ? theme.button.primary.color
            : theme.button.default.color
        }
      >
        {text}
      </MediumTitle>
    </Button>
  );
};

ButtonComponent.defaultProps = {
  variant: "default",
};

export default ButtonComponent;
