import styled, { css } from "styled-components/native";

export const ContentWrapper = styled.View<{ isKeyboardOpen?: boolean }>`
  position: relative;
  padding-top: 30px;
  height: 100%;
  ${({ isKeyboardOpen }) =>
    isKeyboardOpen
      ? css`
          /* toolbar padding 10 + tb height 60 + wanted space 30 */
          padding-bottom: 100px;
        `
      : css`
          /* toolbar padding 30 + tb height 60 + wanted space 30 */
          padding-bottom: 120px;
        `};
`;

export const ToolBarWrapper = styled.View<{ isKeyboardOpen?: boolean }>`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  ${({ isKeyboardOpen }) =>
    isKeyboardOpen
      ? css`
          padding-bottom: 10px;
        `
      : css`
          padding-bottom: 30px;
        `};
`;

export const EditorContainer = styled.View`
  position: absolute;
  left: 0;
  top: 8px;
  right: 0;
  bottom: 0;
`;
