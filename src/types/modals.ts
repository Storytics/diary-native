import React from "react";

export interface ModalsState {
  isCreateDiaryOpen: boolean;
  isEditDiary?: boolean;
  isMenuModalOpen: boolean;
  isDiaryActionsModalOpen: boolean;
  diary: {
    bookId: number;
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
    bookId: number;
    bookTitle: string;
    bookColor: string;
  };
}

export type ModalsActions =
  | CreateDiaryModalPayload
  | MenuModalPayload
  | DiaryModalPayload;

export interface Context {
  state: ModalsState;
  dispatch: React.Dispatch<ModalsActions>;
}
