import { PageProps } from "./page";

export interface BookProps {
  color: string;
  createdAt: string;
  id: number;
  title: string;
}

export interface BooksProps {
  book: {
    id: number;
    title: string;
    color: string;
    pages: Array<PageProps>;
  };
}
