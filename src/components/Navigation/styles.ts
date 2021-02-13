import styled, { css } from "styled-components/native";

export const Container = styled.View<{ isPageNavigation?: boolean }>`
  padding: 0 30px;
  ${({ isPageNavigation }) =>
    isPageNavigation &&
    css`
      display: flex;
      flex-direction: row;
      justify-content: center;
    `}
`;

export const MainButtonContainer = styled.View`
  padding: 0 10px;
`;

export const Wrapper = styled.View`
  background-color: ${({ theme }) => theme.navigation.backgroundColor};
  height: 60px;
  border-radius: 30px;
  overflow: hidden;
  padding: 0 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
