import React from "react";

export enum NotificationType {
  success = "success",
  warning = "warning",
  danger = "danger",
  info = "info",
}

export interface NotificationsState {
  isOpen: boolean;
  type: NotificationType;
  message: string;
}

export interface CreateNotificationPayload {
  type: "CREATE_NOTIFICATION";
  payload: {
    isOpen: boolean;
    type: NotificationType;
    message: string;
  };
}

export interface CloseNotificationPayload {
  type: "CLOSE_NOTIFICATION";
  payload: {
    isOpen: boolean;
  };
}

export type NotificationsActions =
  | CreateNotificationPayload
  | CloseNotificationPayload;

export interface Context {
  state: NotificationsState;
  dispatch: React.Dispatch<NotificationsActions>;
}
