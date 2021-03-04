import styled from "styled-components/native";

export const Container = styled.View<{ paddingTop: number }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: ${({ paddingTop }) => `${paddingTop || 10}px`} 15px 20px 15px;
  z-index: 100;
`;

export const Wrapper = styled.View<{ backgroundColor: string }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 54px;
  padding: 0 10px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-radius: ${({ theme }) => theme.sizes.borderRadius.default};
  z-index: 120;
`;

export const LeftIconWrapper = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
`;

export const TextContainer = styled.View`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  padding: 0 8px;
`;
