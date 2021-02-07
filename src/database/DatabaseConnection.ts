import * as SQLite from "expo-sqlite";
import { SQLiteDatabaseName } from "utils/constants";

const Connection = SQLite.openDatabase(SQLiteDatabaseName, "1.0");

/*  `create table if not exists gato (
        id integer primary key autoincrement,
        nome text,
        animal_id int,
        foreign key (animal_id) references animal (id)
        );`, */

export const DatabaseInit = async (): Promise<unknown> => {
  return new Promise((resolve, reject) => {
    const SQLQueries = [
      `DROP TABLE IF EXISTS book;`,
      `create table if not exists book (id integer primary key autoincrement, title text, color text);`,
      `insert into book(title, color) values('nice book', 'red');`,
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
