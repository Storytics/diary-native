import styled, { css } from "styled-components/native";
import { SmallTitle } from "components/Typography";

export const InputContainer = styled.View<{
  borderColor: string;
  hasMarginBottom?: boolean;
}>`
  background-color: ${({ theme }) => theme.input.backgroundColor};
  border-radius: ${({ theme }) => theme.sizes.borderRadius.default};
  overflow: hidden;
  height: 77px;
  border: 1px solid ${({ borderColor }) => borderColor};
  position: relative;
  ${({ hasMarginBottom }) =>
    hasMarginBottom &&
    css`
      margin-bottom: 20px;
    `}
`;

export const StyledSmallTitle = styled(SmallTitle)`
  position: absolute;
  left: 20px;
  top: 18px;
  z-index: 1;
`;

export const IconContainer = styled(SmallTitle)`
  position: absolute;
  right: 18px;
  top: 18px;
  z-index: 1;
  line-height: 18px;
`;
