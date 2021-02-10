import styled from "styled-components/native";
import { LargeTitle } from "components/Typography";

export const Container = styled.View<{ hasBackButton?: boolean }>`
  padding: 0 ${({ hasBackButton }) => (hasBackButton ? "18px" : "30px")};
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const StyledLargeTitle = styled(LargeTitle)`
  text-transform: capitalize;
`;

export const IconContainer = styled.View`
  margin-right: 18px;
`;