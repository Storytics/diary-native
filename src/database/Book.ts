import * as SQLite from "expo-sqlite";
import Connection from "./DatabaseConnection";

export interface BookProps {
  id: number;
  title: string;
  color: string;
}

export const getAllBooks = async (): Promise<BookProps[]> => {
  return new Promise((resolve, reject) => {
    Connection.transaction(
      (tx: SQLite.SQLTransaction) => {
        // @ts-ignore
        tx.executeSql("SELECT * FROM book;", [], (_, { rows: { _array } }) => {
          resolve(_array);
        });
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
