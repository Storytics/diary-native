import React, { useRef, useEffect } from "react";
import {
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
  GestureResponderEvent,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Theme from "theme/index";
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
  /**
   Modal title
   */
  title: string;
  /**
   Modal main actions, open and close
   */
  isOpen: boolean;
  onClose: () => void;
  /**
   Removes footer, true by default
   */
  hasActionButtons?: boolean;
  /**
   Main buttons shown by default
   */
  hasPrimaryButton?: boolean;
  hasSecondaryButton?: boolean;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  /**
   Main buttons actions
   */
  onPressPrimary?: () => void;
  onPressSecondary?: () => void;
  /**
   Set Children true by default
   */
  hasContent?: boolean;
  /**
   Padding of content has by default
   */
  hasContentPaddingTop?: boolean;
  hasContentPaddingBottom?: boolean;
  hasContentPaddingLeft?: boolean;
  hasContentPaddingRight?: boolean;
  children: React.ReactNode;
}

const styles = (theme: typeof Theme) =>
  StyleSheet.create({
    wrapper: {
      shadowColor: theme.modal.shadowColor,
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

const AnimatedOverLayBackground =
  Animated.createAnimatedComponent(OverLayBackground);

const CustomModal = ({
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
  hasContentPaddingLeft = true,
  hasContentPaddingRight = true,
  hasPrimaryButton = true,
  hasSecondaryButton = true,
  hasContent = true,
}: ActivityCardProps) => {
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
          <StyledScrollView
            contentContainerStyle={styles(theme).scrollViewContent}
            keyboardShouldPersistTaps="handled"
          >
            <TouchOutsideContainer>
              <TouchableWithoutFeedback
                onPress={onClose}
                accessibilityLabel="Close Modal"
              >
                <TouchOutsideSpacer />
              </TouchableWithoutFeedback>
            </TouchOutsideContainer>
            <Wrapper style={styles(theme).wrapper}>
              <SafeAreaView>
                <Header>
                  <HeaderTextContainer>
                    <MediumTitle numberOfLines={1}>{title}</MediumTitle>
                  </HeaderTextContainer>
                  <RoundButton
                    size="medium"
                    onPress={onClose}
                    accessibilityLabel="Close the modal with X"
                  >
                    <MaterialIcons
                      name="close"
                      size={24}
                      color={theme.modal.header.iconColor}
                    />
                  </RoundButton>
                </Header>
                {hasContent && (
                  <ContentContainer
                    hasContentPaddingTop={hasContentPaddingTop}
                    hasContentPaddingBottom={hasContentPaddingBottom}
                    hasContentPaddingLeft={hasContentPaddingLeft}
                    hasContentPaddingRight={hasContentPaddingRight}
                  >
                    {children}
                  </ContentContainer>
                )}
                {hasActionButtons && (
                  <Footer modalHasContent={hasContent}>
                    {hasPrimaryButton && (
                      <FooterButtonContainer>
                        <Button
                          variant="primary"
                          text={primaryButtonText}
                          onPress={onPressPrimary}
                        />
                      </FooterButtonContainer>
                    )}
                    {hasSecondaryButton && (
                      <Button
                        text={secondaryButtonText}
                        onPress={onPressSecondary}
                      />
                    )}
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
