import styled, { css } from "styled-components/native";

const flexGrow1 = css`
  display: flex;
  flex-grow: 1;
`;

export const Container = styled.View<{
  hasPaddingBottom?: boolean;
  height?: number;
}>`
  ${flexGrow1};
  padding-right: 20px;
  ${({ hasPaddingBottom }) =>
    hasPaddingBottom &&
    css`
      padding-bottom: 30px;
    `};
  height: ${({ height }) => (height ? `${height}px` : "auto")};
`;

export const Wrapper = styled.View`
  ${flexGrow1};
  background-color: ${({ theme }) => theme.noteBook.backgroundColor};
  border-top-right-radius: ${({ theme }) => theme.sizes.borderRadius.large};
  border-bottom-right-radius: ${({ theme }) => theme.sizes.borderRadius.large};
  position: relative;
  padding-left: 15px;
  overflow: hidden;
`;

export const Header = styled.View`
  padding: 30px 30px 10px 30px;
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

export const Content = styled.View`
  position: relative;
  flex: 1;
  padding: 0 30px;
`;

export const LinesWrapper = styled.View`
  ${flexGrow1};
  overflow: hidden;
  z-index: 1;
`;

export const Line = styled.View<{ height?: number }>`
  height: ${({ height }) => (height ? `${height}px` : "40px")};
  ${borderStyle};
`;

export const Footer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 30px;
`;

export const LoadingContainer = styled.View`
  z-index: 20;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 0 30px;
  background-color: ${({ theme }) => theme.noteBook.backgroundColor};
`;
