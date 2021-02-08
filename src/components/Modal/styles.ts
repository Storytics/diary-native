import styled from "styled-components/native";

export const Container = styled.View`
  display: flex;
  flex-grow: 1;
  justify-content: flex-end;
  position: relative;
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

export const Wrapper = styled.View`
  background-color: ${({ theme }) => theme.modal.backgroundColor};
  border-top-left-radius: ${({ theme }) => theme.sizes.borderRadius.large};
  border-top-right-radius: ${({ theme }) => theme.sizes.borderRadius.large};
  position: relative;
  z-index: 1;
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

export const TouchOutsideContainer = styled.View`
  display: flex;
  flex-grow: 1;
`;

export const TouchOutsideSpacer = styled.View`
  display: flex;
  flex-grow: 1;
`;

export const HeaderTextContainer = styled.View`
  margin-right: 10px;
`;

export const ContentContainer = styled.View`
  padding: 30px;
`;

export const Footer = styled.View`
  padding: 0 30px 20px 30px;
`;

export const FooterButtonContainer = styled.View`
  margin-bottom: 6px;
`;
