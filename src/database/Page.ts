import * as SQLite from "expo-sqlite";
// Types
import { PageProps } from "types/page";
// DB Connection
import Connection from "./DatabaseConnection";

export const getAllPagesByBookId = async (
  bookId: number
): Promise<PageProps[]> =>
  new Promise((resolve, reject) => {
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

export const createPage = async (
  content: string,
  bookId: number
): Promise<string> =>
  new Promise((resolve, reject) => {
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

export const updatePageById = async (
  id: number,
  content: string
): Promise<string> =>
  new Promise((resolve, reject) => {
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

export const deletePageById = async (id: number): Promise<string> =>
  new Promise((resolve, reject) => {
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
