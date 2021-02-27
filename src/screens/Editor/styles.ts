import styled, { css } from "styled-components/native";

export const Container = styled.View<{ isKeyboardOpen?: boolean }>`
  display: flex;
  flex-grow: 1;
  ${({ isKeyboardOpen }) =>
    isKeyboardOpen &&
    css`
      justify-content: flex-end;
    `}
`;

export const ContentWrapper = styled.View`
  display: flex;
  flex-grow: 1;
  padding-bottom: 30px;
`;

export const ToolBarWrapper = styled.View<{ isKeyboardOpen?: boolean }>`
  ${({ isKeyboardOpen }) =>
    isKeyboardOpen
      ? css`
          padding-bottom: 10px;
        `
      : css`
          padding-bottom: 30px;
        `}
`;
