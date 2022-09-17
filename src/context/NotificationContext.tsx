import React, { createContext, useReducer, useMemo } from "react";
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

export const NotificationsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  const values = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <NotificationsContext.Provider value={values}>
      {children}
    </NotificationsContext.Provider>
  );
};
