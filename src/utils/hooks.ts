import { useEffect, useState, useCallback } from "react";
import { Keyboard, KeyboardEvent } from "react-native";

/* Get height of keyboard and if is open */
export const useKeyboard = (): {
  keyboardHeight: number;
  isKeyboardOpen: boolean;
} => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  function onKeyboardDidShow(e: KeyboardEvent): void {
    setKeyboardHeight(e.endCoordinates.height);
    setIsKeyboardOpen(true);
  }

  function onKeyboardDidHide(): void {
    setKeyboardHeight(0);
    setIsKeyboardOpen(false);
  }

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", onKeyboardDidShow);
    Keyboard.addListener("keyboardDidHide", onKeyboardDidHide);
    return (): void => {
      Keyboard.removeListener("keyboardDidShow", onKeyboardDidShow);
      Keyboard.removeListener("keyboardDidHide", onKeyboardDidHide);
    };
  }, []);

  return {
    keyboardHeight,
    isKeyboardOpen,
  };
};
