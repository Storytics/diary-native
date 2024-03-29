import * as SQLite from "expo-sqlite";
import { SQLiteDatabaseName } from "utils/constants";

const Connection = SQLite.openDatabase(SQLiteDatabaseName, "1.0");

export const DatabaseInit = async (): Promise<unknown> =>
  new Promise((resolve, reject) => {
    const SQLQueries = [
      `CREATE TABLE IF NOT EXISTS book (id TEXT NOT NULL PRIMARY KEY, title TEXT NOT NULL, color TEXT, createdAt TEXT DEFAULT CURRENT_TIMESTAMP);`,
      `CREATE TABLE IF NOT EXISTS page (id TEXT NOT NULL PRIMARY KEY, content TEXT NOT NULL, createdAt TEXT DEFAULT CURRENT_TIMESTAMP, bookId INT, FOREIGN KEY (bookId) REFERENCES book (id) ON DELETE CASCADE);`,
    ];
    Connection.transaction(
      (tx: SQLite.SQLTransaction) => {
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < SQLQueries.length; i++) {
          tx.executeSql(SQLQueries[i]);
        }
      },
      (error: SQLite.SQLError) => {
        reject(error);
      },
      () => {
        resolve("success");
      }
    );
  });

export default Connection;
