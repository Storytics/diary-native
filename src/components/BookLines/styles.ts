import styled, { css } from "styled-components/native";

const borderStyle = css`
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.noteBook.lineColor};
  border-radius: 1px;
`;

export const LinesWrapper = styled.View`
  position: absolute;
  top: -8px;
  right: 0;
  left: 0;
  bottom: -8px;
  z-index: 1;
`;

export const Line = styled.View<{ height?: number }>`
  height: ${({ height }) => (height ? `${height}px` : "40px")};
  flex-shrink: 0;
  ${borderStyle};
`;
