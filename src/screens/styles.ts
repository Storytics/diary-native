import styled from "styled-components/native";

// Position editor in notebook
export const EditorContainer = styled.View<{ editorHeight?: number }>`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  padding-top: 8px;
  height: ${({ editorHeight }) =>
    editorHeight ? `${editorHeight}px` : "auto"};
`;
