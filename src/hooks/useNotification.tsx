import { useContext } from "react";
import { NotificationsContext } from "context/NotificationContext";
import { Context, NotificationType } from "types/notifications";

interface ReturnType {
  notification: (message: string, type: NotificationType) => void;
  context: Context;
}

const useNotification = (): ReturnType => {
  const context = useContext(NotificationsContext);
  if (context === undefined) {
    throw new Error(
      `useNotification must be used within a NotificationContextProvider.`
    );
  }

  const setNotification = (message: string, type: NotificationType) => {
    context.dispatch({
      type: "CREATE_NOTIFICATION",
      payload: {
        isOpen: true,
        message,
        type,
      },
    });
  };

  return {
    context,
    notification: setNotification,
  } as const;
};

export default useNotification;
