import styled, { css } from "styled-components/native";

/* Custom Switch */
export const CustomSwitchContainer = styled.TouchableHighlight<{
  isEnabled: boolean;
  isThemeSwitch: boolean;
}>`
  ${({ isThemeSwitch }) =>
    isThemeSwitch &&
    css`
      margin: 0 8px;
    `};
  position: relative;
  width: 44px;
  height: 26px;
  border-radius: 15px;
  ${({ isEnabled }) =>
    isEnabled
      ? css`
          background-color: ${({ theme }) => theme.customSwitch.track.on};
        `
      : css`
          background-color: ${({ theme }) => theme.customSwitch.track.off};
        `}
`;

export const CustomSwitchThumbContainer = styled.View<{ isEnabled: boolean }>`
  width: 22px;
  height: 22px;
  position: relative;
  top: 2px;
  ${({ isEnabled }) =>
    isEnabled
      ? css`
          left: 20px;
          transform: scaleX(-1);
        `
      : css`
          left: 2px;
        `}
`;

export const SwitchIconsContainer = styled.View<{ isEnabled: boolean }>`
  position: absolute;
  ${({ isEnabled }) =>
    isEnabled
      ? css`
          left: 5px;
          top: 5px;
        `
      : css`
          top: 3px;
          right: 5px;
        `}
`;
