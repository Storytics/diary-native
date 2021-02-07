import styled from "styled-components/native";

export const Container = styled.View`
  background-color: ${({ theme }) => theme.placeHolder.backgroundColor};
  border-radius: ${({ theme }) => theme.sizes.borderRadius.default};
  border: 1px solid ${({ theme }) => theme.placeHolder.borderColor};
  height: 182px;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;

export const ContentContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
`;

export const TextContainer = styled.View`
  margin-top: 10px;
`;
