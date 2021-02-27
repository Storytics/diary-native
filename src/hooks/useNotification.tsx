import { useContext } from "react";
import { NotificationsContext } from "context/NotificationContext";
import { Context } from "types/notifications";

const useNotification = (): Context => {
  const context = useContext(NotificationsContext);
  if (context === undefined) {
    throw new Error(
      `useNotification must be used within a NotificationContextProvider.`
    );
  }
  return context;
};

export default useNotification;
