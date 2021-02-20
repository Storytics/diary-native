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

export type StoreActions =
  | AddBookPayload
  | LoadBooksPayload
  | LoadActivityPayload
  | SetNetworkStatusPayload
  | SetAuthenticationStatusPayload;

export interface Context {
  state: StoreState;
  dispatch: React.Dispatch<StoreActions>;
}
