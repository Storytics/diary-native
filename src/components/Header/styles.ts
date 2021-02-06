import styled from "styled-components/native";
import { LargeTitle } from "components/Typography";

export const Container = styled.View`
  padding: 0 30px;
  margin-bottom: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const StyledLargeTitle = styled(LargeTitle)`
  text-transform: capitalize;
`;

export const IconContainer = styled.View`
  margin-right: 25px;
`;
