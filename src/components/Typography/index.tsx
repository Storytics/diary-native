import styled, { css } from "styled-components/native";

interface TextProps {
  color?: string;
}

const titlesSharedStyles = css`
  font-family: ${({ theme }) => theme.typography.fontFamily.openSansSemiBold};
`;

export const SmallTitle = styled.Text<TextProps>`
  ${titlesSharedStyles};
  font-size: 14px;
  line-height: 16px;
  color: ${({ theme, color }) =>
    color || theme.typography.defaultColors.smallTitle};
`;

export const MediumTitle = styled.Text<TextProps>`
  ${titlesSharedStyles};
  font-size: 16px;
  line-height: 18px;
  color: ${({ theme, color }) =>
    color || theme.typography.defaultColors.mediumTitle};
`;

export const LargeTitle = styled.Text<TextProps>`
  ${titlesSharedStyles};
  font-size: 22px;
  line-height: 24px;
  color: ${({ theme, color }) =>
    color || theme.typography.defaultColors.largeTitle};
`;

const textSharedStyles = css`
  font-family: ${({ theme }) => theme.typography.fontFamily.robotoRegular};
`;

export const Text = styled.Text<TextProps>`
  ${textSharedStyles};
  font-size: 14px;
  line-height: 16px;
  color: ${({ theme, color }) => color || theme.typography.defaultColors.text};
`;

export const MediumText = styled.Text<TextProps>`
  ${textSharedStyles};
  font-size: 16px;
  line-height: 18px;
  color: ${({ theme, color }) =>
    color || theme.typography.defaultColors.mediumText};
`;

export const LargeText = styled.Text<TextProps>`
  ${textSharedStyles};
  font-size: 26px;
  line-height: 30px;
  color: ${({ theme, color }) =>
    color || theme.typography.defaultColors.largeText};
`;
