import React, { useCallback } from "react";
// Hooks
import useModals from "hooks/useModals";
// Components
import Modal from "components/Modal";
import i18n from "locales/index";

const DiaryActionsModal: React.FC = () => {
  const {
    dispatch,
    state: { isDiaryActionsModalOpen },
  } = useModals();

  const onClose = useCallback(() => {
    dispatch({
      type: "DIARY_ACTIONS_MODAL",
      payload: { isOpen: false },
    });
  }, [dispatch]);

  if (!isDiaryActionsModalOpen) {
    return null;
  }

  return (
    <Modal
      title="Story's"
      isOpen={isDiaryActionsModalOpen}
      onClose={onClose}
      primaryButtonText={i18n.t("modal.diaryActions.buttons.primary")}
      holdButtonText={i18n.t("modal.diaryActions.buttons.hold.text")}
      holdButtonTextFeedback={i18n.t(
        "modal.diaryActions.buttons.hold.feedbackText"
      )}
      onPressPrimary={() => console.log("Save")}
      onLongPress={() => console.log("Cancel")}
      hasHoldButton
      hasSecondaryButton={false}
      hasContent={false}
    />
  );
};

export default DiaryActionsModal;
