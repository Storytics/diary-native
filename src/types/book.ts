import { PageProps } from "./page";

export interface BookProps {
  color: string;
  createdAt: string;
  id: string;
  title: string;
}

export interface BooksProps {
  book: {
    id: string;
    title: string;
    color: string;
    pages: Array<PageProps>;
  };
}
