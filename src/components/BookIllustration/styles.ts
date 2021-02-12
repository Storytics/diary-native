import styled, { css } from "styled-components/native";

const sharedStyles = css`
  width: 60px;
  height: 80px;
  border-radius: ${({ theme }) => theme.sizes.borderRadius.default};
`;

export const Container = styled.View`
  ${sharedStyles};
  background-color: ${({ theme }) =>
    theme.bookIllustration.fallbackBackgroundColor};
  position: relative;
`;

// this extra wrapper is for ios, for shadow to work, the view with
// the shadow styles, can't have overflow hidden
export const Wrapper = styled.View`
  ${sharedStyles};
  overflow: hidden;
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
