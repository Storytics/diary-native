import React from "react";
import { BookProps } from "types/book";
import { ActivityProps } from "types/activity";

export enum NetworkStatus {
  loading = "loading",
  online = "online",
  offline = "offline",
  authenticated = "authenticated",
  lock = "lock",
  sync = "sync",
}

export enum SubscriptionStatus {
  loading = "loading",
  active = "active",
  inactive = "inactive",
}

export interface User {
  aud: string;
  confirmed_at: string;
  created_at: string;
  email: string;
  id: string;
  last_sign_in_at: string;
  role: string;
  updated_at: string;
  user_metadata: unknown;
  app_metadata: {
    provider: string;
  };
}

export interface StoreState {
  books: Array<BookProps>;
  activity: Array<ActivityProps>;
  networkStatus: NetworkStatus;
  user: User | null;
  subscriptionStatus: SubscriptionStatus;
  isDarkTheme: boolean;
  isHomeScreenLoading: boolean;
  hasPasswordPin: boolean;
  passwordPin: string | null;
  isLocalAuthentication: boolean;
}

export interface AddBookPayload {
  type: "ADD_BOOK";
  payload: {
    book: BookProps;
  };
}

export interface LoadBooksPayload {
  type: "LOAD_BOOKS";
  payload: {
    books: Array<BookProps>;
  };
}

export interface LoadActivityPayload {
  type: "LOAD_ACTIVITY";
  payload: {
    activity: Array<ActivityProps>;
  };
}

export interface SetNetworkStatusPayload {
  type: "SET_NETWORK_STATUS";
  payload: {
    status: NetworkStatus;
  };
}

export interface SetAuthenticationStatusPayload {
  type: "SET_AUTHENTICATION_STATUS";
  payload: {
    user: User | null;
    subscriptionStatus: SubscriptionStatus;
  };
}

export interface SetDarkThemePayload {
  type: "SET_DARK_THEME";
  payload: {
    isDarkTheme: boolean;
  };
}

export interface SetIsHomeScreenLoadingPayload {
  type: "SET_IS_HOME_SCREEN_LOADING";
  payload: {
    isHomeScreenLoading: boolean;
  };
}

export interface SetPasswordPinPayload {
  type: "SET_PASSWORD_PIN";
  payload: {
    hasPasswordPin: boolean;
    passwordPin: string | null;
  };
}

export interface SetLocalAuthPayload {
  type: "SET_LOCAL_AUTH";
  payload: {
    isLocalAuthentication: boolean;
  };
}

export type StoreActions =
  | AddBookPayload
  | LoadBooksPayload
  | LoadActivityPayload
  | SetNetworkStatusPayload
  | SetAuthenticationStatusPayload
  | SetDarkThemePayload
  | SetIsHomeScreenLoadingPayload
  | SetPasswordPinPayload
  | SetLocalAuthPayload;

export interface Context {
  state: StoreState;
  dispatch: React.Dispatch<StoreActions>;
}
