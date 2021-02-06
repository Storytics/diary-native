import styled from "styled-components/native";
import { MediumTitle } from "components/Typography";

export const Wrapper = styled.View`
  background-color: ${({ theme }) => theme.diaryCard.backgroundColor};
  border-radius: ${({ theme }) => theme.sizes.borderRadius.default};
  overflow: hidden;
`;

export const Container = styled.View`
  width: 160px;
  padding-bottom: 20px;
`;

export const Header = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 2px;
`;

export const BookContainer = styled.View`
  display: flex;
  align-items: center;
`;

export const TextContainer = styled.View`
  margin-top: 20px;
  padding: 0 20px;
`;

export const StyledMediumTitle = styled(MediumTitle)`
  text-align: center;
`;
