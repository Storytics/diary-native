import styled from "styled-components/native";

export const Container = styled.TouchableHighlight.attrs(({ theme }) => ({
  underlayColor: theme.borderButton.underlayColor,
}))`
  background-color: ${({ theme }) => theme.borderButton.backgroundColor};
  border-bottom-color: ${({ theme }) => theme.borderButton.borderColor};
  border-bottom-width: 1px;
`;

export const Wrapper = styled.View`
  background-color: ${({ theme }) => theme.borderButton.backgroundColor};
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const IconContainer = styled.View`
  margin-left: 10px;
`;

export const SwitchContainer = styled.View`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  z-index: 2;
  left: 4px;
`;
