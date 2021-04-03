import styled from "styled-components/native";

export const Container = styled.TouchableHighlight.attrs(({ theme }) => ({
  underlayColor: theme.borderButton.underlayColor,
}))`
  background-color: ${({ theme }) => theme.borderButton.backgroundColor};
`;

export const Wrapper = styled.View`
  height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 30px 0 24px;
`;

export const TextContainer = styled.View`
  margin-left: 24px;
`;

export const TextWrapper = styled.View`
  margin-top: 2px;
`;
