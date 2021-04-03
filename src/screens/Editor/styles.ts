import styled from "styled-components/native";

export const Container = styled.View`
  display: flex;
  flex-grow: 1;
`;

export const HeaderKeepSpacer = styled.View`
  padding-top: 2.5px;
  padding-bottom: 2.5px;
  min-height: 5px;
`;

export const HeaderContainer = styled.View`
  height: 85px;
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow: hidden;
`;

export const ContentWrapper = styled.View`
  display: flex;
  flex: 1;
`;

export const ToolBarWrapper = styled.View<{ isKeyboardOpen?: boolean }>`
  padding: 0 5px 5px 5px;
`;
