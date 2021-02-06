import styled, { css } from "styled-components/native";

type size = "small" | "medium" | "large";

interface RoundButtonProps {
  size?: size;
  backgroundColor?: string;
}

const RoundButton = styled.TouchableHighlight.attrs(({ theme }) => ({
  underlayColor: theme.roundButton.underlayColor,
}))<RoundButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ backgroundColor }) =>
    backgroundColor || "transparent"};
  ${({ size }) =>
    size === "small" &&
    css`
      height: 32px;
      width: 32px;
      border-radius: 16px;
    `};
  ${({ size }) =>
    size === "medium" &&
    css`
      height: 40px;
      width: 40px;
      border-radius: 20px;
    `};
  ${({ size }) =>
    size === "large" &&
    css`
      height: 48px;
      width: 48px;
      border-radius: 24px;
    `};
`;

RoundButton.defaultProps = {
  size: "medium",
};

export default RoundButton;
