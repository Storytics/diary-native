import React, { useCallback } from "react";
// Hooks
import useModals from "hooks/useModals";
import useStore from "hooks/useStore";
import useNotification from "hooks/useNotification";
// Components
import Modal from "components/Modal";
import DetailedButton from "components/DetailedButton";
import HoldButton from "components/HoldButton";
import { showFullscreenAd } from "components/AdBanner";
// Database
import { deleteBookById } from "database/Book";
// Context
import { loadActivity, loadBooks } from "context/StoreContext";
// Locales
import i18n from "locales/index";
// Types
import { NotificationType } from "types/notifications";
// Utils
import { isLiteVersion } from "utils/constants";
// Styles
import { Container } from "./styles";

const DiaryActionsModal: React.FC = () => {
  const {
    dispatch,
    state: { isDiaryActionsModalOpen, diary },
  } = useModals();
  const store = useStore();
  const { notification } = useNotification();

  const onClose = useCallback(() => {
    dispatch({
      type: "DIARY_ACTIONS_MODAL",
      payload: { isOpen: false, bookId: "", bookTitle: "", bookColor: "" },
    });
  }, [dispatch]);

  const onDelete = async () => {
    try {
      const result = await deleteBookById(diary.bookId);

      if (result === "success") {
        onClose();
        await loadBooks(store.dispatch);
        await loadActivity(store.dispatch);

        notification(
          i18n.t("notifications.deleteDiary.success"),
          NotificationType.success
        );

        if (isLiteVersion) {
          await showFullscreenAd();
        }
      }
    } catch (e) {
      notification(
        i18n.t("notifications.deleteDiary.error"),
        NotificationType.danger
      );
    }
  };

  const onEdit = () => {
    dispatch({
      type: "DIARY_ACTIONS_MODAL",
      payload: {
        isOpen: false,
        bookId: diary.bookId,
        bookTitle: diary.bookTitle,
        bookColor: diary.bookColor,
      },
    });
    dispatch({
      type: "CREATE_DIARY_MODAL",
      payload: { isOpen: true, isEditDiary: true },
    });
  };

  if (!isDiaryActionsModalOpen) {
    return null;
  }

  return (
    <Modal
      title={diary.bookTitle}
      isOpen={isDiaryActionsModalOpen}
      onClose={onClose}
      hasContentPaddingTop={false}
      hasContentPaddingBottom={false}
      hasContentPaddingLeft={false}
      hasContentPaddingRight={false}
      hasActionButtons={false}
    >
      <Container>
        {/*
          <DetailedButton
            title={i18n.t("modal.diaryActions.buttons.favorite.title")}
            text={i18n.t("modal.diaryActions.buttons.favorite.text")}
            onPress={() => null}
            icon="favorite"
          />
        */}
        <DetailedButton
          title={i18n.t("modal.diaryActions.buttons.edit.title")}
          text={i18n.t("modal.diaryActions.buttons.edit.text")}
          onPress={onEdit}
          icon="edit"
        />
        <HoldButton
          title={i18n.t("modal.diaryActions.buttons.hold.title")}
          initialText={i18n.t("modal.diaryActions.buttons.hold.text")}
          feedbackText={i18n.t("modal.diaryActions.buttons.hold.feedbackText")}
          onLongPress={onDelete}
        />
      </Container>
    </Modal>
  );
};

export default DiaryActionsModal;
