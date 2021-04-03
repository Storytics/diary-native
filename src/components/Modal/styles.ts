import styled, { css } from "styled-components/native";

const flexGrowSharedStyles = css`
  display: flex;
  flex-grow: 1;
`;

export const Container = styled.View`
  ${flexGrowSharedStyles};
  position: relative;
`;

export const StyledScrollView = styled.ScrollView`
  /* content on top of overlay */
  position: relative;
  z-index: 1;
`;

// wrap TouchableWithoutFeedback
export const TouchOutsideContainer = styled.View`
  min-height: 20px;
  ${flexGrowSharedStyles};
`;

// fill TouchableWithoutFeedback
export const TouchOutsideSpacer = styled.View`
  ${flexGrowSharedStyles};
`;

export const Wrapper = styled.View`
  background-color: ${({ theme }) => theme.modal.backgroundColor};
  border-top-left-radius: ${({ theme }) => theme.sizes.borderRadius.large};
  border-top-right-radius: ${({ theme }) => theme.sizes.borderRadius.large};
`;

export const Header = styled.View`
  height: 64px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 18px 0 30px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.modal.header.borderColor};
`;

export const HeaderTextContainer = styled.View`
  margin-right: 20px;
`;

export const ContentContainer = styled.View<{
  hasContentPaddingTop?: boolean;
  hasContentPaddingBottom?: boolean;
  hasContentPaddingLeft?: boolean;
  hasContentPaddingRight?: boolean;
}>`
  ${({ hasContentPaddingRight }) =>
    hasContentPaddingRight &&
    css`
      padding-right: 30px;
    `};
  ${({ hasContentPaddingLeft }) =>
    hasContentPaddingLeft &&
    css`
      padding-left: 30px;
    `};
  ${({ hasContentPaddingBottom }) =>
    hasContentPaddingBottom &&
    css`
      padding-bottom: 30px;
    `};
  ${({ hasContentPaddingTop }) =>
    hasContentPaddingTop &&
    css`
      padding-top: 30px;
    `};
`;

export const Footer = styled.View<{ modalHasContent?: boolean }>`
  padding: ${({ modalHasContent }) => (modalHasContent ? "0" : "30px")} 30px
    30px 30px;
`;

export const FooterButtonContainer = styled.View`
  margin-bottom: 10px;
`;

export const OverLayBackground = styled.View`
  background-color: ${({ theme }) => theme.modal.overLayBackgroundColor};
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
`;
