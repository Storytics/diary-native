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
          `select * from page where bookId = ?`,
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
