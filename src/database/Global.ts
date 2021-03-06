// Types
import { BookProps } from "types/book";
import { PageProps } from "types/page";
// Database
import { getAllBooks, createBook } from "./Book";
import { getAllPagesByBookId, createPage } from "./Page";

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

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const importDataToDatabase = async (data: Array<Data>) => {
  try {
    data.map(async (book) => {
      await createBook(book.title, book.color);

      book.pages.map(async (page: PageProps) => {
        console.log("page = ", page);
        const go = await createPage(page.content, page.bookId, page.createdAt);

        console.log("goo = ", go);
      });
    });
  } catch (e) {
    console.log("Error importing data =  ", e);
  }
};
