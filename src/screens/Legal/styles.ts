import styled from "styled-components/native";

export const Overlay = styled.View`
  background-color: ${({ theme }) => theme.container.backgroundColor};
  padding: 30px 0;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
`;

export const PlaceholderContainer = styled.View`
  padding: 0 30px;
`;
