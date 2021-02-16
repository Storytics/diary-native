import styled from "styled-components/native";

export const Wrapper = styled.View`
  background-color: ${({ theme }) => theme.activityCard.backgroundColor};
  border-radius: ${({ theme }) => theme.sizes.borderRadius.default};
  overflow: hidden;
`;

export const Container = styled.View`
  padding: 15px 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const LeftIconContainer = styled.View`
  background-color: ${({ theme }) =>
    theme.activityCard.leftIconBackgroundColor};
  height: 40px;
  width: 40px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ContentContainer = styled.View`
  padding: 0 20px;
  flex-grow: 1;
`;

export const TextContainer = styled.View`
  margin-bottom: 4px;
`;
