import React, { createContext, useEffect, useReducer } from "react";
import { getAllActivity, getAllBooks } from "database/Book";
// Utils
import { getNetworkStateAsync } from "expo-network";
import AsyncStorage from "@react-native-async-storage/async-storage";
import dayjs from "dayjs";
import {
  userAuthenticatedItem,
  userCloudLastSyncItem,
  userThemeItem,
} from "utils/constants";
// Types
import { Context, NetworkStatus, StoreActions, StoreState } from "types/store";

const initialState = {
  books: [],
  activity: [],
  networkStatus: NetworkStatus.loading,
  isDarkTheme: false,
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
    case "SET_DARK_THEME":
      return {
        ...state,
        isDarkTheme: action.payload.isDarkTheme,
      };
    default:
      return state;
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
        dispatch({
          type: "LOAD_ACTIVITY",
          payload: { activity },
        });
      } catch (e) {
        console.log("Error loading all activity = ", e);
      }
    };

    loadBooks();
    loadActivity();
  }, []);

  useEffect(() => {
    const getNetworkStatus = async () => {
      try {
        const { isConnected } = await getNetworkStateAsync();
        const isAuthenticated = await AsyncStorage.getItem(
          userAuthenticatedItem
        );
        const lastCloudSync = await AsyncStorage.getItem(userCloudLastSyncItem);

        const isSync =
          lastCloudSync && dayjs(lastCloudSync).isAfter(dayjs(new Date()));

        let status = NetworkStatus.loading;

        if (isConnected && isAuthenticated) {
          status = NetworkStatus.authenticated;
        } else if (isConnected && !isAuthenticated) {
          status = NetworkStatus.online;
        } else if (isConnected && isAuthenticated && isSync) {
          status = NetworkStatus.sync;
        }

        dispatch({
          type: "SET_NETWORK_STATUS",
          payload: {
            status: isConnected ? status : NetworkStatus.offline,
          },
        });
      } catch (e) {
        console.log("Error loading network status = ", e);
      }
    };
    getNetworkStatus();
  }, []);

  useEffect(() => {
    const loadThemeSetting = async () => {
      try {
        const userTheme = await AsyncStorage.getItem(userThemeItem);
        const isDarkTheme = userTheme ? Boolean(userTheme) : false;
        console.log("isdark = ", isDarkTheme);

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
