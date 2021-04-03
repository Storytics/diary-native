import styled from "styled-components/native";

export const Container = styled.View`
  background-color: ${({ theme }) => theme.holdButton.backgroundColor};
  display: flex;
  position: relative;
  overflow: hidden;
`;

export const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
  height: 60px;
  padding: 0 35px 0 24px;
`;

export const Loader = styled.View`
  background-color: ${({ theme }) => theme.holdButton.animationColor};
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: -1;
`;

export const TextContainer = styled.View`
  margin-left: 24px;
`;

export const TextWrapper = styled.View`
  margin-bottom: 2px;
`;
