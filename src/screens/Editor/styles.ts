import styled, { css } from "styled-components/native";

export const ContentWrapper = styled.View<{ isKeyboardOpen?: boolean }>`
  position: relative;
  padding-top: 30px;
  height: 100%;
`;

export const ToolBarWrapper = styled.View<{ isKeyboardOpen?: boolean }>`
  ${({ isKeyboardOpen }) =>
    isKeyboardOpen
      ? css`
          padding-top: 30px;
          padding-bottom: 30px;
        `
      : css`
          padding-top: 30px;
          padding-bottom: 30px;
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
