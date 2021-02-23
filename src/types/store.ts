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

export interface StoreState {
  books: Array<BookProps>;
  activity: Array<ActivityProps>;
  networkStatus: NetworkStatus;
  isDarkTheme: boolean;
  isHomeScreenLoading: boolean;
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

export type StoreActions =
  | AddBookPayload
  | LoadBooksPayload
  | LoadActivityPayload
  | SetNetworkStatusPayload
  | SetDarkThemePayload
  | SetIsHomeScreenLoadingPayload;

export interface Context {
  state: StoreState;
  dispatch: React.Dispatch<StoreActions>;
}
