import styled, { css } from "styled-components/native";

const Container = styled.View<{
  hasPadding?: boolean;
  backgroundColor?: string;
}>`
  ${({ hasPadding = true }) =>
    hasPadding &&
    css`
      padding: 30px 0;
    `};
  height: 100%;
  background-color: ${({ theme, backgroundColor }) =>
    backgroundColor || theme.container.backgroundColor};
`;

export default Container;
