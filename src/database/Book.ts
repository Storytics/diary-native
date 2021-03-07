import * as SQLite from "expo-sqlite";
// Types
import { BookProps } from "types/book";
import { ActivityProps } from "types/activity";
// DB Connection
import Connection from "./DatabaseConnection";

export const getAllBooks = async (): Promise<BookProps[]> =>
  new Promise((resolve, reject) => {
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

export const getAllActivity = async (): Promise<ActivityProps[]> =>
  new Promise((resolve, reject) => {
    Connection.transaction(
      (tx: SQLite.SQLTransaction) => {
        tx.executeSql(
          "SELECT book.title, page.createdAt, page.content, page.bookId, page.id FROM book INNER JOIN page ON page.bookId = book.id ORDER BY page.createdAt DESC LIMIT 25;",
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

export const getBookById = async (id: string): Promise<BookProps[]> =>
  new Promise((resolve, reject) => {
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

export const createBook = async (
  id: string,
  title: string,
  color: string
): Promise<string> =>
  new Promise((resolve, reject) => {
    Connection.transaction(
      (tx: SQLite.SQLTransaction) => {
        tx.executeSql("INSERT INTO book (id, title, color) VALUES (?, ?, ?);", [
          id,
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

export const updateBookById = async (
  id: string,
  title: string,
  color: string
): Promise<string> =>
  new Promise((resolve, reject) => {
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

export const deleteBookById = async (id: string): Promise<string> =>
  new Promise((resolve, reject) => {
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
