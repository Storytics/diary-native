import styled from "styled-components/native";

const Description = styled.Text`
  font-family: "Roboto-Regular";
  font-size: 14px;
  color: ${({ theme }) => theme.colors.description};
  margin-top: 2px;
`;

export default Description;
