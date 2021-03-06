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

export const ContentWrapper = styled.View<{ isKeyboardOpen?: boolean }>`
  display: flex;
  flex-grow: 1;
  ${({ isKeyboardOpen }) =>
    isKeyboardOpen
      ? css`
          padding-bottom: 100px;
        `
      : css`
          padding-bottom: 30px;
        `}
`;

export const ToolBarWrapper = styled.View<{ isKeyboardOpen?: boolean }>`
  ${({ isKeyboardOpen }) =>
    isKeyboardOpen
      ? css`
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          padding-bottom: 10px;
        `
      : css`
          padding-bottom: 30px;
        `}
`;
