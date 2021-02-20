import styled, { css } from "styled-components/native";

type size = "small" | "medium" | "large" | "xLarge";

interface RoundButtonProps {
  size?: size;
  backgroundColor?: string;
}

const RoundButton = styled.TouchableHighlight.attrs(
  ({ theme, underlayColor }) => ({
    underlayColor: underlayColor || theme.roundButton.underlayColor,
  })
)<RoundButtonProps>`
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
  ${({ size }) =>
    size === "xLarge" &&
    css`
      height: 56px;
      width: 56px;
      border-radius: 28px;
    `};
`;

export const FakeButton = styled.View<RoundButtonProps>`
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
  ${({ size }) =>
    size === "xLarge" &&
    css`
      height: 56px;
      width: 56px;
      border-radius: 28px;
    `};
`;

RoundButton.defaultProps = {
  size: "medium",
};

export default RoundButton;
