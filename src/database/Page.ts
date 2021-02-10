import * as SQLite from "expo-sqlite";
import Connection from "./DatabaseConnection";

export interface PageProps {
  id: number;
  content: string;
  createdAt: string;
  bookId: number;
}

export const getAllPagesByBookId = async (
  bookId: number
): Promise<PageProps[]> => {
  return new Promise((resolve, reject) => {
    Connection.transaction(
      (tx: SQLite.SQLTransaction) => {
        tx.executeSql(
          `SELECT * FROM page WHERE bookId = ?;`,
          [bookId],
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

export const createPage = async (
  content: string,
  bookId: number
): Promise<string> => {
  return new Promise((resolve, reject) => {
    Connection.transaction(
      (tx: SQLite.SQLTransaction) => {
        tx.executeSql("INSERT INTO page (content, bookId) VALUES (?, ?);", [
          content,
          bookId,
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

export const updatePageById = async (
  id: number,
  content: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    Connection.transaction(
      (tx: SQLite.SQLTransaction) => {
        tx.executeSql(`UPDATE page SET content = ? WHERE id = ?;`, [
          content,
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

export const deletePageById = async (id: number): Promise<string> => {
  return new Promise((resolve, reject) => {
    Connection.transaction(
      (tx: SQLite.SQLTransaction) => {
        tx.executeSql(`DELETE FROM page WHERE id = ?;`, [id]);
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
