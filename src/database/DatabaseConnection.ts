import * as SQLite from "expo-sqlite";
import { SQLiteDatabaseName } from "utils/constants";

const Connection = SQLite.openDatabase(SQLiteDatabaseName, "1.0");

// `DROP TABLE IF EXISTS book;`

export const DatabaseInit = async (): Promise<unknown> => {
  return new Promise((resolve, reject) => {
    const SQLQueries = [
      `DROP TABLE IF EXISTS book;`,
      `DROP TABLE IF EXISTS page;`,
      `create table if not exists book (id integer primary key autoincrement, title text not null, color text);`,
      `create table if not exists page (id integer primary key autoincrement, content text not null, createdAt text default current_timestamp, bookId int, foreign key (bookId) references book (id));`,
      `insert into book(title, color) values('nice book', 'red');`,
      `insert into page(content, bookId) values('bela page', 1);`,
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
