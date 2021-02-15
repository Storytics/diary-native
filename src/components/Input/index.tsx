import React, { useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import { useTheme } from "styled-components/native";
import Theme from "theme/index";
// Locales
import i18n from "locales/index";
// Components
import { MaterialIcons } from "@expo/vector-icons";
import { InputContainer, StyledSmallTitle, IconContainer } from "./styles";

interface InputProps {
  title: string;
  placeholderText?: string;
  errorMessage?: string;
  hasMarginBottom?: boolean;
  hasEmojiFeedback?: boolean;
  inputText: string;
  onChangeText: (value: string) => void;
}

const styles = (theme: typeof Theme) =>
  StyleSheet.create({
    input: {
      paddingLeft: 20,
      paddingTop: 36,
      paddingRight: 20,
      paddingBottom: 14,
      fontFamily: "Roboto-Regular",
      fontSize: 16,
      color: theme.input.color,
    },
  });

const Input: React.FC<InputProps> = ({
  title = "Title",
  placeholderText,
  errorMessage,
  hasMarginBottom,
  hasEmojiFeedback = true,
  inputText,
  onChangeText,
}) => {
  const text = {
    inputPlaceholder: placeholderText || i18n.t("input.placeholder"),
    errorMessage: errorMessage || i18n.t("input.error"),
  };
  // If input is Focused
  const [isFocused, setIsFocused] = useState(false);
  // If input has Error
  const [hasError, setHasError] = useState(false);

  const theme = useTheme();

  return (
    <InputContainer
      borderColor={
        // eslint-disable-next-line no-nested-ternary
        isFocused
          ? theme.input.focused.borderColor
          : hasError
          ? theme.input.error.borderColor
          : theme.input.borderColor
      }
      hasMarginBottom={hasMarginBottom}
    >
      <StyledSmallTitle>{title}</StyledSmallTitle>
      {hasEmojiFeedback && (hasError || inputText.length > 0) && (
        <IconContainer>
          <MaterialIcons
            name={
              // eslint-disable-next-line no-nested-ternary
              hasError
                ? "sentiment-very-dissatisfied"
                : inputText.length <= 3
                ? "sentiment-neutral"
                : "sentiment-very-satisfied"
            }
            size={18}
            color={
              // eslint-disable-next-line no-nested-ternary
              hasError
                ? theme.input.error.color
                : inputText.length <= 3
                ? theme.iconDefaultColor
                : theme.input.success.iconColor
            }
          />
        </IconContainer>
      )}
      <TextInput
        style={styles(theme).input}
        onChangeText={onChangeText}
        onFocus={() => {
          setHasError(false);
          setIsFocused(true);
          if (inputText === text.errorMessage) {
            onChangeText("");
          }
        }}
        onBlur={() => {
          setIsFocused(false);
          if (inputText === "") {
            setHasError(true);
          }
        }}
        placeholder={hasError ? text.errorMessage : text.inputPlaceholder}
        placeholderTextColor={
          hasError ? theme.input.error.color : theme.input.placeholder.color
        }
        maxLength={30}
        value={inputText}
        textAlign="left"
      />
    </InputContainer>
  );
};

export default Input;
