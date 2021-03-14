import styled, { css } from "styled-components/native";
import { LargeTitle } from "components/Typography";

const flexGrow1 = css`
  display: flex;
  flex-grow: 1;
`;

/* Layout Helper */
export const Box = styled.View<{
  mb?: number;
  mr?: number;
  mt?: number;
}>`
  margin-top: ${({ mt }) => (mt ? `${mt}px` : 0)};
  margin-bottom: ${({ mb }) => (mb ? `${mb}px` : 0)};
  margin-right: ${({ mr }) => (mr ? `${mr}px` : 0)};
`;

/* Create Account and Login Content Container Styles */
export const ContentContainer = styled.View`
  ${flexGrow1};
  padding: 30px 0 0 0;
`;

/* Create Account Features Styles */
export const FeaturesContainer = styled.View`
  ${flexGrow1};
  justify-content: center;
  padding: 20px 25px;
`;

export const FeaturesTextWrapper = styled.View`
  display: flex;
  align-items: center;
  padding: 0 5px;
  margin-bottom: 15px;
`;

export const ListItemsContainer = styled.View`
  display: flex;
  flex-direction: row;
`;

export const ListItemWrapper = styled.View`
  display: flex;
  flex-basis: 33.33%;
  padding: 0 5px;
`;

export const ListItem = styled.View`
  ${flexGrow1};
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.cloudScreen.listItem.borderColor};
  border-radius: ${({ theme }) => theme.sizes.borderRadius.default};
  padding: 10px 5px;
  overflow: hidden;
`;

export const ListItemIconContainer = styled.View`
  height: 40px;
  width: 40px;
  border-radius: 20px;
  margin-bottom: 6px;
  background-color: ${({ theme }) =>
    theme.cloudScreen.listItem.icon.backgroundColor};
  display: flex;
  align-items: center;
  justify-content: center;
`;

/* Create Account and Login Form Styles */
export const FormContainer = styled.View`
  background-color: ${({ theme }) => theme.cloudScreen.form.backgroundColor};
  border-top-left-radius: ${({ theme }) => theme.sizes.borderRadius.large};
  border-top-right-radius: ${({ theme }) => theme.sizes.borderRadius.large};
  padding: 30px;
`;

export const FormFooter = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 30px;
`;

/* Login Content Wrapper Styles */
export const LoginContentWrapper = styled.View`
  ${flexGrow1};
  justify-content: center;
  padding: 30px;
`;

/* Login Styles */
export const WelcomeBackText = styled(LargeTitle)`
  line-height: 34px;
`;
