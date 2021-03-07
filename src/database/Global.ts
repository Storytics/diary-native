// Types
import { BookProps } from "types/book";
import { PageProps } from "types/page";
// Database
import { getAllBooks, createBook, updateBookById } from "./Book";
import { getAllPagesByBookId, createPage, updatePageById } from "./Page";

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
    const currentData = await exportAllData();

    data.map(async (book) => {
      const hasBook = currentData.filter(
        (currentBook) => currentBook.id === book.id
      );

      if (hasBook && hasBook.length > 0) {
        await updateBookById(book.id, book.title, book.color);
        book.pages.map(async (page: PageProps) => {
          const hasPage = hasBook[0].pages.filter(
            (currentPage) => currentPage.id === page.id
          );
          if (hasPage && hasPage.length > 0) {
            await updatePageById(page.id, page.content);
          }
        });
      } else {
        await createBook(book.id, book.title, book.color);
        book.pages.map(async (page: PageProps) => {
          await createPage(page.id, page.content, page.bookId, page.createdAt);
        });
      }
    });
  } catch (e) {
    console.log("Error importing data =  ", e);
  }
};
