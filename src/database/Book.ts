import * as SQLite from "expo-sqlite";
import Connection from "./DatabaseConnection";

export interface BookProps {
  color: string;
  createdAt: string;
  id: number;
  title: string;
}

interface ActivityProps {
  title: string;
  id: number;
  createdAt: string;
  bookId: number;
}

export const getAllBooks = async (): Promise<BookProps[]> => {
  return new Promise((resolve, reject) => {
    Connection.transaction(
      (tx: SQLite.SQLTransaction) => {
        tx.executeSql(
          "SELECT * FROM book ORDER BY createdAt DESC;",
          [],
          // @ts-ignore
          (_, { rows: { _array } }) => {
            resolve(_array);
          }
        );
      },
      (error: SQLite.SQLError) => {
        reject(error);
      }
    );
  });
};

export const getAllActivity = async (): Promise<ActivityProps[]> => {
  return new Promise((resolve, reject) => {
    Connection.transaction(
      (tx: SQLite.SQLTransaction) => {
        tx.executeSql(
          "SELECT book.title, page.createdAt, page.bookId, page.id FROM book INNER JOIN page ON page.bookId = book.id ORDER BY page.createdAt DESC;",
          [],
          // @ts-ignore
          (_, { rows: { _array } }) => {
            resolve(_array);
          }
        );
      },
      (error: SQLite.SQLError) => {
        reject(error);
      }
    );
  });
};

export const getBookById = async (id: number): Promise<BookProps[]> => {
  return new Promise((resolve, reject) => {
    Connection.transaction(
      (tx: SQLite.SQLTransaction) => {
        tx.executeSql(
          `SELECT * FROM book WHERE id = ?;`,
          [id],
          // @ts-ignore
          (_, { rows: { _array } }) => {
            resolve(_array);
          }
        );
      },
      (error: SQLite.SQLError) => {
        reject(error);
      }
    );
  });
};

export const createBook = async (
  title: string,
  color: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    Connection.transaction(
      (tx: SQLite.SQLTransaction) => {
        tx.executeSql("INSERT INTO book (title, color) VALUES (?, ?);", [
          title,
          color,
        ]);
      },
      (error: SQLite.SQLError) => {
        reject(error);
      },
      () => {
        resolve("success");
      }
    );
  });
};

export const updateBookById = async (
  id: number,
  title: string,
  color: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    Connection.transaction(
      (tx: SQLite.SQLTransaction) => {
        tx.executeSql(`UPDATE book SET title = ?, color = ? WHERE id = ?;`, [
          title,
          color,
          id,
        ]);
      },
      (error: SQLite.SQLError) => {
        reject(error);
      },
      () => {
        resolve("success");
      }
    );
  });
};

export const deleteBookById = async (id: number): Promise<string> => {
  return new Promise((resolve, reject) => {
    Connection.transaction(
      (tx: SQLite.SQLTransaction) => {
        tx.executeSql(`DELETE FROM book WHERE id = ?;`, [id]);
      },
      (error: SQLite.SQLError) => {
        reject(error);
      },
      () => {
        resolve("success");
      }
    );
  });
};
