import * as SQLite from "expo-sqlite";
import Connection from "./DatabaseConnection";
import { BookProps } from "./Book";
import { PageProps } from "./Page";

export interface AllDataProps {
  book: {
    id: number;
    title: string;
    color: string;
    pages: Array<PageProps>;
  };
}

export const exportAllData = async (): Promise<Array<AllDataProps>> => {
  return new Promise((resolve, reject) => {
    Connection.transaction(
      (tx: SQLite.SQLTransaction) => {
        tx.executeSql(
          "SELECT json_object('id', book.id, 'title', book.title, 'color', book.color, 'pages', json_group_array(json_object('id', page.id, 'content', page.content, 'createdAt', page.createdAt, 'bookId', page.bookId))) book FROM book INNER JOIN page ON page.bookId = book.id GROUP BY book.id",
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
};
