import React from "react";

export interface ModalsState {
  isCreateDiaryOpen: boolean;
  isMenuModalOpen: boolean;
}

export interface CreateDiaryModalPayload {
  type: "CREATE_DIARY_MODAL";
  payload: {
    isOpen: boolean;
  };
}

export interface MenuModalPayload {
  type: "MENU_MODAL";
  payload: {
    isOpen: boolean;
  };
}

export type ModalsActions = CreateDiaryModalPayload | MenuModalPayload;

export interface Context {
  state: ModalsState;
  dispatch: React.Dispatch<ModalsActions>;
}
