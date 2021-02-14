import * as SQLite from "expo-sqlite";
import { SQLiteDatabaseName } from "utils/constants";

const Connection = SQLite.openDatabase(SQLiteDatabaseName, "1.0");

// `DROP TABLE IF EXISTS book;`

export const DatabaseInit = async (): Promise<unknown> => {
  return new Promise((resolve, reject) => {
    const SQLQueries = [
      `DROP TABLE IF EXISTS book;`,
      `DROP TABLE IF EXISTS page;`,
      `CREATE TABLE IF NOT EXISTS book (id INTEGER PRIMARY KEY  AUTOINCREMENT, title TEXT NOT NULL, color TEXT);`,
      `CREATE TABLE IF NOT EXISTS page (id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT NOT NULL, createdAt TEXT DEFAULT CURRENT_TIMESTAMP, bookId INT, FOREIGN KEY (bookId) REFERENCES book (id));`,
      `INSERT INTO book (title, color) VALUES ('nice book', 'red');`,
      `INSERT INTO page (content, bookId) VALUES ('bela page', 1);`,
      `INSERT INTO page (content, bookId) VALUES ('bela page 2', 1);`,
      `INSERT INTO page (content, bookId) VALUES ('bela page 3', 1);`,
      `INSERT INTO page (content, bookId) VALUES ('bela page 4', 1);`,
      `INSERT INTO page (content, bookId) VALUES ('bela page 5', 1);`,
      `INSERT INTO page (content, bookId) VALUES ('bela page 6', 1);`,
      `INSERT INTO book (title, color) VALUES ('A pequena seria', 'blue');`,
      `INSERT INTO page (content, bookId) VALUES ('Grande livro', 2);`,
    ];

    Connection.transaction(
      (tx: SQLite.SQLTransaction) => {
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < SQLQueries.length; i++) {
          console.log("execute sql : ", SQLQueries[i]);
          tx.executeSql(SQLQueries[i]);
        }
      },
      (error: SQLite.SQLError) => {
        console.log("db error creating tables = ", error);
        reject(error);
      },
      () => {
        console.log("success");
        resolve("success");
      }
    );
  });
};

export default Connection;
