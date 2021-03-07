import React, { createContext, useEffect, useReducer } from "react";
// Database
import { getAllActivity, getAllBooks } from "database/Book";
// Utils
import { getNetworkStateAsync } from "expo-network";
import AsyncStorage from "@react-native-async-storage/async-storage";
import dayjs from "dayjs";
import {
  userCloudLastSyncItem,
  userThemeItem,
  userPasswordPinItem,
} from "utils/constants";
// Types
import {
  Context,
  NetworkStatus,
  StoreActions,
  StoreState,
  SubscriptionStatus,
  User,
} from "types/store";
// API
import supabase from "libs/supabase";
/** URL polyfill. Required for Supabase queries to work in React Native. */
import "react-native-url-polyfill/auto";

const initialState = {
  books: [],
  activity: [],
  networkStatus: NetworkStatus.offline,
  user: null,
  subscriptionStatus: SubscriptionStatus.loading,
  isDarkTheme: false,
  isHomeScreenLoading: true,
  hasPasswordPin: false,
  passwordPin: null,
  isLocalAuthentication: false,
};

export const StoreContext = createContext<Context>({
  state: initialState,
  dispatch: () => null,
});

export const Reducer = (state: StoreState, action: StoreActions) => {
  switch (action.type) {
    case "ADD_BOOK":
      return {
        ...state,
        books: [...state.books, action.payload.book],
      };
    case "LOAD_BOOKS":
      return {
        ...state,
        books: action.payload.books,
      };
    case "LOAD_ACTIVITY":
      return {
        ...state,
        activity: action.payload.activity,
      };
    case "SET_NETWORK_STATUS":
      return {
        ...state,
        networkStatus: action.payload.status,
      };
    case "SET_AUTHENTICATION_STATUS":
      return {
        ...state,
        user: action.payload.user,
        subscriptionStatus: action.payload.subscriptionStatus,
      };
    case "SET_DARK_THEME":
      return {
        ...state,
        isDarkTheme: action.payload.isDarkTheme,
      };
    case "SET_PASSWORD_PIN":
      return {
        ...state,
        hasPasswordPin: action.payload.hasPasswordPin,
        passwordPin: action.payload.passwordPin,
      };
    case "SET_IS_HOME_SCREEN_LOADING":
      return {
        ...state,
        isHomeScreenLoading: action.payload.isHomeScreenLoading,
      };
    case "SET_LOCAL_AUTH":
      return {
        ...state,
        isLocalAuthentication: action.payload.isLocalAuthentication,
      };
    default:
      return state;
  }
};

export const dispatchAuthenticationStatus = async (
  user: User,
  dispatch: React.Dispatch<StoreActions>
): Promise<unknown> => {
  try {
    const { data: profile } = await supabase
      .from("profile")
      .select("*")
      .eq("user_id", user.id);

    if (profile && profile.length > 0) {
      const hasSubscription = profile[0].active_subscription || false;
      dispatch({
        type: "SET_AUTHENTICATION_STATUS",
        payload: {
          user,
          subscriptionStatus: hasSubscription
            ? SubscriptionStatus.active
            : SubscriptionStatus.inactive,
        },
      });

      return hasSubscription;
    }
    return false;
  } catch {
    return false;
  }
};

export const StoreContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const books = await getAllBooks();
        dispatch({
          type: "LOAD_BOOKS",
          payload: { books },
        });
      } catch (e) {
        console.log("Error loading all books = ", e);
      }
    };

    const loadActivity = async () => {
      try {
        const activity = await getAllActivity();
        console.log("activity = ", activity);
        dispatch({
          type: "LOAD_ACTIVITY",
          payload: { activity },
        });
      } catch (e) {
        console.log("Error loading all activity = ", e);
      }
    };

    const loadContent = async () => {
      try {
        await loadBooks();
        await loadActivity();
        const userPasswordPin = await AsyncStorage.getItem(userPasswordPinItem);

        dispatch({
          type: "SET_PASSWORD_PIN",
          payload: {
            hasPasswordPin: !!userPasswordPin,
            passwordPin: userPasswordPin,
          },
        });

        dispatch({
          type: "SET_IS_HOME_SCREEN_LOADING",
          payload: { isHomeScreenLoading: false },
        });
      } catch (e) {
        console.log("error loading content = ", e);
      }
    };

    loadContent();
  }, []);

  useEffect(() => {
    const getNetworkStatus = async () => {
      try {
        const { isInternetReachable } = await getNetworkStateAsync();
        const user = supabase.auth.user();
        const lastCloudSync = await AsyncStorage.getItem(userCloudLastSyncItem);

        const isSync =
          lastCloudSync && dayjs(lastCloudSync).isAfter(dayjs(new Date()));

        let status = NetworkStatus.loading;

        if (isInternetReachable && user) {
          status = NetworkStatus.authenticated;
        } else if (isInternetReachable && !user) {
          status = NetworkStatus.online;
        } else if (isInternetReachable && user && isSync) {
          status = NetworkStatus.sync;
        }

        dispatch({
          type: "SET_NETWORK_STATUS",
          payload: {
            status: isInternetReachable ? status : NetworkStatus.offline,
          },
        });
      } catch (e) {
        console.log("Error loading network status = ", e);
      }
    };

    const getAuthStatus = async () => {
      try {
        const { isConnected } = await getNetworkStateAsync();
        const user = supabase.auth.user();
        if (isConnected && user) {
          await dispatchAuthenticationStatus(user as User, dispatch);
        } else {
          dispatch({
            type: "SET_AUTHENTICATION_STATUS",
            payload: {
              user: null,
              subscriptionStatus: SubscriptionStatus.inactive,
            },
          });
        }
      } catch (e) {
        console.log("error loading auth status");
      }
    };

    getNetworkStatus();
    getAuthStatus();
  }, []);

  useEffect(() => {
    const loadThemeSetting = async () => {
      try {
        const userTheme = await AsyncStorage.getItem(userThemeItem);
        const isDarkTheme = userTheme ? userTheme === "true" : false;

        dispatch({
          type: "SET_DARK_THEME",
          payload: {
            isDarkTheme,
          },
        });
      } catch (e) {
        console.log("error loading theme setting = ", e);
      }
    };
    loadThemeSetting();
  }, []);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};
