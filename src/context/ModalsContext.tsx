import React, { createContext, useReducer, useMemo } from "react";
// Types
import { ModalsState, ModalsActions, Context } from "types/modals";

const initialState = {
  isCreateDiaryOpen: false,
  isEditDiary: false,
  isMenuModalOpen: false,
  isDiaryActionsModalOpen: false,
  diary: {
    bookId: "",
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
    case "CLOSE_ALL_MODALS":
      return {
        ...state,
        isCreateDiaryOpen: false,
        isEditDiary: false,
        isMenuModalOpen: false,
        isDiaryActionsModalOpen: false,
      };
    default:
      return state;
  }
};

export const ModalsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  const values = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <ModalsContext.Provider value={values}>{children}</ModalsContext.Provider>
  );
};
