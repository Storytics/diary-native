import * as SQLite from "expo-sqlite";
import { SQLiteDatabaseName } from "utils/constants";

const Connection = SQLite.openDatabase(SQLiteDatabaseName, "1.0");

export const DatabaseInit = async (): Promise<unknown> =>
  new Promise((resolve, reject) => {
    const SQLQueries = [
      `DROP TABLE IF EXISTS page`,
      `DROP TABLE IF EXISTS book`,
      `CREATE TABLE IF NOT EXISTS book (id INTEGER PRIMARY KEY  AUTOINCREMENT, title TEXT NOT NULL, color TEXT, createdAt TEXT DEFAULT CURRENT_TIMESTAMP);`,
      `CREATE TABLE IF NOT EXISTS page (id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT NOT NULL, createdAt TEXT DEFAULT CURRENT_TIMESTAMP, bookId INT, FOREIGN KEY (bookId) REFERENCES book (id) ON DELETE CASCADE);`,
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
