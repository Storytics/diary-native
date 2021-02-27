import React, { createContext, useReducer } from "react";
// Types
import {
  NotificationsState,
  NotificationsActions,
  Context,
  NotificationType,
} from "types/notifications";

const initialState = {
  isOpen: false,
  type: NotificationType.success,
  message: "",
};

export const NotificationsContext = createContext<Context>({
  state: initialState,
  dispatch: () => null,
});

export const Reducer = (
  state: NotificationsState,
  action: NotificationsActions
): NotificationsState => {
  switch (action.type) {
    case "CREATE_NOTIFICATION":
      return {
        ...state,
        isOpen: action.payload.isOpen,
        type: action.payload.type,
        message: action.payload.message,
      };
    case "CLOSE_NOTIFICATION":
      return {
        ...state,
        isOpen: action.payload.isOpen,
      };
    default:
      return state;
  }
};

export const NotificationsContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  return (
    <NotificationsContext.Provider value={{ state, dispatch }}>
      {children}
    </NotificationsContext.Provider>
  );
};
