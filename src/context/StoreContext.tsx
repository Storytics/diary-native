import React, { createContext, useEffect, useReducer } from "react";
// Database
import { getAllActivity, getAllBooks } from "database/Book";
// Utils
import { getNetworkStateAsync } from "expo-network";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { userPasswordPinItem, userThemeItem } from "utils/constants";
// Types
import { Context, NetworkStatus, StoreActions, StoreState } from "types/store";

const initialState = {
  books: [],
  activity: [],
  networkStatus: NetworkStatus.offline,
  user: null,
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

export const setNetworkStatus = (
  dispatch: React.Dispatch<StoreActions>,
  status: NetworkStatus
) =>
  dispatch({
    type: "SET_NETWORK_STATUS",
    payload: {
      status,
    },
  });

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const loadBooks = async (dispatch: React.Dispatch<StoreActions>) => {
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

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const loadActivity = async (dispatch: React.Dispatch<StoreActions>) => {
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

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const loadContent = async (dispatch: React.Dispatch<StoreActions>) => {
  try {
    await loadBooks(dispatch);
    await loadActivity(dispatch);
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

export const StoreContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  useEffect(() => {
    loadContent(dispatch);
  }, []);

  useEffect(() => {
    const getNetworkStatus = async () => {
      try {
        const { isInternetReachable } = await getNetworkStateAsync();

        setNetworkStatus(
          dispatch,
          isInternetReachable ? NetworkStatus.online : NetworkStatus.offline
        );
      } catch (e) {
        setNetworkStatus(dispatch, NetworkStatus.offline);
      }
    };

    getNetworkStatus();
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
