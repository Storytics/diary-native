import styled from "styled-components/native";

export const Container = styled.View`
  padding: 10px;
  overflow: hidden;
`;

export const Wrapper = styled.View`
  height: 68px;
  border-radius: 34px;
  background-color: ${({ theme }) => theme.toolBox.backgroundColor};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
`;
