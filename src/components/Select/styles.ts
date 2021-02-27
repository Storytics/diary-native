import styled, { css } from "styled-components/native";
import { SmallTitle } from "components/Typography";

export const Container = styled.View`
  background-color: ${({ theme }) => theme.select.backgroundColor};
  border-radius: ${({ theme }) => theme.sizes.borderRadius.default};
  overflow: hidden;
  padding: 20px;
`;

export const StyledSmallTitle = styled(SmallTitle)`
  margin-bottom: 12px;
`;

export const ButtonsWrapper = styled.View`
  display: flex;
  flex-direction: row;
`;

export const Button = styled.TouchableHighlight<{
  isLastChild: boolean;
  color: string;
}>`
  ${({ isLastChild }) =>
    !isLastChild &&
    css`
      margin-right: 15px;
    `};
  border-radius: ${({ theme }) => theme.sizes.borderRadius.small};
  background-color: ${({ color }) => color};
  overflow: hidden;
`;

export const InnerButton = styled.View<{ isSelected: boolean }>`
  ${({ isSelected }) =>
    isSelected &&
    css`
      border-radius: ${({ theme }) => theme.sizes.borderRadius.small};
      border: 2px solid ${({ theme }) => theme.select.button.borderColor};
    `};
  height: 40px;
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
