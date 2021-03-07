import React from "react";

export interface ModalsState {
  isCreateDiaryOpen: boolean;
  isEditDiary?: boolean;
  isMenuModalOpen: boolean;
  isDiaryActionsModalOpen: boolean;
  diary: {
    bookId: string;
    bookTitle: string;
    bookColor: string;
  };
}

export interface CreateDiaryModalPayload {
  type: "CREATE_DIARY_MODAL";
  payload: {
    isOpen: boolean;
    isEditDiary?: boolean;
  };
}

export interface MenuModalPayload {
  type: "MENU_MODAL";
  payload: {
    isOpen: boolean;
  };
}

export interface DiaryModalPayload {
  type: "DIARY_ACTIONS_MODAL";
  payload: {
    isOpen: boolean;
    bookId: string;
    bookTitle: string;
    bookColor: string;
  };
}

export interface CloseAllModalsPayload {
  type: "CLOSE_ALL_MODALS";
}

export type ModalsActions =
  | CreateDiaryModalPayload
  | MenuModalPayload
  | DiaryModalPayload
  | CloseAllModalsPayload;

export interface Context {
  state: ModalsState;
  dispatch: React.Dispatch<ModalsActions>;
}
