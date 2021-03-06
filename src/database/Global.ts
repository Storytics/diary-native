// Types
import { BookProps } from "types/book";
import { PageProps } from "types/page";
// DB Connection
import { getAllBooks } from "./Book";
import { getAllPagesByBookId } from "./Page";

interface Data extends BookProps {
  pages: PageProps[];
}

export const exportAllData = async (): Promise<Array<Data>> => {
  const books = await getAllBooks();
  const data: Array<Data> = [];

  // eslint-disable-next-line no-restricted-syntax
  for await (const book of books) {
    const pages = await getAllPagesByBookId(book.id);
    data.push({
      ...book,
      pages,
    });
  }

  return data;
};
