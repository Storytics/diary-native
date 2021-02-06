import styled from "styled-components/native";

export const Container = styled.View`
  background-color: ${({ theme }) =>
    theme.bookIllustration.fallbackBackgroundColor};
  border-radius: ${({ theme }) => theme.sizes.borderRadius.default};
  overflow: hidden;
  width: 60px;
  height: 80px;
  position: relative;
`;

export const BookIdentifier = styled.View<{ bookColor?: string }>`
  background-color: ${({ theme, bookColor }) =>
    bookColor || theme.bookIllustration.defaultBookColor};
  position: absolute;
  top: 0;
  left: 0;
  width: 8px;
  height: 100%;
  z-index: 10;
`;

export const Line = styled.View<{ top: number }>`
  background-color: ${({ theme }) => theme.bookIllustration.lineColor};
  position: absolute;
  top: ${({ top }) => `${top}px`};
  right: 11px;
  width: 30px;
  height: 3px;
  border-radius: 1.5px;
  z-index: 10;
`;
