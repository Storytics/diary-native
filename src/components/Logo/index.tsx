import React from "react";
import { Svg, Path } from "react-native-svg";
import styled, { useTheme } from "styled-components/native";

interface ContainerProps {
  size?: number;
  hasContainer?: boolean;
  backgroundColor?: string;
}

const Container = styled.View<ContainerProps>`
  background-color: ${({ theme, backgroundColor }) =>
    backgroundColor || theme.logo.backgroundColor};
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${({ size }) => `${size}px`};
  width: ${({ size }) => `${size}px`};
  border-radius: ${({ size }) =>
    // @ts-ignore
    `${size - size / 1.8}px`};
`;

interface BrandProps extends ContainerProps {
  color?: string;
}

const Logo: React.FC<BrandProps> = ({
  color,
  size = 70,
  hasContainer = false,
  backgroundColor,
}) => {
  const theme = useTheme();
  return (
    <Container
      hasContainer={hasContainer}
      size={size}
      backgroundColor={hasContainer ? backgroundColor : "transparent"}
    >
      <Svg
        width={hasContainer ? size - size / 2.2 : size}
        height={hasContainer ? size - size / 2.2 : size}
        viewBox="0 0 70 70"
        fill="none"
      >
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.5535 0C3.82953 0 0 3.82953 0 8.5535V61.4465C0 66.1705 3.82954 70 8.5535 70H34.6499C53.9799 70 69.6499 54.33 69.6499 35C69.6499 15.67 53.9799 0 34.6499 0H8.5535ZM9.79999 8.75C8.25359 8.75 6.99999 10.0036 6.99999 11.55C6.99999 13.0964 8.25359 14.35 9.79999 14.35H41.9999C43.5463 14.35 44.7999 13.0964 44.7999 11.55C44.7999 10.0036 43.5463 8.75 41.9999 8.75H9.79999ZM6.99999 20.65C6.99999 19.1036 8.25359 17.85 9.79998 17.85H27.65C29.1964 17.85 30.45 19.1036 30.45 20.65C30.45 22.1964 29.1964 23.45 27.65 23.45H9.79998C8.25359 23.45 6.99999 22.1964 6.99999 20.65ZM36.75 17.85C35.2036 17.85 33.95 19.1036 33.95 20.65C33.95 22.1964 35.2036 23.45 36.75 23.45H42C43.5464 23.45 44.8 22.1964 44.8 20.65C44.8 19.1036 43.5464 17.85 42 17.85H36.75ZM6.99999 29.75C6.99999 28.2036 8.25359 26.95 9.79999 26.95H27.65C29.1964 26.95 30.45 28.2036 30.45 29.75C30.45 31.2964 29.1964 32.55 27.65 32.55H9.79999C8.25359 32.55 6.99999 31.2964 6.99999 29.75Z"
          fill={color || theme.logo.color}
        />
      </Svg>
    </Container>
  );
};

export default Logo;
