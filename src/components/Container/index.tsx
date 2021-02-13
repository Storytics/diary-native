import styled, { css } from "styled-components/native";

const Container = styled.View<{ hasPadding?: boolean }>`
  ${({ hasPadding }) =>
    hasPadding &&
    css`
      padding: 30px 0;
    `};
  height: 100%;
  background-color: ${({ theme }) => theme.container.backgroundColor};
`;

Container.defaultProps = {
  hasPadding: true,
};

export default Container;
