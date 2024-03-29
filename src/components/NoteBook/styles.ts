import styled, { css } from "styled-components/native";

export const Container = styled.View<{
  hasPaddingBottom?: boolean;
  height?: number;
  isSimpleLayout?: boolean;
}>`
  flex: 1;
  padding-right: ${({ isSimpleLayout }) => (isSimpleLayout ? "5px" : "20px")};
  ${({ hasPaddingBottom }) =>
    hasPaddingBottom &&
    css`
      padding-bottom: 30px;
    `};
  height: ${({ height }) => (height ? `${height}px` : "auto")};
`;

export const Wrapper = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.noteBook.backgroundColor};
  border-top-right-radius: ${({ theme }) => theme.sizes.borderRadius.large};
  border-bottom-right-radius: ${({ theme }) => theme.sizes.borderRadius.large};
  position: relative;
  padding-left: 15px;
  overflow: hidden;
`;

export const Header = styled.View`
  padding: 30px 30px 0 30px;
`;

const borderStyle = css`
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.noteBook.lineColor};
  border-radius: 1px;
`;

export const HeaderWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 10px;
  ${borderStyle};
`;

export const Content = styled.View<{ isSimpleLayout?: boolean }>`
  position: relative;
  flex: 1;
  ${({ isSimpleLayout }) =>
    isSimpleLayout &&
    css`
      padding: 22px 0 30px 0;
    `};
`;

export const ContentWrapper = styled.View`
  flex: 1;
`;

export const Footer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 58px;
  padding: 0 30px;
`;

export const LoadingContainer = styled.View<{ isSimpleLayout?: boolean }>`
  z-index: 20;
  position: absolute;
  top: ${({ isSimpleLayout }) => (isSimpleLayout ? "14px" : "-8px")};
  right: 0;
  bottom: ${({ isSimpleLayout }) => (isSimpleLayout ? "30px" : "0")};
  left: 0;
  padding: 0 30px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.noteBook.backgroundColor};
`;

export const LoadingBox = styled.View<{ width?: number; top: number }>`
  position: absolute;
  left: 30px;
  top: ${({ top }) => (top ? `${top}px` : "16px")};
  width: ${({ width }) => (width ? `${width}%` : "100%")};
  height: 20px;
  border-radius: 2px;
  background-color: ${({ theme }) => theme.noteBook.lineColor};
`;
