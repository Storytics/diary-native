import React from "react";
import styled from "styled-components/native";

const Title = styled.Text`
  font-size: 24px;
  color: black;
  margin-top: 120px;
`;

const Description = styled.Text`
  font-size: 14px;
  color: grey;
  margin-top: 2px;
`;

const Container = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const App: React.FC = () => {
  return (
    <Container>
      <Title>Fastics Native</Title>
      <Description>Welcome</Description>
    </Container>
  );
};

export default App;
