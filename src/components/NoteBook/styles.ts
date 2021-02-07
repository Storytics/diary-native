import styled, { css } from "styled-components/native";

export const Container = styled.View`
  padding-right: 30px;
  padding-bottom: 30px;
  display: flex;
  flex-grow: 1;
`;

export const Wrapper = styled.View`
  background-color: ${({ theme }) => theme.noteBook.backgroundColor};
  border-top-right-radius: ${({ theme }) => theme.sizes.borderRadius.large};
  border-bottom-right-radius: ${({ theme }) => theme.sizes.borderRadius.large};
  display: flex;
  flex-grow: 1;
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
  display: flex;
  flex: 1;
  padding: 0 30px;
`;

export const LinesWrapper = styled.View`
  flex: 1;
  overflow: hidden;
`;

export const Line = styled.View<{ height?: number }>`
  height: ${({ height }) => `${height}px` || "40px"};
  ${borderStyle};
`;

export const Footer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 30px;
`;
