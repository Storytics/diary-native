import React from "react";
import {
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";
import RoundButton from "components/RoundButton";
import Button from "components/Button";
import { MediumTitle } from "components/Typography";
import {
  Container,
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
});

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
}) => {
  const theme = useTheme();
  return (
    <Modal
      animationType="slide"
      transparent
      visible={isOpen}
      onRequestClose={onClose}
    >
      <Container>
        <TouchOutsideContainer>
          <TouchableWithoutFeedback onPress={onClose}>
            <TouchOutsideSpacer />
          </TouchableWithoutFeedback>
        </TouchOutsideContainer>
        <Wrapper style={styles.wrapper}>
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
          <ScrollView>
            <ContentContainer>{children}</ContentContainer>
            <>
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
            </>
          </ScrollView>
        </Wrapper>
        {/* Fade in this overlay */}
        <OverLayBackground />
      </Container>
    </Modal>
  );
};

export default CustomModal;
