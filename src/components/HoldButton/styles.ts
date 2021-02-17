import styled from "styled-components/native";

export const Container = styled.View`
  background-color: ${({ theme }) => theme.holdButton.backgroundColor};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  border-radius: 24px;
  position: relative;
  overflow: hidden;
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
