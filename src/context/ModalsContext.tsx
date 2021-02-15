import React, { createContext, useReducer } from "react";
// Types
import { ModalsState, ModalsActions, Context } from "types/modals";

const initialState = {
  isCreateDiaryOpen: false,
  isMenuModalOpen: false,
};

export const ModalsContext = createContext<Context>({
  state: initialState,
  dispatch: () => null,
});

export const Reducer = (state: ModalsState, action: ModalsActions) => {
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
