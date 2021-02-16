import React, { createContext, useReducer } from "react";

export interface State {
  isCreateDiaryOpen: boolean;
  isMenuModalOpen: boolean;
  isDiaryActionsModalOpen: boolean;
}

const initialState = {
  isCreateDiaryOpen: false,
  isMenuModalOpen: false,
  isDiaryActionsModalOpen: false,
};

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

export interface DiaryActionsModalPayload {
  type: "DIARY_ACTIONS_MODAL";
  payload: {
    isOpen: boolean;
  };
}

export type Actions =
  | CreateDiaryModalPayload
  | MenuModalPayload
  | DiaryActionsModalPayload;

export interface Context {
  state: State;
  dispatch: React.Dispatch<any>;
}

export const ModalsContext = createContext<Context>({
  state: initialState,
  dispatch: () => null,
});

export const Reducer = (state: State, action: Actions) => {
  switch (action.type) {
    case "CREATE_DIARY_MODAL":
      return {
        ...state,
        isCreateDiaryOpen: action.payload.isOpen,
      };
    case "MENU_MODAL":
      return {
        ...state,
        isMenuModalOpen: action.payload.isOpen,
      };
    case "DIARY_ACTIONS_MODAL":
      return {
        ...state,
        isDiaryActionsModalOpen: action.payload.isOpen,
      };
    default:
      return state;
  }
};

export const ModalsContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  return (
    <ModalsContext.Provider value={{ state, dispatch }}>
      {children}
    </ModalsContext.Provider>
  );
};
