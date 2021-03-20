import styled, { css } from "styled-components/native";

export const Container = styled.View<{
  hasBackButton?: boolean;
  hasMarginBottom?: boolean;
}>`
  padding: 0 ${({ hasBackButton }) => (hasBackButton ? "18px" : "30px")};
  ${({ hasMarginBottom }) =>
    hasMarginBottom &&
    css`
      margin-bottom: 20px;
    `};
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const IconContainer = styled.View`
  margin-right: 18px;
`;
