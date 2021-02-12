import React, { useRef, useEffect } from "react";
import {
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";
import RoundButton from "components/RoundButton";
import Button from "components/Button";
import { MediumTitle } from "components/Typography";
// Utils
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Container,
  StyledScrollView,
  OverLayBackground,
  Wrapper,
  Header,
  HeaderTextContainer,
  TouchOutsideContainer,
  TouchOutsideSpacer,
  ContentContainer,
  Footer,
  FooterButtonContainer,
} from "./styles";

interface ActivityCardProps {
  isOpen: boolean;
  onClose: () => void;
  onPressPrimary: () => void;
  onPressSecondary: () => void;
  title: string;
  hasActionButtons?: boolean;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  hasContentPaddingTop?: boolean;
  hasContentPaddingBottom?: boolean;
}

const styles = StyleSheet.create({
  wrapper: {
    shadowColor: "#141414",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  scrollViewContent: {
    display: "flex",
    flexGrow: 1,
  },
});

const AnimatedOverLayBackground = Animated.createAnimatedComponent(
  OverLayBackground
);

const CustomModal: React.FC<ActivityCardProps> = ({
  isOpen = true,
  onClose,
  title = "Title",
  hasActionButtons = true,
  children,
  onPressPrimary,
  onPressSecondary,
  primaryButtonText = "Text",
  secondaryButtonText = "Text",
  hasContentPaddingTop = true,
  hasContentPaddingBottom = true,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim, isOpen]);

  const animationStyles = {
    opacity: fadeAnim,
  };

  const theme = useTheme();
  return (
    <>
      <Modal
        animationType="slide"
        transparent
        visible={isOpen}
        onRequestClose={onClose}
      >
        <Container>
          <StyledScrollView contentContainerStyle={styles.scrollViewContent}>
            <TouchOutsideContainer>
              <TouchableWithoutFeedback onPress={onClose}>
                <TouchOutsideSpacer />
              </TouchableWithoutFeedback>
            </TouchOutsideContainer>
            <Wrapper style={styles.wrapper}>
              <SafeAreaView>
                <Header>
                  <HeaderTextContainer>
                    <MediumTitle>{title}</MediumTitle>
                  </HeaderTextContainer>
                  <RoundButton size="medium" onPress={onClose}>
                    <MaterialIcons
                      name="close"
                      size={24}
                      color={theme.modal.header.iconColor}
                    />
                  </RoundButton>
                </Header>
                <ContentContainer
                  hasContentPaddingTop={hasContentPaddingTop}
                  hasContentPaddingBottom={hasContentPaddingBottom}
                >
                  {children}
                </ContentContainer>
                {hasActionButtons && (
                  <Footer>
                    <FooterButtonContainer>
                      <Button
                        variant="primary"
                        text={primaryButtonText}
                        onPress={onPressPrimary}
                      />
                    </FooterButtonContainer>
                    <Button
                      text={secondaryButtonText}
                      onPress={onPressSecondary}
                    />
                  </Footer>
                )}
              </SafeAreaView>
            </Wrapper>
          </StyledScrollView>
        </Container>
      </Modal>
      {isOpen && <AnimatedOverLayBackground style={animationStyles} />}
    </>
  );
};

export default CustomModal;
