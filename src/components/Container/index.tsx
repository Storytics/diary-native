import styled from "styled-components/native";

const Container = styled.View`
  padding: 50px 0;
  height: 100%;
  background-color: ${({ theme }) => theme.container.backgroundColor};
`;

export default Container;
