import styled from "styled-components/native";

const Title = styled.Text`
  font-family: "OpenSans-Regular";
  font-size: 24px;
  color: ${({ theme }) => theme.colors.title};
  margin-top: 120px;
`;

export default Title;
