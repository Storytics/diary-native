import React, { useCallback } from "react";
// Hooks
import useModals from "hooks/useModals";
import useStore from "hooks/useStore";
import useNotification from "hooks/useNotification";
// Components
import Modal from "components/Modal";
// Database
import { deleteBookById, getAllBooks } from "database/Book";
// Locales
import i18n from "locales/index";
// Types
import { NotificationType } from "types/notifications";

const DiaryActionsModal: React.FC = () => {
  const {
    dispatch,
    state: { isDiaryActionsModalOpen, diary },
  } = useModals();
  const store = useStore();
  const notification = useNotification();

  const onClose = useCallback(() => {
    dispatch({
      type: "DIARY_ACTIONS_MODAL",
      payload: { isOpen: false, bookId: 0, bookTitle: "", bookColor: "" },
    });
  }, [dispatch]);

  const onDelete = async () => {
    try {
      const result = await deleteBookById(diary.bookId);
      const books = await getAllBooks();

      if (result === "success") {
        store.dispatch({
          type: "LOAD_BOOKS",
          payload: { books },
        });
        onClose();
        notification.dispatch({
          type: "CREATE_NOTIFICATION",
          payload: {
            isOpen: true,
            message: i18n.t("notifications.deleteDiary.success"),
            type: NotificationType.success,
          },
        });
      }
    } catch (e) {
      notification.dispatch({
        type: "CREATE_NOTIFICATION",
        payload: {
          isOpen: true,
          message: i18n.t("notifications.deleteDiary.error"),
          type: NotificationType.danger,
        },
      });
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
      primaryButtonText={i18n.t("modal.diaryActions.buttons.primary")}
      holdButtonText={i18n.t("modal.diaryActions.buttons.hold.text")}
      holdButtonTextFeedback={i18n.t(
        "modal.diaryActions.buttons.hold.feedbackText"
      )}
      onPressPrimary={onEdit}
      onLongPress={onDelete}
      hasHoldButton
      hasSecondaryButton={false}
      hasContent={false}
    />
  );
};

export default DiaryActionsModal;
