import styled from "styled-components/native";
import { Text } from "components/Typography";

export const Container = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 64px;
`;

export const ContentWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const StyledText = styled(Text)`
  text-align: center;
  color: ${({ theme }) => theme.brand.textColor};
`;
