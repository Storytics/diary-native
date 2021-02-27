import React, { createContext, useReducer } from "react";
// Types
import { ModalsState, ModalsActions, Context } from "types/modals";

const initialState = {
  isCreateDiaryOpen: false,
  isEditDiary: false,
  isMenuModalOpen: false,
  isDiaryActionsModalOpen: false,
  diary: {
    bookId: 0,
    bookTitle: "",
    bookColor: "",
  },
};

export const ModalsContext = createContext<Context>({
  state: initialState,
  dispatch: () => null,
});

export const Reducer = (
  state: ModalsState,
  action: ModalsActions
): ModalsState => {
  switch (action.type) {
    case "CREATE_DIARY_MODAL":
      return {
        ...state,
        isCreateDiaryOpen: action.payload.isOpen,
        isEditDiary: action.payload.isEditDiary,
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
        diary: {
          bookId: action.payload.bookId,
          bookTitle: action.payload.bookTitle,
          bookColor: action.payload.bookColor,
        },
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
