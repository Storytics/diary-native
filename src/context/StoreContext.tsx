import React, { createContext, useReducer, useEffect } from "react";
import { getAllBooks, getAllActivity } from "database/Book";

interface Book {
  color: string;
  createdAt: string;
  id: number;
  title: string;
}

interface Activity {
  title: string;
  id: number;
  createdAt: string;
  bookId: number;
}

export interface State {
  books: Array<Book>;
  activity: Array<Activity>;
}

const initialState = {
  books: [],
  activity: [],
};

export interface AddBookPayload {
  type: "ADD_BOOK";
  payload: {
    book: Book;
  };
}

export interface LoadBooksPayload {
  type: "LOAD_BOOKS";
  payload: {
    books: Array<Book>;
  };
}

export interface LoadActivityPayload {
  type: "LOAD_ACTIVITY";
  payload: {
    activity: Array<Activity>;
  };
}

export type Actions = AddBookPayload | LoadBooksPayload | LoadActivityPayload;

export interface Context {
  state: State;
  dispatch: React.Dispatch<any>;
}

export const StoreContext = createContext<Context>({
  state: initialState,
  dispatch: () => null,
});

export const Reducer = (state: State, action: Actions) => {
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

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};
