import React, { useCallback, useState } from "react";
import i18n from "locales/index";
// Hooks
import useModals from "hooks/useModals";
import useStore from "hooks/useStore";
import useNotification from "hooks/useNotification";
// Components
import Input from "components/Input";
import Select from "components/Select";
import Modal from "components/Modal";
// Database
import { createBook, getAllBooks } from "database/Book";
// Types
import { NotificationType } from "types/notifications";

const CreateDiaryModal: React.FC = () => {
  const [inputText, setInputText] = useState("");
  const [color, setColor] = useState("blue");
  const store = useStore();
  const notification = useNotification();

  const {
    dispatch,
    state: { isCreateDiaryOpen },
  } = useModals();

  const onClose = useCallback(() => {
    dispatch({
      type: "CREATE_DIARY_MODAL",
      payload: { isOpen: false },
    });
  }, [dispatch]);

  const onCreate = async () => {
    try {
      if (inputText) {
        const result = await createBook(inputText, color);
        const books = await getAllBooks();

        if (result === "success") {
          store.dispatch({
            type: "LOAD_BOOKS",
            payload: { books },
          });
          setInputText("");
          onClose();
          notification.dispatch({
            type: "CREATE_NOTIFICATION",
            payload: {
              isOpen: true,
              message: i18n.t("notifications.createDiary.success"),
              type: NotificationType.success,
            },
          });
        }
      }
    } catch (e) {
      notification.dispatch({
        type: "CREATE_NOTIFICATION",
        payload: {
          isOpen: true,
          message: i18n.t("notifications.createDiary.error"),
          type: NotificationType.danger,
        },
      });
    }
  };

  if (!isCreateDiaryOpen) {
    return null;
  }

  return (
    <Modal
      title={i18n.t("modal.create.title")}
      isOpen={isCreateDiaryOpen}
      onClose={onClose}
      onPressPrimary={onCreate}
      onPressSecondary={onClose}
      primaryButtonText={i18n.t("modal.create.buttons.primary")}
      secondaryButtonText={i18n.t("modal.create.buttons.secondary")}
    >
      <Input
        title="Title"
        inputText={inputText}
        onChangeText={setInputText}
        hasMarginBottom
      />
      <Select
        title="Identifier"
        onChange={(value: string) => setColor(value)}
      />
    </Modal>
  );
};

export default CreateDiaryModal;
