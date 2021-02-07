import styled from "styled-components/native";

export const Container = styled.View`
  padding: 0 30px;
`;

export const Wrapper = styled.View`
  background-color: ${({ theme }) => theme.navigation.backgroundColor};
  height: 68px;
  border-radius: 34px;
  overflow: hidden;
  padding: 0 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
