import React, { useMemo, useState } from "react";
import { useTheme } from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";
import Theme from "theme/index";
// Types
import { PasswordScreenNavigationProp } from "types/navigation";
// Components
import Logo from "components/Logo";
import Header from "components/Header";
import Container from "components/Container";
import CustomSafeArea from "components/CustomSafeArea";
import RoundButton from "components/RoundButton";
import { LargeText } from "components/Typography";
import {
  Wrapper,
  LogoContainer,
  PinContainer,
  CirclesFeedback,
  CirclesContainer,
  PinCircle,
  ButtonsContainer,
  Row,
} from "./styles";

interface ButtonProps {
  theme: typeof Theme;
  onPress: () => void;
  isIcon?: boolean;
  text?: string;
  iconName?: keyof typeof MaterialIcons.glyphMap;
}

const Button = ({ theme, onPress, isIcon, text, iconName }: ButtonProps) => {
  const { color } = theme.passwordScreen.numbers;
  return (
    <RoundButton size="large" onPress={onPress}>
      {isIcon ? (
        <MaterialIcons name={iconName} size={32} color={color} />
      ) : (
        <LargeText color={color}>{text}</LargeText>
      )}
    </RoundButton>
  );
};

Button.defaultProps = {
  isIcon: false,
  text: "0",
  iconName: "keyboard-backspace",
};

interface Props {
  navigation: PasswordScreenNavigationProp;
}

const PasswordScreen: React.FC<Props> = ({ navigation }) => {
  const theme = useTheme();
  const [code, setCode] = useState<Array<string>>([]);

  const animationWidth = useMemo(
    () => [12, 55, 98, 140][code.length - 1 || 0],
    [code]
  );

  const handleNumber = (value: string) => {
    if (code.length < 4) {
      setCode((prevCode) => [...prevCode, value]);
    }
  };

  return (
    <CustomSafeArea>
      <Container>
        <Header
          hasBackButton
          text="Create Password"
          onPress={() => {
            navigation.navigate("Home");
          }}
        />
        <Wrapper>
          <LogoContainer>
            <Logo size={80} hasContainer />
          </LogoContainer>
          <PinContainer>
            <CirclesContainer>
              {code.length > 0 && (
                <CirclesFeedback
                  width={code.length < 4 ? animationWidth : 140}
                />
              )}
              <PinCircle />
              <PinCircle />
              <PinCircle />
              <PinCircle />
            </CirclesContainer>
          </PinContainer>
          <ButtonsContainer>
            <Row removeMarginTop>
              <Button
                text="1"
                theme={theme}
                onPress={() => handleNumber("1")}
              />
              <Button
                text="2"
                theme={theme}
                onPress={() => handleNumber("2")}
              />
              <Button
                text="3"
                theme={theme}
                onPress={() => handleNumber("3")}
              />
            </Row>
            <Row>
              <Button
                text="4"
                theme={theme}
                onPress={() => handleNumber("4")}
              />
              <Button
                text="5"
                theme={theme}
                onPress={() => handleNumber("5")}
              />
              <Button
                text="6"
                theme={theme}
                onPress={() => handleNumber("6")}
              />
            </Row>
            <Row>
              <Button
                text="7"
                theme={theme}
                onPress={() => handleNumber("7")}
              />
              <Button
                text="8"
                theme={theme}
                onPress={() => handleNumber("8")}
              />
              <Button
                text="9"
                theme={theme}
                onPress={() => handleNumber("9")}
              />
            </Row>
            <Row>
              <Button
                isIcon
                iconName="fingerprint"
                onPress={() => console.log("finger")}
                theme={theme}
              />
              <Button
                text="0"
                theme={theme}
                onPress={() => setCode([...code, "0"])}
              />
              <Button
                isIcon
                theme={theme}
                onPress={() => {
                  const updatedCode = code.slice(0, -1);
                  setCode(updatedCode);
                }}
              />
            </Row>
          </ButtonsContainer>
        </Wrapper>
      </Container>
    </CustomSafeArea>
  );
};

export default PasswordScreen;
