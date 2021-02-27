import styled from "styled-components/native";

export const Wrapper = styled.View`
  display: flex;
  flex-grow: 1;
  padding: 0 56px;
`;

export const LogoContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
`;

export const PinContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px 0 70px 0;
`;

export const CirclesContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 140px;
  position: relative;
`;

export const CirclesFeedback = styled.View<{ width: number }>`
  background-color: ${({ theme }) =>
    theme.passwordScreen.circles.feedbackColor};
  height: 12px;
  width: ${({ width }) => `${width}px`};
  border-radius: 6px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
`;

export const PinCircle = styled.View`
  height: 12px;
  width: 12px;
  border-radius: 6px;
  background-color: ${({ theme }) =>
    theme.passwordScreen.circles.backgroundColor};
`;

export const ButtonsContainer = styled.View`
  display: flex;
  align-items: center;
`;

export const Row = styled.View<{ removeMarginTop?: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  max-width: 260px;
  margin-top: ${({ removeMarginTop }) => (removeMarginTop ? "0" : "25px")};
`;
