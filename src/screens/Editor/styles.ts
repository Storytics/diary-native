import styled, { css } from "styled-components/native";

export const Container = styled.View`
  position: relative;
  display: flex;
  flex-grow: 1;
`;

export const ContentWrapper = styled.View<{ isKeyboardOpen?: boolean }>`
  position: relative;
  padding-top: 30px;
  display: flex;
  flex-grow: 1;
  ${({ isKeyboardOpen }) =>
    isKeyboardOpen
      ? css`
          /* 10 Bottom, 60 Height, 30 Space */
          padding-bottom: 100px;
        `
      : css`
          /* 30 Bottom, 60 Height, 30 Space */
          padding-bottom: 120px;
        `};
`;

export const ToolBarWrapper = styled.View<{ isKeyboardOpen?: boolean }>`
  position: absolute;
  left: 0;
  right: 0;
  ${({ isKeyboardOpen }) =>
    isKeyboardOpen
      ? css`
          bottom: 10px;
        `
      : css`
          bottom: 30px;
        `};
`;

// Position editor in notebook
export const EditorContainer = styled.View`
  position: absolute;
  left: 0;
  top: 8px;
  right: 0;
  bottom: 0;
`;
