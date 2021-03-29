import React, { useCallback, useState, useMemo, useEffect } from "react";
// Locales
import i18n from "locales/index";
// Hooks
import useModals from "hooks/useModals";
import useStore from "hooks/useStore";
import useNotification from "hooks/useNotification";
// Styles
import { useTheme } from "styled-components/native";
// Components
import Input from "components/Input";
import Select, { buttons } from "components/Select";
import Modal from "components/Modal";
// Database
import { createBook, updateBookById } from "database/Book";
// Context
import { loadActivity, loadBooks } from "context/StoreContext";
// Types
import { NotificationType } from "types/notifications";
// Utils
import uuid from "uuid-random";

const CreateDiaryModal: React.FC = () => {
  const theme = useTheme();
  const [color, setColor] = useState(theme.colors.blue400);
  const [colorIndex, setColorIndex] = useState(0);
  const store = useStore();
  const { notification } = useNotification();
  const {
    dispatch,
    state: { isCreateDiaryOpen, isEditDiary, diary },
  } = useModals();
  const [inputText, setInputText] = useState("");

  const selectors = useMemo(() => buttons(theme), [theme]);

  const translations = useMemo(
    () =>
      isEditDiary
        ? {
            title: "modal.edit.title",
            buttons: {
              primary: "modal.edit.buttons.primary",
              secondary: "modal.edit.buttons.secondary",
            },
          }
        : {
            title: "modal.create.title",
            buttons: {
              primary: "modal.create.buttons.primary",
              secondary: "modal.create.buttons.secondary",
            },
          },
    [isEditDiary]
  );

  useEffect(() => {
    const title = isEditDiary ? diary.bookTitle : "";
    const position = selectors.findIndex(
      (item) => item.backgroundColor === diary.bookColor
    );
    const hasPosition = isEditDiary && position !== -1;

    setInputText(title);
    setColorIndex(hasPosition ? position : 0);
    setColor(hasPosition ? diary.bookColor : theme.colors.blue400);
  }, [isEditDiary, diary, selectors, theme]);

  const onClose = useCallback(() => {
    dispatch({
      type: "CREATE_DIARY_MODAL",
      payload: { isOpen: false },
    });
  }, [dispatch]);

  const onCreate = async () => {
    try {
      if (inputText) {
        const result = await createBook(uuid(), inputText, color);

        if (result === "success") {
          await loadBooks(store.dispatch);

          setInputText("");
          setColor(theme.colors.blue400);
          onClose();
          notification(
            i18n.t("notifications.createDiary.success"),
            NotificationType.success
          );
        }
      }
    } catch (e) {
      notification(
        i18n.t("notifications.createDiary.error"),
        NotificationType.danger
      );
    }
  };

  const onEdit = async () => {
    try {
      if (inputText) {
        const { bookId } = diary;
        const result = await updateBookById(bookId, inputText, color);

        if (result === "success") {
          await loadBooks(store.dispatch);
          await loadActivity(store.dispatch);
          setInputText("");
          onClose();
          notification(
            i18n.t("notifications.editDiary.success"),
            NotificationType.success
          );
        }
      }
    } catch (e) {
      notification(
        i18n.t("notifications.editDiary.error"),
        NotificationType.danger
      );
    }
  };

  if (!isCreateDiaryOpen) {
    return null;
  }

  return (
    <Modal
      title={i18n.t(translations.title)}
      isOpen={isCreateDiaryOpen}
      onClose={onClose}
      onPressPrimary={isEditDiary ? onEdit : onCreate}
      onPressSecondary={onClose}
      primaryButtonText={i18n.t(translations.buttons.primary)}
      secondaryButtonText={i18n.t(translations.buttons.secondary)}
    >
      <Input
        title={i18n.t("modal.create.inputs.title")}
        inputText={inputText}
        onChangeText={setInputText}
        hasMarginBottom
      />
      <Select
        title={i18n.t("modal.create.inputs.identifier")}
        initialIndex={colorIndex}
        onChange={(value: string) => setColor(value)}
      />
    </Modal>
  );
};

export default CreateDiaryModal;
